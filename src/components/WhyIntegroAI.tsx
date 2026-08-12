import { Compass, ShieldCheck, SlidersHorizontal, Layers, Users, Target } from "lucide-react";
import { motion } from "framer-motion";

const differentiators = [
  {
    icon: Compass,
    title: "AI decisions grounded in business priorities",
    description:
      "We begin by understanding your operational priorities, workflows and constraints before determining where AI or automation can create meaningful value.",
  },
  {
    icon: ShieldCheck,
    title: "Independent, technology-agnostic advice",
    description:
      "Recommendations are shaped around what is right for your business, without preference for a particular vendor, platform or predefined solution.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible, tailored engagements",
    description:
      "Every engagement reflects your priorities, operational maturity, existing systems and pace of change.",
  },
  {
    icon: Layers,
    title: "An integrated business and AI perspective",
    description:
      "We consider workflows, processes, data, systems, people and accountability together, rather than treating AI as a standalone technology initiative.",
  },
  {
    icon: Users,
    title: "Human-led adoption",
    description:
      "AI should strengthen capability and decision-making while preserving appropriate human oversight, accountability and control.",
  },
  {
    icon: Target,
    title: "Focused on measurable business value",
    description:
      "The objective is not AI adoption for its own sake. It is to reduce unnecessary work, strengthen operational control and improve business performance.",
  },
];

const WhyIntegroAI = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-accent-warm/10 rounded-full">
            Why IntegroAI
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4">Why IntegroAI?</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-card rounded-xl p-5 sm:p-6 shadow-card border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyIntegroAI;
