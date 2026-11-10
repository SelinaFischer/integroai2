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
    text: "You see where manual work costs clients time and money. Introduce businesses that need help simplifying admin and improving their processes.",
  },
  {
    title: "Business coaches and advisers",
    text: "You help owners identify what needs to change. I help turn operational priorities into practical improvements.",
  },
  {
    title: "IT and cyber security providers",
    text: "Your clients ask about AI, but may need help beyond the technology. I support workflow improvements and team adoption alongside your expertise.",
  },
  {
    title: "HR consultants and service providers",
    text: "You support business owners and their teams. When clients need help with AI, automation or everyday processes, I can provide complementary support.",
  },
  {
    title: "Hospitality professionals",
    text: "You work in or support hotels, restaurants, serviced accommodation or other hospitality businesses. Introduce operators who need help with repetitive admin, enquiries and follow-up.",
  },
  {
    title: "Property professionals",
    text: "You work in estate agency, lettings, property management or commercial property. Introduce business owners who need help simplifying processes and managing enquiries.",
  },
];

const businessTypes = [
  "Accountancy or bookkeeping",
  "Business coaching or advisory",
  "IT or cyber security",
  "HR or people consultancy",
  "Marketing, web or creative services",
  "Hospitality",
  "Property",
  "Other",
];

const signals = [
  "“We spend too much time on admin.”",
  "“Enquiries and follow-ups keep slipping through.”",
  "“Our systems don’t work well together.”",
  "“We want to use AI, but don’t know where to start.”",
  "“We’ve tried AI tools, but haven’t seen much benefit.”",
];

const expectations = [
  {
    title: "Practical help for your client",
    text: "An honest assessment of their needs and clear next steps, including whether AI is appropriate.",
  },
  {
    title: "Clear responsibilities",
    text: "We discuss how my support fits alongside your services.",
  },
];

const steps = [
  { title: "Get in touch", text: "Complete the form below and tell me a little about your business." },
  { title: "Let’s meet", text: "We’ll discuss how we could work together and talk through the referral arrangements." },
  {
    title: "Make an introduction",
    text: "When you know a business that could benefit, introduce us with their permission. I’ll arrange a free 30-minute discovery call to understand their needs.",
  },
];

