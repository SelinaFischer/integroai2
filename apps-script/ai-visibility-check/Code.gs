/**
 * IntegroAI free AI visibility check.
 * Runs as a Google Apps Script web app attached to a Google Sheet.
 * Setup steps: docs/ai-visibility-check-setup.md
 * No secrets belong in this file. Optional keys go in Script Properties.
 */
var CONFIG = {
  SHEET_NAME: 'Leads',
  DAILY_SCAN_LIMIT: 100,
  PER_EMAIL_LIMIT: 3,
  PER_SITE_LIMIT: 5,
  LIMIT_WINDOW_SECONDS: 21600,
  MIN_READABLE_WORDS: 100,
  CALL_URL: 'https://calendly.com/integroai-tech/30min',
  REPLY_TO: 'info@integroai.tech',
  SENDER_NAME: 'Selina Fischer, IntegroAI Consulting',
  USER_AGENT: 'Mozilla/5.0 (compatible; IntegroAI-Visibility-Check/1.0; +https://integroai.tech/ai-visibility-check)'
};

var CRAWLERS = [
  { token: 'gptbot', label: 'GPTBot (OpenAI)' },
  { token: 'oai-searchbot', label: 'OAI-SearchBot (ChatGPT search)' },
  { token: 'claudebot', label: 'ClaudeBot (Anthropic)' },
  { token: 'perplexitybot', label: 'PerplexityBot (Perplexity)' },
  { token: 'googlebot', label: 'Googlebot (Google Search)' }
];

function doGet() {
  return jsonOut_({ ok: true, service: 'ai-visibility-check' });
}

function doPost(e) {
  try {
    var input = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (input.company_website) return jsonOut_({ ok: true, status: 'ignored' }); // honeypot

    var lead = cleanLead_(input);
    if (lead.error) return jsonOut_({ ok: false, error: lead.error });

    var limit = checkLimits_(lead);
    if (limit) return jsonOut_({ ok: false, error: limit });

    var result = scanWebsite_(lead.url);
    var emailSent = sendReport_(lead, result);
    logLead_(lead, result, emailSent);

    return jsonOut_({
      ok: true,
      status: result.status,
      url: result.finalUrl,
      score: result.score,
      band: result.band,
      checks: result.checks.map(function (c) {
        return { id: c.id, label: c.label, status: c.status, found: c.found };
      }),
      emailSent: emailSent
    });
  } catch (err) {
    console.error(err);
    return jsonOut_({ ok: false, error: 'server' });
  }
}

/* ---------- input ---------- */

function cleanLead_(input) {
  var name = text_(input.name, 80);
  var business = text_(input.business, 120);
  var email = text_(input.email, 160).toLowerCase();
  var url = normaliseUrl_(text_(input.website, 300));
  if (!name || !business) return { error: 'details' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'email' };
  if (!url) return { error: 'website' };
  return { name: name, business: business, email: email, url: url, tips: input.tips === true };
}

function text_(value, max) {
  return String(value == null ? '' : value).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
}

function normaliseUrl_(raw) {
  if (!raw) return '';
  if (!/^https?:\/\//i.test(raw)) raw = 'https://' + raw;
  var m = raw.match(/^(https?):\/\/([^\/?#@\s]+)([^\s]*)$/i);
  if (!m) return '';
  var host = m[2].toLowerCase().replace(/:\d+$/, '');
  if (host.indexOf('.') === -1 || /\.(local|internal)$/.test(host)) return '';
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host) || host.indexOf('[') === 0) return '';
  return m[1].toLowerCase() + '://' + m[2].toLowerCase() + (m[3] || '/');
}

function checkLimits_(lead) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var cache = CacheService.getScriptCache();
    var host = hostOf_(lead.url);
    var emailKey = 'e:' + hash_(lead.email);
    var siteKey = 's:' + hash_(host);
    var emailCount = Number(cache.get(emailKey) || 0);
    var siteCount = Number(cache.get(siteKey) || 0);
    if (emailCount >= CONFIG.PER_EMAIL_LIMIT || siteCount >= CONFIG.PER_SITE_LIMIT) return 'too_many';

    var props = PropertiesService.getScriptProperties();
    var dayKey = 'day:' + Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd');
    var dayCount = Number(props.getProperty(dayKey) || 0);
    if (dayCount >= CONFIG.DAILY_SCAN_LIMIT) return 'busy';

    props.setProperty(dayKey, String(dayCount + 1));
    cache.put(emailKey, String(emailCount + 1), CONFIG.LIMIT_WINDOW_SECONDS);
    cache.put(siteKey, String(siteCount + 1), CONFIG.LIMIT_WINDOW_SECONDS);
    return '';
  } finally {
    lock.releaseLock();
  }
}

