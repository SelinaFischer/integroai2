import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";

// Full-width navy statement band between "Who we work with" and the founder.
const RealityBand = () => {
  return (
    <section className="bg-brand-navy py-16 sm:py-[76px]">
      <m.div
        {...fadeUp}
        className="mx-auto flex max-w-[calc(916px+2*var(--gutter))] flex-col items-center gap-[18px] px-gutter text-center"
      >
        <p className="eyebrow">The reality</p>
        <h2 className="display text-[38px] font-semibold leading-[1.05] text-white sm:text-[54px] lg:text-[70px]">
          AI amplifies what already exists.
          <br />
          <span className="italic text-brand-amber">Clarity comes first.</span>
        </h2>
        <p className="max-w-[720px] text-[17px] leading-relaxed text-brand-mist sm:text-[19px]">
          When foundations are unclear, AI amplifies inefficiency rather than value. That&apos;s why we start with operational clarity before any tools, automation or implementation.
        </p>
      </m.div>
    </section>
  );
};

export default RealityBand;
