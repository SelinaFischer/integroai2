# AI visibility check: setup guide

About 10 minutes. Everything here uses your own Google account.

## 1. Create the Sheet and script
1. Create a new Google Sheet called `AI Visibility Check Leads`.
2. Open **Extensions > Apps Script**.
3. Delete the sample code and paste in everything from `apps-script/ai-visibility-check/Code.gs`.
4. Click **Save**.

## 2. Test and allow permissions
1. In the function menu at the top, choose `doGet`, then click **Run**.
2. When Google asks, review and allow the permissions. The script needs to connect to websites, send email from your account and write to this Sheet.

## 3. Deploy
1. Click **Deploy > New deployment**.
2. Click the gear icon and choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**.
5. Click **Deploy** and copy the **Web app URL**, which ends in `/exec`.
6. Send that URL to Claude. It is public by design, so it is safe to share.

## 4. Change the script later
Use **Deploy > Manage deployments > Edit > Version: New version > Deploy**. This keeps the same URL. Saving the code alone does not update the live tool.

## Optional: turn on Firecrawl later
Firecrawl stays off unless you add a key. Before using it, get written confirmation from Firecrawl that this use is allowed.
1. In Apps Script, open **Project Settings > Script Properties**.
2. Add the property `FIRECRAWL_API_KEY` with your key as its value.
3. Never paste the key into the code, the website, GitHub or a chat.
4. Update the privacy policy to list Firecrawl.

## Limits you can change
At the top of `Code.gs`: 100 scans a day, 3 per email and 5 per website every 6 hours. Google also applies its own daily limits, which vary by account.
