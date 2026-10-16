import { m } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Heading size. Defaults to the homepage section title. */
  titleClassName?: string;
};

// Centred label + headline + intro used at the top of each homepage section.
const SectionHeader = ({ eyebrow, title, intro, titleClassName = "section-title" }: SectionHeaderProps) => (
  <m.div {...fadeUp} className="mx-auto flex max-w-[820px] flex-col items-center gap-3.5 text-center">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className={titleClassName}>{title}</h2>
    {intro && <p className="lede">{intro}</p>}
  </m.div>
);

export default SectionHeader;
