import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { TIME_AUDIT_PATH, trackTimeAudit } from "@/lib/timeAudit";

// Homepage card for the free AI time audit, straight after the hero.
// It delivers on the hero's promise: more time for the work you love.
const TimeAuditCard = () => (
  <section aria-labelledby="time-audit-card" className="bg-white pt-10 sm:pt-12">
    <div className="wrap">
      <m.div
        {...fadeUp}
        className="flex flex-col items-start gap-5 rounded-2xl border border-brand-sand border-l-4 border-l-brand-amber bg-brand-ivory px-6 py-6 sm:px-8 md:flex-row md:items-center md:gap-8"
      >
        <span className="hidden h-12 w-12 flex-none items-center justify-center rounded-full bg-white text-brand-teal shadow-sm md:flex" aria-hidden="true">
          <Clock className="h-6 w-6" strokeWidth={2.2} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal">Free AI time audit</p>
          <h2 id="time-audit-card" className="display text-[23px] font-semibold leading-[1.15] !text-brand-navy sm:text-[27px] [text-wrap:balance]">
            Find out where your business could save time
          </h2>
          <p className="text-[15px] leading-snug text-brand-slate">
            Tick the tasks that take up your week and get a practical plan showing where to start, with ready-to-use AI prompts. No sign-up needed.
          </p>
        </div>
        <Link
          to={TIME_AUDIT_PATH}
          onClick={() => trackTimeAudit("time_audit_home_card_click")}
          className="btn-amber btn-focus group w-full flex-none justify-center whitespace-nowrap md:w-auto"
        >
          <span className="sheen" aria-hidden="true" />
          Start my time audit
          <ArrowRight className="nudge-arrow h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </m.div>
    </div>
  </section>
);

export default TimeAuditCard;
