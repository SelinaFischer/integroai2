import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUpDelayed } from "@/lib/motion";

const steps = [
  {
    title: "Discover",
    description:
      "Understand your current state, surface readiness gaps, and identify where AI can create real business value.",
  },
  {
    title: "Design",
    description:
      "Define priorities, success measures, and guardrails so AI initiatives align with business goals before execution begins.",
  },
  {
    title: "Validate",
    description: "Test assumptions through focused pilots to confirm impact, feasibility, and risk before scaling.",
  },
  {
    title: "Deliver",
    description:
      "Implement validated solutions with structure, oversight, and clear accountability for measurable outcomes.",
  },
  {
    title: "Iterate",
    description: "Refine and improve as the organisation, data, and operating environment evolve over time.",
  },
];

const Framework = () => {
  return (
    <section id="framework" className="bg-white py-14 sm:py-16">
      <div className="wrap flex flex-col gap-9">
        <SectionHeader
          eyebrow="Our methodology"
          title="The IntegroAI Operating Framework"
          intro="The IntegroAI Operating Framework is a five-stage method for responsible AI implementation: Discover, Design, Validate, Deliver and Iterate. People stay in control at every stage."
        />

        <ol className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <m.li
              key={step.title}
              {...fadeUpDelayed(index)}
              className="flex flex-col gap-2.5 rounded-3xl border border-brand-sand bg-brand-ivory p-6"
            >
              <span className="num-chip !bg-brand-amber" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[19px] leading-tight">{step.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-brand-slate">{step.description}</p>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Framework;
