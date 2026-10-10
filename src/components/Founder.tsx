import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp } from "@/lib/motion";

// Short homepage introduction. Selina's fuller professional story lives on the About page.
const Founder = () => {
  return (
    <section id="founder" className="bg-white py-14 sm:py-16">
      <div className="wrap">
        <motion.div
          {...fadeUp}
          className="rounded-[28px] border border-brand-chip bg-brand-cream px-6 py-10 sm:px-12 sm:py-14"
        >
          <div className="mx-auto flex max-w-[780px] flex-col items-center gap-4 text-center">
            <p className="eyebrow">The founder</p>
            <h2 className="section-title">
              Meet Selina, independent AI consultant
            </h2>
            <blockquote className="display max-w-[620px] text-2xl font-semibold italic leading-tight text-brand-navy sm:text-[29px] sm:leading-[1.25]">
              I help founders cut firefighting and repetitive work, and reclaim time for the work they love.
            </blockquote>
            <span aria-hidden="true" className="h-[3px] w-14 rounded-full bg-brand-amber" />
            <p className="text-base leading-relaxed text-[#42566A] sm:text-lg">
              My approach draws on more than 20 years across operations,
              product, technology and data. Successful AI adoption needs more
              than the right technology: a strategy aligned with business goals,
              leadership commitment, reliable data, clear processes and a team
              ready for change, with agreed KPIs to measure results.
            </p>
            <p className="text-base leading-relaxed text-[#42566A] sm:text-lg">
              I lead every IntegroAI engagement personally, from initial
              diagnosis through to recommendations and delivery support.
            </p>
            <Link to="/about" className="btn-outline-navy mt-2">
              Read Her Story
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Founder;
