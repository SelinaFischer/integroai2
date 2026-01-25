import { Search, Route, GraduationCap, Cog, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      icon: Search,
      number: "01",
      title: "AI Readiness Assessment",
      description:
        "Clarify the business problem, assess readiness across leadership, process, and data, and identify where AI is worth pursuing before any tools are chosen.",
      outcomes: ["Readiness snapshot", "Risk and gap view", "Priority areas"],
    },
    {
      icon: Route,
      number: "02",
      title: "Transformation Strategy & Roadmap",
      description:
        "Define success measures, prioritise initiatives by value and feasibility, and build a commercially grounded sequence of action.",
      outcomes: ["Prioritised roadmap", "Success measures", "Sequenced plan"],
    },
    {
      icon: ShieldCheck,
      number: "03",
      title: "Governance & Responsible AI",
      description:
        "Establish decision guardrails, risk frameworks, and governance practices so AI use stays accountable, compliant, and aligned to business goals.",
      outcomes: ["Governance guardrails", "Risk framework", "Policy checklist"],
    },
    {
      icon: Users,
      number: "04",
      title: "Leadership & Team Enablement",
      description:
        "Build alignment and confidence across leadership and teams so AI decisions translate into consistent action and adoption.",
      outcomes: ["Leadership alignment", "Decision playbooks", "Team capability"],
    },
    {
      icon: Cog,
      number: "05",
      title: "Structured Implementation Oversight",
      description:
        "Support delivery through trusted specialists when execution is justified, providing independent oversight to keep initiatives focused, measurable, and on track.",
      outcomes: ["Delivery oversight", "Vendor coordination", "Value tracking"],
    },
    {
      icon: GraduationCap,
      number: "06",
      title: "Ongoing Advisory",
      description:
        "Regular check-ins to review progress, adapt priorities, and keep AI initiatives aligned to changing business needs and constraints.",
      outcomes: ["Decision reviews", "Priority updates", "Course correction"],
    },
  ];

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-accent-warm/10 rounded-full">
            AI Consulting Services
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4" itemProp="name">
            AI Consulting Services for SMEs
          </h2>

          <p
            className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5"
            itemProp="description"
          >
            IntegroAI Consulting helps SME leadership teams adopt AI with clarity, responsible execution, and measurable outcomes.
          </p>

          <p className="text-sm sm:text-base font-semibold text-foreground mb-4">
            Three core pillars
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
            <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-foreground mb-1">Clarity</p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Start with an AI Readiness and Transformation Assessment to define priority use cases, expose material risks, and set clear decision boundaries.
              </p>
            </div>

            <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-foreground mb-1">Execution</p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                End to end delivery when justified, including implementation assessments, workflow optimisation and automation, marketing enablement, and chatbot integration.
              </p>
            </div>

            <div className="bg-card border border-border/60 rounded-xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-foreground mb-1">
                Accountability
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Advisory retainers and governance to keep adoption on track, measurable, and aligned to business priorities.
              </p>
            </div>
          </div>

          <p className="mt-5 text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
            Services are phased and selective by design. The goal is not more AI, but better decisions, lower risk, and outcomes leadership teams can confidently stand behind.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-card hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-border/50 flex flex-col relative overflow-hidden"
              itemScope
              itemType="https://schema.org/Service"
              itemProp="itemListElement"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <service.icon
                      className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-muted-foreground/30 text-xl sm:text-2xl font-bold">
                    {service.number}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2" itemProp="name">
                  {service.title}
                </h3>

                <p
                  className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-grow line-clamp-3 sm:line-clamp-none"
                  itemProp="description"
                >
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                  {service.outcomes.map((outcome) => (
                    <span
                      key={outcome}
                      className="text-[10px] sm:text-xs font-medium bg-secondary text-foreground px-2 sm:px-3 py-1 rounded-full"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 sm:mt-14"
        >
          <Button variant="hero" size="lg" className="group" asChild>
            <a href="https://tally.so/r/68jDMA" target="_blank" rel="noopener noreferrer">
              Assess Your AI Readiness
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
