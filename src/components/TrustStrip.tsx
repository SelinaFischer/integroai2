import ClientTestimonials from "./ClientTestimonials";

// Homepage proof directly under the hero: the clients' words, then experience
// and memberships. Only verified facts go here.

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
    <ClientTestimonials
      id="home-testimonials-title"
      tone="white"
      heading={
        <>
          Clear, Practical, <span className="italic text-brand-amber">Valuable.</span>
        </>
      }
    >
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
    </ClientTestimonials>
  );
};

export default TrustStrip;
