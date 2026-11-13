import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronDown, Copy, Loader2 } from "lucide-react";
import { m } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { DISCOVERY_CALL_URL, fadeUp, fadeUpDelayed } from "@/lib/motion";
import {
  TIME_AUDIT,
  TIME_AUDIT_PATH,
  TONES,
  buildRows,
  firstMove,
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
const labelClass = "mb-1.5 block text-sm font-semibold text-brand-navy";
const stepLabel = "text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal";

const errorMessages: Record<string, string> = {
  details: "Please add your first name.",
  email: "Please enter a valid email address.",
  tasks: "Please tick at least one task first.",
  too_many: "This email has been used several times recently. Please try again in a few hours.",
  busy: "We have reached today's limit for emailed plans. Please try again tomorrow.",
  not_configured: "Emailing your plan isn't switched on yet. Please keep a copy of this page for now.",
  server: "Something went wrong on our side. Please try again.",
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
      "You tick the tasks that take up most of your time and roughly how long each takes. You get a rough monthly total and an action plan: one clear place to start, plus two more, each with simple steps and a prompt or template you can use straight away.",
  },
  {
    question: "Is the hours figure a saving?",
    answer:
      "No. It is a rough estimate of the time those tasks take you now, worked out from the ranges you choose. Nobody can promise how much time a change will save, which is why the plan asks you to time the task before and after.",
  },
  {
    question: "Which AI tool do the prompts work with?",
    answer:
      "Any AI assistant, such as ChatGPT, Claude, Gemini or Copilot. Remove personal and client details before pasting anything in, and check every result before you use it.",
  },
  {
    question: "Do I need to give my email?",
    answer:
      "No. Your action plan appears on screen straight away. Add your email only if you want the full plan for every task you ticked, plus a simple sheet to record your time before and after.",
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

const CopyBox = ({ heading, text, label }: { heading: string; text: string; label: string }) => (
  <div data-copy-box className="overflow-hidden rounded-xl border border-brand-sand bg-white">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-sand px-4 py-2.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-slate">{heading}</span>
      <CopyButton getText={() => text} label={label} />
    </div>
    <p data-copy-text className="whitespace-pre-wrap px-4 py-3 text-[14.5px] leading-relaxed text-brand-navy">
      {text}
    </p>
  </div>
);

const TimeAudit = () => {
  const [pickerOpen, setPickerOpen] = useState(true);
  const [areas, setAreas] = useState<string[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [about, setAbout] = useState<About>({ name: "", what: "", tone: TONES[1].value });
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
  const total = rows.reduce((s, r) => s + r.hours, 0);
  const missing = rows.filter((r) => !r.hours).length;
  const leadFit = lead ? fit[lead.key] || {} : {};

  // The first fix opens with its steps showing.
  useEffect(() => {
    if (lead && openKeys[lead.key] === undefined) setOpenKeys((o) => ({ ...o, [lead.key]: true }));
  }, [lead, openKeys]);

  const toggleArea = (key: string) =>
    setAreas((a) => (a.includes(key) ? a.filter((k) => k !== key) : [...a, key]));

  const toggleTask = (key: string) =>
    setSelected((s) => {
      const next = { ...s };
      if (key in next) delete next[key];
      else next[key] = "";
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

  const handleSend = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
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
        tips: form.get("tips") === "on",
        company_website: form.get("company_website"),
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
    }
  };

  const pageUrl = `https://integroai.tech${TIME_AUDIT_PATH}`;
  const title = "Free AI Time Audit for Small Businesses | IntegroAI Consulting";
  const description =
    "A free AI time audit for small businesses. Choose the tasks that take up your week and get a practical action plan with simple steps and AI prompts to help you save time. No sign-up needed.";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };

  const careLine = (row: Row) =>
    row.r === "high" ? (
      <p className="rounded-lg bg-brand-chip px-3 py-2 text-[14px] font-medium text-brand-navy">
        Keep a person in charge here. Always check before anything goes out.
      </p>
    ) : null;

  const fixDetail = (row: Row, isLead: boolean) => {
    const open = !!openKeys[row.key];
    const rowFit = isLead ? leadFit : undefined;
    const gn = D.getNeed[row.key];
    return (
      <>
        <p className="text-[15px] text-brand-navy">{saidLine(row)}</p>
        <p className="text-[16.5px] font-semibold leading-snug text-brand-navy">{row.fix}</p>
        {gn && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[["What you'll get", gn[0]], ["What you'll need", gn[1]]].map(([k, v]) => (
              <div key={k} className="min-w-0 rounded-lg border border-brand-sand bg-white px-3 py-2">
                <span className="block text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand-slate">{k}</span>
                <span className="text-[14.5px] text-brand-navy">{v}</span>
              </div>
            ))}
          </div>
        )}
        {isLead && (
          <div className="flex flex-col gap-2 rounded-xl border border-brand-sand bg-white p-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-slate">Make this fit your business</span>
            <div className="flex flex-wrap gap-2">
              {(["tool", "hard"] as const).map((kind) => {
                const options = kind === "tool" ? D.fitTool : D.fitHard;
                return (
                  <select
                    key={kind}
                    aria-label={options[""]}
                    value={rowFit?.[kind] || ""}
                    onChange={(e) => setFit((f) => ({ ...f, [row.key]: { ...f[row.key], [kind]: e.target.value } }))}
                    className={`${selectClass} min-w-0 flex-1 basis-[220px]`}
                  >
                    {Object.entries(options).map(([v, l]) => (
                      <option key={v} value={v} disabled={v === ""}>{l}</option>
                    ))}
                  </select>
                );
              })}
            </div>
            {firstMove(rowFit) && (
              <p className="rounded-r-lg border-l-[3px] border-brand-amber bg-brand-chip/60 px-3 py-2 text-[14.5px] text-brand-navy">
                <strong>Your first move:</strong> {firstMove(rowFit)}
              </p>
            )}
          </div>
        )}
        {isLead && (
          <>
            <p className="text-[14.5px] leading-relaxed text-brand-slate"><strong className="text-brand-navy">Why this one:</strong> {whyThisOne(row, rows)}</p>
            <p className="text-[14.5px] leading-relaxed text-brand-slate">
              <strong className="text-brand-navy">How to tell it helped:</strong> note how long this task takes this week. Try the fix for two weeks, then compare. Change one thing at a time, so you know what made the difference.
            </p>
          </>
        )}
        {D.watch[row.key] && (
          <p className="rounded-r-lg border-l-[3px] border-brand-teal bg-white px-3 py-2 text-[14.5px] text-brand-navy">
            <strong>Watch out:</strong> {D.watch[row.key]}
          </p>
        )}
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpenKeys((o) => ({ ...o, [row.key]: !open }))}
          className="w-fit rounded-lg border border-brand-teal px-3.5 py-1.5 text-[14px] font-semibold text-brand-teal hover:bg-brand-teal hover:text-white"
        >
          {open ? "Hide steps" : "Show me how"}
        </button>
        {open && (
          <div className="flex flex-col gap-3">
            <ol className="list-decimal space-y-1 pl-5 text-[15px] leading-relaxed text-brand-navy">
              {stepsFor(row, rowFit).map((s) => <li key={s}>{s}</li>)}
            </ol>
            {careLine(row)}
            <CopyBox
              heading={row.template ? "Ready-to-use template" : "Copy into your AI assistant"}
              label={row.template ? "Copy template" : "Copy prompt"}
              text={textFor(row, about, rowFit)}
            />
          </div>
        )}
      </>
    );
  };

  const callLead = lead
    ? leadFit.hard
      ? `Stuck on ${lowerFirst(D.fitHard[leadFit.hard])}? We can set up ${lowerFirst(lead.t)} with you, so it works without you chasing it.`
      : `Want help setting up ${lowerFirst(lead.t)} properly?`
    : "";

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
              Choose the tasks that take up your week. Get a practical action plan with simple steps and AI prompts to help you get started.
            </p>
          </m.div>
        </section>

        <section className="bg-brand-ivory py-14 sm:py-16">
          <div className="wrap"><div className="flex max-w-[860px] flex-col gap-10">
            {/* Step 1 */}
            <m.div {...fadeUp} className="flex flex-col gap-3">
              <p className={stepLabel}>Step 1 of 3</p>
              <h2 className="text-[24px] font-semibold leading-tight text-brand-navy sm:text-[28px]">Where would you most like AI to save you time?</h2>
              <div className="max-w-[520px]">
                <button
                  type="button"
                  aria-expanded={pickerOpen}
                  aria-controls="ta-areas"
                  onClick={() => setPickerOpen((o) => !o)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border-2 border-brand-amber bg-brand-chip px-4 py-3 text-left text-[16px] font-semibold text-brand-navy shadow-[0_2px_0_#FF9900] transition-colors hover:bg-brand-amber"
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
            <m.div {...fadeUpDelayed(1)} className="flex flex-col gap-3">
              <p className={stepLabel}>Step 2 of 3</p>
              <h2 className="text-[24px] font-semibold leading-tight text-brand-navy sm:text-[28px]">Tick the tasks that take up most of your time</h2>
              <p className="text-[15px] leading-relaxed text-brand-slate">
                Start with the three tasks that take up most of your time. You can add more. Count your own time only, and don't count the same time under two tasks.
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
                            aria-label={`Time spent per week on ${task.t}`}
                            value={selected[key]}
                            onChange={(e) => setSelected((s) => ({ ...s, [key]: e.target.value }))}
                            className={selectClass}
                          >
                            <option value="" disabled>Time spent per week</option>
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
              <h2 className="text-[24px] font-semibold leading-tight text-brand-navy sm:text-[28px]">So your prompts sound like you</h2>
              <div className="grid grid-cols-1 gap-4 rounded-2xl border border-brand-sand bg-white p-5 sm:grid-cols-[1fr_1.4fr_1fr]">
                <div className="min-w-0">
                  <label htmlFor="ta-name" className={labelClass}>Business name</label>
                  <input id="ta-name" maxLength={120} value={about.name} onChange={(e) => setAbout({ ...about, name: e.target.value })} placeholder="e.g. Bright Path Events" autoComplete="organization" className={inputClass} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="ta-what" className={labelClass}>What you do, in one line</label>
                  <input id="ta-what" maxLength={160} value={about.what} onChange={(e) => setAbout({ ...about, what: e.target.value })} placeholder="e.g. corporate event planning" className={inputClass} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="ta-tone" className={labelClass}>Your tone</label>
                  <select id="ta-tone" value={about.tone} onChange={(e) => setAbout({ ...about, tone: e.target.value })} className={`${inputClass} py-[13px]`}>
                    {TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
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
                  {others.length ? `Start here, then ${others.length === 1 ? "one more" : "two more"}` : "Start here"}
                </h2>
                {total > 0 ? (
                  <p className="text-[16.5px] text-brand-navy">
                    The tasks you ticked take up about <strong className="font-heading text-[26px]">{fmtHours(total)}</strong> hours a month of your own time today.
                  </p>
                ) : (
                  <p className="text-[15px] text-brand-slate">Add a time range to your tasks to see how much of your month they take up.</p>
                )}
                {missing > 0 && total > 0 && (
                  <p className="text-[14px] text-brand-slate">
                    {missing} task{missing > 1 ? "s have" : " has"} no time range yet, so {missing > 1 ? "they are" : "it is"} not counted.
                  </p>
                )}
                <details className="text-[14px] text-brand-slate">
                  <summary className="cursor-pointer font-semibold text-brand-teal">How we worked this out</summary>
                  <p className="mt-1.5 leading-relaxed">
                    This is time spent now, not a promised saving. Each range counts as one figure a week: under 1 hour as 30 minutes, 1 to 3 hours as 2, 3 to 5 hours as 4, 5 to 10 hours as 7.5, and over 10 hours as 12. A month is taken as 4.33 weeks. Treat it as a rough guide.
                  </p>
                </details>
                <p className="text-[14.5px] font-medium text-brand-teal">Nothing here sends, posts or changes anything. You stay in control.</p>
              </div>

              <m.div {...fadeUp} className="flex flex-col gap-3 rounded-2xl bg-brand-ivory p-5 sm:p-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal">Start here</span>
                <h3 className="text-[21px] font-semibold leading-snug text-brand-navy">{lead.t}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-brand-sand bg-white px-2.5 py-0.5 text-[12.5px] text-brand-navy">{D.areas[lead.area].short}</span>
                  {lead.hours > 0 && <span className="text-[14px] font-semibold text-brand-teal">about {fmtHours(lead.hours)} hrs a month now</span>}
                </div>
                {fixDetail(lead, true)}
              </m.div>

              {others.length > 0 && (
                <div className="flex flex-col">
                  <h3 className="mb-1 text-[19px] font-semibold text-brand-navy">{others.length === 1 ? "One more" : "Two more"} worth doing</h3>
                  {others.map((row, index) => (
                    <m.div key={row.key} {...fadeUpDelayed(index)} className="flex flex-col gap-2.5 border-t border-brand-sand py-5">
                      <h4 className="text-[17.5px] font-semibold leading-snug text-brand-navy">{row.t}</h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-brand-sand bg-brand-ivory px-2.5 py-0.5 text-[12.5px] text-brand-navy">{D.areas[row.area].short}</span>
                        {row.hours > 0 && <span className="text-[14px] font-semibold text-brand-teal">about {fmtHours(row.hours)} hrs a month now</span>}
                      </div>
                      {fixDetail(row, false)}
                    </m.div>
                  ))}
                </div>
              )}

              <m.div {...fadeUp} className="flex flex-col gap-2 border-t border-brand-sand pt-6">
                <h3 className="text-[19px] font-semibold text-brand-navy">Your house prompt</h3>
                <p className="text-[14.5px] text-brand-slate">Paste this at the start of any AI chat, so the answers sound like your business. Fill in the parts in brackets once and keep it.</p>
                <CopyBox heading="Use it every time" label="Copy house prompt" text={houseText(about)} />
              </m.div>

              <m.div {...fadeUp} className="flex flex-col gap-3 rounded-2xl border border-brand-sand bg-brand-ivory p-5 sm:p-6">
                <h3 className="text-[21px] font-semibold text-brand-navy">Get the full action plan for every task you ticked</h3>
                <p className="text-[14.5px] text-brand-slate">
                  Your plan keeps your first fix at the top, then the steps and prompts for the rest of the {rows.length} task{rows.length > 1 ? "s" : ""} you ticked, plus a simple sheet to record your time before and after.
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
                    <label className="flex items-start gap-2.5 text-sm leading-snug text-brand-slate">
                      <input type="checkbox" name="tips" className="mt-0.5 h-4 w-4 flex-none accent-brand-teal" />
                      <span>Send me occasional practical AI tips. Optional.</span>
                    </label>
                    <button type="submit" disabled={sending} className="btn-amber btn-focus group w-fit disabled:opacity-70">
                      {sending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Sending your plan
                        </>
                      ) : (
                        <>
                          Email me my full action plan
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

              <p className="text-[16px] leading-relaxed text-brand-navy">
                {callLead}{" "}
                <a
                  href={DISCOVERY_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTimeAudit("time_audit_call_click")}
                  className="font-semibold underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-teal"
                >
                  Book your AI Readiness Discovery Call
                </a>
              </p>
              <p className="text-[13.5px] text-brand-slate">This is a self-check, not advice. Remove personal and client details before pasting anything into an AI tool.</p>
            </div></div>
          </section>
        )}

        <section className="bg-white py-14 sm:py-16">
          <div className="wrap flex flex-col gap-8">
            <m.h2 {...fadeUp} className="text-[30px] font-semibold leading-tight text-brand-navy sm:text-[36px]">AI time audit questions</m.h2>
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
