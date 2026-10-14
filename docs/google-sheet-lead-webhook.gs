/**
 * IntegroAI: AI Readiness Assessment leads -> Google Sheet
 *
 * Paste this into the lead spreadsheet: Extensions > Apps Script.
 * Then Deploy > New deployment > type "Web app":
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the Web app URL (ends in /exec) into SHEETS_WEBHOOK_URL in
 * public/assessment.html.
 *
 * Each completed assessment adds one row to the tab below. Columns are
 * matched by the header in row 1. Any field without a column gets a new
 * column added at the end, so nothing is lost.
 */

// The tab that receives leads (the gid in the spreadsheet link).
var LEADS_TAB_GID = 1218614372;

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getLeadsSheet_();

    var lastCol = Math.max(sheet.getLastColumn(), 1);
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0]
      .map(function (h) { return String(h).trim(); });
    if (headers.length === 1 && headers[0] === '') headers = [];

    if (headers.indexOf('received_at') === -1) headers.unshift('received_at');
    data.received_at = new Date();

    Object.keys(data).forEach(function (key) {
      if (headers.indexOf(key) === -1) headers.push(key);
    });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    var row = headers.map(function (h) {
      return Object.prototype.hasOwnProperty.call(data, h) ? data[h] : '';
    });
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getLeadsSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getSheetId() === LEADS_TAB_GID) return sheets[i];
  }
  return sheets[0];
}

// Optional: run this once from the editor to check the tab and add a test row.
function testAppend() {
  doPost({ postData: { contents: JSON.stringify({
    first_name: 'Test', last_name: 'Lead', email: 'test@example.com',
    company: 'Test Ltd', score: '17/30', tier: 'Early Explorer'
  }) } });
}
