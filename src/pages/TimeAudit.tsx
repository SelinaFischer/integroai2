import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Copy, Info, ListChecks, Loader2 } from "lucide-react";
import { m } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { DISCOVERY_CALL_URL, fadeUp, fadeUpDelayed } from "@/lib/motion";
import {
  TIME_AUDIT,
  TIME_AUDIT_PATH,
  TURNSTILE_SITE_KEY,
  TONES,
  buildRows,
  fmtHours,
  houseText,
  lowerFirst,
  rankRows,
  saidLine,
  sendTimeAudit,
  stepsFor,
  textFor,
  trackTimeAudit,
  whyThisOne,
  type About,
  type Fit,
  type Row,
} from "@/lib/timeAudit";

const D = TIME_AUDIT;
const AREA_KEYS = Object.keys(D.areas);
const BAND_KEYS = Object.keys(D.bands).filter((k) => k !== "");

const inputClass =
  "w-full rounded-xl border border-brand-sand bg-white px-4 py-3 text-[16px] text-brand-navy outline-none transition-colors focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";
const selectClass =
  "rounded-lg border border-brand-sand bg-white px-3 py-2 text-[15px] text-brand-navy outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";
// An empty time box stands out in amber so it isn't missed after ticking a task.
const selectEmptyClass =
  "rounded-lg border-2 border-brand-amber bg-brand-chip px-3 py-2 text-[15px] font-semibold text-brand-navy shadow-[0_0_0_4px_rgba(255,153,0,0.18)] outline-none focus:ring-2 focus:ring-brand-amber/40";
const labelClass = "mb-1.5 block text-sm font-semibold text-brand-navy";
const stepLabel = "text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal";

const errorMessages: Record<string, string> = {
  details: "Please add your first name.",
  email: "Please enter a valid email address.",
  tasks: "Please tick at least one task first.",
  too_many: "This email address has reached today's limit for emailed plans. Please try again tomorrow.",
  bot: "We couldn't confirm you're a person. Please refresh the page and try again.",
  checking: "Just a moment while we check you're a person, then try again.",
  busy: "We have reached today's limit for emailed plans. Please try again tomorrow.",
  not_configured: "Emailing your plan isn't switched on yet. Please keep a copy of this page for now.",
  server: "Something went wrong on our side. Please try again.",
};
type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
};
let turnstileLoading: Promise<TurnstileApi | undefined> | null = null;
// Loads Cloudflare's script once, only when the email form appears.
const loadTurnstile = () => {
  if (!turnstileLoading) {
    turnstileLoading = new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = () => resolve((window as unknown as { turnstile?: TurnstileApi }).turnstile);
      s.onerror = () => resolve(undefined);
      document.head.appendChild(s);
    });
  }
  return turnstileLoading;
};
const fallbackError = "We couldn't send your plan. Please try again in a moment.";

const faqs = [
  {
    question: "What is a time audit for a small business?",
    answer:
      "A time audit shows where your working week goes, task by task, so you can see which jobs take the most time and fix those first. This free AI time audit adds a practical action plan: simple steps, plus AI prompts or templates you can use straight away.",
  },
  {
    question: "How can AI save time in a small business?",
    answer:
      "AI can draft routine emails, proposals and social posts, summarise meeting notes and answer questions from your spreadsheets. It works best on repeated tasks with a person checking every result. Some fixes need no AI at all, such as templates, booking links or features in software you already pay for.",
  },
  {
    question: "What does the time audit do?",
    answer:
      "You select the tasks that take up most of your time and roughly how long each takes. You receive an estimated monthly total and an action plan: a recommended starting point and up to two further recommendations, each with practical steps and a prompt or template you can use straight away.",
  },
  {
    question: "Does the total show how much time I could save?",
    answer:
      "No. The total estimates how much time you currently spend on the selected tasks. To measure any savings, compare the time spent before and after implementing a recommendation.",
  },
  {
    question: "Which AI tool do the prompts work with?",
    answer:
      "Any AI assistant, such as ChatGPT, Claude, Gemini or Copilot. Remove personal and client details before pasting anything in, and check every result before you use it.",
  },
  {
    question: "Do I need to provide my email address?",
    answer:
      "No. You can view up to three recommendations immediately without providing your email address. Enter your email if you would like the complete plan covering all your selected tasks.",
  },
];