function hostOf_(url) {
  return url.replace(/^https?:\/\//, '').split(/[\/?#]/)[0].replace(/^www\./, '');
}

function hash_(value) {
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value));
}

/* ---------- scanning ---------- */

function scanWebsite_(url) {
  var origin = url.match(/^https?:\/\/[^\/]+/)[0];
  var options = {
    muteHttpExceptions: true,
    followRedirects: true,
    validateHttpsCertificates: true,
    headers: { 'User-Agent': CONFIG.USER_AGENT, Accept: 'text/html,text/plain,*/*' }
  };
  var requests = [url, origin + '/robots.txt', origin + '/llms.txt', origin + '/sitemap.xml'].map(function (u) {
    return { url: u, muteHttpExceptions: options.muteHttpExceptions, followRedirects: options.followRedirects, validateHttpsCertificates: options.validateHttpsCertificates, headers: options.headers };
  });
  var responses;
  try {
    responses = UrlFetchApp.fetchAll(requests);
  } catch (err) {
    responses = requests.map(function (r) {
      try { return UrlFetchApp.fetch(r.url, options); } catch (inner) { return null; }
    });
  }
  var page = readResponse_(responses[0]);
  var robots = readResponse_(responses[1]);
  var llms = readResponse_(responses[2]);
  var sitemap = readResponse_(responses[3]);

  var pageReadable = page.code >= 200 && page.code < 300 && /<html|<body|<head|<title/i.test(page.body);
  var plain = pageReadable ? analyseHtml_(page.body) : null;
  var rendered = null;
  if (!plain || plain.wordCount < CONFIG.MIN_READABLE_WORDS) rendered = firecrawlFallback_(url);

  if (!plain && !rendered) {
    return { status: 'unreadable', finalUrl: url, score: null, band: '', checks: [], httpCode: page.code };
  }
  return buildResult_({
    url: url,
    httpCode: page.code,
    plain: plain,
    rendered: rendered,
    robotsCode: robots.code,
    robotsBody: robots.body,
    llmsFound: isPlainTextFile_(llms),
    sitemapFound: findSitemap_(robots, sitemap)
  });
}

function readResponse_(response) {
  if (!response) return { code: 0, body: '' };
  try {
    return { code: response.getResponseCode(), body: String(response.getContentText()).slice(0, 2000000) };
  } catch (err) {
    return { code: response.getResponseCode ? response.getResponseCode() : 0, body: '' };
  }
}

// Off unless a Firecrawl key is added to Script Properties (see the setup guide).
function firecrawlFallback_(url) {
  var key = PropertiesService.getScriptProperties().getProperty('FIRECRAWL_API_KEY');
  if (!key) return null;
  try {
    var response = UrlFetchApp.fetch('https://api.firecrawl.dev/v2/scrape', {
      method: 'post',
      contentType: 'application/json',
      muteHttpExceptions: true,
      headers: { Authorization: 'Bearer ' + key },
      payload: JSON.stringify({ url: url, formats: ['rawHtml'], onlyMainContent: false, timeout: 30000 })
    });
    if (response.getResponseCode() !== 200) return null;
    var data = JSON.parse(response.getContentText());
    var html = data && data.success && data.data && data.data.rawHtml;
    return html ? analyseHtml_(html) : null;
  } catch (err) {
    console.warn(err);
    return null;
  }
}

function isPlainTextFile_(res) {
  return res.code === 200 && res.body.trim().length > 20 && !/^\s*</.test(res.body);
}

function findSitemap_(robots, sitemap) {
  if (robots.code === 200 && /^\s*sitemap\s*:\s*\S+/im.test(robots.body)) return true;
  return sitemap.code === 200 && /<(urlset|sitemapindex)[\s>]/i.test(sitemap.body);
}

