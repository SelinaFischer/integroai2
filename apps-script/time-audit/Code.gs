/**
 * IntegroAI free AI time audit for small businesses.
 * Runs as a Google Apps Script web app attached to a Google Sheet.
 * Setup steps: docs/time-audit-setup.md
 *
 * The task content (TIME_AUDIT_DATA) is in Data.gs, generated from
 * src/data/time-audit.json by `npm run build:time-audit-gs`. Never edit Data.gs by hand.
 * The email is built only from that data, never from text sent by the browser,
 * so the form cannot be used to send someone else's words.
 * No secrets belong in this file. The Cloudflare Turnstile secret lives in
 * Project Settings > Script Properties as TURNSTILE_SECRET. Until it is set, the bot check is skipped.
 */
var CONFIG = {
  SHEET_NAME: 'Leads',
  DAILY_LIMIT: 100,           // safety net under Google's own daily email limit
  PER_EMAIL_PER_DAY: 10,      // stops one inbox being flooded; real prospects never get near it
  MIN_SECONDS: 5,             // forms sent faster than this after the page loads are treated as bots
  DUPLICATE_SECONDS: 600,     // the same plan to the same address within 10 minutes is sent once
  // Your own addresses skip the per-address limit, so testing always works.
  ALLOW: ['info@integroai.tech', 'integroai.tech@gmail.com'],
  REMINDER_DAYS: 14,          // the optional reminder is sent this many days after the plan
  FOCUS_LIMIT: 5,             // above this many tasks, the email suggests starting with the first three
  CALL_URL: 'https://calendly.com/integroai-tech/30min',
  REPLY_TO: 'info@integroai.tech',
  SENDER_NAME: 'Selina Fischer, IntegroAI Consulting',
  // Older tone values are kept so earlier page versions still work.
  TONES: ['clear, professional', 'warm, friendly', 'relaxed, conversational', 'formal, polished',
    'professional and clear', 'warm and friendly', 'relaxed and conversational', 'formal and polished', 'direct and to the point']
};

function doGet() {
  return jsonOut_({ ok: true, service: 'time-audit' });
}

function doPost(e) {
  try {
    var input = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (input.company_website) return jsonOut_({ ok: true, status: 'ignored' }); // honeypot
    if (typeof input.elapsed === 'number' && input.elapsed < CONFIG.MIN_SECONDS * 1000) {
      return jsonOut_({ ok: true, status: 'ignored' }); // too fast to be a person
    }

    var lead = cleanLead_(input);
    if (lead.error) return jsonOut_({ ok: false, error: lead.error });

    if (!passesTurnstile_(input.turnstile)) return jsonOut_({ ok: false, error: 'bot' });

    var dupKey = 'dup:' + hash_(lead.email + JSON.stringify(lead.selections) + JSON.stringify(lead.fit));
    var cache = CacheService.getScriptCache();
    if (cache.get(dupKey)) return jsonOut_({ ok: true, emailSent: true, status: 'duplicate' });

    var limit = checkLimits_(lead);
    if (limit) return jsonOut_({ ok: false, error: limit });

    var plan = buildPlan_(lead);
    var emailSent = sendPlan_(lead, plan);
    if (emailSent) cache.put(dupKey, '1', CONFIG.DUPLICATE_SECONDS);
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
  var tone = CONFIG.TONES.indexOf(String(input.tone)) > -1 ? String(input.tone) : CONFIG.TONES[0];
  return {
    name: name,
    email: email,
    business: text_(input.business, 120),
    what: text_(input.what, 160),
    customers: text_(input.customers, 160),
    notes: text_(input.notes, 400),
    tone: tone,
    website: cleanWebsite_(input.website),
    tips: input.tips === true,
    reminder: input.reminder === true,
    missingTask: text_(input.missing_task, 200),
    selections: selections,
    fit: {
      key: String(fit.key || ''),
      tools: text_(fit.tools, 120)
    }
  };
}

function text_(value, max) {
  return String(value == null ? '' : value).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
}

// Checks the Cloudflare Turnstile token. Skipped until TURNSTILE_SECRET is set.
function passesTurnstile_(token) {
  var secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET');
  if (!secret) return true;
  if (!token) return false;
  try {
    var res = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'post',
      payload: { secret: secret, response: String(token).slice(0, 2048) },
      muteHttpExceptions: true
    });
    return JSON.parse(res.getContentText()).success === true;
  } catch (err) {
    console.error('Turnstile check failed', err);
    return true; // if Cloudflare cannot be reached, real people are not blocked
  }
}

