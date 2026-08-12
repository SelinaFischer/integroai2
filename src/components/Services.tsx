import { Search, Target, ShieldCheck, Cog, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Prospect-facing consulting journey. This is intentionally distinct from the
// IntegroAI Operating Framework (Discover → Design → Validate → Deliver → Iterate),
// which describes how IntegroAI executes work rather than the stages a client can engage.
const stages = [
  {
    icon: Search,
    number: "01",
    stage: "Understand",
    title: "AI & Operations Diagnostic",
    description:
      "Establish a clear view of how the business operates today, where friction exists, and where time, capacity or operational control may be being lost.",
    areas: ["Workflows", "Processes", "Repetitive/manual work", "Systems", "Data", "Ownership", "Accountability", "Existing AI use", "Organisational readiness"],
  },
  {
    icon: Target,
    number: "02",
    stage: "Prioritise",
    title: "AI Opportunity & Strategy Roadmap",
    description:
      "Evaluate where AI, automation or process improvement could create meaningful business value, and determine which opportunities should be addressed first.",
    areas: ["Expected business value", "Feasibility", "Readiness", "Risk", "Strategic relevance", "Success measures", "Sequencing"],
  },
  {
    icon: ShieldCheck,
    number: "03",
    stage: "Prepare",
    title: "AI Foundations & Responsible Adoption",
    description:
      "Put the organisational and operational conditions in place for AI to be introduced responsibly and effectively.",
    areas: ["Data readiness", "Governance", "Ownership", "Accountability", "Decision boundaries", "Leadership alignment", "Team readiness", "Training", "Adoption planning"],
  },
  {
    icon: Cog,
    number: "04",
    stage: "Implement",
    title: "AI & Automation Implementation",
    description:
      "Support validated AI and automation opportunities through appropriate implementation, proof of concept, integration and delivery oversight.",
    areas: ["Workflow automation", "Custom GPTs", "AI agents", "Voice AI", "MVP development", "Proof-of-concept development", "Implementation oversight", "Technology evaluation", "Integration support"],
  },
  {
    icon: TrendingUp,
    number: "05",
    stage: "Evolve",
    title: "Ongoing AI & Operations Advisory",
    description:
      "Review performance, strengthen adoption, refine priorities and identify where further operational or AI improvements can create value.",
    areas: ["Performance review", "Outcome measurement", "Adoption review", "Governance review", "Course correction", "Roadmap refinement", "Identification of further opportunities", "Ongoing leadership advisory"],
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
              IntegroAI combines business and operations advisory with practical AI expertise to help leaders understand what is worth changing, where AI can create value, and what needs to be in place for it to work effectively.
            </p>
          </motion.div>

          {/* Stage cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {stages.map((item, index) => (
              <motion.article
                key={item.stage}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-card rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-card hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-border/50 flex flex-col relative overflow-hidden"
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                    </div>
                    <span className="text-muted-foreground/30 text-xl sm:text-2xl font-bold">
                      {item.number}
                    </span>
                  </div>

                  <span className="text-accent-warm font-bold text-[11px] uppercase tracking-widest mb-1.5">
                    {item.stage}
                  </span>

                  <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2" itemProp="name">
                    {item.title}
                  </h3>

                  <p
                    className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-grow"
                    itemProp="description"
                  >
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.areas.slice(0, 4).map((area) => (
                      <span
                        key={area}
                        className="text-[10px] font-medium bg-secondary text-foreground px-2 py-1 rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
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
