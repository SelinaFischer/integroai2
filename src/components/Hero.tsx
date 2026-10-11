import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import portrait from "@/assets/selina-hero-portrait.webp";
import { ASSESSMENT_URL, DISCOVERY_CALL_URL } from "@/lib/motion";
import { GUIDE_PAGE_PATH, trackGuideClick } from "@/lib/guide";

const Hero = () => {
  return (
    <section className="bg-midnight-glow pt-[104px] pb-16 sm:pt-[132px] sm:pb-20 lg:pt-[162px] lg:pb-[88px]">
      <div className="wrap flex flex-col items-center gap-12 lg:flex-row lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex min-w-0 flex-col items-start gap-6 lg:flex-[1.35]"
        >
          <p className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-brand-amber sm:text-xs">
            Independent AI consultancy for founder-led service businesses
          </p>

          <h1 className="text-[46px] font-semibold leading-none text-white sm:text-[64px] lg:text-[80px]">
            Stop Automating
            <br />
            <span className="italic text-brand-amber">Broken Processes.</span>
          </h1>

          <p className="max-w-[660px] text-lg leading-normal text-brand-mist sm:text-[21px]">
            Find where operational firefighting is draining time and capacity. Then prioritise where AI can create real value.
          </p>

          {/* Buttons, with the free guide centred beneath them as a quiet text link
              so the amber button stays the one main action. */}
          <div className="flex w-full flex-col gap-7 sm:w-fit">
            <div className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
              <a
                href={ASSESSMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-amber group px-[30px] py-[18px] text-lg"
              >
                Start the free assessment
                <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" strokeWidth={2.6} aria-hidden="true" />
              </a>
              <a
                href={DISCOVERY_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light px-7 py-4 text-lg"
              >
                Book a Discovery Call
              </a>
            </div>

            <Link
              to={GUIDE_PAGE_PATH}
              onClick={() => trackGuideClick("hero")}
              className="group flex flex-col items-center gap-1 self-center text-center"
            >
              <span className="text-sm font-medium leading-snug text-white/85 sm:text-[15px]">
                When customers ask AI for a business like yours, does yours come up?
              </span>
              <span className="flex w-fit items-center gap-1.5 text-[13px] leading-snug text-brand-mist underline decoration-white/40 decoration-1 underline-offset-4 transition-colors duration-200 group-hover:text-white group-hover:decoration-white sm:text-sm">
                Get your free guide and checklist
                <ArrowRight className="h-3.5 w-3.5 flex-none transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex min-w-0 flex-col items-center gap-[22px] lg:flex-1"
        >
          <div className="h-[350px] w-[284px] max-w-full overflow-hidden rounded-[142px_142px_28px_28px] bg-brand-navy shadow-[12px_12px_0_#FF9900] sm:h-[420px] sm:w-[340px] sm:rounded-[170px_170px_28px_28px] sm:shadow-[14px_14px_0_#FF9900]">
            <img
              src={portrait}
              alt="Selina Fischer, founder of IntegroAI Consulting"
              width={680}
              height={850}
              fetchPriority="high"
              decoding="async"
              className="block h-full w-full object-cover object-top opacity-90"
            />
          </div>
          <p className="text-sm font-normal text-brand-mist">Selina Fischer, Founder</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
