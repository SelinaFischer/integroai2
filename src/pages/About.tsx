import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Lightbulb, Shield, Award, BarChart3, ArrowRight, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import selinaAboutPhoto from "@/assets/selina-about-portrait.webp";
import selinaPhoto from "@/assets/selina-story-portrait.webp";

const values = [
  {
    icon: Lightbulb,
    title: "Clarity",
    description:
      "We define the problem clearly, set decision boundaries, and agree what success looks like before any AI work begins.",
    gradient: "from-accent-warm to-amber-400",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We give honest guidance, including when AI is not the right solution.",
    gradient: "from-primary to-[#1E4A6E]",
  },
  {
    icon: Award,
    title: "Practicality",
    description:
      "Our recommendations are grounded in real workflows, business priorities, and what it will actually take to implement them.",
    gradient: "from-accent-warm to-amber-400",
  },
  {
    icon: BarChart3,
    title: "Accountability",
    description:
      "Progress is measured through clear ownership, responsible delivery, and tangible business outcomes.",
    gradient: "from-primary to-[#1E4A6E]",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | IntegroAI Consulting</title>
        <meta
          name="description"
          content="IntegroAI Consulting is an independent UK-based AI consultancy helping founder-led service businesses reduce repetitive work, improve operational control and create capacity for growth."
        />
        <link rel="canonical" href="https://integroai.tech/about" />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main id="main-content" className="pt-24 lg:pt-32 pb-16 lg:pb-24">
          {/* Intro */}
          <section className="pb-14 sm:pb-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-accent-warm/10 rounded-full">
                      About
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                      About IntegroAI Consulting
                    </h1>

                    <div className="space-y-5">
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        IntegroAI Consulting is an independent AI consultancy helping founder-led service businesses reduce repetitive work, improve operational control and create capacity for growth.
                      </p>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        We combine AI consulting with business and operations advisory. We start by understanding how work gets done, where problems recur and what needs to improve before recommending where AI or automation can add value.
                      </p>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        We assess your workflows, data, systems and team readiness to identify practical opportunities. From there, we help you prioritise investment, plan implementation and agree how results will be measured.
                      </p>
                      <p className="text-foreground text-sm sm:text-base leading-relaxed font-medium">
                        Our advice is independent of any particular technology provider. Recommendations are shaped by your business goals, budget and existing systems.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="self-start lg:sticky lg:top-24"
                  >
                    <div className="rounded-2xl overflow-hidden shadow-sm border border-border/40 aspect-[4/5]">
                      <img
                        src={selinaAboutPhoto}
                        alt="Selina Fischer, founder of IntegroAI Consulting"
                        width={900}
                        height={1125}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground leading-relaxed text-center">
                      Helping business leaders make clear, practical decisions about AI.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-12 sm:py-16 bg-subtle">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card border border-border/40 rounded-2xl p-7 sm:p-8 shadow-sm"
                >
                  <h2 className="text-lg sm:text-xl font-bold mb-3 text-foreground">Mission</h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    To help business leaders make confident AI decisions, reduce repetitive work and build stronger operational control.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card border border-border/40 rounded-2xl p-7 sm:p-8 shadow-sm"
                >
                  <h2 className="text-lg sm:text-xl font-bold mb-3 text-foreground">Vision</h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    A future where AI makes businesses easier to run, strengthening human capability, improving operational control and supporting sustainable growth.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-12 sm:py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground text-center mb-8 sm:mb-10">
                  Values
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-card rounded-2xl p-6 sm:p-7 shadow-sm border border-border/40 hover:shadow-md hover:border-primary/15 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                          <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Founder — fuller story */}
          <section className="py-16 sm:py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10 sm:mb-14"
              >
                <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-accent-warm/10 rounded-full">
                  Leadership
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-semibold text-foreground">
                  Selina&apos;s Story
                </h2>
              </motion.div>

              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative flex justify-center lg:justify-start self-start"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[90%] h-[90%] bg-gradient-to-br from-primary/10 via-accent-warm/10 to-primary/5 rounded-full blur-3xl" />
                    </div>
                    <img
                      src={selinaPhoto}
                      alt="Selina Fischer, founder of IntegroAI Consulting"
                      width={960}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="relative w-80 sm:w-96 lg:w-[30rem] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/20 z-10 h-auto"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6 text-left self-start"
                  >
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-base sm:text-[17px] leading-relaxed">
                        Throughout my career in product, technology and operations, I have turned business needs into practical, working solutions. That experience taught me to start with three questions: What problem are we solving? Why does it matter? What would a better outcome look like?
                      </p>
                      <p className="text-muted-foreground text-base sm:text-[17px] leading-relaxed">
                        Those questions now guide my approach to AI. Business owners need clarity about where to focus, what to invest in and how to make changes work in practice.
                      </p>
                      <p className="text-muted-foreground text-base sm:text-[17px] leading-relaxed">
                        I founded IntegroAI Consulting to bring that thinking to AI adoption.{" "}
                        <span className="font-semibold text-foreground">IntegroAI means integration and growth with AI.</span>{" "}
                        The name reflects my belief that AI should become a useful part of how a business works, improving everyday operations and supporting growth.
                      </p>
                      <p className="text-muted-foreground text-base sm:text-[17px] leading-relaxed">
                        My approach combines experience of delivering technology with formal training in AI consulting, data analytics and leadership-led technology adoption.
                      </p>
                    </div>

                    <div className="flex justify-center lg:justify-start">
                      <a
                        href="https://www.linkedin.com/in/selinafischer-ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 text-accent-warm hover:text-accent-warm/80 transition-all duration-300 font-medium hover:translate-x-1 py-2 min-h-[44px] group"
                      >
                        <Linkedin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                        Connect with me on LinkedIn
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Closing CTA */}
          <section className="py-14 sm:py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center"
              >
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  Curious how an engagement would work for your business?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto" asChild>
                    <Link to="/work-with-me">
                      See How We Can Work Together
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                    <a href="https://calendly.com/integroai-tech/30min" target="_blank" rel="noopener noreferrer">
                      Book a Discovery Call
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default About;
