import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp, fadeUpDelayed } from "@/lib/motion";
import { extraServices } from "@/lib/extraServices";
import { trackGuideClick } from "@/lib/guide";

// The six stages a client can engage, grouped into three service areas.
// Stage numbers (01 to 06) match /work-with-me, where each stage is covered
// in full. `description` is not shown on screen; it feeds the schema.org
// microdata so search engines and AI assistants still get a full description.
const serviceGroups = [
  {
    title: "AI Readiness & Operations Diagnostic",
    summary: "See where time, capacity or control is being lost. Operational efficiency first, AI second.",
    stages: [
      {
        number: "01",
        title: "AI Readiness Assessment",
        description: "A 5-minute self-assessment to see where you stand before you invest in AI.",
      },
      {
        number: "02",
        title: "AI & Operations Diagnostic",
        description: "Identify the workflow bottlenecks costing you time, capacity or control.",
      },
    ],
  },
  {
    title: "AI Strategy Consulting",
    summary: "A business AI strategy that shows which opportunities are worth pursuing first.",
    stages: [
      {
        number: "03",
        title: "AI Strategy & Prioritisation Roadmap",
        description: "Identify which opportunities are worth pursuing first.",
      },
      {
        number: "04",
        title: "AI Foundations & Responsible Adoption",
        description: "Get the foundations right before you adopt AI.",
      },
    ],
  },
  {
    title: "AI Implementation & Automation",
    summary:
      "Turn validated opportunities into working solutions, from AI workflow automation to business process automation.",
    stages: [
      {
        number: "05",
        title: "AI & Automation Implementation",
        description: "Turn validated opportunities into working solutions.",
      },
      {
        number: "06",
        title: "Ongoing AI & Operations Advisory",
        description: "Review what's working, and refine what's next.",
      },
    ],
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="bg-white py-14 sm:py-16"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="wrap flex flex-col gap-9">
        <SectionHeader
          eyebrow="AI consulting services"
          title="AI consulting services that cut firefighting, free up capacity and protect margin."
          intro="IntegroAI provides AI strategy consulting, AI implementation and ongoing AI advisory. Use the stages your business needs, without committing to the entire journey."
        />

        {/* On desktop every card shares the same four rows (title, summary,
            stage, stage) through CSS subgrid, so the divider lines sit at the
            same height across all three cards however the text wraps. */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-y-0">
          {serviceGroups.map((group, index) => (
            <motion.article
              key={group.title}
              {...fadeUpDelayed(index)}
              className="card-soft flex flex-col p-7 md:row-span-4 md:grid md:grid-rows-subgrid md:gap-y-0"
            >
              <h3 className="text-2xl leading-[1.15]">{group.title}</h3>
              <p className="mt-3 pb-5 text-base leading-relaxed text-brand-slate">{group.summary}</p>
              <ul className="flex list-none flex-col md:contents" role="list">
                {group.stages.map((stage) => (
                  <li
                    key={stage.number}
                    className="flex items-baseline gap-3.5 border-t border-brand-sand py-3.5 text-base font-semibold text-brand-navy"
                    itemScope
                    itemType="https://schema.org/Service"
                    itemProp="itemListElement"
                  >
                    <span className="font-bold text-brand-slate" aria-hidden="true">
                      {stage.number}
                    </span>
                    <span itemProp="name">{stage.title}</span>
                    <meta itemProp="description" content={stage.description} />
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Standalone services, separate from the six numbered stages. */}
        <motion.div {...fadeUp} className="flex flex-col gap-4">
          <p className="eyebrow text-center">More ways we help</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {extraServices.map((service) => (
              <div
                key={service.title}
                className="flex flex-col gap-2 rounded-3xl border border-brand-sand bg-brand-cream p-7"
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
              >
                <h3 className="text-2xl leading-[1.15]" itemProp="name">
                  {service.title}
                </h3>
                <p className="text-base leading-relaxed text-brand-slate" itemProp="description">
                  {service.description}
                </p>
                {service.link && (
                  <Link
                    to={service.link.to}
                    onClick={() => trackGuideClick("websites-card")}
                    className="mt-1 flex w-fit items-center gap-1.5 text-[15px] font-bold text-brand-navy underline decoration-brand-amber decoration-2 underline-offset-4"
                  >
                    {service.link.label}
                    <ArrowRight className="h-4 w-4 flex-none" strokeWidth={2.6} aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="flex justify-center">
          <Link to="/work-with-me" className="btn-outline-navy group">
            Explore how we can work together
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.6} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
