import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { testimonials } from "@/lib/testimonials";
import ClientQuote from "./ClientQuote";

// Work With Me: the clients' words at the point where visitors decide, set in
// the same editorial style as the homepage, then one action.
const ClientTestimonials = () => {
  return (
    <section aria-labelledby="client-testimonials-title" className="bg-brand-ivory py-14 sm:py-20">
      <m.div {...fadeUp} className="wrap flex flex-col gap-12 sm:gap-14">
        <h2 id="client-testimonials-title" className="font-heading text-center text-3xl sm:text-4xl lg:text-[40px]">
          In our clients’ words
        </h2>

        <ul className="grid list-none grid-cols-1 gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-brand-sand">
          {testimonials.map((testimonial, index) => (
            <li key={testimonial.name} className={index === 0 ? "md:pr-12 lg:pr-16" : "md:pl-12 lg:pl-16"}>
              <ClientQuote
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                received={testimonial.received}
              />
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <a
            href="https://calendly.com/integroai-tech/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber group"
          >
            Book a Discovery Call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
          </a>
        </div>
      </m.div>
    </section>
  );
};

export default ClientTestimonials;
