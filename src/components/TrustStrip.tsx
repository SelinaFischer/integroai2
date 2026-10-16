import { m } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { testimonials } from "@/lib/testimonials";
import ClientQuote from "./ClientQuote";

// Proof directly under the hero. The clients' words lead; experience and
// memberships sit quietly underneath. Only verified facts go here.

const facts = [
  {
    statement: "20+ years",
    caption: "across operations, product, technology and data",
  },
  {
    statement: "Verified partner 2026",
    caption: "AI Enablement Directory",
    href: "https://aiblmedia.com/ai-enablement-directory/integroai-consulting/",
  },
  {
    statement: "Chamber member",
    caption: "Hillingdon Chamber of Commerce",
    href: "https://hillingdonchamber.co.uk/",
  },
];

const TrustStrip = () => {
  return (
    <section aria-label="What clients say" className="border-b border-brand-sand bg-white py-14 sm:py-20">
      <m.div {...fadeUp} className="wrap flex flex-col gap-14 sm:gap-16">
        <ul className="grid list-none grid-cols-1 gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-brand-sand">
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.name} className={index === 0 ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"}>
              <ClientQuote quote={testimonial.quote} name={testimonial.name} role={testimonial.role} />
            </li>
          ))}
        </ul>

        <ul className="grid list-none grid-cols-1 gap-6 border-t border-brand-sand pt-8 text-center sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-brand-sand">
          {facts.map((fact) => (
            <li key={fact.statement} className="flex flex-col gap-1 sm:px-6">
              <span className="font-heading text-[24px] leading-tight text-brand-navy">{fact.statement}</span>
              {fact.href ? (
                <a
                  href={fact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-brand-slate underline decoration-brand-sand decoration-1 underline-offset-4 hover:text-brand-teal hover:decoration-brand-amber"
                >
                  {fact.caption}
                </a>
              ) : (
                <span className="text-[14px] text-brand-slate">{fact.caption}</span>
              )}
            </li>
          ))}
        </ul>
      </m.div>
    </section>
  );
};

export default TrustStrip;
