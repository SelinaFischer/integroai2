import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { VISIBILITY_CHECK_PATH, trackVisibilityCheck } from "@/lib/visibilityCheck";

// Homepage promotion for the free AI visibility check. It uses an outline
// button so it stays quieter than the main assessment button in the hero.
const VisibilityCheckBanner = () => (
  <section aria-labelledby="visibility-check-banner" className="bg-white pb-14 sm:pb-16">
    <div className="wrap">
      <m.div
        {...fadeUp}
        className="flex flex-col items-center gap-6 rounded-[28px] bg-brand-navy px-6 py-9 text-center sm:px-10 md:flex-row md:gap-10 md:text-left"
      >
        <div className="flex flex-1 flex-col gap-2.5">
          <p className="eyebrow">Free AI visibility check</p>
          <h2
            id="visibility-check-banner"
            className="display text-[28px] font-semibold leading-[1.08] !text-white sm:text-[34px]"
          >
            Is your website invisible to ChatGPT?
          </h2>
          <p className="text-[15px] leading-relaxed text-brand-mist sm:text-base">
            See what is helping or blocking AI tools from reading your site, then get a report of what to fix first.
          </p>
        </div>
        <Link
          to={VISIBILITY_CHECK_PATH}
          onClick={() => trackVisibilityCheck("visibility_check_banner_click")}
          className="btn-outline-light group flex-none whitespace-nowrap"
        >
          Check my website
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </m.div>
    </div>
  </section>
);

export default VisibilityCheckBanner;
