import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import portrait from "@/assets/selina-hero-portrait.webp";
import portrait340 from "@/assets/selina-hero-portrait-340.webp";
import portrait510 from "@/assets/selina-hero-portrait-510.webp";
import { ASSESSMENT_URL, DISCOVERY_CALL_URL } from "@/lib/motion";
import { GUIDE_FORM_URL, trackGuideClick } from "@/lib/guide";

const Hero = () => {
  return (
    <section className="bg-midnight-glow pt-[104px] pb-16 sm:pt-[132px] sm:pb-20 lg:pt-[162px] lg:pb-[88px]">
      <div className="wrap flex flex-col items-center gap-12 lg:flex-row lg:gap-14">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex min-w-0 flex-col items-start gap-6 lg:flex-[1.35]"
        >
          <p className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-brand-amber sm:text-xs">
            Independent AI consultancy for founder-led service businesses
          </p>

          <h1 className="text-[40px] font-semibold leading-[1.05] text-white sm:text-[52px] lg:text-[60px]">
            <span className="block">Less firefighting.</span>
            <span className="block italic text-brand-amber [text-wrap:balance]">More time for the work you love.</span>
          </h1>

          <p className="max-w-[600px] text-[17px] leading-normal text-brand-mist sm:text-[19px]">
            Understand what is slowing your business down, decide what to improve first, and use AI where it can make a practical difference.
          </p>

          {/* Buttons, with the free guide centred beneath them as a light teal text link
              so the amber button stays the one main action. */}
          <div className="flex w-full flex-col gap-7 sm:w-fit">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={ASSESSMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-amber group"
              >
                Start the free assessment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </a>
              <a
                href={DISCOVERY_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light"
              >
                Book a Discovery Call
              </a>
            </div>

            <a
              href={GUIDE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGuideClick("hero")}
              className="group flex flex-col items-center gap-1 self-center text-center"
            >
              <span className="text-sm font-semibold leading-snug text-brand-seaglass sm:text-[15px]">
                How visible is your business to AI?
              </span>
              <span className="flex w-fit items-center gap-1.5 text-[13px] leading-snug text-brand-seafoam underline decoration-brand-seaglass/60 decoration-1 underline-offset-4 transition-colors duration-200 group-hover:text-white group-hover:decoration-white sm:text-sm">
                Get your free AI visibility guide and checklist
                <ArrowRight className="h-3.5 w-3.5 flex-none transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </span>
            </a>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex min-w-0 flex-col items-center gap-[22px] lg:flex-1"
        >
          <div className="h-[350px] w-[284px] max-w-full overflow-hidden rounded-[142px_142px_28px_28px] bg-brand-navy shadow-[12px_12px_0_#FF9900] sm:h-[420px] sm:w-[340px] sm:rounded-[170px_170px_28px_28px] sm:shadow-[14px_14px_0_#FF9900]">
            <img
              src={portrait}
              srcSet={`${portrait340} 340w, ${portrait510} 510w, ${portrait} 680w`}
              sizes="(min-width: 640px) 340px, 284px"
              alt="Selina Fischer, founder of IntegroAI Consulting"
              width={680}
              height={850}
              fetchPriority="high"
              decoding="async"
              className="block h-full w-full object-cover object-top opacity-90"
            />
          </div>
          <a
            href="#founder"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("founder")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-normal text-brand-mist underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
          >
            Meet the founder, Selina
          </a>
        </m.div>
      </div>
    </section>
  );
};

export default Hero;
