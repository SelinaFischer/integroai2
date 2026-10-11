import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import GuideCover from "@/components/GuideCover";
import { ASSESSMENT_URL, fadeUp, fadeUpDelayed } from "@/lib/motion";
import { GUIDE_FORM_URL, GUIDE_PAGE_PATH, GUIDE_SUBTITLE, GUIDE_TITLE, trackGuideClick } from "@/lib/guide";

// Wording on this page is taken from the guide itself.
const threeIdeas = [
  {
    title: "Find me.",
    label: "SEO · Search engine optimisation",
    text: "Can Google find your website and understand what you offer?",
  },
  {
    title: "Answer me.",
    label: "AEO · Answer engine optimisation",
    text: "Does your content clearly answer the questions your customers are asking?",
  },
  {
    title: "Recommend me.",
    label: "GEO · Generative engine optimisation",
    text: "Can your business appear in an AI-generated answer or recommendation?",
  },
];

const contents = [
  { title: "Why this matters", detail: "Sarah’s story" },
  { title: "SEO, AEO and GEO", detail: "Find me, answer me, recommend me" },
  { title: "Five practical checks", detail: "And the framework behind them" },
  { title: "Your action plan", detail: "Three actions and the AI test" },
  { title: "Your checklist", detail: "Tick off what’s done" },
  { title: "Tools and next steps", detail: "Free tools and help" },
];

type GuideButtonProps = { location: string; className?: string };

const GuideButton = ({ location, className = "btn-amber group" }: GuideButtonProps) => (
  <a
    href={GUIDE_FORM_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackGuideClick(location)}
    className={className}
  >
    Get your free guide
    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
  </a>
);

const AiVisibilityGuide = () => {
  const pageUrl = `https://integroai.tech${GUIDE_PAGE_PATH}`;
  const description =
    "Free guide and checklist from IntegroAI Consulting. Check whether AI can find, understand and recommend your business, and what to do about it. Covers SEO, AEO and GEO in plain English.";

  return (
    <>
      <Helmet>
        <title>Does AI Know Your Business Exists? Free Guide | IntegroAI Consulting</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Does AI know your business exists? Free guide and checklist" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="overflow-hidden bg-midnight-glow pt-[104px] pb-16 sm:pt-[132px] sm:pb-20 lg:pt-[150px] lg:pb-[88px]">
          <div className="wrap flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex min-w-0 flex-col items-start gap-6 lg:flex-[1.3]"
            >
              <p className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-brand-amber sm:text-xs">
                Free guide and checklist
              </p>
              <h1 className="text-[44px] font-semibold leading-none text-white sm:text-[60px] lg:text-[72px]">
                Does AI know
                <br />
                <span className="italic text-brand-amber">your business exists?</span>
              </h1>
              <p className="max-w-[620px] text-lg leading-normal text-brand-mist sm:text-[21px]">{GUIDE_SUBTITLE}</p>
              <GuideButton location="guide-page-hero" />
              <p className="max-w-[560px] text-[15px] leading-relaxed text-brand-mist">
                Leave your name and email, and I’ll send you the guide with practical actions and a checklist.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex min-w-0 justify-center lg:flex-1"
            >
              <GuideCover
                eager
                alt="Cover of the free guide and checklist: Does AI know your business exists? By IntegroAI Consulting"
                className="w-[250px] rotate-2 sm:w-[310px]"
              />
            </motion.div>
          </div>
        </section>

        {/* Why this matters */}
        <section className="bg-brand-ivory py-14 sm:py-16">
          <motion.div {...fadeUp} className="wrap mx-auto flex max-w-[860px] flex-col items-center gap-5 text-center">
            <p className="eyebrow">Why this matters</p>
            <h2 className="section-title">
              When customers ask AI for a business like yours, does yours come up?
            </h2>
            <p className="lede">
              People are already turning to AI for recommendations. They ask it to help plan a holiday, decide what to buy or choose a service. More and more, they also ask it to recommend a business.
            </p>
          </motion.div>
        </section>

        {/* Find me. Answer me. Recommend me. */}
        <section className="bg-white py-14 sm:py-16">
          <div className="wrap flex flex-col gap-9">
            <motion.div {...fadeUp} className="mx-auto flex max-w-[820px] flex-col items-center gap-3.5 text-center">
              <p className="eyebrow">SEO, AEO and GEO</p>
              <h2 className="section-title">Find me. Answer me. Recommend me.</h2>
              <p className="lede">Three simple things to remember. That’s SEO, AEO and GEO.</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {threeIdeas.map((idea, index) => (
                <motion.div key={idea.title} {...fadeUpDelayed(index)} className="card-soft flex flex-col gap-2.5 p-7">
                  <h3 className="display text-[32px] !font-bold leading-[1.08] !text-brand-navy">{idea.title}</h3>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-amber">{idea.label}</p>
                  <p className="text-base leading-relaxed text-brand-slate">{idea.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              {...fadeUp}
              className="mx-auto max-w-[760px] rounded-[20px] bg-brand-cream px-6 py-5 text-center text-base font-semibold leading-relaxed text-brand-navy sm:text-[17px]"
            >
              The good news: you don’t need three different strategies. They work together.
            </motion.p>
          </div>
        </section>

        {/* What's inside */}
        <section className="bg-brand-ivory py-14 sm:py-16">
          <div className="wrap flex flex-col gap-9">
            <motion.div {...fadeUp} className="mx-auto flex max-w-[820px] flex-col items-center gap-3.5 text-center">
              <p className="eyebrow">What’s inside</p>
              <h2 className="section-title">Six short sections, each with something you can do this week</h2>
              <p className="lede">
                This guide shows you how to check whether AI can find, understand and recommend your business, and what to do about it.
              </p>
            </motion.div>

            <ol className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {contents.map((item, index) => (
                <motion.li
                  key={item.title}
                  {...fadeUpDelayed(index)}
                  className="flex items-start gap-4 rounded-[20px] border border-brand-sand bg-white p-6"
                >
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand-amber text-base font-bold text-brand-navy">
                    {index + 1}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-lg font-bold leading-snug text-brand-navy">{item.title}</span>
                    <span className="text-[15px] leading-relaxed text-brand-slate">{item.detail}</span>
                  </span>
                </motion.li>
              ))}
            </ol>

            <motion.div {...fadeUp} className="flex justify-center">
              <GuideButton location="guide-page-contents" className="btn-amber group" />
            </motion.div>
          </div>
        </section>

        {/* Closing call to action */}
        <section
          className="py-16 sm:py-[84px]"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 22%, rgba(30,74,110,0.5), rgba(30,74,110,0) 70%), #050F1B",
          }}
        >
          <motion.div
            {...fadeUp}
            className="mx-auto flex max-w-[900px] flex-col items-center gap-[22px] px-5 text-center sm:px-8"
          >
            <p className="eyebrow">The one question to take away</p>
            <h2 className="display text-[36px] font-semibold leading-[1.06] !text-white sm:text-[50px] lg:text-[60px]">
              What question do you want your business to be{" "}
              <span className="italic text-brand-amber">the answer to?</span>
            </h2>
            <div className="mt-1.5 flex w-full flex-col justify-center gap-3.5 sm:w-auto sm:flex-row">
              <GuideButton location="guide-page-closing" />
              <a
                href={ASSESSMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light"
              >
                Start the free assessment
              </a>
            </div>
            <p className="text-[15px] font-medium text-[#94A3B8]">
              A free guide from IntegroAI Consulting
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default AiVisibilityGuide;
