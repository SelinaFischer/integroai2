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
const stages = [
  {
    number: "Free",
    title: "AI Readiness Assessment",
    description: "A free, 5-minute self-assessment to see where you stand before you invest in AI.",
    ctaLabel: "Start now",
    ctaHref: "https://integroai.tech/assessment",
  },
  {
    number: "01",
    title: "AI & Operations Diagnostic",
    description: "Identify the workflow bottlenecks costing you time, capacity or control.",
  },
  {
    number: "02",
    title: "AI Opportunity & Strategy Roadmap",
    description: "Identify which opportunities are worth pursuing first.",
  },
  {
    number: "03",
    title: "AI Foundations & Responsible Adoption",
    description: "Get the foundations right before you adopt AI.",
  },
  {
    number: "04",
    title: "AI & Automation Implementation",
    description: "Turn validated opportunities into working solutions.",
  },
  {
    number: "05",
    title: "Ongoing AI & Operations Advisory",
    description: "Review what's working, and refine what's next.",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-subtle relative overflow-hidden"
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
            className="text-center mb-10 sm:mb-14"
          >
            <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-accent-warm/10 rounded-full">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {stages.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-border/50 flex flex-col items-center text-center relative overflow-hidden"
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Visible summary for search engines; not shown on screen */}
                <meta itemProp="description" content={item.description} />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-primary-foreground text-xl font-bold">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold" itemProp="name">
                    {item.title}
                  </h3>

                  {item.ctaHref && (
                    <a
                      href={item.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent-warm font-medium text-sm mt-3 hover:gap-2.5 transition-all"
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
            className="text-center mt-10 sm:mt-14"
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