const PartnerButton = () => (
  <a href="#apply" className="btn-amber btn-focus group w-fit">
    <span className="sheen" aria-hidden="true" />
    Become a referral partner
    <ArrowRight
      className="nudge-arrow h-4 w-4 transition-transform group-hover:translate-x-1"
      strokeWidth={2.4}
      aria-hidden="true"
    />
  </a>
);

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
        throw new Error(data?.errors?.[0]?.message || data?.error || "Your enquiry could not be sent.");
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your enquiry could not be sent.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="card-soft flex flex-col items-start gap-3 p-7 sm:p-9" role="status">
        <CheckCircle2 className="h-8 w-8 text-brand-teal" aria-hidden="true" />
        <h3 className="font-heading text-[26px] font-semibold text-brand-navy">Thank you, your enquiry is in.</h3>
        <p className="text-[16px] leading-relaxed text-brand-slate">
          I’ll be in touch to arrange a meeting.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-soft grid grid-cols-1 gap-5 p-7 sm:grid-cols-2 sm:p-9">
      <input type="hidden" name="_subject" value="Partnership enquiry" />
      <input type="hidden" name="form" value="Partnership enquiry" />
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-name">Full name</Label>
        <Input id="p-name" name="name" required autoComplete="name" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-email">Email address</Label>
        <Input id="p-email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-company">Business name</Label>
        <Input id="p-company" name="company" required autoComplete="organization" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-role">Your role</Label>
        <Input id="p-role" name="role" autoComplete="organization-title" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-website">Website (optional)</Label>
        <Input id="p-website" name="website" type="url" placeholder="https://" className={inputClass} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="p-type">Type of business</Label>
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
          {businessTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="p-about">Tell me briefly about your business and the clients you support.</Label>
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
              Send enquiry
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
          I’ll use your details to respond to your partnership enquiry. See the{" "}
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
    "Become an IntegroAI Consulting referral partner. Know a business owner who needs help with AI? Introduce them to practical support with processes, AI and automation.";

  const h2 = "font-heading text-[32px] font-semibold leading-[1.15] text-brand-navy sm:text-[40px]";

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
              <span className="block">Know a business owner who needs help with AI?</span>
              <span className="block italic text-brand-amber">Introduce them to practical support.</span>
            </h1>
            <div className="flex max-w-[660px] flex-col gap-4 text-[17px] leading-normal text-brand-mist sm:text-[19px]">
              <p>
                Your clients may be spending too much time on admin, struggling with disconnected systems or wondering
                where to start with AI.
              </p>
              <p>
                I help business owners understand what is slowing them down, improve their processes and use AI and
                automation where they can make a useful difference.
              </p>
              <p className="font-semibold text-white">
                Earn a referral fee when your introduction leads to paid work, payable once the client’s payment has
                been received.
              </p>
            </div>
            <PartnerButton />
          </m.div>
        </section>

        <section className="bg-brand-ivory py-14 sm:py-20">
          <div className="wrap">
            <m.h2 {...fadeUp} className={h2}>
              Who I partner with
            </m.h2>
            <m.p {...fadeUp} className="mt-3 max-w-[680px] text-[17px] leading-relaxed text-brand-slate">
              You know your clients and the challenges they face. I provide practical support when they need help
              improving how they work or adopting AI.
            </m.p>
            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {partnerTypes.map((t, i) => (
                <m.article key={t.title} {...fadeUpDelayed(i)} className="card-soft flex flex-col gap-2 p-7">
                  <h3 className="font-heading text-[21px] font-semibold leading-[1.2] text-brand-navy">{t.title}</h3>
                  <p className="text-[15.5px] leading-relaxed text-brand-slate">{t.text}</p>
                </m.article>
              ))}
            </div>
            <m.div
              {...fadeUp}
              className="mt-5 flex flex-col gap-1 rounded-[14px] border border-dashed border-brand-teal/50 bg-white/60 p-7 sm:flex-row sm:items-center sm:gap-4"
            >
              <h3 className="font-heading text-[21px] font-semibold text-brand-navy">Not listed here?</h3>
              <p className="text-[15.5px] leading-relaxed text-brand-slate">
                If you work with business owners and see a good fit, I’d welcome a conversation.
              </p>
            </m.div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="wrap">
            <m.h2 {...fadeUp} className={h2}>
              When to make an introduction
            </m.h2>
            <m.p {...fadeUp} className="mt-3 text-[17px] leading-relaxed text-brand-slate">
              Listen for clients saying:
            </m.p>
            <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {signals.map((q, i) => (
                <m.li
                  key={q}
                  {...fadeUpDelayed(i)}
                  className="rounded-[14px] border-l-4 border-brand-amber bg-brand-ivory px-5 py-4 text-[16.5px] font-medium leading-relaxed text-brand-navy"
                >
                  {q}
                </m.li>
              ))}
            </ul>
            <m.p {...fadeUp} className="mt-7 max-w-[680px] text-[16.5px] leading-relaxed text-brand-slate">
              They do not need a technical brief or a particular tool in mind. A clear business problem is enough to start
              a conversation.
            </m.p>
          </div>
        </section>

        <section className="bg-brand-ivory py-14 sm:py-20">
          <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <m.h2 {...fadeUp} className={h2}>
                What you can expect
              </m.h2>
              <div className="mt-7 flex flex-col gap-5">
                {expectations.map((e, i) => (
                  <m.div key={e.title} {...fadeUpDelayed(i)} className="card-soft flex gap-3 p-6">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
                    <div>
                      <h3 className="text-[17px] font-semibold text-brand-navy">{e.title}</h3>
                      <p className="mt-1 text-[15.5px] leading-relaxed text-brand-slate">{e.text}</p>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
            <div>
              <m.h2 {...fadeUp} className={h2}>
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
              <m.div {...fadeUp} className="mt-8">
                <PartnerButton />
              </m.div>
            </div>
          </div>
        </section>

        <section id="apply" className="scroll-mt-24 bg-white py-14 sm:py-20">
          <div className="wrap max-w-[860px]">
            <m.h2 {...fadeUp} className={h2}>
              Become a referral partner
            </m.h2>
            <m.p {...fadeUp} className="mb-8 mt-3 max-w-[640px] text-[17px] leading-relaxed text-brand-slate">
              Interested in referring business to IntegroAI? Complete the form below and I’ll get in touch to arrange a
              meeting.
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
