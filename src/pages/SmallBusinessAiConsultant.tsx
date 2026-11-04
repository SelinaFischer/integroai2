import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ASSESSMENT_URL, DISCOVERY_CALL_URL, fadeUp, fadeUpDelayed } from "@/lib/motion";
import { CHEAT_SHEET_FORM_URL, trackCheatSheetClick } from "@/lib/cheatSheet";

export const SMALL_BUSINESS_PATH = "/ai-consultant-small-business-uk";

const textLink =
  "font-medium text-brand-navy underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-teal";

// Same wording as the homepage "Who we work with" section.
const signs = [
  {
    title: "Every decision comes back to you",
    text: "Approvals, fixes and client issues still run through you. The business can't move faster than your inbox.",
  },
  {
    title: "The team stuck in admin",
    text: "Your team spends hours preparing reports, chasing updates and entering the same data across different systems. That leaves less time to serve clients.",
  },
  {
    title: "More clients, less profit",
    text: "Revenue is up. So is headcount. Each new client adds workload faster than profit.",
  },
  {
    title: "Using AI, but not seeing the return",
    text: "The tools are in. The team uses them here and there. The time and margin gains haven't shown up.",
  },
];

const tasks = [
  "Routing new enquiries",
  "Follow-up emails and reminders",
  "Meeting notes and action lists",
  "Weekly reports",
  "CRM updates and repeated data entry",
  "First drafts your team reviews",
];

const outcomes = [
  {
    title: "Clarity on what to fix first",
    text: "The AI & Operations Diagnostic shows what is slowing the business down, what to fix first and where AI is worth the investment.",
  },
  {
    title: "Your priorities, your decision",
    text: "You choose what to act on first. Each next stage is agreed before it begins.",
  },
  {
    title: "Changes that keep delivering value",
    text: "Your workflows, data, people and governance ready for the changes you chose. People stay in control at every stage.",
  },
];

const faqs = [
  {
    question: "What does an AI consultant do for a small business?",
    answer:
      "An AI consultant finds where time and margin are being lost, helps you decide what to fix first and shows where AI is worth the investment. Sometimes the right answer is a simpler process, not AI.",
  },
  {
    question: "How much does an AI consultant cost for a small business?",
    answer:
      "It depends on the scope. Every engagement is scoped to your priorities, your team and your existing systems, and fees are agreed with you before work begins. The online assessment and the 30-minute Discovery Call are both free.",
  },
  {
    question: "Do I need to be technical to work with an AI consultant?",
    answer:
      "No. You need to know your business and where the work gets stuck. Tool choice comes later, once the problem and priorities are clear.",
  },
  {
    question: "Is my business too small for AI consulting?",
    answer:
      "The Discovery Call is the quickest way to find out. If a simpler process or a free resource is the better next step, I will tell you.",
  },
  {
    question: "Do you only work with businesses in London?",
    answer: "No. IntegroAI Consulting is a UK-based AI consultancy serving businesses across the UK.",
  },
  {
    question: "Will you recommend a particular AI tool?",
    answer:
      "Not as a starting point. My advice is independent and technology-agnostic. Recommendations follow the needs of your business, not a preferred platform, vendor or predetermined solution.",
  },
];

