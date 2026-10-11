import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp } from "@/lib/motion";
import ExtraServicesList from "./ExtraServicesList";

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
      <div className="wrap flex flex-col gap-10">
        <SectionHeader
          eyebrow="AI consulting services"
          title="AI consulting services that cut firefighting, free up capacity and protect margin."
          intro="IntegroAI provides AI strategy consulting, AI implementation and ongoing AI advisory. Use the stages your business needs, without committing to the entire journey."
        />

        {/* The six stages drawn as one route with six stops, grouped into the
            three service areas. On desktop each stop sits centred over its name
            and the amber line runs from the first stop to the last, no further;
            on tablet and mobile each area shows its two stops joined top to bottom. Each area shares the same two rows through CSS
            subgrid, so the line stays level however the text above it wraps. */}
        <m.div {...fadeUp} className="rounded-3xl bg-brand-navy px-6 py-8 sm:px-9 sm:py-10">
          <ol className="grid list-none grid-cols-1 gap-y-9 md:grid-cols-3 md:gap-y-7">
            {serviceGroups.map((group, groupIndex) => (
              <li
                key={group.title}
                className="flex flex-col gap-5 md:row-span-2 md:grid md:grid-rows-subgrid md:gap-y-7"
              >
                <div className="flex flex-col gap-2 md:pr-8 lg:px-5 lg:text-center">
                  <h3 className="text-[19px] font-medium leading-snug tracking-[-0.01em] !text-white">{group.title}</h3>
                  <p className="text-[15px] leading-relaxed text-brand-mist">{group.summary}</p>
                </div>

                <ol className="grid list-none grid-cols-1 lg:grid-cols-2" role="list">
                  {group.stages.map((stage, stageIndex) => {
                    const isLastInGroup = stageIndex === group.stages.length - 1;
                    const isLastStop = isLastInGroup && groupIndex === serviceGroups.length - 1;
                    return (
                      <li
                        key={stage.number}
                        className="relative flex gap-3.5 pb-5 last:pb-0 md:pr-5 lg:flex-col lg:items-center lg:gap-3 lg:px-2.5 lg:pb-0 lg:text-center"
                        itemScope
                        itemType="https://schema.org/Service"
                        itemProp="itemListElement"
                      >
                        {/* Route line: top to bottom on mobile; on desktop from the centre
                            of this stop to the centre of the next. Nothing after the last stop. */}
                        {!isLastStop && (
                          <span
                            aria-hidden="true"
                            className={`absolute bg-brand-amber ${
                              isLastInGroup ? "hidden lg:block" : "left-[15px] top-0 h-full w-0.5"
                            } lg:left-1/2 lg:top-[15px] lg:h-0.5 lg:w-full`}
                          />
                        )}
                        <span
                          aria-hidden="true"
                          className="relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand-amber text-xs font-semibold text-brand-navy ring-4 ring-brand-navy"
                        >
                          {stage.number}
                        </span>
                        <span className="pt-1.5 text-[15px] font-medium leading-snug text-white lg:pt-0" itemProp="name">
                          {stage.title}
                        </span>
                        <meta itemProp="description" content={stage.description} />
                      </li>
                    );
                  })}
                </ol>
              </li>
            ))}
          </ol>
        </m.div>

        {/* Standalone services, separate from the six numbered stages. */}
        <m.div {...fadeUp} className="flex flex-col gap-5">
          <p className="eyebrow text-center">More practical solutions to support your business</p>
          <ExtraServicesList />
        </m.div>

        <m.div {...fadeUp} className="flex justify-center">
          <Link to="/work-with-me" className="btn-outline-navy group">
            Explore how we can work together
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </m.div>
      </div>
    </section>
  );
};

export default Services;
