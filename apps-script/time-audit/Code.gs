/**
 * IntegroAI free AI time audit for small businesses.
 * Runs as a Google Apps Script web app attached to a Google Sheet.
 * Setup steps: docs/time-audit-setup.md
 *
 * The task content (TIME_AUDIT_DATA) is in Data.gs, generated from
 * src/data/time-audit.json by `npm run build:time-audit-gs`. Never edit Data.gs by hand.
 * The email is built only from that data, never from text sent by the browser,
 * so the form cannot be used to send someone else's words.
 * No secrets belong in this file.
 */
var CONFIG = {
  SHEET_NAME: 'Leads',
  DAILY_LIMIT: 100,
  PER_EMAIL_LIMIT: 3,
  LIMIT_WINDOW_SECONDS: 21600,
  CALL_URL: 'https://calendly.com/integroai-tech/30min',
  REPLY_TO: 'info@integroai.tech',
  SENDER_NAME: 'Selina Fischer, IntegroAI Consulting',
  TONES: ['warm and friendly', 'professional and clear', 'direct and to the point']
};

function doGet() {
  return jsonOut_({ ok: true, service: 'time-audit' });
}

function doPost(e) {
  try {
    var input = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (input.company_website) return jsonOut_({ ok: true, status: 'ignored' }); // honeypot

    var lead = cleanLead_(input);
    if (lead.error) return jsonOut_({ ok: false, error: lead.error });

    var limit = checkLimits_(lead);
    if (limit) return jsonOut_({ ok: false, error: limit });

    var plan = buildPlan_(lead);
    var emailSent = sendPlan_(lead, plan);
    logLead_(lead, plan, emailSent);
    return jsonOut_({ ok: true, emailSent: emailSent });
  } catch (err) {
    console.error(err);
    return jsonOut_({ ok: false, error: 'server' });
  }
}

/* ---------- input ---------- */

function cleanLead_(input) {
  var D = TIME_AUDIT_DATA;
  var name = text_(input.name, 80);
  var email = text_(input.email, 160).toLowerCase();
  if (!name) return { error: 'details' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'email' };

  var seen = {};
  var selections = (Array.isArray(input.selections) ? input.selections : []).slice(0, 40).filter(function (s) {
    var key = s && String(s.key);
    if (!key || seen[key] || !taskFor_(key)) return false;
    seen[key] = true;
    return true;
  }).map(function (s) {
    var band = String(s.band || '');
    return { key: String(s.key), band: D.bands[band] && band !== '' ? band : '' };
  });
  if (!selections.length) return { error: 'tasks' };

  var fit = input.fit || {};
  var tone = CONFIG.TONES.indexOf(String(input.tone)) > -1 ? String(input.tone) : CONFIG.TONES[1];
  return {
    name: name,
    email: email,
    business: text_(input.business, 120),
    what: text_(input.what, 160),
    tone: tone,
    tips: input.tips === true,
    selections: selections,
    fit: {
      key: String(fit.key || ''),
      tool: D.fitToolLine[fit.tool] ? String(fit.tool) : '',
      hard: D.fitHardLine[fit.hard] ? String(fit.hard) : ''
    }
  };
}

function text_(value, max) {
  return String(value == null ? '' : value).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
}

function checkLimits_(lead) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var cache = CacheService.getScriptCache();
    var emailKey = 'e:' + hash_(lead.email);
    var emailCount = Number(cache.get(emailKey) || 0);
    if (emailCount >= CONFIG.PER_EMAIL_LIMIT) return 'too_many';

    var props = PropertiesService.getScriptProperties();
    var dayKey = 'day:' + Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd');
    var dayCount = Number(props.getProperty(dayKey) || 0);
    if (dayCount >= CONFIG.DAILY_LIMIT) return 'busy';

    props.setProperty(dayKey, String(dayCount + 1));
    cache.put(emailKey, String(emailCount + 1), CONFIG.LIMIT_WINDOW_SECONDS);
    return '';
  } finally {
    lock.releaseLock();
  }
}

function hash_(value) {
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value));
}

/* ---------- plan (mirrors src/lib/timeAudit.ts) ---------- */

function taskFor_(key) {
  var parts = String(key).split('-');
  var area = TIME_AUDIT_DATA.areas[parts[0]];
  return area ? area.tasks[Number(parts[1])] : null;
}

function buildPlan_(lead) {
  var D = TIME_AUDIT_DATA;
  var rows = lead.selections.map(function (s) {
    var t = taskFor_(s.key);
    var hours = (D.bands[s.band] ? D.bands[s.band].h : 0) * D.weeks;
    return {
      key: s.key, area: s.key.split('-')[0], band: s.band, hours: hours, task: t,
      score: (hours || 1) / (D.effort[t.e] * D.risk[t.r])
    };
  });
  rows.sort(function (a, b) { return b.score - a.score; });
  var total = rows.reduce(function (s, r) { return s + r.hours; }, 0);
  var fit = lead.fit.key === rows[0].key ? lead.fit : { tool: '', hard: '' };
  return { rows: rows, lead: rows[0], total: total, fit: fit };
}

