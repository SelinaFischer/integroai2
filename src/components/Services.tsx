import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Prospect-facing consulting journey. This is intentionally distinct from the
// IntegroAI Operating Framework (Discover → Design → Validate → Deliver → Iterate),
// which describes how IntegroAI executes work rather than the stages a client can engage.
// Cards are deliberately minimal (number + title only) — full detail on each
// stage lives on /work-with-me, one click away via the button below. The
// `description` field isn't rendered; it only feeds the hidden schema.org
// microdata so search engines still see a full description per service.
// Numbering (01–06) matches the stage numbers on /work-with-me, where the
// free assessment is Stage 01 rather than a separate, unnumbered item.
const stages = [
  {
    number: "01",
    title: "AI Readiness Assessment",
    description: "A free, 5-minute self-assessment to see where you stand before you invest in AI.",
    tag: "Free",
    ctaLabel: "Start now",
    ctaHref: "https://integroai.tech/assessment",
  },
  {
    number: "02",
    title: "AI & Operations Diagnostic",
    description: "Identify the workflow bottlenecks costing you time, capacity or control.",
  },
  {
    number: "03",
    title: "AI Opportunity & Strategy Roadmap",
    description: "Identify which opportunities are worth pursuing first.",
  },
  {
    number: "04",
    title: "AI Foundations & Responsible Adoption",
    description: "Get the foundations right before you adopt AI.",
  },
  {
    number: "05",
    title: "AI & Automation Implementation",
    description: "Turn validated opportunities into working solutions.",
  },
  {
    number: "06",
    title: "Ongoing AI & Operations Advisory",
    description: "Review what's working, and refine what's next.",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="py-20 sm:py-24 lg:py-28 bg-subtle relative overflow-hidden"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-warm/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 sm:mb-16"
          >
            <span className="inline-block text-accent-warm font-semibold text-[11px] uppercase tracking-[0.2em] mb-4">
              Our Approach
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 text-center">
              How IntegroAI Helps
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Start with a free assessment, then draw on five stages as the business needs them.
            </p>
          </motion.div>

          {/* Stage cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 rounded-2xl overflow-hidden border border-border/40">
            {stages.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group bg-card p-9 sm:p-10 transition-colors duration-500 hover:bg-background flex flex-col items-center text-center relative"
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
              >
                {/* Visible summary for search engines; not shown on screen */}
                <meta itemProp="description" content={item.description} />

                <div className="relative z-10 flex flex-col items-center">
                  {item.tag && (
                    <span className="text-accent-warm text-[10px] font-semibold uppercase tracking-[0.2em] mb-3">
                      {item.tag}
                    </span>
                  )}

                  <div className="w-14 h-14 rounded-full border border-primary/25 flex items-center justify-center mb-6 group-hover:border-accent-warm/60 transition-colors duration-500">
                    <span className="text-primary text-base font-semibold tracking-wide">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold tracking-tight leading-snug" itemProp="name">
                    {item.title}
                  </h3>

                  {item.ctaHref && (
                    <a
                      href={item.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent-warm font-medium text-sm mt-4 hover:gap-2.5 transition-all"
                    >
                      {item.ctaLabel}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12 sm:mt-16"
          >
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/work-with-me">
                Explore How We Can Work Together
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Services;
