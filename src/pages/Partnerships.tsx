import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { m } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fadeUp, fadeUpDelayed } from "@/lib/motion";

export const PARTNERSHIPS_PATH = "/partnerships";

// Applications go to the same Formspree form as the contact form, with their
// own subject line so they are easy to spot.
const FORM_ENDPOINT = "https://formspree.io/f/xgoqlpdy";

const partnerTypes = [
  {
    title: "Accountants and bookkeepers",
    text: "You see the margins and the admin load first, and your clients trust your advice.",
  },
  {
    title: "Data and cyber security businesses",
    text: "Your clients ask whether AI is safe to use. You cover the security. I help with the process and adoption.",
  },
  {
    title: "Business coaches and growth advisers",
    text: "You hear about the founder bottleneck every week. That is the problem I fix.",
  },
  {
    title: "IT support providers",
    text: "Your clients ask you about AI. I help them get the processes and people ready for it.",
  },
  {
    title: "HR consultants",
    text: "Your clients need clear AI policies and staff who know how to use it well.",
  },
  {
    title: "Other service businesses",
    text: "Agencies, consultancies and professional firms whose work sits alongside mine, not in competition with it.",
  },
];

const benefits = [
  "15% of the fee for any AI & Operations Diagnostic you introduce",
  "Your client gets clarity on what to fix first, and a plan they can act on",
  "I don’t compete for your work, and I refer it back to you when it comes up",
  "You stay informed about how your introduction is going",
  "Referrals both ways: I introduce my clients to you when they need what you do",
];

const steps = [
  { title: "You introduce", text: "Tell me about a client who could use clarity on AI, with their permission." },
  { title: "I talk to them", text: "A free discovery call to understand the business and what is holding it back." },
  { title: "You’re kept informed", text: "I let you know how it goes, and your fee is paid once the client has paid." },
];

const inputClass =
  "bg-white border-brand-sand text-brand-navy placeholder:text-[#89898E] focus:border-brand-amber focus:ring-brand-amber/20 h-11 rounded-lg";

const ApplicationForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    if (typeof email === "string" && email.trim()) formData.set("_replyto", email.trim());

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.errors?.[0]?.message || data?.error || "Your application could not be sent.");
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your application could not be sent.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="card-soft flex flex-col items-start gap-3 p-7 sm:p-9" role="status">
        <CheckCircle2 className="h-8 w-8 text-brand-teal" aria-hidden="true" />
        <h3 className="font-heading text-[26px] font-semibold text-brand-navy">Thank you, your application is in.</h3>
        <p className="text-[16px] leading-relaxed text-brand-slate">
          I’ll read it and get back to you to arrange a short call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-soft grid grid-cols-1 gap-5 p-7 sm:grid-cols-2 sm:p-9">
      <input type="hidden" name="_subject" value="Partnership application" />
      <input type="hidden" name="form" value="Partnership application" />
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-name">Full name</Label>
        <Input id="p-name" name="name" required autoComplete="name" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-email">Email</Label>
        <Input id="p-email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-company">Company</Label>
        <Input id="p-company" name="company" required autoComplete="organization" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-role">Your role</Label>
        <Input id="p-role" name="role" autoComplete="organization-title" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-website">Website</Label>
        <Input id="p-website" name="website" type="url" placeholder="https://" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-type">What kind of business are you?</Label>
        <select
          id="p-type"
          name="partner_type"
          required
          defaultValue=""
          className={`${inputClass} w-full border px-3 text-[15px]`}
        >
          <option value="" disabled>
            Choose one
          </option>
          {partnerTypes.map((t) => (
            <option key={t.title}>{t.title}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="p-about">Tell me about your business and the clients you work with</Label>
        <Textarea
          id="p-about"
          name="message"
          required
          rows={5}
          className="rounded-lg border-brand-sand bg-white text-brand-navy focus:border-brand-amber focus:ring-brand-amber/20"
        />
      </div>
      <div className="flex flex-col items-start gap-4 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-amber btn-focus group disabled:opacity-70">
          <span className="sheen" aria-hidden="true" />
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Apply to partner
              <ArrowRight
                className="nudge-arrow h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </>
          )}
        </button>
        {status === "error" && (
          <p className="text-[14px] text-red-700" role="alert">
            {error} Please try again.
          </p>
        )}
        <p className="text-[13px] leading-relaxed text-brand-slate">
          Your details are used only to reply to your application. See the{" "}
          <Link to="/privacy-policy" className="underline decoration-brand-amber underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
};