const CopyButton = ({ getText, label }: { getText: () => string; label: string }) => {
  const [state, setState] = useState(label);
  const ref = useRef<HTMLButtonElement>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setState("Copied");
    } catch {
      const text = ref.current?.closest("[data-copy-box]")?.querySelector("[data-copy-text]");
      if (text) {
        const range = document.createRange();
        range.selectNodeContents(text);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setState("Selected, press copy");
    }
    window.setTimeout(() => setState(label), 2000);
  };
  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy px-3 py-1.5 text-[13px] font-semibold text-white hover:bg-brand-ink"
    >
      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      {state}
    </button>
  );
};

const CopyBox = ({ heading, text, label, hint }: { heading: string; text: string; label: string; hint?: string }) => (
  <div data-copy-box className="overflow-hidden rounded-xl border border-brand-sand bg-white">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-sand px-4 py-2.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-slate">{heading}</span>
      <CopyButton getText={() => text} label={label} />
    </div>
    {hint && <p className="border-b border-brand-sand bg-brand-ivory px-4 py-2 text-[13.5px] text-brand-navy">{hint}</p>}
    <p data-copy-text className="whitespace-pre-wrap px-4 py-3 text-[14.5px] leading-relaxed text-brand-navy">
      {text}
    </p>
  </div>
);

