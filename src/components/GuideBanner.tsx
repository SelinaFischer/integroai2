import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import cover from "@/assets/guide-cover.webp";
import { fadeUp } from "@/lib/motion";
import { GUIDE_PAGE_PATH, GUIDE_SUBTITLE, GUIDE_TITLE, trackGuideClick } from "@/lib/guide";

type GuideBannerProps = {
  /** Where the banner sits, for click tracking (for example "homepage"). */
  location: string;
  /** Section background and spacing, so it blends with the page around it. */
  className?: string;
};

// Promotes the free guide and links to its page.
const GuideBanner = ({ location, className = "bg-white py-14 sm:py-16" }: GuideBannerProps) => (
  <section aria-labelledby={`guide-banner-${location}`} className={className}>
    <div className="wrap">
      <motion.div
        {...fadeUp}
        className="flex flex-col items-center gap-7 rounded-[28px] bg-brand-navy px-6 py-9 text-center sm:px-10 md:flex-row md:gap-10 md:text-left"
      >
        <img
          src={cover}
          alt=""
          width={720}
          height={1018}
          loading="lazy"
          decoding="async"
          className="h-auto w-[132px] flex-none -rotate-3 rounded-lg shadow-[0_18px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/15 md:w-[150px]"
        />
        <div className="flex flex-1 flex-col gap-2.5">
          <p className="eyebrow">Free guide and checklist</p>
          <h2
            id={`guide-banner-${location}`}
            className="display text-[32px] font-semibold leading-[1.08] !text-white sm:text-[40px]"
          >
            {GUIDE_TITLE}
          </h2>
          <p className="text-base leading-relaxed text-brand-mist sm:text-[17px]">{GUIDE_SUBTITLE}</p>
        </div>
        <Link
          to={GUIDE_PAGE_PATH}
          onClick={() => trackGuideClick(`banner-${location}`)}
          className="btn-amber group flex-none whitespace-nowrap"
        >
          Get the free guide
          <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" strokeWidth={2.6} aria-hidden="true" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default GuideBanner;
