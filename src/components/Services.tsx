import { ClipboardCheck, Search, Target, ShieldCheck, Cog, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Prospect-facing consulting journey. This is intentionally distinct from the
// IntegroAI Operating Framework (Discover → Design → Validate → Deliver → Iterate),
// which describes how IntegroAI executes work rather than the stages a client can engage.
// The free assessment is shown first as a "Start Here" card, deliberately unnumbered
// so it stays visually and contractually distinct from the five paid consulting stages.
const stages = [
  {
    icon: ClipboardCheck,
    number: "Free",
    stage: "Start Here",
    title: "AI Readiness Assessment",
    description: "See where you stand in under 5 minutes, at no cost.",
    areas: ["5 minutes", "No cost", "Instant results"],
    ctaLabel: "Start now",
    ctaHref: "https://integroai.tech/assessment",
  },
  {
    icon: Search,
    number: "01",
    stage: "Understand",
    title: "AI & Operations Diagnostic",
    description: "Identify the workflow bottlenecks costing you time, capacity or control.",
    areas: ["Workflows", "Systems & data", "Existing AI use"],
  },
  {
    icon: Target,
    number: "02",
    stage: "Prioritise",
    title: "AI Opportunity & Strategy Roadmap",
    description: "Identify which opportunities are worth pursuing first.",
    areas: ["Business value", "Feasibility & risk", "Sequencing"],
  },
  {
    icon: ShieldCheck,
    number: "03",
    stage: "Prepare",
    title: "AI Foundations & Responsible Adoption",
    description: "Get the foundations right before you adopt AI.",
    areas: ["Governance", "Accountability", "Team readiness"],
  },
  {
    icon: Cog,
    number: "04",
    stage: "Implement",
    title: "AI & Automation Implementation",
    description: "Turn validated opportunities into working solutions.",
    areas: ["Workflow automation", "AI agents", "Integration support"],
  },
  {
    icon: TrendingUp,
    number: "05",
    stage: "Evolve",
    title: "Ongoing AI & Operations Advisory",
    description: "Review what's working, and refine what's next.",
    areas: ["Performance review", "Adoption review", "Ongoing advisory"],
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

            <p
              className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
              itemProp="description"
            >
              Start with a free assessment, then draw on five stages as the business needs them.
            </p>
          </motion.div>

          {/* Stage cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {stages.map((item, index) => (
              <motion.article
                key={item.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-card rounded-lg sm:rounded-xl p-5 sm:p-6 shadow-card hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-border/50 flex flex-col relative overflow-hidden"
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                    </div>
                    <span className="text-muted-foreground/30 text-2xl font-bold">
                      {item.number}
                    </span>
                  </div>

                  <span className="text-accent-warm font-bold text-xs uppercase tracking-widest mb-1.5">
                    {item.stage}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold mb-2" itemProp="name">
                    {item.title}
                  </h3>

                  <p
                    className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 flex-grow"
                    itemProp="description"
                  >
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.areas.map((area) => (
                      <span
                        key={area}
                        className="text-xs font-medium bg-secondary text-foreground px-2.5 py-1 rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  {item.ctaHref && (
                    <a
                      href={item.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent-warm font-medium text-sm mt-4 hover:gap-3 transition-all"
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
