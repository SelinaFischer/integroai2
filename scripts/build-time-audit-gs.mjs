// Copies the time audit content into the Apps Script, so the emailed plan
// matches the page. Run after changing src/data/time-audit.json:
//   npm run build:time-audit-gs
// then paste apps-script/time-audit/Data.gs into Apps Script and deploy a new version.
import fs from "node:fs/promises";

const data = JSON.parse(await fs.readFile("src/data/time-audit.json", "utf8"));
const out =
  "// GENERATED from src/data/time-audit.json by scripts/build-time-audit-gs.mjs.\n" +
  "// Do not edit by hand. Change the JSON file and run: npm run build:time-audit-gs\n" +
  `var TIME_AUDIT_DATA = ${JSON.stringify(data, null, 2)};\n`;
await fs.writeFile("apps-script/time-audit/Data.gs", out);
console.log("apps-script/time-audit/Data.gs updated.");
