import { Compass, Map, Settings, TrendingUp, RefreshCw, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Framework = () => {
  const steps = [
    {
      icon: Compass,
      step: "01",
      title: "Discover",
      description: "Understand your current state and identify real opportunities for AI impact",
      gradient: "from-accent-warm to-amber-400",
    },
    {
      icon: Map,
      step: "02",
      title: "Design",
      description: "Define priorities and create a focused plan with achievable first steps",
      gradient: "from-primary to-cyan-600",
    },
    {
      icon: Settings,
      step: "03",
      title: "Validate",
      description: "Test ideas with low-risk pilots before full commitment",
      gradient: "from-accent-warm to-amber-400",
    },
    {
      icon: TrendingUp,
      step: "04",
      title: "Deliver",
      description: "Implement solutions with guided support and measurable outcomes",
      gradient: "from-primary to-cyan-600",
    },
    {
      icon: RefreshCw,
      step: "05",
      title: "Iterate",
      description: "Continuous improvement through each cycle of the journey",
      gradient: "from-accent-warm to-amber-400",
    },
  ];

  return (
    <section id="framework" className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-accent-warm/10 rounded-full">
            Our Approach
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">
            A Clear Path to AI Success
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            From uncertainty to confident execution—a proven framework that guides you every step of the way.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="relative">
            {/* Connection line - extends to center of last icon */}
            <div className="absolute top-[52px] left-[calc(10%-12px)] right-[calc(10%-12px)] h-1 bg-gradient-to-r from-accent-warm via-primary to-accent-warm rounded-full" />
            
            <div className="grid grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.title} 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Dot marker on line with pulse animation */}
                  <motion.div 
                    className={`absolute top-[48px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br ${step.gradient} ring-4 ring-background z-10 shadow-md`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(var(--accent-warm-rgb), 0.4)",
                        "0 0 0 8px rgba(var(--accent-warm-rgb), 0)",
                        "0 0 0 0 rgba(var(--accent-warm-rgb), 0)"
                      ]
                    }}
                  />
                  <motion.div 
                    className={`absolute top-[48px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br ${step.gradient} z-5`}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                  
                  {/* Step circle with gradient */}
                  <div className={`relative z-10 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Arrow (except last) */}
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute top-[30px] -right-3 w-5 h-5 text-muted-foreground/50 z-20" />
                  )}
                  
                  <span className="text-accent-warm font-bold text-sm mb-2 tracking-wider">{step.step}</span>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden max-w-lg mx-auto">
          <div className="relative">
            {/* Vertical line - stops at last item */}
            <div className="absolute left-9 top-0 bottom-24 w-1 bg-gradient-to-b from-accent-warm via-primary to-accent-warm rounded-full" />
            
            <div className="space-y-10">
              {steps.map((step, index) => (
                <motion.div 
                  key={step.title} 
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-8"
                >
                  <div className={`relative z-10 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="pt-3">
                    <span className="text-accent-warm font-bold text-sm tracking-wider">{step.step}</span>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Framework;