function checkLimits_(lead) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var props = PropertiesService.getScriptProperties();
    var today = Utilities.formatDate(new Date(), 'GMT', 'yyyy-MM-dd');
    clearOldDays_(props, today);

    var dayKey = 'day:' + today;
    var dayCount = Number(props.getProperty(dayKey) || 0);
    if (dayCount >= CONFIG.DAILY_LIMIT) return 'busy';

    var allowed = CONFIG.ALLOW.indexOf(lead.email) > -1;
    var emailKey = 'ed:' + today + ':' + hash_(lead.email);
    var emailCount = Number(props.getProperty(emailKey) || 0);
    if (!allowed && emailCount >= CONFIG.PER_EMAIL_PER_DAY) return 'too_many';

    props.setProperty(dayKey, String(dayCount + 1));
    if (!allowed) props.setProperty(emailKey, String(emailCount + 1));
    return '';
  } finally {
    lock.releaseLock();
  }
}

// Removes yesterday's per-address counts once a day, so the store stays small.
function clearOldDays_(props, today) {
  if (props.getProperty('counts_day') === today) return;
  var all = props.getProperties();
  Object.keys(all).forEach(function (key) {
    if ((key.indexOf('ed:') === 0 && key.indexOf('ed:' + today + ':') !== 0) || (key.indexOf('day:') === 0 && key !== 'day:' + today)) {
      props.deleteProperty(key);
    }
  });
  props.setProperty('counts_day', today);
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
  // Tasks with a time range always come before tasks without one. Mirrors rankRows in src/lib/timeAudit.ts.
  rows.sort(function (a, b) { return (b.hours > 0 ? 1 : 0) - (a.hours > 0 ? 1 : 0) || b.score - a.score; });
  var total = rows.reduce(function (s, r) { return s + r.hours; }, 0);
  var fit = lead.fit.key === rows[0].key ? lead.fit : { tools: '' };
  return { rows: rows, lead: rows[0], total: total, fit: fit };
}

function fmtHours_(n) {
  return n < 10 ? String(Math.round(n * 2) / 2) : String(Math.round(n));
}

// Mirrors cleanWebsite in src/lib/timeAudit.ts.
function cleanWebsite_(value) {
  var s = text_(value, 220).replace(/^https?:\/\//i, '').replace(/\/$/, '');
  return s.length <= 200 && /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/\S*)?$/i.test(s) ? 'https://' + s : '';
}

function websiteLine_(lead) {
  return lead.website ? 'Our website is ' + lead.website + ". Use it to match how we write. If you can't open it, ask me to paste a short paragraph from it." : '';
}

// Mirrors clause() in src/lib/timeAudit.ts.
function clause_(value) {
  return String(value || '').trim().replace(/[.!\s]+$/, '');
}

// The helpers below mirror softLower, capital, sentence, whatSentence and customerSentence in src/lib/timeAudit.ts.
function softLower_(s) {
  return s.length > 1 && s[1] === s[1].toLowerCase() ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}