function fmtHours_(n) {
  return n < 10 ? String(Math.round(n * 2) / 2) : String(Math.round(n));
}

function context_(lead) {
  var intro = (lead.business ? 'I run ' + lead.business + '.' : 'I run a small business.') + (lead.what ? ' What we do: ' + lead.what + '.' : '');
  return intro + ' Write in a ' + lead.tone + ' tone, in British English.';
}

function promptFor_(row, lead, fit) {
  var D = TIME_AUDIT_DATA;
  var t = row.task;
  if (t.template) return lead.business ? t.template.split('[Business name]').join(lead.business) : t.template;
  var add = [fit && D.fitToolPrompt[fit.tool], fit && D.fitHardPrompt[fit.hard]].filter(function (x) { return x; }).join(' ');
  return context_(lead) + (add ? ' ' + add : '') + '\n\n' + t.prompt;
}

function stepsFor_(row, fit) {
  var extra = fit && fit.hard ? TIME_AUDIT_DATA.fitHardStep[fit.hard] : '';
  return extra ? [extra].concat(row.task.steps) : row.task.steps;
}

function houseText_(lead) {
  return 'I run ' + (lead.business || '[business name]') + '. What we do: ' + (lead.what || '[what you do, in one line]') + '.\n' +
    'Our customers are [who your customers are].\n' +
    'Write in a ' + lead.tone + ' tone, in British English with British spelling.\n' +
    'Avoid these words and phrases: [words to avoid].\n' +
    "Keep it plain and specific. Do not make up facts, figures or quotes. If you need information you don't have, ask me.";
}

/* ---------- email ---------- */