const Partnerships = () => {
  const pageUrl = `https://integroai.tech${PARTNERSHIPS_PATH}`;
  const description =
    "Become an IntegroAI Consulting referral partner. If your clients run service businesses, introduce them to clarity on AI and earn 15% of the fee for any AI & Operations Diagnostic you introduce.";

  return (
    <>
      <Helmet>
        <title>Referral Partners | IntegroAI Consulting</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Become an IntegroAI referral partner" />
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
              Referral partners
            </p>
            <h1 className="text-[40px] font-semibold leading-[1.05] text-white sm:text-[52px] lg:text-[60px]">
              <span className="block">Do your clients run service businesses?</span>
              <span className="block italic text-brand-amber">Introduce them to clarity on AI.</span>
            </h1>
            <p className="max-w-[640px] text-[17px] leading-normal text-brand-mist sm:text-[19px]">
              When your clients ask you about AI, send them to someone you can trust. I help service businesses fix the
              work behind the bottleneck before adding AI. You earn 15% of the fee for any AI &amp; Operations
              Diagnostic you introduce.
            </p>
            <a href="#apply" className="btn-amber btn-focus group">
              <span className="sheen" aria-hidden="true" />
              Apply to partner
              <ArrowRight
                className="nudge-arrow h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.4}
                aria-hidden="true"
              />
            </a>
          </m.div>
        </section>

        <section className="bg-brand-ivory py-14 sm:py-20">
          <div className="wrap">
            <m.h2 {...fadeUp} className="font-heading text-[32px] font-semibold leading-[1.15] text-brand-navy sm:text-[40px]">
              Who I partner with
            </m.h2>
            <m.p {...fadeUp} className="mt-3 max-w-[640px] text-[17px] leading-relaxed text-brand-slate">
              Service businesses whose clients are service businesses too.
            </m.p>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {partnerTypes.map((t, i) => (
                <m.article key={t.title} {...fadeUpDelayed(i)} className="card-soft flex flex-col gap-2 p-7">
                  <h3 className="font-heading text-[21px] font-semibold leading-[1.2] text-brand-navy">{t.title}</h3>
                  <p className="text-[15.5px] leading-relaxed text-brand-slate">{t.text}</p>
                </m.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <m.h2 {...fadeUp} className="font-heading text-[32px] font-semibold leading-[1.15] text-brand-navy sm:text-[40px]">
                What you can expect
              </m.h2>
              <ul className="mt-7 flex flex-col gap-4">
                {benefits.map((b, i) => (
                  <m.li key={b} {...fadeUpDelayed(i)} className="flex gap-3 text-[16.5px] leading-relaxed text-brand-navy">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
                    <span>{b}</span>
                  </m.li>
                ))}
              </ul>
            </div>
            <div>
              <m.h2 {...fadeUp} className="font-heading text-[32px] font-semibold leading-[1.15] text-brand-navy sm:text-[40px]">
                How it works
              </m.h2>
              <ol className="mt-7 flex flex-col gap-5">
                {steps.map((s, i) => (
                  <m.li key={s.title} {...fadeUpDelayed(i)} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-amber font-semibold text-brand-navy">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[17px] font-semibold text-brand-navy">{s.title}</p>
                      <p className="mt-1 text-[15.5px] leading-relaxed text-brand-slate">{s.text}</p>
                    </div>
                  </m.li>
                ))}
              </ol>
              <m.p {...fadeUp} className="mt-7 text-[15px] leading-relaxed text-brand-slate">
                We agree simple written terms before your first introduction, so you know exactly what to expect.
              </m.p>
            </div>
          </div>
        </section>

        <section id="apply" className="scroll-mt-24 bg-brand-ivory py-14 sm:py-20">
          <div className="wrap max-w-[860px]">
            <m.h2 {...fadeUp} className="font-heading text-[32px] font-semibold leading-[1.15] text-brand-navy sm:text-[40px]">
              Apply to partner
            </m.h2>
            <m.p {...fadeUp} className="mb-8 mt-3 max-w-[640px] text-[17px] leading-relaxed text-brand-slate">
              Tell me a little about your business. If it looks like a good fit, I’ll be in touch to arrange a short call.
            </m.p>
            <ApplicationForm />
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
};

export default Partnerships;
