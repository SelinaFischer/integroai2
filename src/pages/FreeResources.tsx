import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { ASSESSMENT_URL, DISCOVERY_CALL_URL, fadeUp, fadeUpDelayed } from "@/lib/motion";
import { GUIDE_FORM_URL, GUIDE_PAGE_PATH, GUIDE_TITLE, trackGuideClick } from "@/lib/guide";
import { CHEAT_SHEET_FORM_URL, trackCheatSheetClick } from "@/lib/cheatSheet";

export const FREE_RESOURCES_PATH = "/free-resources";

// Each button opens the resource's own form or tool directly, so visitors
// are not walked round extra pages before they can sign up.
const resources = [
  {
    label: "Free AI cheat sheet",
    title: "How can AI help your business?",
    text: "Find the work AI could do for you. Map your week, brief AI clearly and check what it gives back.",
    cta: "Get the free cheat sheet",
    href: CHEAT_SHEET_FORM_URL,
    onClick: () => trackCheatSheetClick("free-resources"),
    more: { to: "/blog/how-can-ai-help-your-business", label: "Read the article" },
  },
  {
    label: "Free guide and checklist",
    title: GUIDE_TITLE,
    text: "Check whether Google and AI tools can find, understand and recommend your business, and what to fix first.",
    cta: "Get the free guide",
    href: GUIDE_FORM_URL,
    onClick: () => trackGuideClick("free-resources"),
    more: { to: GUIDE_PAGE_PATH, label: "What’s inside the guide" },
  },
  {
    label: "Free 5-minute assessment",
    title: "How ready is your business for AI?",
    text: "Answer a few short questions and get an instant scorecard, with the priority to focus on first.",
    cta: "Start the free assessment",
    href: ASSESSMENT_URL,
    onClick: undefined,
    more: undefined,
  },
];

const FreeResources = () => {
  const pageUrl = `https://integroai.tech${FREE_RESOURCES_PATH}`;
  const description =
    "Free AI resources from IntegroAI Consulting, a UK-based AI consultancy: an AI cheat sheet, an AI visibility guide and checklist, and a 5-minute AI readiness assessment for founders and business owners.";

  return (
    <>
      <Helmet>
        <title>Free AI Resources for Business Owners | IntegroAI Consulting</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Free AI resources for business owners" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
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
              Free resources
            </p>
            <h1 className="text-[40px] font-semibold leading-[1.05] text-white sm:text-[52px] lg:text-[60px]">
              <span className="block">Get clarity on AI.</span>
              <span className="block italic text-brand-amber">Free, practical, yours to keep.</span>
            </h1>
            <p className="max-w-[620px] text-[17px] leading-normal text-brand-mist sm:text-[19px]">
              Practical tools for founders and business owners. Pick the one that fits where you are today.
            </p>
          </m.div>
        </section>

        <section className="bg-brand-ivory py-14 sm:py-16">
          <div className="wrap grid grid-cols-1 gap-5 md:grid-cols-3">
            {resources.map((resource, index) => (
              <m.article
                key={resource.title}
                {...fadeUpDelayed(index)}
                className="card-soft flex flex-col gap-3 p-7"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-teal">{resource.label}</p>
                <h2 className="font-heading text-[26px] font-semibold leading-[1.15] text-brand-navy">{resource.title}</h2>
                <p className="flex-1 text-[15.5px] leading-relaxed text-brand-slate">{resource.text}</p>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={resource.onClick}
                  className="btn-amber group mt-2 w-fit"
                >
                  {resource.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                </a>
                {resource.more ? (
                  <Link
                    to={resource.more.to}
                    className="w-fit text-[14px] font-medium text-brand-navy underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-teal"
                  >
                    {resource.more.label}
                  </Link>
                ) : (
                  <span className="text-[14px] text-brand-slate">Takes about five minutes.</span>
                )}
              </m.article>
            ))}
          </div>

          <m.p {...fadeUp} className="wrap mt-10 text-center text-[16px] leading-relaxed text-brand-slate">
            Prefer to talk it through?{" "}
            <a
              href={DISCOVERY_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-navy underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-teal"
            >
              Book a free AI Readiness Discovery Call
            </a>
            .
          </m.p>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default FreeResources;
