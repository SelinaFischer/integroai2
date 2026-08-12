import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Lightbulb, Shield, Award, BarChart3, ArrowRight, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import selinaOfficePhoto from "@/assets/selina-office.png";
import selinaPhoto from "@/assets/selina-founder.png";

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
    description: "We give honest guidance, including when AI is not the right solution.",
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

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | IntegroAI Consulting</title>
        <meta
          name="description"
          content="IntegroAI Consulting is an independent UK-based AI consultancy helping founder-led service businesses reduce repetitive work, strengthen operational control and turn AI into measurable business value."
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
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-accent-warm/10 rounded-full">
                      About
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                      About IntegroAI Consulting
                    </h1>

                    <div className="space-y-5">
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        IntegroAI Consulting is an independent UK-based AI consultancy helping founder-led service businesses reduce repetitive work, strengthen operational control and turn AI into measurable business value.
                      </p>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        We combine AI consulting with business and operations advisory, starting with a clear understanding of how the business operates before determining where technology can add value.
                      </p>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        Our work considers workflows, processes, data, systems, ownership and organisational readiness so that AI decisions are grounded in operational reality.
                      </p>
                      <p className="text-foreground text-sm sm:text-base leading-relaxed font-medium">
                        As an independent, technology-agnostic consultancy, IntegroAI adapts each engagement to the priorities, systems and level of AI maturity of the business.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="self-start lg:sticky lg:top-24"
                  >
                    <div className="rounded-2xl overflow-hidden shadow-card border border-border/50 aspect-[4/5]">
                      <img
                        src={selinaOfficePhoto}
                        alt="Professional workspace — IntegroAI Consulting"
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground leading-relaxed text-center lg:text-left">
                      Helping business leaders turn operational complexity into confident AI decisions.
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
                  className="bg-card border border-border/50 rounded-xl p-6 sm:p-7 shadow-card"
                >
                  <h2 className="text-lg sm:text-xl font-bold mb-3 text-foreground">Mission</h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    To help business leaders make confident AI decisions that reduce repetitive work, strengthen operational control and create measurable business value.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card border border-border/50 rounded-xl p-6 sm:p-7 shadow-card"
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
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 sm:mb-10">
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
                      className="group bg-card rounded-xl p-5 sm:p-6 shadow-card border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                          <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  About Selina
                </h2>
              </motion.div>

              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-16 items-start">
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
                      alt="Selina Fischer - IntegroAI Founder"
                      width={400}
                      height={400}
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
                    <div className="flex flex-wrap justify-start gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        20+ Years in Product &amp; Tech
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        AI &amp; Data Strategy
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        Leadership-Led Adoption
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        AI for Founder-Led Service Businesses
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        Tech Practitioner
                      </span>
                    </div>

                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        I've worked in technology for over 20 years, driven by curiosity and a genuine interest in how things work. Much of my career has been spent in product management and delivery, turning ideas into practical, working solutions.
                      </p>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        That experience shaped how I think about technology. Whatever you build needs a clear purpose. You need to understand the problem you're solving and why it matters. Without that clarity, even good technology struggles to deliver real value.
                      </p>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        <span className="font-semibold text-foreground">IntegroAI means integration and growth.</span>{" "}
                        AI should integrate into how a business already operates and help it grow with intent, rather than sit on top as another disconnected layer.
                      </p>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        I started IntegroAI Consulting to bring that product-led thinking to AI adoption, helping leaders approach AI with clarity, practicality and purpose. My work is supported by hands-on delivery experience across operations, product, technology and data, alongside formal training in AI consulting, implementation, data foundations, and leadership-led technology adoption.
                      </p>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        I lead every IntegroAI engagement personally, from initial diagnosis through to recommendations and delivery support.
                      </p>
                    </div>

                    <div className="flex justify-center lg:justify-start">
                      <a
                        href="https://www.linkedin.com/in/selinafischer8/"
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
