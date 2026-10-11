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
  const lastGroup = serviceGroups.length - 1;

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
            three service areas. On desktop a fine amber line runs left to right
            through every stop and fades out after the last one; on tablet and
            mobile each area shows its two stops joined top to bottom. Each area
            shares the same two rows through CSS subgrid, so the line stays level
            however the text above it wraps. Kept deliberately light: hairline,
            small markers, medium-weight type. */}
        <m.div {...fadeUp} className="rounded-3xl bg-brand-navy px-7 py-9 sm:px-11 sm:py-12">
          <ol className="grid list-none grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-y-9">
            {serviceGroups.map((group, groupIndex) => (
              <li
                key={group.title}
                className="flex flex-col gap-6 md:row-span-2 md:grid md:grid-rows-subgrid md:gap-y-9"
              >
                <div className="flex flex-col gap-2.5 md:pr-9">
                  <h3 className="text-lg font-medium leading-snug tracking-[-0.01em] !text-white">{group.title}</h3>
                  <p className="text-[15px] leading-relaxed text-brand-mist/85">{group.summary}</p>
                </div>

                <ol className="grid list-none grid-cols-1 lg:grid-cols-2" role="list">
                  {group.stages.map((stage, stageIndex) => {
                    const isFirstStop = groupIndex === 0 && stageIndex === 0;
                    const isLastStop = groupIndex === lastGroup && stageIndex === group.stages.length - 1;
                    const isLastInGroup = stageIndex === group.stages.length - 1;
                    return (
                      <li
                        key={stage.number}
                        className="relative flex gap-4 pb-6 last:pb-0 lg:flex-col lg:gap-4 lg:pb-0 lg:pr-6"
                        itemScope
                        itemType="https://schema.org/Service"
                        itemProp="itemListElement"
                      >
                        {/* Route line: top to bottom on mobile, left to right on desktop.
                            After the last stop it fades away instead of ending in an arrow. */}
                        <span
                          aria-hidden="true"
                          className={`absolute ${
                            isLastInGroup ? "hidden lg:block" : "left-1 top-2 h-full w-px"
                          } lg:top-1 lg:h-px ${
                            isFirstStop ? "lg:left-1 lg:w-[calc(100%-4px)]" : "lg:left-0 lg:w-full"
                          } ${
                            isLastStop
                              ? "bg-brand-amber/50 lg:bg-transparent lg:bg-gradient-to-r lg:from-brand-amber/50 lg:to-transparent"
                              : "bg-brand-amber/50"
                          }`}
                        />
                        <span
                          aria-hidden="true"
                          className="relative z-10 mt-1 h-[9px] w-[9px] flex-none rounded-full bg-brand-amber ring-[5px] ring-brand-navy lg:mt-0"
                        />
                        <span className="flex flex-col gap-1.5">
                          <span aria-hidden="true" className="text-[11px] font-semibold leading-4 tracking-[0.18em] text-brand-amber">
                            {stage.number}
                          </span>
                          <span className="text-[15px] font-medium leading-snug text-white" itemProp="name">
                            {stage.title}
                          </span>
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
