import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { VISIBILITY_CHECK_PATH, trackVisibilityCheck } from "@/lib/visibilityCheck";

// Homepage promotion for the free AI visibility check. The soft peach panel
// stands out from the other homepage sections without glare.
const VisibilityCheckBanner = () => (
  <section aria-labelledby="visibility-check-banner" className="bg-white pb-14 sm:pb-16">
    <div className="wrap">
      <m.div
        {...fadeUp}
        className="flex flex-col items-center gap-4 rounded-2xl bg-brand-chip px-6 py-5 text-center sm:px-8 md:flex-row md:gap-8 md:text-left"
      >
        <div className="flex flex-1 flex-col gap-1">
          <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-navy md:justify-start">
            {/* A small "live" dot: this is a check you can run right now. */}
            <span className="live-dot" aria-hidden="true" />
            Free AI visibility check
          </p>
          <h2
            id="visibility-check-banner"
            className="display text-[22px] font-semibold leading-[1.15] !text-brand-navy sm:text-[25px]"
          >
            Is your website invisible to ChatGPT?
          </h2>
          <p className="text-sm leading-snug text-brand-navy">
            Check for issues that could stop AI tools from reading your site, and get a clear report showing what to fix first.
          </p>
        </div>
        <Link
          to={VISIBILITY_CHECK_PATH}
          onClick={() => trackVisibilityCheck("visibility_check_banner_click")}
          className="halo halo-navy group inline-flex flex-none items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold bg-brand-navy !text-white hover:opacity-90"
        >
          Check my website
          <ArrowRight className="nudge-arrow h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </m.div>
    </div>
  </section>
);

export default VisibilityCheckBanner;
