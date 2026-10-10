import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { ASSESSMENT_URL, DISCOVERY_CALL_URL, fadeUp } from "@/lib/motion";

const wrongApproach = [
  "The tool arrives before the problem is understood",
  "The team works around it",
  "Months later, the friction is still there",
  "Plus a new subscription to pay for",
];

const whatWeDo = [
  "Clarity before you spend, so your budget goes on the right problem",
  "A plan built with the people who do the work",
  "Ready before launch, supported after",
  "People stay in control of the decisions that matter",
];

const WhyIntegroAI = () => {
  return (
    <section id="why-integroai" className="bg-brand-ivory py-14 sm:py-16">
      <div className="wrap flex flex-col gap-8">
        <SectionHeader
          eyebrow="Why IntegroAI"
          title="Why choose an independent AI consultant?"
          intro="Most AI advice starts with tools. We find the right problem before you pay for the solution."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.div
            {...fadeUp}
            className="flex flex-col gap-3.5 rounded-[20px] border border-brand-sand bg-white p-6 sm:p-[30px]"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-slate">The wrong approach</p>
            <h3 className="display text-[30px] !font-bold leading-[1.08] !text-brand-slate sm:text-4xl">
              Tool-led AI adoption
            </h3>
            <ul className="flex list-none flex-col gap-2.5 text-base text-brand-slate">
              {wrongApproach.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="mt-[3px] h-5 w-5 flex-none text-[#7B8A99]" strokeWidth={2.6} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="flex flex-col gap-3.5 rounded-[20px] border-2 border-brand-amber bg-white p-[23px] sm:p-[29px]"
          >
            <p className="self-start rounded-full bg-brand-amber px-3 py-[5px] text-xs font-bold uppercase tracking-[0.14em] text-brand-navy">
              What we do
            </p>
            <h3 className="display text-[30px] !font-bold leading-[1.08] !text-brand-navy sm:text-4xl">
              Business-led AI strategy
            </h3>
            <ul className="flex list-none flex-col gap-2.5 text-base font-medium text-brand-navy">
              {whatWeDo.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-[3px] h-5 w-5 flex-none text-brand-amber" strokeWidth={3} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          className="flex flex-col gap-x-7 gap-y-2.5 rounded-[20px] bg-brand-navy px-6 py-7 sm:px-8 lg:flex-row lg:items-center"
        >
          <p className="eyebrow flex-none">The result</p>
          <p className="display flex-none text-[30px] font-semibold leading-[1.08] text-white sm:text-4xl">
            Measurable business value from AI.
          </p>
          <p className="text-base text-brand-mist lg:flex-1">
            Less firefighting. Less manual work. More operational control. Time and capacity to grow.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="flex flex-col justify-center gap-3.5 sm:flex-row">
          <a href={ASSESSMENT_URL} target="_blank" rel="noopener noreferrer" className="btn-amber">
            Start the free assessment
          </a>
          <a
            href={DISCOVERY_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-navy px-[26px] py-3.5 text-[17px]"
          >
            Book a Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyIntegroAI;
