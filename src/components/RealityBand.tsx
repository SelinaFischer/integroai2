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
        <h2 className="display text-[30px] font-semibold leading-[1.1] text-white sm:text-[38px] lg:text-[46px]">
          AI amplifies what already exists.
          <br />
          <span className="italic text-brand-amber">Clarity comes first.</span>
        </h2>
        <p className="max-w-[660px] text-base leading-relaxed text-brand-mist sm:text-[17px]">
          When foundations are unclear, AI amplifies inefficiency rather than value. That&apos;s why we start with operational clarity before any tools, automation or implementation.
        </p>
      </m.div>
    </section>
  );
};

export default RealityBand;
