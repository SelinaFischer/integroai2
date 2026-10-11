import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { fadeUpDelayed } from "@/lib/motion";

const audiences = [
  {
    title: "Every decision comes back to you",
    description:
      "Approvals, fixes and client issues still run through you. The business can't move faster than your inbox.",
  },
  {
    title: "The team stuck in admin",
    description:
      "Your team spends hours preparing reports, chasing updates and entering the same data across different systems. That leaves less time to serve clients.",
  },
  {
    title: "More clients, less profit",
    description: "Revenue is up. So is headcount. Each new client adds workload faster than profit.",
  },
  {
    title: "Using AI, but not seeing the return",
    description:
      "The tools are in. The team uses them here and there. The time and margin gains haven't shown up.",
  },
];

const WhoWeWorkWith = () => {
  return (
    <section id="who-we-work-with" className="bg-brand-ivory py-14 sm:py-16">
      <div className="wrap flex flex-col gap-9">
        <SectionHeader
          eyebrow="Who we work with"
          title={
            <>
              AI consulting for <span className="whitespace-nowrap">founder-led</span> service businesses
            </>
          }
          intro="Your business has grown. Your ways of working haven't kept pace. We help founders reduce repetitive work, improve operational control and create capacity for growth."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, index) => (
            <m.div
              key={audience.title}
              {...fadeUpDelayed(index)}
              className="card-soft flex flex-col gap-2.5 p-[26px]"
            >
              <h3 className="text-xl leading-tight">{audience.title}</h3>
              <p className="text-base leading-relaxed text-brand-slate">{audience.description}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
