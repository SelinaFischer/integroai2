import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { TIME_AUDIT_PATH, trackTimeAudit } from "@/lib/timeAudit";

// Example of what the audit gives you. Illustrative only, not real results.
const preview = [
  { task: "Compiling weekly or monthly reports", time: "3 to 5 hours", start: true },
  { task: "Drafting detailed replies to clients", time: "1 to 3 hours" },
  { task: "Preparing proposals and quotes", time: "1 to 3 hours" },
];

// Homepage feature for the free time audit, straight after the hero.
// A bold teal panel so it stands apart from the dark hero and the light sections below.
const TimeAuditCard = () => (
  <section aria-labelledby="time-audit-card" className="bg-white pt-10 sm:pt-14">
    {/* Almost as wide as the hero, with rounded corners so it reads as a featured tool, not part of the hero. */}
    <div className="mx-[max(16px,env(safe-area-inset-left,0px))] relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#3B767C_0%,#2B5E66_55%,#0E273A_100%)] py-10 shadow-[0_18px_40px_-18px_rgba(4,27,43,0.55)] sm:mx-6 sm:py-14 lg:mx-8">
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-amber/20 blur-3xl" />
      <m.div {...fadeUp} className="wrap">
        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="flex min-w-0 flex-col items-start gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-amber px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy">
              New · Free time audit
            </span>
            <h2 id="time-audit-card" className="display text-[30px] font-semibold leading-[1.08] !text-white sm:text-[40px] [text-wrap:balance]">
              Find out where your business could save time
            </h2>
            <p className="max-w-[520px] text-[16px] leading-relaxed text-brand-seafoam sm:text-[17px]">
              Tick the tasks that take up your week and get a practical plan showing where to start, with ready-to-use AI prompts.
            </p>
            <div className="pt-1">
              <Link
                to={TIME_AUDIT_PATH}
                onClick={() => trackTimeAudit("time_audit_home_card_click")}
                className="btn-amber btn-focus group"
              >
                <span className="sheen" aria-hidden="true" />
                Start my time audit
                <ArrowRight className="nudge-arrow h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* A glimpse of the result, so visitors see what they get. */}
          <div aria-hidden="true" className="min-w-0 rounded-2xl bg-white p-5 shadow-[10px_10px_0_#FF9900] sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal">Example plan</p>
            <p className="mt-1 text-[15px] text-brand-navy">
              You spend around <strong className="font-heading text-[24px]">35</strong> hours a month on these tasks.
            </p>
            <ol className="mt-3 flex flex-col gap-2.5">
              {preview.map((row, i) => (
                <li key={row.task} className="flex items-center gap-3 rounded-xl border border-brand-sand px-3 py-2.5">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-navy text-[12px] font-bold text-white">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-2 text-[14.5px] font-semibold text-brand-navy">
                      {row.task}
                      {row.start && <span className="rounded-full bg-brand-chip px-2 py-0.5 text-[11.5px] font-semibold">Start here</span>}
                    </span>
                    <span className="text-[12.5px] text-brand-slate">{row.time} a week</span>
                  </span>
                  <Check className="h-4 w-4 flex-none text-brand-teal" strokeWidth={3} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </m.div>
    </div>
  </section>
);

export default TimeAuditCard;
