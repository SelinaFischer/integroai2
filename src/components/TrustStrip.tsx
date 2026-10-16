import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";

// Proof directly under the hero: experience, memberships and real client
// quotes. Only verified facts go here. Qualifications are added once their
// exact wording is confirmed.

const memberships = [
  {
    name: "AI Enablement Directory",
    detail: "Verified partner 2026",
    href: "https://aiblmedia.com/ai-enablement-directory/integroai-consulting/",
  },
  {
    name: "Hillingdon Chamber of Commerce",
    detail: "Member",
    href: "https://hillingdonchamber.co.uk/",
  },
];

// Client quotes, in the clients' own words. Square brackets mark wording
// changed for clarity or privacy. Names are shortened at the clients' request.
const testimonials = [
  {
    quote:
      "She delivered both an assessment and a [Key Findings Report] presentation with me as customer. She did an amazing job. We both learned so much from the experience and came out of it even more confident.",
    name: "Fabrice M.",
    role: "Founder & CEO",
    context: "Free AI readiness assessment and Key Findings Report",
  },
  {
    quote:
      "Selina made AI adoption feel clear and achievable. Her AI Readiness Assessment was straightforward and valuable, with practical recommendations that helped me see where AI could make a difference at [our company] and what to prioritise next.",
    name: "Paul F.",
    role: "CEO, technology company",
    context: "",
  },
];

const TrustStrip = () => {
  return (
    <section aria-label="Why clients trust IntegroAI" className="border-b border-brand-sand bg-white py-10 sm:py-12">
      <div className="wrap grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
        <m.div {...fadeUp} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="eyebrow">Experience</p>
            <p className="text-[17px] leading-relaxed text-brand-navy">
              <span className="font-bold">20+ years</span> across operations, product, technology and data.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Member of</p>
            <ul className="flex list-none flex-col gap-1.5">
              {memberships.map((membership) => (
                <li key={membership.name} className="text-[17px] leading-relaxed text-brand-navy">
                  <a
                    href={membership.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-teal"
                  >
                    {membership.name}
                  </a>
                  <span className="text-brand-slate"> · {membership.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </m.div>

        <m.div {...fadeUp} className="flex flex-col gap-4">
          <p className="eyebrow">What clients say</p>
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="m-0 rounded-[18px] border border-brand-sand bg-brand-ivory p-6 sm:p-7">
              <blockquote className="m-0">
                <p className="display text-[20px] leading-snug text-brand-navy sm:text-[22px]">“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="mt-4 text-[15px] leading-relaxed text-brand-slate">
                <span className="font-bold text-brand-navy">{testimonial.name}</span>, {testimonial.role}
                {testimonial.context && (
                  <>
                    <br />
                    {testimonial.context}
                  </>
                )}
              </figcaption>
            </figure>
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default TrustStrip;
