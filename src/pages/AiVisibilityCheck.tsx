import { useEffect, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Check, Info, Loader2, X } from "lucide-react";
import { m } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { DISCOVERY_CALL_URL, fadeUp } from "@/lib/motion";
import { GUIDE_FORM_URL, trackGuideClick } from "@/lib/guide";
import {
  VISIBILITY_CHECK_PATH,
  runVisibilityCheck,
  trackVisibilityCheck,
  type VisibilityCheckItem,
  type VisibilityCheckResult,
} from "@/lib/visibilityCheck";

const textLink =
  "font-medium text-brand-navy underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-teal";
const inputClass =
  "w-full rounded-xl border border-brand-sand bg-white px-4 py-3 text-[16px] text-brand-navy outline-none transition-colors focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";
const labelClass = "mb-1.5 block text-sm font-semibold text-brand-navy";

const errorMessages: Record<string, string> = {
  details: "Please add your name and business name.",
  email: "Please enter a valid email address.",
  website: "Please enter a valid website address, such as yourbusiness.co.uk.",
  too_many: "This website or email has been checked several times recently. Please try again in a few hours.",
  busy: "We have reached today's limit for free checks. Please try again tomorrow.",
  not_configured: "The check isn't switched on yet. Please try again soon.",
  server: "Something went wrong on our side. Please try again.",
};
const fallbackError = "We couldn't run the check. Please try again in a moment.";

const faqs = [
  {
    question: "What does the AI visibility check look at?",
    answer:
      "It looks at the page you enter and basics such as whether main AI crawlers are blocked in robots.txt, whether your words can be read without JavaScript, and whether your titles, headings, structured data and sitemap are in place.",
  },
  {
    question: "Will it tell me if ChatGPT recommends my business?",
    answer:
      "No. It checks whether your website is easy for AI tools to read. It does not ask AI tools about your business. Nobody can guarantee that an AI tool will recommend you.",
  },
  {
    question: "How is the score worked out?",
    answer:
      "Each item carries points, adding up to 100. The score is a quick guide to your website basics, not a measure of your rankings or of how often AI tools mention you.",
  },
  {
    question: "Why couldn't it read my website?",
    answer:
      "Some websites block automated visitors. That doesn't always mean AI crawlers are blocked, but it is worth checking with whoever manages your website.",
  },
];

const statusIcon = (status: VisibilityCheckItem["status"]) => {
  if (status === "pass") return <Check className="h-5 w-5 text-brand-teal" strokeWidth={2.6} aria-label="In place" />;
  if (status === "warn") return <AlertTriangle className="h-5 w-5 text-brand-amber" strokeWidth={2.2} aria-label="Needs work" />;
  if (status === "fail") return <X className="h-5 w-5 text-[#B4483C]" strokeWidth={2.6} aria-label="Missing" />;
  return <Info className="h-5 w-5 text-brand-slate" strokeWidth={2.2} aria-label="Optional" />;
};