const SmallBusinessAiConsultant = () => {
  const pageUrl = `https://integroai.tech${SMALL_BUSINESS_PATH}`;
  const title = "AI Consultant for Small Businesses in the UK | IntegroAI Consulting";
  const description =
    "Independent AI consulting for UK small businesses. Find what is slowing your business down, decide what to fix first and see where AI is worth the investment. Start with a free assessment.";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI consulting for small businesses",
    serviceType: "AI consulting",
    url: pageUrl,
    description,
    areaServed: { "@type": "Country", name: "United Kingdom" },
    audience: { "@type": "BusinessAudience", audienceType: "Small businesses" },
    provider: {
      "@type": "ProfessionalService",
      name: "IntegroAI Consulting",
      url: "https://integroai.tech/",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main id="main-content">
        <section className="bg-midnight-glow pt-[104px] pb-14 sm:pt-[132px] sm:pb-16 lg:pt-[150px] lg:pb-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="wrap flex flex-col items-start gap-6"
          >
            <p className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-brand-amber sm:text-xs">
              Independent UK AI consultant
            </p>
            <h1 className="text-[38px] font-semibold leading-[1.08] text-white sm:text-[48px] lg:text-[54px]">
              <span className="block">AI consulting for UK small businesses.</span>
              <span className="block italic text-brand-amber">Clarity before AI investment.</span>
            </h1>
            <p className="max-w-[640px] text-[17px] leading-normal text-brand-mist sm:text-[19px]">
              Understand what’s slowing your business down, prioritise what matters, and use AI and automation where they can free up time, delight customers and support growth.
            </p>
            <p className="max-w-[640px] text-[15px] leading-normal text-brand-mist/80">
              IntegroAI Consulting is an independent UK AI consultancy. Founder Selina Fischer helps business owners cut repetitive work and decide where AI is worth investing, before they spend on tools.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href={ASSESSMENT_URL} target="_blank" rel="noopener noreferrer" className="btn-amber group">
                Start the free assessment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </a>
              <a href={DISCOVERY_CALL_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                Book a Discovery Call
              </a>
            </div>
          </m.div>
        </section>

        <section className="bg-brand-ivory py-14 sm:py-16">
          <div className="wrap flex flex-col gap-8">
            <m.h2 {...fadeUp} className="text-[30px] font-semibold leading-tight text-brand-navy sm:text-[36px]">
              Does this sound like your business?
            </m.h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {signs.map((sign, index) => (
                <m.div key={sign.title} {...fadeUpDelayed(index)} className="card-soft flex flex-col gap-2.5 p-[26px]">
                  <h3 className="text-lg leading-tight">{sign.title}</h3>
                  <p className="text-[15px] leading-relaxed text-brand-slate">{sign.text}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className="wrap grid grid-cols-1 gap-9 lg:grid-cols-2 lg:gap-14">
            <m.div {...fadeUp} className="flex flex-col gap-4">
              <h2 className="text-[30px] font-semibold leading-tight text-brand-navy sm:text-[36px]">
                Which work could AI take off your plate?
              </h2>
              <p className="text-[16px] leading-relaxed text-brand-slate">
                Start with work that is frequent, repetitive and easy to check. Your team reviews the result and stays in charge of what goes out.
              </p>
              <p className="text-[16px] leading-relaxed text-brand-slate">
                Not sure where to begin? Read{" "}
                <Link to="/blog/which-tasks-to-automate-with-ai-first" className={textLink}>
                  which tasks to automate with AI first
                </Link>
                .
              </p>
            </m.div>
            <m.ul {...fadeUp} className="grid list-none grid-cols-1 content-start gap-x-8 sm:grid-cols-2">
              {tasks.map((task) => (
                <li key={task} className="border-b border-brand-sand py-3.5 text-[16px] text-brand-navy">
                  {task}
                </li>
              ))}
            </m.ul>
          </div>
        </section>

        <section className="bg-brand-ivory py-14 sm:py-16">
          <div className="wrap flex flex-col gap-8">
            <m.h2 {...fadeUp} className="text-[30px] font-semibold leading-tight text-brand-navy sm:text-[36px]">
              Where you end up
            </m.h2>
            <ol className="flex list-none flex-col">
              {outcomes.map((outcome, index) => (
                <m.li
                  key={outcome.title}
                  {...fadeUpDelayed(index)}
                  className="grid grid-cols-[40px_1fr] gap-x-3 border-t border-brand-sand py-6 md:grid-cols-[40px_1fr_1.6fr] md:gap-x-6"
                >
                  <span className="font-heading text-2xl italic text-brand-teal">{index + 1}</span>
                  <h3 className="text-xl leading-tight">{outcome.title}</h3>
                  <p className="col-start-2 mt-2 text-[16px] leading-relaxed text-brand-slate md:col-start-3 md:mt-0">{outcome.text}</p>
                </m.li>
              ))}
            </ol>
            <p className="text-[16px] leading-relaxed text-brand-slate">
              See every stage on{" "}
              <Link to="/work-with-me" className={textLink}>
                Work With Me
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className="wrap flex flex-col gap-8">
            <m.h2 {...fadeUp} className="text-[30px] font-semibold leading-tight text-brand-navy sm:text-[36px]">
              AI consulting questions for small businesses
            </m.h2>
            <div className="grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.question} className="flex flex-col gap-2">
                  <h3 className="text-lg leading-snug">{faq.question}</h3>
                  <p className="text-[15.5px] leading-relaxed text-brand-slate">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-midnight-glow py-14 sm:py-16">
          <m.div {...fadeUp} className="wrap flex flex-col items-center gap-6 text-center">
            <h2 className="text-[30px] font-semibold leading-tight text-white sm:text-[36px]">
              Get clarity before you spend on AI
            </h2>
            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <a href={ASSESSMENT_URL} target="_blank" rel="noopener noreferrer" className="btn-amber group">
                Start the free assessment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </a>
              <a href={DISCOVERY_CALL_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                Book a Discovery Call
              </a>
            </div>
            <a
              href={CHEAT_SHEET_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCheatSheetClick("small-business-page")}
              className="text-sm text-brand-seafoam underline decoration-brand-seaglass/60 underline-offset-4 hover:text-white"
            >
              Not ready yet? Get the free AI Cheat Sheet
            </a>
          </m.div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default SmallBusinessAiConsultant;
