import type { ReactNode } from "react";
import { m } from "framer-motion";
import { fadeUp, fadeUpDelayed } from "@/lib/motion";
import { testimonials } from "@/lib/testimonials";

// The clients' words as quote cards. Used on the homepage (trust) and on
// Work With Me (reassurance before booking): same design, different heading
// and what sits underneath.
interface ClientTestimonialsProps {
  id: string;
  heading: ReactNode;
  /** "ivory" section with white cards, or "white" section with ivory cards. */
  tone?: "ivory" | "white";
  /** Heading size: "home" matches the homepage section titles, "page" the inner-page headings. */
  scale?: "home" | "page";
  children?: ReactNode;
}

const ClientTestimonials = ({ id, heading, tone = "ivory", scale = "page", children }: ClientTestimonialsProps) => {
  const sectionBg = tone === "white" ? "bg-white" : "bg-brand-ivory";
  // Cards are always white, lifted by a soft shadow and an amber top edge,
  // so they stand out on both white and ivory sections.
  return (
    <section aria-labelledby={id} className={`${sectionBg} py-12 sm:py-16`}>
      <div className="wrap flex flex-col items-center gap-9">
        <m.div {...fadeUp} className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="eyebrow">What clients say</p>
          <h2 id={id} className={scale === "home" ? "section-title" : "font-heading text-3xl sm:text-4xl lg:text-[40px]"}>
            {heading}
          </h2>
        </m.div>

        <ul className="grid w-full list-none grid-cols-1 gap-5 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <m.li key={testimonial.name} {...fadeUpDelayed(index)} className="flex">
              <figure className="m-0 flex w-full flex-col rounded-[20px] border border-brand-sand border-t-[3px] border-t-brand-amber bg-white p-7 shadow-[0_14px_36px_-14px_rgba(4,27,43,0.22)] sm:p-8">
                <blockquote className="m-0 flex-1">
                  <p className="font-heading text-[19px] leading-[1.5] text-brand-navy sm:text-[20px]">
                    “{testimonial.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t border-brand-sand pt-5 text-[15px] leading-relaxed text-brand-slate">
                  <span className="font-bold text-brand-navy">{testimonial.name}</span>, {testimonial.role}
                </figcaption>
              </figure>
            </m.li>
          ))}
        </ul>

        {children && <m.div {...fadeUp} className="w-full">{children}</m.div>}
      </div>
    </section>
  );
};

export default ClientTestimonials;
