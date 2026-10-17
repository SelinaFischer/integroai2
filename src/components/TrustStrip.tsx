import ClientTestimonials from "./ClientTestimonials";

// Homepage proof directly under the hero: the clients' words. Experience sits
// in the founder section and memberships in the footer, so they are not
// repeated here.

const TrustStrip = () => {
  return (
    <ClientTestimonials
      id="home-testimonials-title"
      tone="white"
      scale="home"
      heading={
        <>
          Clear, Practical, <span className="italic text-brand-amber">Valuable.</span>
        </>
      }
    />
  );
};

export default TrustStrip;