function sendPlan_(lead, plan) {
  try {
    if (MailApp.getRemainingDailyQuota() < 1) return false;
    var email = buildEmail_(lead, plan);
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

function buildEmail_(lead, plan) {
  var D = TIME_AUDIT_DATA;
  var navy = '#041B2B', teal = '#3B767C', slate = '#4A6080', sand = '#E9E1D3';
  var html = [];
  var text = [];
  var p = function (s, style) { html.push('<p style="margin:0 0 12px;font-size:15px;line-height:1.55;color:' + navy + ';' + (style || '') + '">' + s + '</p>'); };
  var h = function (s, size) { html.push('<h2 style="margin:24px 0 8px;font-size:' + (size || 19) + 'px;line-height:1.3;color:' + navy + '">' + esc_(s) + '</h2>'); };
  var box = function (label, body) {
    html.push('<div style="margin:0 0 14px;border:1px solid ' + sand + ';border-radius:10px">' +
      '<div style="padding:8px 12px;border-bottom:1px solid ' + sand + ';font-size:11px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:' + slate + '">' + esc_(label) + '</div>' +
      '<div style="padding:10px 12px;font-size:14px;line-height:1.55;color:' + navy + '">' + esc_(body).replace(/\n/g, '<br>') + '</div></div>');
  };

  var section = function (row, isLead) {
    var t = row.task;
    var fit = isLead ? plan.fit : null;
    h((isLead ? 'Start here: ' : '') + t.t, isLead ? 21 : 18);
    text.push('', (isLead ? 'START HERE: ' : '') + t.t.toUpperCase());
    var said = row.hours ? 'You said this takes up ' + D.bands[row.band].label.toLowerCase() + ' a week (about ' + fmtHours_(row.hours) + ' hours a month).' : 'You ticked this as one of the tasks that take up most of your time.';
    p(esc_(said), 'color:' + slate);
    p('<strong>' + esc_(t.fix) + '</strong>');
    text.push(said, t.fix);
    var gn = D.getNeed[row.key];
    if (gn) {
      p('<strong>What you’ll get:</strong> ' + esc_(gn[0]) + '<br><strong>What you’ll need:</strong> ' + esc_(gn[1]));
      text.push("What you'll get: " + gn[0], "What you'll need: " + gn[1]);
    }
    if (fit && (fit.tool || fit.hard)) {
      var move = [D.fitToolLine[fit.tool], D.fitHardLine[fit.hard]].filter(function (x) { return x; }).join(' ');
      p('<strong>Your first move:</strong> ' + esc_(move));
      text.push('Your first move: ' + move);
    }
    var steps = stepsFor_(row, fit);
    html.push('<ol style="margin:0 0 12px;padding-left:20px;font-size:15px;line-height:1.55;color:' + navy + '">' +
      steps.map(function (s) { return '<li>' + esc_(s) + '</li>'; }).join('') + '</ol>');
    steps.forEach(function (s, i) { text.push((i + 1) + '. ' + s); });
    if (t.r === 'high') {
      p('Keep a person in charge here. Always check before anything goes out.', 'font-weight:bold');
      text.push('Keep a person in charge here. Always check before anything goes out.');
    }
    if (D.watch[row.key]) {
      p('<strong>Watch out:</strong> ' + esc_(D.watch[row.key]));
      text.push('Watch out: ' + D.watch[row.key]);
    }
    var prompt = promptFor_(row, lead, fit);
    box(t.template ? 'Ready-to-use template' : 'Copy into your AI assistant', prompt);
    text.push('', prompt);
    if (isLead) {
      p('<strong>How to tell it helped:</strong> note how long this task takes this week. Try the fix for two weeks, then compare. Change one thing at a time, so you know what made the difference.');
      text.push('How to tell it helped: note how long this task takes this week. Try the fix for two weeks, then compare. Change one thing at a time, so you know what made the difference.');
    }
  };

  p('Hi ' + esc_(lead.name) + ',');
  p('Here is your full action plan from the IntegroAI Time Audit.');
  text.push('Hi ' + lead.name + ',', '', 'Here is your full action plan from the IntegroAI Time Audit.');
  if (plan.total) {
    var totalLine = 'The tasks you ticked take up about ' + fmtHours_(plan.total) + ' hours a month of your own time today. This is time spent now, not a promised saving.';
    p(esc_(totalLine));
    text.push(totalLine);
  }

  section(plan.lead, true);
  if (plan.rows.length > 1) {
    h('The rest of your tasks', 20);
    text.push('', 'THE REST OF YOUR TASKS');
    plan.rows.slice(1).forEach(function (row) { section(row, false); });
  }

  h('Your reusable business prompt', 19);
  p('Paste this at the start of any AI chat, so the answers sound like your business. Fill in the parts in brackets once and keep it.');
  box('Use it every time', houseText_(lead));
  text.push('', 'YOUR REUSABLE BUSINESS PROMPT', houseText_(lead));

  h('Record your time before and after', 19);
  p('Fill in your weekly time now, then again after trying the change for two weeks.');
  html.push('<table style="border-collapse:collapse;width:100%;font-size:14px;color:' + navy + '"><tr>' +
    ['Task', 'Weekly time now', 'Weekly time after trying the change'].map(function (c) { return '<th style="text-align:left;border:1px solid ' + sand + ';padding:8px">' + c + '</th>'; }).join('') + '</tr>' +
    plan.rows.map(function (r) { return '<tr><td style="border:1px solid ' + sand + ';padding:8px">' + esc_(r.task.t) + '</td><td style="border:1px solid ' + sand + ';padding:8px">&nbsp;</td><td style="border:1px solid ' + sand + ';padding:8px">&nbsp;</td></tr>'; }).join('') +
    '</table>');
  text.push('', 'RECORD YOUR TIME BEFORE AND AFTER');
  plan.rows.forEach(function (r) { text.push(r.task.t + ': weekly time now ____  weekly time after trying the change ____'); });

  h('Want help putting your plan into practice?', 19);
  p('Book a free 30-minute discovery call to discuss your biggest time drain and how to tackle it.');
  html.push('<p style="margin:0 0 20px"><a href="' + CONFIG.CALL_URL + '" style="display:inline-block;background:#FF9900;color:' + navy + ';font-weight:bold;text-decoration:none;padding:12px 20px;border-radius:8px">Book a free discovery call</a></p>');
  text.push('', 'Want help putting your plan into practice?', 'Book a free 30-minute discovery call to discuss your biggest time drain and how to tackle it: ' + CONFIG.CALL_URL);
  var disclaimer = 'This plan provides general suggestions based on your answers. Remove personal, client and confidential business information before pasting content into an AI tool, and check each result before using it.';
  p(disclaimer, 'font-size:13px;color:' + slate);
  p('Selina Fischer<br>IntegroAI Consulting<br><a href="https://integroai.tech" style="color:' + teal + '">integroai.tech</a>');
  text.push('', disclaimer, '', 'Selina Fischer', 'IntegroAI Consulting', 'https://integroai.tech');

  return {
    subject: 'Your AI time audit action plan',
    html: '<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;padding:8px">' + html.join('') + '</div>',
    text: text.join('\n')
  };
}

function esc_(value) {
  return String(value == null ? '' : value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- sheet ---------- */

function logLead_(lead, plan, emailSent) {
  var D = TIME_AUDIT_DATA;
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME) || spreadsheet.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'First name', 'Email', 'Business', 'What they do', 'Tone', 'Areas', 'Tasks and time a week',
      'Hours a month', 'Start here', 'Uses for it', 'What makes it hard', 'Plan emailed', 'Wants tips']);
    sheet.setFrozenRows(1);
  }
  var areas = {};
  plan.rows.forEach(function (r) { areas[D.areas[r.area].short] = true; });
  var tasks = plan.rows.map(function (r) {
    return r.task.t + ' (' + (r.band ? D.bands[r.band].label : 'no time given') + ')';
  }).join('; ');
  sheet.appendRow([new Date(), safeCell_(lead.name), safeCell_(lead.email), safeCell_(lead.business), safeCell_(lead.what), lead.tone,
    Object.keys(areas).join(', '), safeCell_(tasks), Math.round(plan.total), safeCell_(plan.lead.task.t),
    plan.fit.tool ? D.fitTool[plan.fit.tool] : '', plan.fit.hard ? D.fitHard[plan.fit.hard] : '',
    emailSent ? 'Yes' : 'No', lead.tips ? 'Yes' : 'No']);
}

// Stops a cell from being read as a formula.
function safeCell_(value) {
  var s = String(value == null ? '' : value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function jsonOut_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
