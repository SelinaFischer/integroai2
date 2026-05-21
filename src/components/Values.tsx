import { Lightbulb, Shield, Award, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const Values = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Clarity",
      description:
        "We define the problem clearly, set decision boundaries, and agree what success looks like before any AI work begins.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We give honest guidance, including when AI is not the right solution.",
    },
    {
      icon: Award,
      title: "Practicality",
      description:
        "Our recommendations are grounded in real workflows, business priorities, and what it will actually take to implement them.",
    },
    {
      icon: BarChart3,
      title: "Accountability",
      description:
        "Progress is measured through clear ownership, responsible delivery, and tangible business outcomes.",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/3 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-foreground text-center">
              About IntegroAI Consulting
            </h2>

            <div className="space-y-6 max-w-3xl mx-auto text-left">
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                IntegroAI helps business leaders cut duplicated manual effort, free up team capacity, and protect margin through human-first AI adoption.
              </p>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                We diagnose gaps in workflow, data, process and ownership before recommending any AI solution, so leaders know exactly what the next steps are, where AI fits, and where it does not.
              </p>

              <div>
                <p className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-wide mb-5">
                  Mission & Vision
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card border border-border/50 rounded-xl p-5 shadow-card">
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">
                      Mission
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      To help business leaders turn operational clarity into confident AI decisions that save time, protect margin, and free teams to focus on growth.
                    </p>
                  </div>

                  <div className="bg-card border border-border/50 rounded-xl p-5 shadow-card">
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-foreground">
                      Vision
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      To help business leaders future-proof their operations for AI readiness, so technology amplifies team capability and reduces operational friction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
    </section>
  );
};

export default Values;
