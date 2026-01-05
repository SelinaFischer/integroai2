import { Search, Route, GraduationCap, Cog, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      icon: Search,
      number: "01",
      title: "Assessment & Readiness",
      description: "Understand your current state, identify pain points, and evaluate realistic AI opportunities. Walk away with a clear picture of what's possible.",
      outcomes: ["Gap analysis", "Opportunity mapping", "Readiness score"],
      ctaLink: "https://tally.so/r/68jDMA",
      ctaText: "Take Assessment",
    },
    {
      icon: Route,
      number: "02",
      title: "Strategy & Roadmapping",
      description: "Prioritise use cases, analyse impact vs effort, and build a focused plan that moves your organisation forward with confidence.",
      outcomes: ["Prioritised roadmap", "Business case", "Quick wins"],
    },
    {
      icon: GraduationCap,
      number: "03",
      title: "Training & Capability",
      description: "Upskill your team to use AI effectively, covering tools, prompting, governance and integration into daily workflows.",
      outcomes: ["Hands-on workshops", "Best practices", "Team confidence"],
    },
    {
      icon: Cog,
      number: "04",
      title: "Implementation Support",
      description: "Hands-on guidance through your first AI projects. From pilot to production with practical support at every stage.",
      outcomes: ["Vendor selection", "Pilot programs", "Change management"],
    },
    {
      icon: Users,
      number: "05",
      title: "Ongoing Advisory",
      description: "Regular strategic check-ins to ensure AI initiatives stay on track, adapt to change, and continue delivering value.",
      outcomes: ["Monthly reviews", "KPI tracking", "Strategic pivots"],
    },
    {
      icon: ShieldCheck,
      number: "06",
      title: "Governance & Ethics",
      description: "Establish responsible AI practices with clear policies, risk frameworks, and compliance guidance.",
      outcomes: ["AI policy", "Risk framework", "Compliance checklist"],
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-subtle relative overflow-hidden" itemScope itemType="https://schema.org/ItemList">
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
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed" itemProp="description">
            What does an AI consultant do? We provide end-to-end AI strategy and implementation support—from readiness assessment to ongoing advisory.
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
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-muted-foreground/30 text-xl sm:text-2xl font-bold">
                    {service.number}
                  </span>
                </div>
                
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2" itemProp="name">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-grow line-clamp-3 sm:line-clamp-none" itemProp="description">
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

                {service.ctaLink && (
                  <Button variant="hero" size="sm" className="mt-auto group/link text-xs sm:text-sm" asChild>
                    <a
                      href={service.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {service.ctaText}
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                )}
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
            <a href="https://calendly.com/integroai-consulting/30min" target="_blank" rel="noopener noreferrer">
              Discuss Your Needs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;