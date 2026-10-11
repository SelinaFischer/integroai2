import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { ASSESSMENT_URL, DISCOVERY_CALL_URL, fadeUp } from "@/lib/motion";

const FinalCTA = () => {
  return (
    <section
      id="start"
      className="on-dark py-16 sm:py-[84px]"
      style={{
        background:
          "radial-gradient(60% 55% at 50% 22%, rgba(30,74,110,0.5), rgba(30,74,110,0) 70%), #050F1B",
      }}
    >
      <m.div
        {...fadeUp}
        className="mx-auto flex max-w-[calc(916px+2*var(--gutter))] flex-col items-center gap-[22px] px-gutter text-center"
      >
        <p className="eyebrow">Free AI Readiness Assessment</p>
        <h2 className="display text-[36px] font-semibold leading-[1.03] text-white sm:text-[50px] lg:text-[62px]">
          Make clearer AI decisions
          <br />
          <span className="italic text-brand-amber">before you invest.</span>
        </h2>
        <p className="max-w-[660px] text-base leading-relaxed text-brand-mist sm:text-[17px]">
          Identify where operational friction is limiting performance, where AI can create business value, and what the most appropriate next step should be.
        </p>

        <div className="mt-1.5 flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row">
          <a
            href={ASSESSMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber group"
          >
            Start the free assessment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
          </a>
          <a
            href={DISCOVERY_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light"
          >
            Book a Discovery Call
          </a>
        </div>

        <p className="text-[15px] font-medium text-[#94A3B8]">
          5-Minute AI Readiness Assessment → Discovery Call → Clear Next Steps
        </p>
      </m.div>
    </section>
  );
};

export default FinalCTA;
