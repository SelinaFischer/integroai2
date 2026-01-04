import { motion } from "framer-motion";
import { Linkedin, Award, Briefcase, GraduationCap } from "lucide-react";

const Founder = () => {
  const credentials = [
    {
      icon: Briefcase,
      title: "20+ Years Experience",
      description: "Enterprise technology & data strategy leadership"
    },
    {
      icon: Award,
      title: "Certified Expert",
      description: "AI Strategy, Data Governance & Digital Transformation"
    },
    {
      icon: GraduationCap,
      title: "Thought Leader",
      description: "Published author on AI implementation for SMEs"
    }
  ];

  return (
    <section id="founder" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent-warm font-semibold text-sm tracking-wider uppercase">
            Leadership
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Meet the Founder
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary/20 to-accent-warm/20 overflow-hidden border border-white/10 shadow-2xl">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary/80">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-accent-warm/20 flex items-center justify-center mb-6">
                    <span className="text-5xl font-bold text-accent-warm">SC</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Selina Cheng</h3>
                  <p className="text-accent-warm mt-2">Founder & CEO</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-warm/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Founder Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Selina Cheng
              </h3>
              <p className="text-accent-warm font-semibold text-lg">
                Founder & CEO, IntegroAI Consulting
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              With over two decades of experience in enterprise technology and data strategy, 
              Selina founded IntegroAI Consulting to bridge the gap between AI promise and 
              business reality. Her mission is to help SME leaders navigate AI adoption with 
              clarity, confidence, and measurable results.
            </p>

            <blockquote className="border-l-4 border-accent-warm pl-6 py-2 italic text-foreground/80">
              "IntegroAI provides the structure, discipline, and clarity required to make AI 
              deliver measurable outcomes."
            </blockquote>

            {/* Credentials */}
            <div className="grid gap-4 pt-4">
              {credentials.map((credential, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/50"
                >
                  <div className="p-2 rounded-lg bg-accent-warm/10">
                    <credential.icon className="w-5 h-5 text-accent-warm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{credential.title}</h4>
                    <p className="text-sm text-muted-foreground">{credential.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/company/integroai-consulting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-warm hover:text-accent-warm/80 transition-colors font-medium mt-4"
            >
              <Linkedin className="w-5 h-5" />
              Connect on LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
