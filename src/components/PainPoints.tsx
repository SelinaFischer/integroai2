import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUpDelayed } from "@/lib/motion";

const painPoints = [
  {
    title: "Unclear leadership ownership",
    description:
      "AI initiatives lose momentum when sponsorship, accountability, and decision ownership are not clearly defined.",
  },
  {
    title: "Competing priorities",
    description:
      "Too many potential use cases, without a clear view of which initiatives will genuinely create value.",
  },
  {
    title: "Data foundations not ready",
    description:
      "AI tools introduced before data quality, access, or consistency are sufficient to support them.",
  },
  {
    title: "Limited organisational readiness",
    description:
      "Teams unsure how AI fits into existing workflows or how to use it responsibly in their roles.",
  },
  {
    title: "No clear success metrics",
    description:
      "Outcomes are difficult to validate when there is no agreed baseline or way to measure impact.",
  },
  {
    title: "Lack of practical AI understanding",
    description:
      "Teams struggle to see how AI applies to day to day work, so it is hard to identify where AI can create value.",
  },
];

const PainPoints = () => {
  return (
    <section id="why-ai-stalls" className="bg-brand-ivory py-14 sm:py-16">
      <div className="wrap flex flex-col gap-9">
        <SectionHeader
          eyebrow="Why AI initiatives stall"
          title="Why do AI initiatives stall?"
          intro="In many businesses, AI initiatives stall because the conditions for success were never clearly established, not because the technology is flawed. Use these six points as your AI readiness checklist."
        />

        <ol className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point, index) => (
            <motion.li
              key={point.title}
              {...fadeUpDelayed(index)}
              className="card-soft flex flex-col gap-2.5 p-[26px]"
            >
              <span className="num-chip" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl leading-tight">{point.title}</h3>
              <p className="text-base leading-relaxed text-brand-slate">{point.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default PainPoints;