const AiVisibilityCheck = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<VisibilityCheckResult | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Brings the result into view, as it appears below the form.
  useEffect(() => {
    if (result && result.status !== "ignored") {
      document.getElementById("your-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const pageUrl = `https://integroai.tech${VISIBILITY_CHECK_PATH}`;
  const title = "Free AI Visibility Check for Your Website | IntegroAI Consulting";
  const description =
    "Can AI tools read your website? Run a free AI visibility check, see what is helping or blocking them, and get a report of what to fix first.";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");
    setLoading(true);
    setError("");
    setResult(null);
    trackVisibilityCheck("visibility_check_submit");
    try {
      const response = await runVisibilityCheck({
        name: data.get("name"),
        business: data.get("business"),
        website: data.get("website"),
        email,
        tips: data.get("tips") === "on",
        company_website: data.get("company_website"),
      });
      if (response.ok) {
        setSubmittedEmail(email);
        setResult(response);
        trackVisibilityCheck("visibility_check_complete");
      } else {
        setError(errorMessages[response.error || ""] || fallbackError);
      }
    } catch {
      setError(fallbackError);
    } finally {
      setLoading(false);
    }
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
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main id="main-content">
        <section className="bg-midnight-glow pt-[104px] pb-14 sm:pt-[132px] sm:pb-16 lg:pt-[150px] lg:pb-20">
          <div className="wrap grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex min-w-0 flex-col items-start gap-6"
            >
              <p className="text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-brand-amber sm:text-xs">
                Free AI visibility check
              </p>
              <h1 className="text-[38px] font-semibold leading-[1.08] text-white sm:text-[48px] lg:text-[54px]">
                <span className="block">Can AI read your website?</span>
                <span className="block italic text-brand-amber">Get a clear answer for free.</span>
              </h1>
              <p className="max-w-[560px] text-[17px] leading-normal text-brand-mist sm:text-[19px]">
                See what is helping or blocking AI tools from reading your site, then get a report of what to fix first.
              </p>
              <ul className="flex list-none flex-col gap-2.5 text-[15.5px] text-brand-mist">
                {["Your score out of 100, on screen", "A clear list of what is in place and what is missing", "A report by email showing what to do next"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-brand-amber" strokeWidth={2.6} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </m.div>

            <m.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="flex min-w-0 flex-col gap-4 rounded-[20px] bg-white p-6 shadow-lg sm:p-7"
            >
              <div>
                <label htmlFor="vc-website" className={labelClass}>Your website</label>
                <input id="vc-website" name="website" required maxLength={300} placeholder="yourbusiness.co.uk" autoComplete="url" className={inputClass} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label htmlFor="vc-name" className={labelClass}>Your name</label>
                  <input id="vc-name" name="name" required maxLength={80} autoComplete="name" className={inputClass} />
                </div>
                <div className="min-w-0">
                  <label htmlFor="vc-business" className={labelClass}>Business name</label>
                  <input id="vc-business" name="business" required maxLength={120} autoComplete="organization" className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="vc-email" className={labelClass}>Email for your report</label>
                <input id="vc-email" name="email" type="email" required maxLength={160} autoComplete="email" className={inputClass} />
              </div>
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="vc-company-website">Leave this empty</label>
                <input id="vc-company-website" name="company_website" tabIndex={-1} autoComplete="off" />
              </div>
              <label className="flex items-start gap-2.5 text-sm leading-snug text-brand-slate">
                <input type="checkbox" name="tips" className="mt-0.5 h-4 w-4 flex-none accent-brand-teal" />
                <span>Send me occasional practical AI tips. Optional.</span>
              </label>
              <button type="submit" disabled={loading} className="btn-amber group w-full justify-center disabled:opacity-70">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Checking your website
                  </>
                ) : (
                  <>
                    Check my website
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="text-[13px] leading-snug text-brand-slate">
                We use your details to run the check, email your report and keep a record of your request. See our{" "}
                <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-brand-navy">privacy policy</Link>.
              </p>
              <div aria-live="polite">
                {loading && <p className="text-sm text-brand-slate">This can take up to a minute.</p>}
                {error && <p className="text-sm font-medium text-[#B4483C]">{error}</p>}
              </div>
            </m.form>
          </div>
        </section>

        {result && result.status === "scanned" && (
          <section id="your-result" className="scroll-mt-20 bg-brand-ivory py-14 sm:py-16">
            <div className="wrap flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-teal">Your result</p>
                <h2 className="text-[34px] font-semibold leading-tight text-brand-navy sm:text-[42px]">
                  {result.score}/100: {result.band}
                </h2>
                <p className="break-words text-[15.5px] text-brand-slate">{result.url}</p>
                <p className="text-[15.5px] text-brand-slate">
                  {result.emailSent
                    ? `Your report is on its way to ${submittedEmail}. It explains what to do about each item below.`
                    : "We couldn't send your report by email just now, so please keep a note of this result."}
                </p>
              </div>
              <ul className="flex list-none flex-col">
                {result.checks?.map((check) => (
                  <li key={check.id} className="grid grid-cols-[32px_1fr] gap-x-2 border-t border-brand-sand py-4 md:grid-cols-[32px_1fr_1.5fr] md:gap-x-5">
                    <span className="pt-0.5">{statusIcon(check.status)}</span>
                    <h3 className="text-[17px] leading-snug">{check.label}</h3>
                    <p className="col-start-2 mt-1 min-w-0 break-words text-[15px] leading-relaxed text-brand-slate md:col-start-3 md:mt-0">{check.found}</p>
                  </li>
                ))}
              </ul>
              <p className="text-[14.5px] leading-relaxed text-brand-slate">
                This score shows how easy your website is for AI tools to read. It doesn't show whether they mention or recommend your business.
              </p>
              <a
                href={DISCOVERY_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackVisibilityCheck("visibility_check_call_click")}
                className="btn-amber group w-fit"
              >
                Book a free 30-minute call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </a>
            </div>
          </section>
        )}

        {result && result.status === "unreadable" && (
          <section id="your-result" className="scroll-mt-20 bg-brand-ivory py-14 sm:py-16">
            <div className="wrap flex flex-col items-start gap-4">
              <h2 className="text-[30px] font-semibold leading-tight text-brand-navy sm:text-[36px]">
                We couldn't read this website automatically
              </h2>
              <p className="max-w-[680px] text-[16px] leading-relaxed text-brand-slate">
                It may block automated visitors. That doesn't always mean AI crawlers are blocked, but it is worth checking. Book a free call and we can look at it together.
              </p>
              <a
                href={DISCOVERY_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackVisibilityCheck("visibility_check_call_click")}
                className="btn-amber group w-fit"
              >
                Book a free 30-minute call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </a>
            </div>
          </section>
        )}

        <section className="bg-white py-14 sm:py-16">
          <div className="wrap flex flex-col gap-8">
            <m.h2 {...fadeUp} className="text-[30px] font-semibold leading-tight text-brand-navy sm:text-[36px]">
              AI visibility check questions
            </m.h2>
            <div className="grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.question} className="flex flex-col gap-2">
                  <h3 className="text-lg leading-snug">{faq.question}</h3>
                  <p className="text-[15.5px] leading-relaxed text-brand-slate">{faq.answer}</p>
                </div>
              ))}
            </div>
            <p className="text-[15.5px] leading-relaxed text-brand-slate">
              Want to go further? Read{" "}
              <Link to="/blog/how-to-get-your-business-found-on-chatgpt" className={textLink}>how to get your business found by ChatGPT and other AI tools</Link>
              {" "}or{" "}
              <a href={GUIDE_FORM_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackGuideClick("visibility-check")} className={textLink}>get the free AI visibility guide</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default AiVisibilityCheck;
