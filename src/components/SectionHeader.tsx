import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
};

// Centred label + headline + intro used at the top of each homepage section.
const SectionHeader = ({ eyebrow, title, intro }: SectionHeaderProps) => (
  <motion.div {...fadeUp} className="mx-auto flex max-w-[820px] flex-col items-center gap-3.5 text-center">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="section-title">{title}</h2>
    {intro && <p className="lede">{intro}</p>}
  </motion.div>
);

export default SectionHeader;
