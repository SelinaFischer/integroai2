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
    <section id="about" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-accent-warm font-semibold text-sm uppercase tracking-widest mb-4 px-4 py-1.5 bg-accent-warm/10 rounded-full">
                About IntegroAI Consulting
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-5">
                AI Succeeds When Strategy, Data & People Align
              </h2>
              <p className="text-muted-foreground text-base mb-5 leading-relaxed">
                Most organisations fail because they rush into tools without clarity and purpose. IntegroAI applies a simple principle:
              </p>
              <blockquote className="border-l-4 border-accent-warm pl-5 py-3 mb-6 bg-accent-warm/5 rounded-r-xl">
                <p className="text-lg font-semibold italic text-foreground">
                  "Clarity first. Solutions second. Results that can be measured."
                </p>
              </blockquote>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Built on a commitment to help organisations use AI responsibly and effectively. Our mission is to simplify the complex, amplify what works, and help leaders and teams grow with confidence.
              </p>
            </motion.div>

            {/* Right - Values grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">
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