function analyseHtml_(html) {
  var types = [];
  var ldPattern = /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
  var ld;
  while ((ld = ldPattern.exec(html))) {
    var typePattern = /"@type"\s*:\s*(?:"([^"]+)"|\[([^\]]+)\])/g;
    var t;
    while ((t = typePattern.exec(ld[1]))) {
      (t[1] || t[2].replace(/"/g, '')).split(',').forEach(function (v) {
        v = v.trim();
        if (v && types.indexOf(v) === -1) types.push(v);
      });
    }
  }
  var body = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg|template|iframe)\b[\s\S]*?<\/\1>/gi, ' ');
  var main = (body.match(/<body[\s\S]*$/i) || [body])[0];
  var text = decode_(main.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  var headings = [];
  var hPattern = /<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  var h;
  while ((h = hPattern.exec(main))) {
    headings.push({ level: Number(h[1]), text: decode_(h[2].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim() });
  }
  var titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return {
    title: titleMatch ? decode_(titleMatch[1]).replace(/\s+/g, ' ').trim() : '',
    description: metaDescription_(html),
    h1Count: headings.filter(function (x) { return x.level === 1 && x.text; }).length,
    questionHeadings: headings.filter(function (x) {
      return /\?\s*$/.test(x.text) || /^(what|why|how|who|when|where|which|can|do|does|is|are|should)\b/i.test(x.text);
    }).length,
    wordCount: text ? text.split(' ').length : 0,
    schemaTypes: types
  };
}

function metaDescription_(html) {
  var tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (var i = 0; i < tags.length; i++) {
    if (/\bname\s*=\s*["']description["']/i.test(tags[i])) {
      var content = tags[i].match(/\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
      if (content) return decode_(content[1] || content[2] || '').trim();
    }
  }
  return '';
}

function decode_(value) {
  return String(value)
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(Number(n)); });
}

// Reads the rule that applies to the home page. It cannot see firewall blocks.
function robotsBlocksCrawler_(body, token) {
  var groups = [];
  var current = null;
  var lastWasAgent = false;
  body.split(/\r?\n/).forEach(function (line) {
    var clean = line.replace(/#.*$/, '').trim();
    var m = clean.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) return;
    var field = m[1].toLowerCase();
    var value = m[2].trim();
    if (field === 'user-agent') {
      if (!lastWasAgent) { current = { agents: [], disallowRoot: false, allowRoot: false }; groups.push(current); }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      return;
    }
    lastWasAgent = false;
    if (!current) return;
    if (field === 'disallow' && (value === '/' || value === '/*')) current.disallowRoot = true;
    if (field === 'allow' && (value === '/' || value === '/*' || value === '/$')) current.allowRoot = true;
  });
  var match = groups.filter(function (g) { return g.agents.indexOf(token) !== -1; });
  if (!match.length) match = groups.filter(function (g) { return g.agents.indexOf('*') !== -1; });
  if (!match.length) return false;
  var blocked = match.some(function (g) { return g.disallowRoot; });
  var allowed = match.some(function (g) { return g.allowRoot; });
  return blocked && !allowed;
}

function buildResult_(s) {
  var page = s.plain || s.rendered;
  var checks = [];
  var add = function (id, label, max, points, found, why, fix) {
    var status = points >= max ? 'pass' : points > 0 ? 'warn' : 'fail';
    checks.push({ id: id, label: label, status: status, max: max, points: points, found: found, why: why, fix: fix });
  };

  // AI crawler access
  var blocked = [];
  var robotsKnown = s.robotsCode === 200 || (s.robotsCode >= 400 && s.robotsCode < 500);
  if (s.robotsCode === 200) {
    blocked = CRAWLERS.filter(function (c) { return robotsBlocksCrawler_(s.robotsBody, c.token); })
      .map(function (c) { return c.label; });
  }
  var accessPoints = robotsKnown ? Math.round(25 * (CRAWLERS.length - blocked.length) / CRAWLERS.length) : 12;
  add('access', 'AI crawlers allowed', 25, accessPoints,
    !robotsKnown ? 'We could not read your robots.txt file.'
      : blocked.length ? 'Blocked in robots.txt: ' + blocked.join(', ') + '.'
      : 'robots.txt does not block the main AI crawlers we checked.',
    'If a crawler is told to stay out, that AI tool has less to work with when it describes your business.',
    'Review robots.txt and allow the crawlers you want to reach your site. Also check any firewall settings, as this test cannot see those.');

  // Readable without JavaScript
  var plainWords = s.plain ? s.plain.wordCount : 0;
  var readablePoints = plainWords >= CONFIG.MIN_READABLE_WORDS ? 20 : plainWords >= 30 ? 8 : 0;
  add('readable', 'Text readable without JavaScript', 20, readablePoints,
    !s.plain ? 'Our simple check was blocked from reading this page (status ' + s.httpCode + ').'
      : plainWords >= CONFIG.MIN_READABLE_WORDS ? 'We found about ' + plainWords + ' words in the page code.'
      : 'We found only about ' + plainWords + ' words before any JavaScript runs.',
    'Some AI crawlers may not run JavaScript. If your words only appear after it runs, they may not see them.',
    'Make sure your main content is in the HTML the server sends, for example through server-side rendering or pre-rendering.');

  // HTTPS
  var isHttps = /^https:/i.test(s.url);
  add('https', 'Secure connection (HTTPS)', 5, isHttps ? 5 : 0,
    isHttps ? 'The address you entered uses HTTPS.' : 'The address you entered does not use HTTPS.',
    'HTTPS is a basic trust signal for visitors and search engines.',
    'Turn on HTTPS with your hosting provider and redirect the old address to it.');

  // Title
  var titleLength = page.title.length;
  add('title', 'Clear page title', 10, !titleLength ? 0 : titleLength < 15 || titleLength > 70 ? 5 : 10,
    titleLength ? 'Your title: "' + page.title.slice(0, 120) + '"' : 'We could not find a page title.',
    'The title is one of the first things that says what the page is about.',
    'Write a title of about 15 to 70 characters that says what you do and who you help.');

  // Description
  var descriptionLength = page.description.length;
  add('description', 'Page description', 5, !descriptionLength ? 0 : descriptionLength < 50 || descriptionLength > 170 ? 3 : 5,
    descriptionLength ? 'We found a description of ' + descriptionLength + ' characters.' : 'We could not find a page description.',
    'A description gives search tools a short summary of the page.',
    'Add a plain summary of about 50 to 170 characters.');

  // H1
  add('h1', 'One main heading', 5, page.h1Count === 1 ? 5 : page.h1Count > 1 ? 3 : 0,
    page.h1Count === 1 ? 'We found one main heading.' : page.h1Count > 1 ? 'We found ' + page.h1Count + ' main headings.' : 'We could not find a main heading (H1).',
    'A clear main heading helps people and machines see what the page is about.',
    'Use one H1 that names what you offer.');

  // Structured data
  var hasOrganisation = page.schemaTypes.some(function (t) { return /organization|localbusiness|professionalservice|corporation/i.test(t); });
  add('schema', 'Structured data', 10, hasOrganisation ? 10 : page.schemaTypes.length ? 5 : 0,
    page.schemaTypes.length ? 'We found: ' + page.schemaTypes.slice(0, 6).join(', ') + '.' : 'We could not find any structured data.',
    'Structured data can describe your business in a format machines can read. It should match what people see on the page, and it is not a shortcut.',
    'Add Organization or LocalBusiness structured data that matches your visible content.');

  // Question-led content
  var questions = page.questionHeadings;
  add('answers', 'Question-led content', 10, questions >= 3 ? 10 : questions >= 1 ? 5 : 0,
    questions ? 'We found ' + questions + ' heading(s) phrased around a question.' : 'We could not find headings phrased as questions.',
    'People ask AI tools questions. Pages that answer them clearly are easier to quote.',
    'Add the real questions your customers ask as headings, with a direct answer straight after each one.');

  // Sitemap
  add('sitemap', 'Sitemap', 10, s.sitemapFound ? 10 : 0,
    s.sitemapFound ? 'We found a sitemap.' : 'We could not find a sitemap.',
    'A sitemap helps search tools find your important pages.',
    'Publish a sitemap.xml file and list it in robots.txt.');

  var score = checks.reduce(function (sum, c) { return sum + c.points; }, 0);
  var band = score >= 80 ? 'Strong foundations' : score >= 50 ? 'Some gaps to fix' : 'Hard for AI to read';

  // Optional, so it never affects the score.
  checks.push({
    id: 'llms', label: 'llms.txt file (optional)', status: s.llmsFound ? 'pass' : 'info', max: 0, points: 0,
    found: s.llmsFound ? 'We found an llms.txt file.' : 'No llms.txt file found. This does not affect your score.',
    why: 'This optional file summarises your site for AI tools. Google says it is not needed for its AI search features, so treat it as a small extra.',
    fix: 'Add one only if you want to. Fix the items above first.'
  });

  return { status: 'scanned', finalUrl: s.url, score: score, band: band, checks: checks, httpCode: s.httpCode };
}

/* ---------- email ---------- */

function sendReport_(lead, result) {
  try {
    if (MailApp.getRemainingDailyQuota() < 1) return false;
    var email = buildEmail_(lead, result);
    MailApp.sendEmail({
      to: lead.email, subject: email.subject, body: email.text, htmlBody: email.html,
      name: CONFIG.SENDER_NAME, replyTo: CONFIG.REPLY_TO
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function buildEmail_(lead, result) {
  var site = hostOf_(result.finalUrl);
  var close = 'Want help turning this into a clear plan? Book a free 30-minute call: ' + CONFIG.CALL_URL;
  var limits = 'This report checks whether your website is easy for AI tools to read. It does not show whether an AI tool will mention or recommend your business, and nobody can guarantee that.';
  if (result.status !== 'scanned') {
    var msg = 'Our automatic check could not read ' + site + '. The site may block automated visitors, which can happen for many reasons, and it may be worth checking why.';
    return {
      subject: 'Your AI visibility check for ' + site,
      text: 'Hi ' + lead.name + ',\n\n' + msg + '\n\n' + close + '\n\nSelina Fischer\nIntegroAI Consulting',
      html: wrapEmail_('<p>Hi ' + esc_(lead.name) + ',</p><p>' + esc_(msg) + '</p>' + callHtml_())
    };
  }
  var toFix = result.checks.filter(function (c) { return c.status === 'fail' || c.status === 'warn'; });
  var fine = result.checks.filter(function (c) { return c.status === 'pass'; });
  var info = result.checks.filter(function (c) { return c.status === 'info'; });
  var text = ['Hi ' + lead.name + ',', '', 'Your score for ' + site + ': ' + result.score + '/100 (' + result.band + ').', ''];
  if (toFix.length) {
    text.push('What to fix:');
    toFix.forEach(function (c) { text.push('', c.label, 'Found: ' + c.found, 'Why it matters: ' + c.why, 'What to do: ' + c.fix); });
    text.push('');
  }
  if (fine.length) text.push('Already in place: ' + fine.map(function (c) { return c.label; }).join(', ') + '.', '');
  info.forEach(function (c) { text.push(c.label + ': ' + c.found, ''); });
  text.push(limits, '', close, '', 'Selina Fischer', 'IntegroAI Consulting');

  var html = '<p>Hi ' + esc_(lead.name) + ',</p>' +
    '<p style="font-size:22px;margin:20px 0 4px;color:#012F46"><strong>' + result.score + '/100</strong></p>' +
    '<p style="margin:0 0 20px;color:#3B767C"><strong>' + esc_(result.band) + '</strong> for ' + esc_(site) + '</p>';
  if (toFix.length) {
    html += '<h2 style="font-size:17px;color:#012F46;margin:24px 0 8px">What to fix</h2>';
    toFix.forEach(function (c) {
      html += '<div style="border-top:1px solid #E5E0D8;padding:12px 0"><p style="margin:0 0 6px;color:#012F46"><strong>' + esc_(c.label) + '</strong></p>' +
        '<p style="margin:0 0 6px">' + esc_(c.found) + '</p><p style="margin:0 0 6px"><strong>Why it matters:</strong> ' + esc_(c.why) + '</p>' +
        '<p style="margin:0"><strong>What to do:</strong> ' + esc_(c.fix) + '</p></div>';
    });
  }
  if (fine.length) {
    html += '<p style="margin-top:20px"><strong>Already in place:</strong> ' + esc_(fine.map(function (c) { return c.label; }).join(', ')) + '.</p>';
  }
  info.forEach(function (c) { html += '<p><strong>' + esc_(c.label) + ':</strong> ' + esc_(c.found) + '</p>'; });
  html += '<p style="font-size:13px;color:#42566A">' + esc_(limits) + '</p>' + callHtml_();
  return {
    subject: 'Your AI visibility report: ' + result.score + '/100 for ' + site,
    text: text.join('\n'),
    html: wrapEmail_(html)
  };
}

function callHtml_() {
  return '<p>Want help turning this into a clear plan?</p><p><a href="' + CONFIG.CALL_URL +
    '" style="display:inline-block;background:#F5A302;color:#012F46;font-weight:bold;padding:11px 18px;border-radius:999px;text-decoration:none">Book a free 30-minute call</a></p>' +
    '<p>Selina Fischer<br>IntegroAI Consulting</p>';
}

function wrapEmail_(inner) {
  return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#42566A;max-width:600px">' + inner + '</div>';
}

function esc_(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- sheet ---------- */

function logLead_(lead, result, emailSent) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME) || spreadsheet.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Name', 'Business', 'Email', 'Website', 'Result', 'Score', 'Band', 'Items to fix', 'Report emailed', 'Wants tips']);
    sheet.setFrozenRows(1);
  }
  var toFix = result.checks.filter(function (c) { return c.status === 'fail' || c.status === 'warn'; })
    .map(function (c) { return c.label; }).join('; ');
  sheet.appendRow([new Date(), safeCell_(lead.name), safeCell_(lead.business), safeCell_(lead.email), safeCell_(lead.url),
    result.status, result.score === null ? '' : result.score, result.band, safeCell_(toFix), emailSent ? 'Yes' : 'No', lead.tips ? 'Yes' : 'No']);
}

// Stops typed text being treated as a spreadsheet formula.
function safeCell_(value) {
  var text = String(value);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function jsonOut_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
