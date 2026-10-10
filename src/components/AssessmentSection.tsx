import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ASSESSMENT_URL, fadeUp } from "@/lib/motion";

// Sample scorecard. The five dimensions and the /30 scale match the real
// assessment result; the numbers are illustrative and labelled as a sample.
const SAMPLE_SCORE = 11;
const MAX_SCORE = 30;
const RING_RADIUS = 56;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

const dimensions = [
  { label: "Strategic Clarity", value: 40 },
  { label: "Leadership & Ownership", value: 35 },
  { label: "Process Maturity", value: 55 },
  { label: "Operational Visibility", value: 25, priority: true },
  { label: "Data Readiness", value: 60 },
];

const AssessmentSection = () => {
  return (
    <section id="assessment" className="bg-brand-cream py-14 sm:py-16">
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div {...fadeUp} className="flex flex-col items-start gap-[18px]">
          <p className="eyebrow tracking-[0.16em]">Free tool</p>
          <h2 className="section-title !text-brand-navy">
            Is your business <span className="italic text-brand-amber">ready for AI?</span>
          </h2>
          <p className="text-base leading-relaxed text-[#42566A] sm:text-lg">
            IntegroAI&apos;s free 5-minute AI Readiness Assessment is an AI assessment tool for business leaders. It scores your business across strategic clarity, leadership and ownership, process maturity, operational visibility and data readiness, then names the priority to focus on first.
          </p>
          <a href={ASSESSMENT_URL} target="_blank" rel="noopener noreferrer" className="btn-amber group">
            Start the free assessment
            <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" strokeWidth={2.6} aria-hidden="true" />
          </a>
          <p className="text-sm font-semibold text-[#42566A]">A free AI readiness quiz. 5 minutes.</p>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="flex flex-col gap-5 rounded-[20px] border border-brand-sand bg-white p-6 sm:p-[30px]"
          style={{ boxShadow: "var(--shadow-lg)" }}
          role="img"
          aria-label="Sample AI Readiness Assessment result: 11 out of 30, Early Explorer. Priority focus: Operational Visibility."
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-slate">AI Readiness Score</p>
            <p className="rounded-full bg-brand-amber px-3 py-[5px] text-[11px] font-bold uppercase tracking-[0.12em] text-brand-navy">
              Sample result
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-[22px]">
            <div className="relative h-[132px] w-[132px] flex-none">
              <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
                <circle cx="66" cy="66" r={RING_RADIUS} fill="none" stroke="#EFE8DC" strokeWidth="10" />
                <circle
                  cx="66"
                  cy="66"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="#FF9900"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(SAMPLE_SCORE / MAX_SCORE) * RING_LENGTH} ${RING_LENGTH}`}
                  transform="rotate(-90 66 66)"
                />
              </svg>
              <div className="absolute inset-0 flex items-baseline justify-center gap-[3px] pt-[42px]">
                <span className="text-[46px] font-bold leading-none tracking-tight text-brand-navy">{SAMPLE_SCORE}</span>
                <span className="text-[17px] font-semibold text-brand-slate">/{MAX_SCORE}</span>
              </div>
            </div>
            <div className="flex min-w-[180px] flex-1 flex-col gap-1.5">
              <p className="display text-[32px] font-bold leading-none text-brand-navy">Early Explorer</p>
              <p className="text-[15px] leading-normal text-brand-slate">
                You&apos;re making progress. Clear gaps identified before AI investment.
              </p>
            </div>
          </div>

          <div className="flex flex-col border-t border-brand-sand pt-[18px]">
            <p className="pb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-slate">Readiness by dimension</p>
            {dimensions.map((dimension) => (
              <div
                key={dimension.label}
                className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_44px] items-center gap-3.5 py-[9px]"
              >
                <span className="text-[15px] font-semibold text-brand-navy">{dimension.label}</span>
                <span className="h-2 rounded bg-brand-track">
                  <span
                    className={`block h-2 rounded ${dimension.priority ? "bg-brand-amber" : "bg-brand-navy"}`}
                    style={{ width: `${dimension.value}%` }}
                  />
                </span>
                <span className="text-right text-[15px] font-bold text-brand-navy">{dimension.value}%</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 rounded-[14px] border border-[#FFDDA6] bg-brand-cream px-[18px] py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-slate">Priority focus</p>
            <p className="text-[17px] font-bold text-brand-navy">Operational Visibility</p>
            <p className="text-[15px] leading-normal text-brand-slate">
              Clarify ownership and workflow visibility before investing further.
            </p>
          </div>

          <p className="text-[13px] text-brand-slate">Sample result. Your score comes from your own answers.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default AssessmentSection;
