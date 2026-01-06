import { Lightbulb, Shield, Award, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const Values = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Clarity",
      description: "Clear communication and transparent processes that cut through complexity. No jargon, just straight talk.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Honest guidance and ethical practices that build lasting trust. We'll tell you when AI isn't the answer.",
    },
    {
      icon: Award,
      title: "Capability",
      description: "Deep expertise and practical skills that deliver real results. We've been in your shoes.",
    },
    {
      icon: BarChart3,
      title: "Results",
      description: "Measurable outcomes and accountable delivery that drive growth. If we can't measure it, we don't do it.",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/3 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-accent-warm/10 rounded-full">
                About IntegroAI Consulting
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6">
                AI Succeeds When Strategy, Data & People Align
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                Most organisations fail because they rush into tools without clarity and purpose. IntegroAI applies a simple principle:
              </p>
              <blockquote className="border-l-4 border-accent-warm pl-4 sm:pl-6 py-3 mb-4 sm:mb-6 bg-accent-warm/5 rounded-r-lg text-left">
                <p className="text-base sm:text-lg font-semibold italic text-foreground">
                  "Clarity first. Solutions second. Results that can be measured."
                </p>
              </blockquote>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Built on a commitment to help organisations use AI responsibly and effectively. Our mission is to simplify the complex, amplify what works, and help leaders and teams grow with confidence.
              </p>
            </motion.div>

            {/* Right - Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card rounded-xl p-5 sm:p-6 shadow-card border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                      <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
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

export default Values;