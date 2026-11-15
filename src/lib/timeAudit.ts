// Free AI time audit for small businesses.
// All task content lives in src/data/time-audit.json, which is also copied into
// the Apps Script (npm run build:time-audit-gs) so the emailed plan matches the page.
// The ranking below is mirrored in apps-script/time-audit/Code.gs. Change both together.
import data from "@/data/time-audit.json";

export const TIME_AUDIT_PATH = "/ai-time-audit-small-business";
// The deployed Apps Script web app URL (ends in /exec). Public by design.
// If it is ever emptied, the page still works without the email step.
// Cloudflare Turnstile site key (public by design). Empty means the bot check is off.
export const TURNSTILE_SITE_KEY = "";
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
/** What the visitor typed about the tools they use for their Start here task. */
export type Fit = { tools?: string };
export type About = { name: string; what: string; tone: string; website?: string; customers?: string; notes?: string };

export const TIME_AUDIT = data as unknown as {
  bands: Record<string, { label: string; h: number }>;
  weeks: number;
  effort: Record<string, number>;
  risk: Record<string, number>;
  areas: Record<string, Area>;
  getNeed: Record<string, [string, string]>;
  watch: Record<string, string>;
};

const D = TIME_AUDIT;

export const TONES = [
  { value: "clear, professional", label: "Professional" },
  { value: "warm, friendly", label: "Friendly" },
  { value: "relaxed, conversational", label: "Conversational" },
  { value: "formal, polished", label: "Formal" },
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

/** Tasks with a time range always come before tasks without one. Mirrored in Code.gs. */
export const rankRows = (rows: Row[]) =>
  [...rows].sort((a, b) => Number(b.hours > 0) - Number(a.hours > 0) || b.score - a.score);

export const whyThisOne = (lead: Row, rows: Row[]) => {
  const top = [...rows].filter((r) => r.hours > 0).sort((a, b) => b.hours - a.hours)[0];
  const quicker = top && D.effort[lead.e] < D.effort[top.e];
  const safer = top && D.risk[lead.r] < D.risk[top.r];
  let why: string;
  if (top && top.key !== lead.key && top.hours > lead.hours && (quicker || safer)) {
    const reason = quicker && safer ? "quicker to change and lower risk" : quicker ? "quicker to change" : "lower risk to hand to AI";
    why = `You estimated that ${lowerFirst(top.t)} takes longer (${D.bands[top.band].label.toLowerCase()} a week). We have put this one first because it is usually ${reason}, so it makes a good first step. That task is next in your plan.`;
  } else if (!top) {
    why = "Without time estimates, we have started with the change that is usually quickest and lowest risk.";
  } else if (top.key === lead.key) {
    why = "Of the tasks you selected, this one takes up the most time, so it is a sensible place to start.";
  } else {
    why = "This change is usually quick and low risk, so it makes a good first step. Your other tasks follow in your plan.";
  }
  return why + (lead.r === "high" ? " Mistakes here matter, so check every result carefully before using it." : " Check each result before using it.");
};

export const saidLine = (row: Row) =>
  row.band && D.bands[row.band]?.h
    ? `You estimated ${D.bands[row.band].label.toLowerCase()} a week on this task.`
    : "You selected this as one of your most time-consuming tasks.";

export const stepsFor = (row: Row) => row.steps;

/** Tidies a website address, or returns "" if it doesn't look like one. Mirrored in Code.gs. */
export const cleanWebsite = (value?: string) => {
  const s = (value || "").trim().replace(/^https?:\/\//i, "").replace(/\/$/, "");
  return s.length <= 200 && /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}(\/\S*)?$/i.test(s) ? `https://${s}` : "";
};

export const websiteLine = (about: About) => {
  const url = cleanWebsite(about.website);
  return url ? `Our website is ${url}. Use it to match how we write. If you can't open it, ask me to paste a short paragraph from it.` : "";
};

/** Trims a typed answer and drops its final full stop, so we can add our own. Mirrored in Code.gs. */
const clause = (value?: string) => (value || "").trim().replace(/[.!\s]+$/, "");

/** Lowercases the first letter unless the first word looks like an acronym, such as UK. Mirrored in Code.gs. */
const softLower = (s: string) => (s.length > 1 && s[1] === s[1].toLowerCase() ? s.charAt(0).toLowerCase() + s.slice(1) : s);
const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** Ends a typed answer with a full stop unless it already ends with one, a question mark or an exclamation mark. */
const sentence = (value?: string) => {
  const s = (value || "").trim();
  return s ? capital(/[.!?]$/.test(s) ? s : `${s}.`) : "";
};

// Turns the form answers into full sentences. Mirrored in Code.gs.
const whatSentence = (what?: string) => {
  const w = clause(what);
  if (!w) return "";
  return /^(we|i|our)\b/i.test(w) ? `${capital(w)}.` : `We provide ${softLower(w)}.`;
};
const customerSentence = (customers?: string) => {
  const c = clause(customers);
  if (!c) return "";
  return /^(our|we)\b/i.test(c) ? `${capital(c)}.` : `Our customers are ${softLower(c)}.`;
};
const toneSentence = (tone: string) => `Use a ${tone} tone and British English.`;

export const context = (about: About) =>
  [
    about.name?.trim() ? `I run ${about.name.trim()}.` : "I run a small business.",
    whatSentence(about.what),
    customerSentence(about.customers),
    toneSentence(about.tone),
    websiteLine(about),
    sentence(about.notes),
  ]
    .filter(Boolean)
    .join(" ");

export const textFor = (row: Row, about: About, fit?: Fit) => {
  if (row.template) return about.name ? row.template.split("[Business name]").join(about.name) : row.template;
  const tools = clause(fit?.tools);
  const add = tools ? `For this task I currently use ${tools}. Suggest options that work with these tools first.` : "";
  return `${context(about)}${add ? " " + add : ""}\n\n${row.prompt}`;
};


export const houseText = (about: About) =>
  [
    `I run ${about.name?.trim() || "[business name]"}.`,
    whatSentence(about.what) || "We provide [what your business does].",
    customerSentence(about.customers) || "Our customers are [who your customers are].",
    `Use a ${about.tone} tone and British English, with British spelling.`,
    websiteLine(about),
    sentence(about.notes) || "Avoid these words and phrases: [words to avoid].",
    "Keep the language clear and specific. Do not invent facts, figures or quotes. If you need information you do not have, ask me.",
  ]
    .filter(Boolean)
    .join("\n");

export type Blank = { token: string; label: string; long: boolean };

// Template blanks worth filling once. Others, such as [name] or [amount], change every time, so they stay.
const TEMPLATE_BLANKS = ["[Your name]", "[booking link]", "[review link]", "[payment details]", "[email address]"];
// Sentences that tell the AI how to use brackets are instructions, not blanks to fill.
const INSTRUCTION = /square brackets|placeholders|mark anything|leave every/i;

/** The [square bracket] blanks a visitor can fill in on the page, in order and without repeats. */
export const blanksFor = (text: string, isTemplate: boolean): Blank[] => {
  const seen = new Set<string>();
  const out: Blank[] = [];
  for (const sentence of text.split(/(?<=[.!?])\s+(?![^[]*\])|\n+/)) {
    if (INSTRUCTION.test(sentence)) continue;
    for (const token of sentence.match(/\[[^\]]+\]/g) || []) {
      if (seen.has(token) || token === "[Business name]") continue;
      if (isTemplate && !TEMPLATE_BLANKS.includes(token)) continue;
      seen.add(token);
      const inner = token.slice(1, -1);
      out.push({ token, label: inner.charAt(0).toUpperCase() + inner.slice(1), long: /^paste/i.test(inner) });
    }
  }
  return out;
};

/** Puts the visitor's answers into the text wherever the matching blank appears. */
export const fillBlanks = (text: string, values: Record<string, string>) =>
  Object.entries(values).reduce((t, [token, v]) => (v.trim() ? t.split(token).join(v.trim()) : t), text);

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