function capital_(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function sentence_(value) {
  var s = String(value || '').trim();
  return s ? capital_(/[.!?]$/.test(s) ? s : s + '.') : '';
}
function whatSentence_(what) {
  var w = clause_(what);
  if (!w) return '';
  return /^(we|i|our)\b/i.test(w) ? capital_(w) + '.' : 'We provide ' + softLower_(w) + '.';
}
function customerSentence_(customers) {
  var c = clause_(customers);
  if (!c) return '';
  return /^(our|we)\b/i.test(c) ? capital_(c) + '.' : 'Our customers are ' + softLower_(c) + '.';
}

function context_(lead) {
  return [
    lead.business ? 'I run ' + lead.business + '.' : 'I run a small business.',
    whatSentence_(lead.what),
    customerSentence_(lead.customers),
    'Use a ' + lead.tone + ' tone and British English.',
    websiteLine_(lead),
    sentence_(lead.notes)
  ].filter(function (x) { return x; }).join(' ');
}

// Mirrors whyThisOne in src/lib/timeAudit.ts.
function whyThisOne_(leadRow, rows) {
  var D = TIME_AUDIT_DATA;
  var timed = rows.filter(function (r) { return r.hours > 0; }).sort(function (a, b) { return b.hours - a.hours; });
  var top = timed[0];
  var lt = leadRow.task;
  var quicker = top && D.effort[lt.e] < D.effort[top.task.e];
  var safer = top && D.risk[lt.r] < D.risk[top.task.r];
  var why;
  if (top && top.key !== leadRow.key && top.hours > leadRow.hours && (quicker || safer)) {
    var reason = quicker && safer ? 'quicker to change and lower risk' : quicker ? 'quicker to change' : 'lower risk to hand to AI';
    why = 'You estimated that ' + top.task.t.charAt(0).toLowerCase() + top.task.t.slice(1) + ' takes longer (' + D.bands[top.band].label.toLowerCase() + ' a week). We have put this one first because it is usually ' + reason + ', so it makes a good first step. That task is next in your plan.';
  } else if (!top) {
    why = 'Without time estimates, we have started with the change that is usually quickest and lowest risk.';
  } else if (top.key === leadRow.key) {
    why = 'Of the tasks you selected, this one takes up the most time, so it is a sensible place to start.';
  } else {
    why = 'This change is usually quick and low risk, so it makes a good first step. Your other tasks follow in your plan.';
  }
  return why + (lt.r === 'high' ? ' Mistakes here matter, so check every result carefully before using it.' : ' Check each result before using it.');
}

function promptFor_(row, lead, fit) {
  var D = TIME_AUDIT_DATA;
  var t = row.task;
  if (t.template) return lead.business ? t.template.split('[Business name]').join(lead.business) : t.template;
  var tools = clause_(fit && fit.tools);
  var add = tools ? 'For this task I currently use ' + tools + '. Suggest options that work with these tools first.' : '';
  return context_(lead) + (add ? ' ' + add : '') + '\n\n' + t.prompt;
}

function stepsFor_(row) {
  return row.task.steps;
}

function houseText_(lead) {
  return [
    'I run ' + (lead.business || '[business name]') + '.',
    whatSentence_(lead.what) || 'We provide [what your business does].',
    customerSentence_(lead.customers) || 'Our customers are [who your customers are].',
    'Use a ' + lead.tone + ' tone and British English, with British spelling.',
    websiteLine_(lead),
    sentence_(lead.notes) || 'Avoid these words and phrases: [words to avoid].',
    'Keep the language clear and specific. Do not invent facts, figures or quotes. If you need information you do not have, ask me.'
  ].filter(function (x) { return x; }).join('\n');
}

/* ---------- email ---------- */

function sendPlan_(lead, plan) {
  try {
    if (MailApp.getRemainingDailyQuota() < 1) return false;
    var email = buildEmail_(lead, plan);
    MailApp.sendEmail({
      to: lead.email, subject: email.subject, body: email.text, htmlBody: email.html,
      name: CONFIG.SENDER_NAME, replyTo: CONFIG.REPLY_TO,
      attachments: [Utilities.newBlob(trackerCsv_(plan), 'text/csv', 'time-tracker.csv')]
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// The before-and-after tracker as a spreadsheet file, listing the visitor's own tasks.
function trackerCsv_(plan) {
  var D = TIME_AUDIT_DATA;
  var cell = function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; };
  var lines = [['Task', 'Area', 'Your estimate per week', 'Weekly time now (hours)', 'Weekly time after the change (hours)', 'Notes'].map(cell).join(',')];
  plan.rows.forEach(function (r) {
    lines.push([r.task.t, D.areas[r.area].short, r.band ? D.bands[r.band].label : 'Not given', '', '', ''].map(cell).join(','));
  });
  // The byte order mark helps Excel open the file with the right characters.
  return '\ufeff' + lines.join('\r\n') + '\r\n';
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

  var amber = '#FF9900', chip = '#FFE9C2';
  var num = function (n) {
    return '<span style="display:inline-block;width:22px;height:22px;line-height:22px;border-radius:11px;background:' + navy + ';color:#fff;text-align:center;font-size:12px;letter-spacing:0;margin-right:6px">' + n + '</span>';
  };
  var info = function (label, body) {
    html.push('<p style="margin:0 0 6px;font-size:14px;line-height:1.55;color:' + slate + '"><strong style="color:' + navy + '">' + esc_(label) + ':</strong> ' + esc_(body) + '</p>');
    text.push(label + ': ' + body);
  };

  // Mirrors the page: a numbered label, the task with a tick, then information, then next steps.
  var section = function (row, index) {
    var t = row.task;
    var isLead = index === 0;
    var fit = isLead ? plan.fit : null;
    var label = 'Recommendation ' + (index + 1) + (isLead ? ' · Start here' : '');
    html.push('<p style="margin:28px 0 4px;font-size:11px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:' + teal + '">' + num(index + 1) + esc_(label) + '</p>');
    html.push('<h2 style="margin:0 0 6px;font-size:' + (isLead ? 21 : 18) + 'px;line-height:1.3;color:' + navy + '"><span style="color:' + teal + '">&#10003;</span> ' + esc_(t.t) + '</h2>');
    text.push('', label.toUpperCase(), '✓ ' + t.t);
    if (row.hours) {
      p('Estimated time spent: ' + fmtHours_(row.hours) + ' hours per month', 'font-size:14px;font-weight:bold;color:' + teal);
      text.push('Estimated time spent: ' + fmtHours_(row.hours) + ' hours per month');
    }
    p('<strong>' + esc_(t.fix) + '</strong>');
    text.push(t.fix);

    html.push('<p style="margin:0 0 6px;font-size:11px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:' + slate + '">About this recommendation</p>');
    text.push('', 'About this recommendation');
    var said = row.hours ? 'You estimated ' + D.bands[row.band].label.toLowerCase() + ' a week on this task.' : 'You selected this as one of your most time-consuming tasks.';
    html.push('<p style="margin:0 0 6px;font-size:14px;line-height:1.55;color:' + slate + '">' + esc_(said) + '</p>');
    text.push(said);
    var gn = D.getNeed[row.key];
    if (gn) { info('What you’ll get', gn[0]); info('What you’ll need', gn[1]); }
    if (isLead) {
      info('Why start here', whyThisOne_(row, plan.rows));
      info('How to measure the improvement', 'record how long this task takes now. After using the new approach for two weeks, compare the time spent. Change one thing at a time so you can see what made the difference.');
    }

    // Next steps panel.
    var steps = stepsFor_(row);
    var prompt = promptFor_(row, lead, fit);
    var hint = t.template
      ? 'Copy this template, replace anything in [square brackets] with your details, then send it.'
      : 'Copy this prompt into your AI assistant, such as ChatGPT, Microsoft Copilot or Gemini. Replace anything in [square brackets] with your own details.';
    var panel = '<div style="margin:12px 0 6px;border:1px solid ' + sand + ';border-left:4px solid ' + amber + ';border-radius:10px;padding:14px 16px">' +
      '<p style="margin:0 0 10px;font-size:15px;font-weight:bold;color:' + navy + '">Your next steps</p>';
    if (D.watch[row.key]) {
      panel += '<p style="margin:0 0 10px;padding:8px 10px;border-radius:8px;background:' + chip + ';font-size:14px;line-height:1.5;color:' + navy + '"><strong>Before you begin:</strong> ' + esc_(D.watch[row.key]) + '</p>';
    }
    panel += '<ol style="margin:0 0 10px;padding-left:20px;font-size:15px;line-height:1.55;color:' + navy + '">' +
      steps.map(function (s) { return '<li>' + esc_(s) + '</li>'; }).join('') + '</ol>';
    if (t.r === 'high') {
      panel += '<p style="margin:0 0 10px;font-size:14px;font-weight:bold;color:' + navy + '">A person should stay in charge here. Check every result before anything is sent.</p>';
    }
    panel += '<div style="border:1px solid ' + sand + ';border-radius:10px">' +
      '<div style="padding:8px 12px;border-bottom:1px solid ' + sand + ';font-size:11px;font-weight:bold;letter-spacing:.08em;text-transform:uppercase;color:' + slate + '">' + (t.template ? 'Ready-to-use template' : 'Prompt for your AI assistant') + '</div>' +
      '<div style="padding:8px 12px;border-bottom:1px solid ' + sand + ';background:#FBF7F1;font-size:13px;line-height:1.5;color:' + navy + '">' + esc_(hint) + '</div>' +
      '<div style="padding:10px 12px;font-size:14px;line-height:1.55;color:' + navy + '">' + esc_(prompt).replace(/\n/g, '<br>') + '</div></div></div>';
    html.push(panel);
    text.push('', 'YOUR NEXT STEPS');
    if (D.watch[row.key]) text.push('Before you begin: ' + D.watch[row.key]);
    steps.forEach(function (s, n) { text.push((n + 1) + '. ' + s); });
    if (t.r === 'high') text.push('A person should stay in charge here. Check every result before anything is sent.');
    text.push('', hint, '', prompt);
  };

  p('Hi ' + esc_(lead.name) + ',');
  p('Here is your full action plan from the IntegroAI Time Audit.');
  text.push('Hi ' + lead.name + ',', '', 'Here is your full action plan from the IntegroAI Time Audit.');
  var howTo = 'Copy each prompt into your AI assistant, such as ChatGPT, Microsoft Copilot or Gemini. Replace anything in [square brackets] with your own details, and review each result before using it.';
  p(esc_(howTo));
  text.push(howTo);
  if (plan.total) {
    var totalLine = 'Based on the times you entered, you spend around ' + fmtHours_(plan.total) + ' hours a month on these tasks. This is your current workload, not an estimate of time you could save.';
    p(esc_(totalLine));
    text.push(totalLine);
  }

  // Plan at a glance: every task in the plan, numbered to match the sections below.
  h('Your plan covers ' + (plan.rows.length === 1 ? 'this task' : 'these ' + plan.rows.length + ' tasks'), 19);
  html.push('<ol style="margin:0 0 12px;padding-left:22px;font-size:15px;line-height:1.7;color:' + navy + '">' +
    plan.rows.map(function (r, n) {
      return '<li><strong>' + esc_(r.task.t) + '</strong>' + (n === 0 ? ' <span style="background:' + chip + ';border-radius:10px;padding:1px 8px;font-size:12px;font-weight:bold">Start here</span>' : '') + '</li>';
    }).join('') + '</ol>');
  text.push('', 'YOUR PLAN COVERS ' + (plan.rows.length === 1 ? 'THIS TASK' : 'THESE ' + plan.rows.length + ' TASKS'));
  plan.rows.forEach(function (r, n) { text.push((n + 1) + '. ' + r.task.t + (n === 0 ? ' (Start here)' : '')); });
  if (plan.rows.length > CONFIG.FOCUS_LIMIT) {
    var tip = 'Tip: you selected ' + plan.rows.length + ' tasks. Start with the first three, then work through the rest once those changes are in place.';
    p(esc_(tip), 'padding:8px 10px;border-radius:8px;background:#FBF7F1;font-size:14px');
    text.push('', tip);
  }

  section(plan.lead, 0);
  if (plan.rows.length > 1) {
    h(plan.rows.length === 2 ? 'Another recommended improvement' : 'Other recommended improvements', 20);
    text.push('', plan.rows.length === 2 ? 'ANOTHER RECOMMENDED IMPROVEMENT' : 'OTHER RECOMMENDED IMPROVEMENTS');
    plan.rows.slice(1).forEach(function (row, n) { section(row, n + 1); });
  }

  h('Your reusable business context', 19);
  p('Give your AI assistant a brief introduction to your business so it can provide more relevant responses. Copy the text below, review the details and reuse it for business tasks.');
  box('Business context', houseText_(lead));
  text.push('', 'YOUR REUSABLE BUSINESS CONTEXT', houseText_(lead));

  h('Track your time before and after', 19);
  p('Record your weekly time now, then again after using the new approach for two weeks. A copy of this table is attached as a spreadsheet (time-tracker.csv), ready to open in Excel or Google Sheets.');
  html.push('<table style="border-collapse:collapse;width:100%;font-size:14px;color:' + navy + '"><tr>' +
    ['Task', 'Weekly time now', 'Weekly time after trying the change'].map(function (c) { return '<th style="text-align:left;border:1px solid ' + sand + ';padding:8px">' + c + '</th>'; }).join('') + '</tr>' +
    plan.rows.map(function (r) { return '<tr><td style="border:1px solid ' + sand + ';padding:8px">' + esc_(r.task.t) + '</td><td style="border:1px solid ' + sand + ';padding:8px">&nbsp;</td><td style="border:1px solid ' + sand + ';padding:8px">&nbsp;</td></tr>'; }).join('') +
    '</table>');
  text.push('', 'TRACK YOUR TIME BEFORE AND AFTER', 'A copy of this table is attached as a spreadsheet (time-tracker.csv).');
  plan.rows.forEach(function (r) { text.push(r.task.t + ': weekly time now ____  weekly time after trying the change ____'); });

  h('Need help getting started?', 19);
  p('Book a free 30-minute discovery call to discuss your results, identify where to start and explore how IntegroAI can help.');
  html.push('<p style="margin:0 0 20px"><a href="' + CONFIG.CALL_URL + '" style="display:inline-block;background:#FF9900;color:' + navy + ';font-weight:bold;text-decoration:none;padding:12px 20px;border-radius:8px">Book a free discovery call</a></p>');
  text.push('', 'Need help getting started?', 'Book a free 30-minute discovery call to discuss your results, identify where to start and explore how IntegroAI can help.', 'Book a free discovery call: ' + CONFIG.CALL_URL);
  var disclaimer = 'Your plan offers general suggestions based on your answers.';
  var aiNote = 'Before using an AI tool, remove any personal or confidential information from the content you share.';
  p(disclaimer, 'font-size:13px;color:' + slate);
  p(aiNote, 'font-size:13px;color:' + slate);
  p('Selina Fischer<br>IntegroAI Consulting<br><a href="https://integroai.tech" style="color:' + teal + '">integroai.tech</a>');
  text.push('', disclaimer, aiNote, '', 'Selina Fischer', 'IntegroAI Consulting', 'https://integroai.tech');

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
      'Hours a month', 'Start here', 'Uses for it', 'What makes it hard', 'Plan emailed', 'Wants tips', 'Website', 'Customers', 'Anything else', 'Missing task', 'Reminder wanted', 'Reminder sent']);
    sheet.setFrozenRows(1);
  } else {
    // Columns added after launch.
    [[15, 'Website'], [16, 'Customers'], [17, 'Anything else'], [18, 'Missing task'], [19, 'Reminder wanted'], [20, 'Reminder sent']].forEach(function (c) {
      if (sheet.getRange(1, c[0]).getValue() === '') sheet.getRange(1, c[0]).setValue(c[1]);
    });
  }
  var areas = {};
  plan.rows.forEach(function (r) { areas[D.areas[r.area].short] = true; });
  var tasks = plan.rows.map(function (r) {
    return r.task.t + ' (' + (r.band ? D.bands[r.band].label : 'no time given') + ')';
  }).join('; ');
  sheet.appendRow([new Date(), safeCell_(lead.name), safeCell_(lead.email), safeCell_(lead.business), safeCell_(lead.what), lead.tone,
    Object.keys(areas).join(', '), safeCell_(tasks), Math.round(plan.total), safeCell_(plan.lead.task.t),
    safeCell_(plan.fit.tools), '',
    emailSent ? 'Yes' : 'No', lead.tips ? 'Yes' : 'No', safeCell_(lead.website), safeCell_(lead.customers), safeCell_(lead.notes),
    safeCell_(lead.missingTask), lead.reminder && emailSent ? 'Yes' : 'No', '']);
}

// Stops a cell from being read as a formula.
function safeCell_(value) {
  var s = String(value == null ? '' : value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function jsonOut_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- two-week reminder ---------- */

// Run once by hand (choose setUpReminders, then Run) to check for due reminders every morning.
function setUpReminders() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'sendReminders') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('sendReminders').timeBased().everyDays(1).atHour(9).create();
}

// Sends one reminder to each person who asked for it, 14 days after their plan was emailed.
function sendReminders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) return;
  var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 20).getValues();
  var due = Date.now() - CONFIG.REMINDER_DAYS * 24 * 60 * 60 * 1000;
  rows.forEach(function (r, i) {
    var date = r[0], name = r[1], email = r[2], startHere = r[9], emailed = r[12], wanted = r[18], sent = r[19];
    if (wanted !== 'Yes' || emailed !== 'Yes' || sent || Object.prototype.toString.call(date) !== '[object Date]' || date.getTime() > due) return;
    if (MailApp.getRemainingDailyQuota() < 1) return;
    try {
      var msg = reminderEmail_(String(name), String(startHere));
      MailApp.sendEmail({ to: String(email), subject: msg.subject, body: msg.text, htmlBody: msg.html, name: CONFIG.SENDER_NAME, replyTo: CONFIG.REPLY_TO });
      sheet.getRange(i + 2, 20).setValue(new Date());
    } catch (err) {
      console.error(err);
    }
  });
}

