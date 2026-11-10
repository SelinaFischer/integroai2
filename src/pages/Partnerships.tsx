import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { m } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DISCOVERY_CALL_URL, fadeUp, fadeUpDelayed } from "@/lib/motion";

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
  "Hospitality",
  "Property",
  "Other",
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
  "bg-white border-[#BDB3A1] text-brand-navy placeholder:text-[#89898E] focus:border-brand-amber focus:ring-brand-amber/20 h-11 rounded-lg";

const ApplicationForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [businessType, setBusinessType] = useState("");

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
        <Label htmlFor="p-phone">Phone</Label>
        <Input id="p-phone" name="telephone" type="tel" autoComplete="tel" className={inputClass} />
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
        <Label htmlFor="p-website">Website</Label>
        <Input
          id="p-website"
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="yourbusiness.co.uk"
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="p-type">Type of business</Label>
        <select
          id="p-type"
          name="partner_type"
          required
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
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
      {businessType === "Other" && (
        <div className="flex flex-col gap-2 sm:col-span-2">
          <Label htmlFor="p-industry">Your industry</Label>
          <Input id="p-industry" name="industry" required autoFocus className={inputClass} />
        </div>
      )}
      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="p-about" className="text-[16px] font-semibold">
          Tell me about your business, and anyone you’d like to introduce
        </Label>
        <p id="p-about-help" className="text-[14px] leading-relaxed text-brand-slate">
          Share the kind of clients you support. If you already have a client in mind, tell me what they need help with.
          Please leave out their name and contact details until they’ve agreed to an introduction.
        </p>
        <Textarea
          id="p-about"
          name="message"
          required
          rows={6}
          aria-describedby="p-about-help"
          placeholder="For example: I’m an accountant working with small hospitality businesses. One of my clients spends hours each week on manual bookings and follow-ups."
          className="rounded-lg border-2 border-[#BDB3A1] bg-white text-[15px] text-brand-navy placeholder:text-[#89898E] focus:border-brand-amber focus:ring-brand-amber/20"
        />
      </div>
      <div className="flex flex-col items-center gap-4 text-center sm:col-span-2">
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
              className="mx-auto mt-8 flex max-w-[620px] flex-col items-center gap-1.5 rounded-[14px] border border-brand-amber/70 bg-white px-6 py-6 text-center"
            >
              <h3 className="font-heading text-[21px] font-semibold leading-[1.2] text-brand-navy">Not listed here?</h3>
              <p className="text-[15.5px] leading-relaxed text-brand-slate">
                If you work with business owners and see a good fit, I’d welcome a conversation.
              </p>
            </m.div>
          </div>
        </section>

        <section id="apply" className="scroll-mt-24 bg-white py-14 sm:py-20">
          <div className="wrap max-w-[860px]">
            <m.h2 {...fadeUp} className={h2}>
              Let’s explore working together
            </m.h2>
            <div className="mb-8 mt-3 flex max-w-[680px] flex-col gap-4 text-[17px] leading-relaxed text-brand-slate">
              <m.p {...fadeUp}>
                If you work with business owners who could benefit from practical AI and automation support, I’d welcome
                a conversation.
              </m.p>
              <m.p {...fadeUp}>
                Complete the form below and I’ll get in touch to arrange a meeting. We can discuss the partnership and
                referral arrangements in more detail then.
              </m.p>
              <m.p {...fadeUp} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-brand-navy">
                <CalendarDays className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
                <span>Prefer to pick a time now?</span>
                <a
                  href={DISCOVERY_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-teal"
                >
                  Book a 30-minute call
                </a>
              </m.p>
            </div>
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
