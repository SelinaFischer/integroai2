import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUp } from "@/lib/motion";
import ExtraServicesList from "./ExtraServicesList";

// The free check plus the five paid stages, grouped into three service areas.
// Stage numbers (01 to 05) match /work-with-me, where each stage is covered in
// full. The free check has no number and shows a clock instead. `description`
// is not shown on screen; it feeds the schema.org microdata so search engines
// and AI assistants still get a full description.
const serviceGroups = [
  {
    title: "AI & Operations Diagnostic",
    outcome: "Know what to fix first, before you invest",
    summary: "A clear view of what is holding your business back, and where to start.",
    stages: [
      {
        number: "",
        title: "Free 5-Minute AI Readiness Assessment",
        description: "A free 5-minute self-assessment for a first indication of where you stand.",
      },
      {
        number: "01",
        title: "AI & Operations Diagnostic",
        description: "A consultant-led review of the business that shows what is slowing it down, what to fix first and where AI is worth the investment.",
      },
    ],
  },
  {
    title: "Priorities & Foundations",
    outcome: "Agree what matters, then get ready for it",
    summary: "You choose what to act on first. We prepare your workflows, data and team for it.",
    stages: [
      {
        number: "02",
        title: "Agree Your Priorities",
        description: "Choose what to act on first, and agree the scope and measures for the next stage.",
      },
      {
        number: "03",
        title: "AI Foundations & Responsible Adoption",
        description: "Prepare workflows, data, governance and your team for the changes you chose.",
      },
    ],
  },
  {
    title: "AI Implementation & Automation",
    outcome: "Get it working, and keep it working",
    summary: "Working solutions your team actually uses, with people in control of the decisions that matter.",
    stages: [
      {
        number: "04",
        title: "AI & Automation Implementation",
        description: "Turn your agreed priorities into working solutions.",
      },
      {
        number: "05",
        title: "Ongoing AI & Operations Advisory",
        description: "Review what's working, and refine what's next.",
      },
    ],
  },
];

// Desktop only. The three headings sit flush with the stage names beneath
// them: each heading starts where its first stage name starts, and the last
// heading stops where the last stage name stops. Stage names are centred under
// their circles, so their edges depend on the wording; they are measured here
// rather than guessed. `shift` then nudges the whole panel content sideways so
// the space left of the first block equals the space right of the last one.
type PanelEdges = { starts: number[]; end: number; shift: number };

const usePanelEdges = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const [edges, setEdges] = useState<PanelEdges | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const panel = list?.parentElement;
    if (!list || !panel) return;

    // The tight box around the words themselves, not the element that holds them.
    const wordsBox = (element: Element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      return range.getBoundingClientRect();
    };
    const round = (value: number) => Math.round(value * 2) / 2;
    let applied = 0;

    const measure = () => {
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        applied = 0;
        setEdges(null);
        return;
      }
      const groups = Array.from(list.querySelectorAll<HTMLElement>("[data-group]"));
      const names = groups.map((group) => Array.from(group.querySelectorAll("[data-stage-name]")));
      if (!groups.length || names.some((group) => !group.length)) return;

      const starts = groups.map((group, index) =>
        round(wordsBox(names[index][0]).left - group.getBoundingClientRect().left),
      );
      const lastGroup = groups[groups.length - 1];
      const lastName = names[names.length - 1].slice(-1)[0];
      const end = round(lastGroup.getBoundingClientRect().right - wordsBox(lastName).right);

      // Space either side as it would be with no nudge applied.
      const box = panel.getBoundingClientRect();
      const spaceLeft = wordsBox(names[0][0]).left - box.left - applied;
      const spaceRight = box.right - wordsBox(lastName).right + applied;
      const shift = round((spaceRight - spaceLeft) / 2);
      applied = shift;

      setEdges((current) =>
        current &&
        current.end === end &&
        current.shift === shift &&
        current.starts.every((start, index) => start === starts[index])
          ? current
          : { starts, end, shift },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
  }, []);

  return { listRef, edges };
};

const Services = () => {
  const { listRef, edges } = usePanelEdges();
  const lastGroupIndex = serviceGroups.length - 1;

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
          title="Make room for your next stage of growth."
          intro="Strengthen how your business works, give your team more capacity and deliver a better customer experience. From assessment and strategy to implementation and ongoing support, we help you focus investment where it matters most."
        />

        {/* The free check and five stages drawn as one route with six stops, grouped into the
            three service areas. The three headings and their descriptions are
            left-aligned and, on desktop, sit flush with the stage names beneath
            them (see usePanelEdges). Each stop sits centred over its name and the
            amber line runs from the first stop to the last, no further;
            on tablet and mobile each area shows its two stops joined top to bottom. Each area shares the same rows through CSS
            subgrid (label, heading, summary, stages), so labels, headings and the line
            stay level however the text above them wraps. */}
        <m.div {...fadeUp} className="rounded-3xl bg-brand-navy px-6 py-8 sm:px-9 sm:py-10">
          <ol
            ref={listRef}
            className="grid list-none grid-cols-1 gap-y-9 md:grid-cols-3 md:gap-y-7"
            style={edges ? { transform: `translateX(${edges.shift}px)` } : undefined}
          >
            {serviceGroups.map((group, groupIndex) => (
              <li
                key={group.title}
                data-group
                className="flex flex-col gap-5 md:row-span-4 md:grid md:grid-rows-subgrid md:gap-y-7"
              >
                {/* Until the measurement runs, the margins below are a close estimate. */}
                <div
                  className={`flex flex-col gap-1.5 md:row-span-3 md:grid md:grid-rows-subgrid md:gap-y-1.5 md:pr-8 lg:ml-[calc(25%-52px)] ${
                    groupIndex === lastGroupIndex ? "lg:mr-[calc(25%-70px)] lg:pr-0" : "lg:pr-4"
                  }`}
                  style={
                    edges
                      ? {
                          marginLeft: edges.starts[groupIndex],
                          marginRight: groupIndex === lastGroupIndex ? edges.end : undefined,
                        }
                      : undefined
                  }
                >
                  {/* The service name sits as a small label; the heading says what
                      changes for the client. */}
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-amber">{group.title}</p>
                  <h3 className="text-lg font-medium leading-snug tracking-[-0.01em] !text-white [text-wrap:balance]">
                    {group.outcome}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-mist [text-wrap:balance]">{group.summary}</p>
                </div>

                <ol className="grid list-none grid-cols-1 lg:grid-cols-2" role="list">
                  {group.stages.map((stage, stageIndex) => {
                    const isLastInGroup = stageIndex === group.stages.length - 1;
                    const isLastStop = isLastInGroup && groupIndex === serviceGroups.length - 1;
                    return (
                      <li
                        key={stage.title}
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
                          {stage.number || <Clock className="h-4 w-4" strokeWidth={2.2} />}
                        </span>
                        <span data-stage-name className="pt-1.5 text-[15px] font-medium leading-snug text-white lg:pt-0" itemProp="name">
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

        {/* Standalone services, separate from the numbered stages. */}
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
