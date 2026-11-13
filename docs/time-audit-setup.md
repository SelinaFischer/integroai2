# AI time audit: setup guide

About 10 minutes. Everything here uses your own Google account. Until this is done, the page still works: visitors see their action plan on screen, and the email form tells them emailing isn't switched on yet.

## 1. Create the Sheet and script
1. Create a new Google Sheet called `AI Time Audit Leads`.
2. Open **Extensions > Apps Script**.
3. Delete the sample code and paste in everything from `apps-script/time-audit/Code.gs`.
4. Click the **+** next to Files, choose **Script**, and name it `Data`.
5. Paste in everything from `apps-script/time-audit/Data.gs`.
6. Click **Save**.

## 2. Test and allow permissions
1. In the function menu at the top, choose `doGet`, then click **Run**.
2. When Google asks, review and allow the permissions. The script needs to send email from your account and write to this Sheet.

## 3. Deploy
1. Click **Deploy > New deployment**.
2. Click the gear icon and choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**.
5. Click **Deploy** and copy the **Web app URL**, which ends in `/exec`.
6. Send that URL to Claude, or paste it into `TIME_AUDIT_ENDPOINT` in `src/lib/timeAudit.ts`. It is public by design, so it is safe to share.

## 4. Change the wording later
All task wording lives in `src/data/time-audit.json`, so the page and the email always match.
1. Change the JSON file.
2. Run `npm run build:time-audit-gs` to refresh `apps-script/time-audit/Data.gs`.
3. Paste the new `Data.gs` into Apps Script.
4. Use **Deploy > Manage deployments > Edit > Version: New version > Deploy**. This keeps the same URL. Saving the code alone does not update the live tool.

## What the Sheet records
Date, first name, email, business, what they do, tone, areas, each task with its time range, total hours a month, the "Start here" task, what they use for it, what makes it hard, whether the plan was emailed, and whether they want tips.

## Limits you can change
At the top of `Code.gs`: 100 emailed plans a day and 3 per email address every 6 hours. Google also applies its own daily email limits, which vary by account.
