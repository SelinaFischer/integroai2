import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ASSESSMENT_URL, DISCOVERY_CALL_URL, fadeUp } from "@/lib/motion";

const FinalCTA = () => {
  return (
    <section
      id="start"
      className="py-16 sm:py-[84px]"
      style={{
        background:
          "radial-gradient(60% 55% at 50% 22%, rgba(30,74,110,0.5), rgba(30,74,110,0) 70%), #050F1B",
      }}
    >
      <motion.div
        {...fadeUp}
        className="mx-auto flex max-w-[980px] flex-col items-center gap-[22px] px-5 text-center sm:px-8"
      >
        <p className="eyebrow">Free AI Readiness Assessment</p>
        <h2 className="display text-[40px] font-semibold leading-[1.03] text-white sm:text-[58px] lg:text-[76px]">
          Make clearer AI decisions
          <br />
          <span className="italic text-brand-amber">before you invest.</span>
        </h2>
        <p className="max-w-[720px] text-[17px] leading-relaxed text-brand-mist sm:text-[19px]">
          Identify where operational friction is limiting performance, where AI can create business value, and what the most appropriate next step should be.
        </p>

        <div className="mt-1.5 flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row">
          <a
            href={ASSESSMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber group px-[30px] py-[18px] text-lg"
          >
            Start the free assessment
            <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" strokeWidth={2.6} aria-hidden="true" />
          </a>
          <a
            href={DISCOVERY_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light px-7 py-4 text-lg"
          >
            Book a Discovery Call
          </a>
        </div>

        <p className="text-[15px] font-medium text-[#94A3B8]">
          5-Minute AI Readiness Assessment → Discovery Call → Clear Next Steps
        </p>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
