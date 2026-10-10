import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp } from "@/lib/motion";

const credentials = ["20+ years in product & tech", "AI & data strategy", "Tech practitioner"];

// Short homepage introduction. Selina's fuller professional story lives on the About page.
const Founder = () => {
  return (
    <section id="founder" className="bg-white py-14 sm:py-16">
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div {...fadeUp} className="flex flex-col items-start gap-4">
          <p className="eyebrow">The founder</p>
          <h2 className="section-title">Meet Selina Fischer, independent AI consultant</h2>
          <p className="text-base leading-relaxed text-[#42566A] sm:text-lg">
            My approach draws on more than 20 years across operations, product, technology and data. Successful AI adoption needs more than the right technology: a strategy aligned with business goals, leadership commitment, reliable data, clear processes and a team ready for change, with agreed KPIs to measure results.
          </p>
          <p className="text-base leading-relaxed text-[#42566A] sm:text-lg">
            I lead every IntegroAI engagement personally, from initial diagnosis through to recommendations and delivery support.
          </p>
          <Link to="/about" className="btn-outline-navy">
            Read Her Story
          </Link>
        </motion.div>

        <motion.div
          {...fadeUp}
          className="flex flex-col gap-[18px] rounded-[20px] border border-brand-sand bg-brand-ivory p-6 sm:p-7"
        >
          <div className="flex flex-col gap-0.5">
            <p className="display text-[28px] font-bold leading-[1.1] text-brand-navy sm:text-[32px]">Selina Fischer</p>
            <p className="text-[15px] font-semibold text-brand-slate">Founder | AI Adoption &amp; Transformation Consultant</p>
          </div>

          <ul className="flex list-none flex-wrap gap-2">
            {credentials.map((item) => (
              <li
                key={item}
                className="rounded-full bg-brand-chip px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-navy"
              >
                {item}
              </li>
            ))}
          </ul>

          <blockquote className="display border-l-4 border-brand-amber pl-[18px] text-2xl font-semibold italic leading-tight text-brand-navy sm:text-[29px] sm:leading-[1.25]">
            I help founders cut firefighting and repetitive work, and reclaim time for the work they love.
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default Founder;
