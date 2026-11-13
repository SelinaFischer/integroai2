// Free AI time audit for small businesses.
// All task content lives in src/data/time-audit.json, which is also copied into
// the Apps Script (npm run build:time-audit-gs) so the emailed plan matches the page.
// The ranking below is mirrored in apps-script/time-audit/Code.gs. Change both together.
import data from "@/data/time-audit.json";

export const TIME_AUDIT_PATH = "/ai-time-audit-small-business";
// The deployed Apps Script web app URL (ends in /exec). Public by design.
// If it is ever emptied, the page still works without the email step.
export const TIME_AUDIT_ENDPOINT = "https://script.google.com/macros/s/AKfycbzO1BTwkKqRj2dwNPXu3JzkFfS-QfY1Fjzdkrx97YOB5ri6Nd6w9dXbDZ_Ik_DXaXca/exec";

export type Task = {
  t: string;
  e: "low" | "medium" | "high";
  r: "low" | "medium" | "high";
  fix: string;
  steps: string[];
  prompt?: string;
  template?: string;
};
export type Area = { name: string; short: string; tasks: Task[] };
export type BandKey = keyof typeof data.bands;
export type Row = Task & { key: string; area: string; band: string; hours: number; score: number };
export type Fit = { tool?: string; hard?: string };
export type About = { name: string; what: string; tone: string; website?: string };

export const TIME_AUDIT = data as unknown as {
  bands: Record<string, { label: string; h: number }>;
  weeks: number;
  effort: Record<string, number>;
  risk: Record<string, number>;
  areas: Record<string, Area>;
  getNeed: Record<string, [string, string]>;
  watch: Record<string, string>;
  fitTool: Record<string, string>;
  fitToolLine: Record<string, string>;
  fitToolPrompt: Record<string, string>;
  fitHard: Record<string, string>;
  fitHardLine: Record<string, string>;
  fitHardStep: Record<string, string>;
  fitHardPrompt: Record<string, string>;
};

const D = TIME_AUDIT;

export const TONES = [
  { value: "warm and friendly", label: "Friendly" },
  { value: "professional and clear", label: "Professional" },
  { value: "direct and to the point", label: "Direct" },
];

export const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export const fmtHours = (n: number) => (n < 10 ? (Math.round(n * 2) / 2).toString() : Math.round(n).toString());

export const getTask = (key: string): Task | undefined => {
  const [area, i] = key.split("-");
  return D.areas[area]?.tasks[Number(i)];
};

/** Builds ranked rows from the ticked tasks. Mirrored in Code.gs. */
export const buildRows = (selected: Record<string, string>): Row[] =>
  Object.entries(selected)
    .map(([key, band]) => {
      const task = getTask(key);
      if (!task) return null;
      const hours = (D.bands[band]?.h || 0) * D.weeks;
      const area = key.split("-")[0];
      return { ...task, key, area, band, hours, score: (hours || 1) / (D.effort[task.e] * D.risk[task.r]) };
    })
    .filter(Boolean) as Row[];

export const rankRows = (rows: Row[]) => [...rows].sort((a, b) => b.score - a.score);

export const whyThisOne = (lead: Row, rows: Row[]) => {
  const top = [...rows].filter((r) => r.hours > 0).sort((a, b) => b.hours - a.hours)[0];
  const quicker = top && D.effort[lead.e] < D.effort[top.e];
  const safer = top && D.risk[lead.r] < D.risk[top.r];
  let why: string;
  if (top && top.key !== lead.key && top.hours > lead.hours && (quicker || safer)) {
    const reason = quicker && safer ? "quicker to change and lower risk" : quicker ? "quicker to change" : "lower risk to hand to AI";
    why = `You said ${lowerFirst(top.t)} takes longer (${D.bands[top.band].label.toLowerCase()} a week). We put this one first because it is usually ${reason}, so it makes a good first experiment. Then come back to that one, which is also in your plan.`;
  } else {
    why = "Of the tasks you ticked, this one takes up the most time and is a sensible place to start.";
  }
  return why + (lead.r === "high" ? " Mistakes here matter, so you check every result before it is used." : " You still check each result before it is used.");
};

export const saidLine = (row: Row) =>
  row.band && D.bands[row.band]?.h
    ? `You said this takes up ${D.bands[row.band].label.toLowerCase()} a week.`
    : "You ticked this as one of the tasks that take up most of your time.";

export const stepsFor = (row: Row, fit?: Fit) => {
  const extra = fit?.hard ? D.fitHardStep[fit.hard] : "";
  return extra ? [extra, ...row.steps] : row.steps;
};

/** Tidies a website address, or returns "" if it doesn't look like one. Mirrored in Code.gs. */
export const cleanWebsite = (value?: string) => {
  const s = (value || "").trim().replace(/^https?:\/\//i, "").replace(/\/$/, "");
  return s.length <= 200 && /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/\S*)?$/i.test(s) ? `https://${s}` : "";
};

export const websiteLine = (about: About) => {
  const url = cleanWebsite(about.website);
  return url ? `Our website is ${url}. Use it to match how we write. If you can't open it, ask me to paste a short paragraph from it.` : "";
};

export const context = (about: About) => {
  const intro = (about.name ? `I run ${about.name}.` : "I run a small business.") + (about.what ? ` What we do: ${about.what}.` : "");
  const site = websiteLine(about);
  return `${intro} Write in a ${about.tone} tone, in British English.${site ? " " + site : ""}`;
};

export const textFor = (row: Row, about: About, fit?: Fit) => {
  if (row.template) return about.name ? row.template.split("[Business name]").join(about.name) : row.template;
  const add = [fit?.tool && D.fitToolPrompt[fit.tool], fit?.hard && D.fitHardPrompt[fit.hard]].filter(Boolean).join(" ");
  return `${context(about)}${add ? " " + add : ""}\n\n${row.prompt}`;
};

export const firstMove = (fit?: Fit) =>
  [fit?.tool && D.fitToolLine[fit.tool], fit?.hard && D.fitHardLine[fit.hard]].filter(Boolean).join(" ");

export const houseText = (about: About) =>
  `I run ${about.name || "[business name]"}. What we do: ${about.what || "[what you do, in one line]"}.\n` +
  (websiteLine(about) ? websiteLine(about) + "\n" : "") +
  "Our customers are [who your customers are].\n" +
  `Write in a ${about.tone} tone, in British English with British spelling.\n` +
  "Avoid these words and phrases: [words to avoid].\n" +
  "Keep it plain and specific. Do not make up facts, figures or quotes. If you need information you don't have, ask me.";

// Sends events to Google Tag Manager, like the visibility check.
export const trackTimeAudit = (event: string) => {
  try {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event });
  } catch {
    // Tracking must never affect the audit.
  }
};

export type SendResult = { ok: boolean; error?: string; emailSent?: boolean };

// text/plain avoids a browser preflight request, which Apps Script cannot answer.
export const sendTimeAudit = async (payload: Record<string, unknown>): Promise<SendResult> => {
  if (!TIME_AUDIT_ENDPOINT) return { ok: false, error: "not_configured" };
  const response = await fetch(TIME_AUDIT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return response.json();
};
