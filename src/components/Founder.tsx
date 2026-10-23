import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp } from "@/lib/motion";
import { SELINA_STORY_PATH } from "@/lib/selinaStory";

// Short homepage introduction. Selina's fuller professional story lives on the About page.
const Founder = () => {
  return (
    <section id="founder" className="bg-white py-14 sm:py-16">
      <div className="wrap">
        <m.div
          {...fadeUp}
          className="rounded-[28px] border border-brand-sand bg-brand-cream px-6 py-10 sm:px-12 sm:py-14"
        >
          <div className="mx-auto flex max-w-[780px] flex-col items-center gap-4 text-center">
            <p className="eyebrow">The founder</p>
            <h2 className="section-title">
              Meet Selina, independent AI consultant
            </h2>
            <blockquote className="display max-w-[620px] text-[22px] font-semibold italic leading-tight text-brand-navy sm:text-[24px] sm:leading-[1.25]">
              I help service business founders stop being the bottleneck by fixing messy workflows before adding AI or automation.
            </blockquote>
            <span aria-hidden="true" className="h-[3px] w-14 rounded-full bg-brand-amber" />
            <p className="text-base leading-relaxed text-[#42566A] sm:text-[17px]">
              I bring more than 20 years of experience across operations, product, technology and data. Having also built and run my own business, I understand the pressure of balancing everyday demands with plans for growth.
            </p>
            <p className="text-base leading-relaxed text-[#42566A] sm:text-[17px]">
              I lead every IntegroAI engagement personally, from understanding your challenges through to recommendations and delivery support.
            </p>
            <Link to={SELINA_STORY_PATH} className="btn-outline-navy mt-2">
              Read Her Story
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default Founder;
