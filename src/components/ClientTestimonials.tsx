import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, fadeUpDelayed } from "@/lib/motion";
import { testimonials } from "@/lib/testimonials";

// Work With Me: the clients' words at the point where visitors decide.
// Built from the site's own system (label, serif, navy, ivory). Amber is
// kept for the one emphasised word and the single action underneath.
const ClientTestimonials = () => {
  return (
    <section aria-labelledby="client-testimonials-title" className="bg-brand-ivory py-12 sm:py-16">
      <div className="wrap flex flex-col items-center gap-9">
        <m.div {...fadeUp} className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="eyebrow">What clients say</p>
          <h2 id="client-testimonials-title" className="font-heading text-3xl sm:text-4xl lg:text-[40px]">
            Clear, practical, <span className="italic text-brand-amber">valuable.</span>
          </h2>
        </m.div>

        <ul className="grid w-full list-none grid-cols-1 gap-5 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <m.li key={testimonial.name} {...fadeUpDelayed(index)} className="flex">
              <figure className="m-0 flex w-full flex-col rounded-[20px] border border-brand-sand bg-white p-7 sm:p-8">
                <blockquote className="m-0 flex-1">
                  <p className="font-heading text-[22px] leading-snug text-brand-navy sm:text-[24px]">
                    “{testimonial.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex flex-col gap-3 border-t border-brand-sand pt-5">
                  <span className="text-[15px] leading-relaxed text-brand-slate">
                    <span className="font-bold text-brand-navy">{testimonial.name}</span>, {testimonial.role}
                  </span>
                </figcaption>
              </figure>
            </m.li>
          ))}
        </ul>

        <m.div {...fadeUp}>
          <a
            href="https://calendly.com/integroai-tech/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amber group"
          >
            Book a Discovery Call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
          </a>
        </m.div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