const TimeAudit = () => {
  const [pickerOpen, setPickerOpen] = useState(true);
  const [areas, setAreas] = useState<string[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [about, setAbout] = useState<About>({ name: "", what: "", tone: TONES[0].value, website: "", customers: "", notes: "" });
  const [fit, setFit] = useState<Record<string, Fit>>({});
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});
  const [shown, setShown] = useState(false);
  const [formMsg, setFormMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const rows = useMemo(
    () => buildRows(Object.fromEntries(Object.entries(selected).filter(([key]) => areas.includes(key.split("-")[0])))),
    [selected, areas],
  );
  const ranked = useMemo(() => rankRows(rows), [rows]);
  const lead = ranked[0];
  const others = ranked.slice(1, 3);
  const planRows = ranked.slice(0, 3);
  const total = rows.reduce((s, r) => s + r.hours, 0);
  const missing = rows.filter((r) => !r.hours).length;
  const leadFit = lead ? fit[lead.key] || {} : {};

  const toggleArea = (key: string) =>
    setAreas((a) => (a.includes(key) ? a.filter((k) => k !== key) : [...a, key]));

  // The task just ticked, so its time box can take focus.
  const justTicked = useRef("");
  const toggleTask = (key: string) =>
    setSelected((s) => {
      const next = { ...s };
      if (key in next) delete next[key];
      else { next[key] = ""; justTicked.current = key; }
      return next;
    });

  const showPlan = () => {
    if (!rows.length) {
      setFormMsg("Tick at least one task in step 2 so we can build your action plan.");
      return;
    }
    setFormMsg("");
    setShown(true);
    trackTimeAudit("time_audit_plan");
    window.setTimeout(() => document.getElementById("your-plan")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  // Bot protection: when the page loaded, and the Cloudflare Turnstile check.
  const pageLoadedAt = useRef(Date.now());
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const turnstileId = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const resetTurnstile = () => {
    setTurnstileToken("");
    const ts = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
    if (ts && turnstileId.current) ts.reset(turnstileId.current);
  };
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !shown || sentTo) return;
    let cancelled = false;
    loadTurnstile().then((ts) => {
      if (cancelled || !ts || !turnstileRef.current || turnstileId.current) return;
      turnstileId.current = ts.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: "interaction-only",
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [shown, sentTo]);

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setSendError(errorMessages.checking);
      return;
    }
    setSending(true);
    setSendError("");
    trackTimeAudit("time_audit_email_submit");
    try {
      const result = await sendTimeAudit({
        name: form.get("firstName"),
        email,
        business: about.name,
        what: about.what,
        tone: about.tone,
        website: about.website,
        customers: about.customers,
        notes: about.notes,
        tips: form.get("tips") === "on",
        company_website: form.get("company_website"),
        elapsed: Date.now() - pageLoadedAt.current,
        turnstile: turnstileToken,
        selections: rows.map((r) => ({ key: r.key, band: r.band })),
        fit: lead ? { key: lead.key, ...leadFit } : {},
      });
      if (result.ok) {
        setSentTo(email);
        trackTimeAudit("time_audit_email_sent");
      } else {
        setSendError(errorMessages[result.error || ""] || fallbackError);
      }
    } catch {
      setSendError(fallbackError);
    } finally {
      setSending(false);
      resetTurnstile(); // each token works once
    }
  };

  const pageUrl = `https://integroai.tech${TIME_AUDIT_PATH}`;
  const title = "Free AI Time Audit for Small Businesses | IntegroAI Consulting";
  const description =
    "A free AI time audit for small businesses. Choose the tasks that take up your working week and get a practical action plan with simple steps and AI prompts to help you save time. No sign-up needed.";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };

  const careLine = (row: Row) =>
    row.r === "high" ? (
      <p className="rounded-lg bg-brand-chip px-3 py-2 text-[14px] font-medium text-brand-navy">
        A person should stay in charge here. Check every result before anything is sent.
      </p>
    ) : null;

  const fixDetail = (row: Row, isLead: boolean) => {
    // The lead task always shows its next steps; the others open on request.
    const open = isLead || !!openKeys[row.key];
    const rowFit = isLead ? leadFit : undefined;
    const gn = D.getNeed[row.key];
    const info = (label: string, text: string) => (
      <p className="text-[14.5px] leading-relaxed text-brand-slate">
        <span className="font-semibold text-brand-navy">{label}:</span> {text}
      </p>
    );
    return (
      <>
        {/* Information: what this is and why. Read only, deliberately quiet. */}
        <p className="text-[16.5px] font-semibold leading-snug text-brand-navy">{row.fix}</p>
        <div className="flex flex-col gap-1.5">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-slate">
            <Info className="h-3.5 w-3.5" aria-hidden="true" /> About this recommendation
          </p>
          <p className="text-[14.5px] leading-relaxed text-brand-slate">{saidLine(row)}</p>
          {gn && info("What you'll get", gn[0])}
          {gn && info("What you'll need", gn[1])}
          {isLead && info("Why start here", whyThisOne(row, rows))}
          {isLead &&
            info(
              "How to measure the improvement",
              "record how long this task takes now. After using the new approach for two weeks, compare the time spent. Change one thing at a time so you can see what made the difference.",
            )}
        </div>

        {/* Actions: what the visitor does next. */}
        {!isLead && !open && (
          <button
            type="button"
            aria-expanded={false}
            onClick={() => setOpenKeys((o) => ({ ...o, [row.key]: true }))}
            className="inline-flex w-fit items-center gap-2 rounded-lg border-2 border-brand-amber bg-white px-3.5 py-1.5 text-[14px] font-semibold text-brand-navy hover:bg-brand-chip"
          >
            <ListChecks className="h-4 w-4" aria-hidden="true" /> View next steps
          </button>
        )}
        {open && (
          <div className="flex flex-col gap-3 rounded-xl border border-brand-sand border-l-4 border-l-brand-amber bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-[15px] font-bold text-brand-navy">
                <ListChecks className="h-5 w-5 text-brand-amber" aria-hidden="true" /> Your next steps
              </p>
              {!isLead && (
                <button
                  type="button"
                  aria-expanded={true}
                  onClick={() => setOpenKeys((o) => ({ ...o, [row.key]: false }))}
                  className="text-[13.5px] font-semibold text-brand-teal underline underline-offset-4"
                >
                  Hide steps
                </button>
              )}
            </div>
            {D.watch[row.key] && (
              <p className="rounded-lg bg-brand-chip/60 px-3 py-2 text-[14px] text-brand-navy">
                <strong>Before you begin:</strong> {D.watch[row.key]}
              </p>
            )}
            {isLead && !row.template && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="ta-tools" className="text-[14px] font-semibold text-brand-navy">
                  Which tools do you use for this task? <span className="font-normal text-brand-slate">(optional)</span>
                </label>
                <input
                  id="ta-tools"
                  maxLength={120}
                  value={rowFit?.tools || ""}
                  onChange={(e) => setFit((f) => ({ ...f, [row.key]: { tools: e.target.value } }))}
                  placeholder="e.g. Microsoft Teams, Outlook, Google Sheets"
                  className={inputClass}
                />
                <p className="text-[13px] text-brand-slate">We add these to your prompt so the suggestions fit the tools you already use.</p>
              </div>
            )}
            <ol className="list-decimal space-y-1 pl-5 text-[15px] leading-relaxed text-brand-navy marker:font-semibold">
              {stepsFor(row).map((s) => <li key={s}>{s}</li>)}
            </ol>
            {careLine(row)}
            <CopyBox
              heading={row.template ? "Ready-to-use template" : "Prompt for your AI assistant"}
              label={row.template ? "Copy template" : "Copy prompt"}
              hint={
                row.template
                  ? "Copy this template, replace anything in [square brackets] with your details, then send it."
                  : "Copy this prompt into your AI assistant, such as ChatGPT, Microsoft Copilot or Gemini. Replace anything in [square brackets] with your own details."
              }
              text={textFor(row, about, rowFit)}
            />
          </div>
        )}
      </>
    );
  };


  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main id="main-content">
        <section className="bg-midnight-glow pt-[104px] pb-14 sm:pt-[132px] sm:pb-16 lg:pt-[150px] lg:pb-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="wrap flex flex-col items-start gap-6"
          >
            <h1 className="font-sans text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-brand-amber sm:text-xs [text-wrap:wrap]">
              Free AI time audit for small businesses
            </h1>
            <p className="text-[38px] font-semibold leading-[1.08] text-white sm:text-[48px] lg:text-[54px] font-heading tracking-[-0.005em] [text-wrap:balance]">
              <span className="block">Find out where your business</span>
              <span className="block italic text-brand-amber">could save time.</span>
            </p>
            <p className="max-w-[620px] text-[17px] leading-normal text-brand-mist sm:text-[19px]">
              Choose the tasks that take up your working week. Get a practical action plan with simple steps and AI prompts to help you get started.
            </p>
          </m.div>
        </section>

        <section className="bg-brand-ivory py-14 sm:py-16">
          <div className="wrap"><div className="flex max-w-[860px] flex-col gap-10">
            {/* How it works */}
            <m.div {...fadeUp} className="flex flex-col gap-4">
              <p className={stepLabel}>How it works</p>
              <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ["Choose your tasks", "Select the tasks that take up your week and estimate the time you spend on each."],
                  ["Get your action plan", "See where to start, with practical steps and ready-made prompts tailored to your business."],
                  ["Use the prompts in your AI assistant", "Copy each prompt into the AI tool you already use, such as ChatGPT, Microsoft Copilot or Gemini, then review the result."],
                ].map(([title, body], i) => (
                  <li key={title} className="flex min-w-0 flex-col gap-1.5 rounded-xl border border-brand-sand bg-white p-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy text-[13px] font-bold text-white">{i + 1}</span>
                    <span className="text-[16px] font-semibold leading-snug text-brand-navy">{title}</span>
                    <span className="text-[14.5px] leading-relaxed text-brand-slate">{body}</span>
                  </li>
                ))}
              </ol>
              <p className="text-[14px] text-brand-slate">This tool prepares your plan and prompts. It does not connect to your AI assistant or make any changes for you.</p>
            </m.div>

            {/* Step 1 */}
            <m.div {...fadeUp} className="flex flex-col gap-3">
              <p className={stepLabel}>Step 1 of 3</p>
              <h2 className="text-[24px] font-semibold leading-tight text-brand-navy sm:text-[28px]">Where would you most like AI to save you time?</h2>
              <div>
                <button
                  type="button"
                  aria-expanded={pickerOpen}
                  aria-controls="ta-areas"
                  onClick={() => setPickerOpen((o) => !o)}
                  className="flex w-full max-w-[520px] items-center justify-between gap-3 rounded-xl border-2 border-brand-amber bg-brand-chip px-4 py-3 text-left text-[16px] font-semibold text-brand-navy shadow-[0_2px_0_#FF9900] transition-colors hover:bg-brand-amber"
                >
                  <span>{areas.length ? `${areas.length} area${areas.length > 1 ? "s" : ""} chosen` : "Choose one or more areas"}</span>
                  <ChevronDown className={`h-5 w-5 flex-none transition-transform ${pickerOpen ? "rotate-180" : ""}`} strokeWidth={2.6} aria-hidden="true" />
                </button>
                {pickerOpen && (
                  <div id="ta-areas" className="mt-2 flex flex-col rounded-xl border border-brand-sand bg-white p-1.5">
                    <div className="flex justify-end border-b border-brand-sand px-2.5 pb-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setAreas(areas.length ? [] : AREA_KEYS)}
                        className="text-[14px] font-semibold text-brand-teal underline underline-offset-4"
                      >
                        {areas.length ? "Clear all" : "Select all"}
                      </button>
                    </div>
                    {AREA_KEYS.map((key) => (
                      <label key={key} className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5 text-[15.5px] text-brand-navy hover:bg-brand-ivory">
                        <input type="checkbox" checked={areas.includes(key)} onChange={() => toggleArea(key)} className="h-[18px] w-[18px] flex-none accent-brand-teal" />
                        {D.areas[key].name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </m.div>

            {/* Step 2 */}
            <m.div {...fadeUpDelayed(1)} id="ta-step2" className="flex scroll-mt-24 flex-col gap-3">
              <p className={stepLabel}>Step 2 of 3</p>
              <h2 className="text-[24px] font-semibold leading-tight text-brand-navy sm:text-[28px]">Tick the tasks that take up most of your time</h2>
              <p className="text-[15px] leading-relaxed text-brand-slate">
                Select your three most time-consuming tasks. You can add more if needed. For each task, estimate the time you personally spend each week. If tasks overlap, count that time only once.
              </p>
              {!areas.length && <p className="text-[15px] text-brand-slate">Choose an area above to see its tasks.</p>}
              {AREA_KEYS.filter((k) => areas.includes(k)).map((areaKey) => (
                <div key={areaKey} className="rounded-2xl border border-brand-sand bg-white px-5 py-4">
                  <h3 className="mb-1 text-[17px] font-semibold text-brand-navy">{D.areas[areaKey].name}</h3>
                  {D.areas[areaKey].tasks.map((task, i) => {
                    const key = `${areaKey}-${i}`;
                    const ticked = key in selected;
                    return (
                      <div key={key} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-brand-sand py-2.5 first-of-type:border-t-0">
                        <label className="flex min-w-0 flex-1 basis-[260px] cursor-pointer items-center gap-3 text-[15.5px] text-brand-navy">
                          <input type="checkbox" checked={ticked} onChange={() => toggleTask(key)} className="h-[18px] w-[18px] flex-none accent-brand-teal" />
                          <span>{task.t}</span>
                        </label>
                        {ticked && (
                          <select
                            aria-label={`Hours per week on ${task.t}`}
                            value={selected[key]}
                            onChange={(e) => setSelected((s) => ({ ...s, [key]: e.target.value }))}
                            ref={(el) => { if (el && justTicked.current === key) { justTicked.current = ""; el.focus({ preventScroll: true }); } }}
                            className={selected[key] ? selectClass : selectEmptyClass}
                          >
                            <option value="" disabled>Select hours per week</option>
                            {BAND_KEYS.map((b) => <option key={b} value={b}>{D.bands[b].label}</option>)}
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </m.div>

            {/* Step 3 */}
            <m.div {...fadeUpDelayed(2)} className="flex flex-col gap-3">
              <p className={stepLabel}>Step 3 of 3</p>
              <h2 className="text-[24px] font-semibold leading-tight text-brand-navy sm:text-[28px]">Tailor your plan to your business</h2>
              <p className="text-[16px] text-brand-slate">Add a few details to make your prompts more relevant to your business.</p>
              <div className="grid grid-cols-1 gap-4 rounded-2xl border border-brand-sand bg-white p-5 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="ta-name" className={labelClass}>Business name</label>
                  <input id="ta-name" maxLength={120} value={about.name} onChange={(e) => setAbout({ ...about, name: e.target.value })} placeholder="e.g. Bright Path Events" autoComplete="organization" className={inputClass} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="ta-what" className={labelClass}>What does your business do?</label>
                  <input id="ta-what" maxLength={160} value={about.what} onChange={(e) => setAbout({ ...about, what: e.target.value })} placeholder="e.g. We organise weddings and corporate events." className={inputClass} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="ta-customers" className={labelClass}>Who are your customers?</label>
                  <input id="ta-customers" maxLength={160} value={about.customers} onChange={(e) => setAbout({ ...about, customers: e.target.value })} placeholder="e.g. Couples and small businesses in London." className={inputClass} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="ta-tone" className={labelClass}>Your tone of voice</label>
                  <select id="ta-tone" value={about.tone} onChange={(e) => setAbout({ ...about, tone: e.target.value })} className={`${inputClass} py-[13px]`}>
                    {TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div className="min-w-0 sm:col-span-2">
                  <label htmlFor="ta-notes" className={labelClass}>Anything else your AI should know? <span className="font-normal text-brand-slate">(optional)</span></label>
                  <textarea id="ta-notes" rows={3} maxLength={400} value={about.notes} onChange={(e) => setAbout({ ...about, notes: e.target.value })} placeholder="Add your priorities, what makes your business different or any wording to avoid." className={`${inputClass} resize-y`} />
                </div>
                <div className="min-w-0 sm:col-span-2">
                  <label htmlFor="ta-website" className={labelClass}>Website <span className="font-normal text-brand-slate">(optional)</span></label>
                  <input id="ta-website" type="url" inputMode="url" maxLength={200} value={about.website} onChange={(e) => setAbout({ ...about, website: e.target.value })} placeholder="e.g. brightpathevents.co.uk" autoComplete="url" className={inputClass} />
                  <p className="mt-1.5 text-[13px] text-brand-slate">We add it to your prompts so your AI tool can match your style.</p>
                </div>
                <div className="min-w-0 rounded-xl bg-brand-ivory px-4 py-3 text-[14px] text-brand-navy sm:col-span-2">
                  <p><strong className="font-semibold">Tip:</strong> The more context your AI has, the more relevant its answers. Attach your business overview or brand guide when you paste a prompt.</p>
                </div>
              </div>
              <button type="button" onClick={showPlan} className="btn-amber btn-focus group mt-2 w-fit">
                Get my action plan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </button>
              <div aria-live="polite">{formMsg && <p className="text-sm font-medium text-[#B4483C]">{formMsg}</p>}</div>
            </m.div>
          </div></div>
        </section>

        {shown && lead && (
          <section id="your-plan" className="scroll-mt-20 bg-white py-14 sm:py-16">
            <div className="wrap"><div className="flex max-w-[860px] flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className={stepLabel}>Your action plan</p>
                <h2 className="text-[30px] font-semibold leading-tight text-brand-navy sm:text-[38px]">
                  Your recommended starting point
                </h2>
                {total > 0 ? (
                  <p className="text-[16.5px] text-brand-navy">
                    Based on the times you entered, you spend around <strong className="font-heading text-[26px]">{fmtHours(total)}</strong> hours a month on these tasks. This is your current workload, not an estimate of time you could save.
                  </p>
                ) : (
                  <div role="alert" className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-2 border-[#E2602B] bg-[#FFF1E8] px-4 py-3 text-[15px] font-semibold text-brand-navy">
                    <span>⚠ Add your weekly times for a sharper plan. For now, we've put the quickest, lowest-risk changes first.</span>
                    <button type="button" onClick={() => document.getElementById("ta-step2")?.scrollIntoView({ behavior: "smooth" })} className="font-semibold text-[#B4483C] underline underline-offset-4">Add your times</button>
                  </div>
                )}
                {total / D.weeks > 45 && (
                  <div role="alert" className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-2 border-[#E2602B] bg-[#FFF1E8] px-4 py-3 text-[15px] font-semibold text-brand-navy">
                    <span>⚠ That is over {Math.round(total / D.weeks)} hours a week, more than most working weeks. Check you haven't counted the same time under two tasks.</span>
                    <button type="button" onClick={() => document.getElementById("ta-step2")?.scrollIntoView({ behavior: "smooth" })} className="font-semibold text-[#B4483C] underline underline-offset-4">Check your times</button>
                  </div>
                )}
                {missing > 0 && total > 0 && (
                  <div role="alert" className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border-2 border-[#E2602B] bg-[#FFF1E8] px-4 py-3 text-[15px] font-semibold text-brand-navy">
                    <span className="flex flex-col gap-1">
                      <span>⚠ How much time do you spend on the other {missing > 1 ? `${missing} tasks` : "task"}?</span>
                      <span className="font-normal">Choose a weekly time range for {missing > 1 ? "each so they" : "it so it"} can be included in your total and prioritised in your plan.</span>
                    </span>
                    <button type="button" onClick={() => document.getElementById("ta-step2")?.scrollIntoView({ behavior: "smooth" })} className="font-semibold text-[#B4483C] underline underline-offset-4">Add missing times</button>
                  </div>
                )}
              </div>

              {/* Plan at a glance: ties each recommendation to a task the visitor ticked. */}
              <div className="flex flex-col gap-3 rounded-2xl border border-brand-sand p-5 sm:p-6">
                <h3 className="text-[17px] font-semibold text-brand-navy">
                  Your plan covers {planRows.length === 1 ? "this task" : `these ${planRows.length} tasks`}
                </h3>
                <ol className="flex flex-col gap-2">
                  {planRows.map((row, i) => (
                    <li key={row.key}>
                      <a href={`#rec-${row.key}`} className="group flex items-start gap-3 text-[15.5px] text-brand-navy">
                        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-navy text-[13px] font-bold text-white">{i + 1}</span>
                        <span className="pt-0.5">
                          <span className="font-semibold underline-offset-4 group-hover:underline">{row.t}</span>
                          {i === 0 && <span className="ml-2 rounded-full bg-brand-chip px-2 py-0.5 text-[12px] font-semibold text-brand-navy">Start here</span>}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
                {ranked.length > planRows.length && (
                  <p className="text-[14px] leading-relaxed text-brand-slate">
                    <span className="font-semibold text-brand-navy">Also in your emailed plan ({ranked.length - planRows.length} more):</span>{" "}
                    {ranked.slice(planRows.length).map((r) => r.t).join("; ")}.
                  </p>
                )}
              </div>

              <m.div {...fadeUp} id={`rec-${lead.key}`} className="flex scroll-mt-28 flex-col gap-3 rounded-2xl bg-brand-ivory p-5 sm:p-6">
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy text-[12px] tracking-normal text-white">1</span>
                  Recommendation 1 · Start here
                </span>
                <h3 className="flex items-start gap-2 text-[21px] font-semibold leading-snug text-brand-navy">
                  <Check className="mt-1 h-5 w-5 flex-none text-brand-teal" strokeWidth={2.6} aria-label="Your selected task" />
                  {lead.t}
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-brand-sand bg-white px-2.5 py-0.5 text-[12.5px] text-brand-navy">{D.areas[lead.area].short}</span>
                  {lead.hours > 0 && <span className="text-[14px] font-semibold text-brand-teal">Estimated time spent: {fmtHours(lead.hours)} hours per month</span>}
                </div>
                {fixDetail(lead, true)}
              </m.div>

              {others.length > 0 && (
                <div className="flex flex-col">
                  <h3 className="mb-1 text-[19px] font-semibold text-brand-navy">{others.length === 1 ? "Another recommended improvement" : "Other recommended improvements"}</h3>
                  {others.map((row, index) => (
                    <m.div key={row.key} {...fadeUpDelayed(index)} id={`rec-${row.key}`} className="flex scroll-mt-28 flex-col gap-2.5 border-t border-brand-sand py-5">
                      <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy text-[12px] tracking-normal text-white">{index + 2}</span>
                        Recommendation {index + 2}
                      </span>
                      <h4 className="flex items-start gap-2 text-[17.5px] font-semibold leading-snug text-brand-navy">
                        <Check className="mt-0.5 h-5 w-5 flex-none text-brand-teal" strokeWidth={2.6} aria-label="Your selected task" />
                        {row.t}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-brand-sand bg-brand-ivory px-2.5 py-0.5 text-[12.5px] text-brand-navy">{D.areas[row.area].short}</span>
                        {row.hours > 0 && <span className="text-[14px] font-semibold text-brand-teal">Estimated time spent: {fmtHours(row.hours)} hours per month</span>}
                      </div>
                      {fixDetail(row, false)}
                    </m.div>
                  ))}
                </div>
              )}

              <m.div {...fadeUp} className="flex flex-col gap-2 border-t border-brand-sand pt-6">
                <h3 className="text-[19px] font-semibold text-brand-navy">Your reusable business context</h3>
                <p className="text-[14.5px] text-brand-slate">Give your AI assistant a brief introduction to your business so it can provide more relevant responses. Copy the text below, review the details and reuse it for business tasks.</p>
                <CopyBox heading="Business context" label="Copy business context" hint="Paste this at the start of a new conversation in your AI assistant, then add your request." text={houseText(about)} />
              </m.div>

              <m.div {...fadeUp} className="flex flex-col gap-3 rounded-2xl border border-brand-sand bg-brand-ivory p-5 sm:p-6">
                <h3 className="text-[21px] font-semibold text-brand-navy">{rows.length > 3 ? "Get your complete action plan" : "Email your action plan"}</h3>
                <p className="text-[14.5px] text-brand-slate">
                  {rows.length > 3
                    ? `Receive recommendations, practical steps and AI prompts for all ${rows.length} selected tasks, plus a simple tracker to compare your time before and after making changes.`
                    : "Receive your recommendations, practical steps and AI prompts by email, plus a simple tracker to compare your time before and after making changes."}
                </p>
                {sentTo ? (
                  <p className="flex items-start gap-2 text-[15.5px] font-medium text-brand-navy">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-brand-teal" strokeWidth={2.6} aria-hidden="true" />
                    Your action plan is on its way to {sentTo}.
                  </p>
                ) : (
                  <form onSubmit={handleSend} className="flex flex-col gap-3">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.4fr]">
                      <div className="min-w-0">
                        <label htmlFor="ta-first" className={labelClass}>First name</label>
                        <input id="ta-first" name="firstName" required maxLength={80} autoComplete="given-name" className={inputClass} />
                      </div>
                      <div className="min-w-0">
                        <label htmlFor="ta-email" className={labelClass}>Email</label>
                        <input id="ta-email" name="email" type="email" required maxLength={160} autoComplete="email" placeholder="you@yourbusiness.co.uk" className={inputClass} />
                      </div>
                    </div>
                    <div className="absolute left-[-9999px]" aria-hidden="true">
                      <label htmlFor="ta-company-website">Leave this empty</label>
                      <input id="ta-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
                    </div>
                    {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}
                    <label className="flex items-start gap-2.5 text-sm leading-snug text-brand-slate">
                      <input type="checkbox" name="tips" className="mt-0.5 h-4 w-4 flex-none accent-brand-teal" />
                      <span>I'd also like occasional practical AI tips from IntegroAI Consulting.</span>
                    </label>
                    <button type="submit" disabled={sending} className="btn-amber btn-focus group w-fit disabled:opacity-70">
                      {sending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Sending your plan
                        </>
                      ) : (
                        <>
                          Email my action plan
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                        </>
                      )}
                    </button>
                    <p className="text-[13px] leading-snug text-brand-slate">
                      We use your details to email your plan and keep a record of your request. See our{" "}
                      <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-brand-navy">privacy policy</Link>.
                    </p>
                    <div aria-live="polite">{sendError && <p className="text-sm font-medium text-[#B4483C]">{sendError}</p>}</div>
                  </form>
                )}
              </m.div>

              <div className="flex flex-col gap-3 rounded-2xl border border-brand-sand bg-brand-ivory p-5 sm:p-6">
                <h3 className="text-[21px] font-semibold text-brand-navy">Need help implementing your plan?</h3>
                <p className="text-[16px] leading-relaxed text-brand-navy">
                  An AI Made Simple session provides practical support to put your first recommendation into action. Choose a one-hour individual session or a 90-minute group session. No technical experience is needed.
                </p>
                <a
                  href={DISCOVERY_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTimeAudit("time_audit_call_click")}
                  className="btn-amber group w-fit"
                >
                  Book a free discovery call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                </a>
              </div>
              <p className="text-[13.5px] text-brand-slate">This plan provides general suggestions based on your answers. Remove personal, client and confidential information before pasting content into an AI tool.</p>
            </div></div>
          </section>
        )}

        <section className="bg-white py-14 sm:py-16">
          <div className="wrap flex flex-col gap-8">
            <m.h2 {...fadeUp} className="text-[30px] font-semibold leading-tight text-brand-navy sm:text-[36px]">Frequently asked questions</m.h2>
            <div className="grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.question} className="flex flex-col gap-2">
                  <h3 className="text-lg leading-snug">{faq.question}</h3>
                  <p className="text-[15.5px] leading-relaxed text-brand-slate">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default TimeAudit;