function reminderEmail_(name, startHere) {
  var navy = '#041B2B', teal = '#3B767C', slate = '#4A6080';
  var p = function (s, style) { return '<p style="margin:0 0 12px;font-size:15px;line-height:1.55;color:' + navy + ';' + (style || '') + '">' + s + '</p>'; };
  var lines = [
    'Hi ' + name + ',',
    'Two weeks ago you started with: ' + startHere + '.',
    'Take a minute to record your weekly time now in the tracker attached to your plan, and compare it with before.',
    'If it helped, keep going with the next task in your plan. If it didn’t, reply to this email and tell me what got in the way.',
    'Need help getting started? Book a free 30-minute discovery call to discuss your results, identify where to start and explore how IntegroAI can help.'
  ];
  var html = '<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;padding:8px">' +
    lines.map(function (l) { return p(esc_(l)); }).join('') +
    '<p style="margin:0 0 20px"><a href="' + CONFIG.CALL_URL + '" style="display:inline-block;background:#FF9900;color:' + navy + ';font-weight:bold;text-decoration:none;padding:12px 20px;border-radius:8px">Book a free discovery call</a></p>' +
    p('This is the only reminder we’ll send.', 'font-size:13px;color:' + slate) +
    p('Selina Fischer<br>IntegroAI Consulting<br><a href="https://integroai.tech" style="color:' + teal + '">integroai.tech</a>') + '</div>';
  var text = lines.concat(['Book a free discovery call: ' + CONFIG.CALL_URL, 'This is the only reminder we’ll send.', 'Selina Fischer\nIntegroAI Consulting\nhttps://integroai.tech']).join('\n\n');
  return { subject: 'How is your first time-saving change going?', html: html, text: text };
}
