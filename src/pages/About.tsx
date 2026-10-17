import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Lightbulb, Shield, Award, BarChart3, ArrowRight, Linkedin, CircleAlert, Sparkles, CheckCircle2 } from "lucide-react";
import { m } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { SELINA_STORY_SECTION_ID } from "@/lib/selinaStory";
import ClientTestimonials from "@/components/ClientTestimonials";
import selinaPhoto from "@/assets/selina-story-portrait.webp";
import selinaPhoto480 from "@/assets/selina-story-portrait-480.webp";
import selinaPhoto720 from "@/assets/selina-story-portrait-720.webp";

const values = [
  {
    icon: Lightbulb,
    title: "Clarity",
    description: "You know the problem, the priorities and what success looks like before work begins.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "You get honest advice, including when AI is not the answer.",
  },
  {
    icon: Award,
    title: "Practicality",
    description: "Recommendations fit your workflows, resources and business priorities.",
  },
  {
    icon: BarChart3,
    title: "Accountability",
    description: "You know who owns what, and progress is measured against clear business outcomes.",
  },
];

// The two cards near the top: what the reader is living with, and what
// better looks like.
const situationCards = [
  {
    icon: CircleAlert,
    label: "Sound familiar?",
    title: "When the business runs on you",
    points: [
      "Decisions wait for you.",
      "The same problems keep coming back.",
      "Good people lose hours to manual, repetitive work.",
      "AI feels urgent, but it is unclear where to start.",
    ],
  },
  {
    icon: Sparkles,
    label: "What better looks like",
    title: "A business that doesn't run on firefighting",
    points: [
      "You know what to fix first, and why.",
      "Your team gets time back for client work.",
      "AI takes on repetitive work. People keep the decisions that matter.",
      "Progress is measured against outcomes you agreed.",
    ],
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | IntegroAI Consulting</title>
        <meta
          name="description"
          content="IntegroAI Consulting is an independent UK-based AI consultancy. Founder Selina Fischer helps founder-led service businesses cut firefighting and repetitive work, and reclaim time for the work they love."
        />
        <link rel="canonical" href="https://integroai.tech/about" />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main id="main-content" className="pt-24 lg:pt-32 pb-16 lg:pb-24">
          {/* Intro */}
          <section className="pb-14 sm:pb-16 bg-background">
            <div className="wrap">
              {/* Company introduction. Selina's portrait appears once, in her story below. */}
              <div className="max-w-5xl mx-auto">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-left"
              >
                <div className="text-center">
                <span className="inline-block text-brand-label font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-accent-warm/10 rounded-full">
                  About IntegroAI Consulting
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-foreground mb-6 [text-wrap:balance]">
                  You started this business to do the work you love.
                </h1>
                </div>

                <div className="mx-auto max-w-3xl space-y-5" data-intro-text>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Then it grew. Now your week goes on chasing updates, fixing the same problems twice and answering questions only you can answer. Your team is busy, but not always on the work that grows the business.
                  </p>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    IntegroAI Consulting is an independent AI consultancy for founder-led service businesses. I help founders cut firefighting and repetitive work, and reclaim time for the work they love.
                  </p>
                  <p className="text-foreground text-sm sm:text-base leading-relaxed font-medium">
                    My advice is independent of any technology provider. Recommendations are shaped by your business goals, budget and existing systems.
                  </p>
                </div>
              </m.div>
              </div>
            </div>
          </section>

          {/* The reader's situation and the outcome: same card language as the
              list below (white card, flat amber icon tile), so the page reads as one system. */}
          <section className="py-12 sm:py-16 bg-subtle">
            <div className="wrap">
              <div className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2 sm:gap-5">
                {situationCards.map((card, index) => (
                  <m.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card border border-border/40 rounded-2xl p-6 sm:p-8 shadow-sm"
                  >
                    <div className="mb-5 flex items-center gap-3.5">
                      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-amber sm:h-12 sm:w-12">
                        <card.icon className="h-5 w-5 text-brand-navy sm:h-[22px] sm:w-[22px]" strokeWidth={2.2} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-teal">{card.label}</p>
                        <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug">{card.title}</h2>
                      </div>
                    </div>
                    <ul className="flex flex-col gap-2.5">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#42566A] sm:text-base">
                          <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-brand-teal" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </m.div>
                ))}
              </div>
            </div>
          </section>

          {/* Values: one panel split by hairlines rather than four separate
              cards, with soft icon tiles, so it sits quietly under the two
              situation cards. */}
          <section className="py-12 sm:py-16 bg-background">
            <div className="wrap">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground text-center mb-8 sm:mb-10">
                  What you can expect
                </h2>
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-brand-sand bg-brand-sand sm:grid-cols-2 lg:grid-cols-4"
                >
                  {values.map((value) => (
                    <div key={value.title} className="flex flex-col gap-3 bg-card p-6 sm:p-7">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-chip text-brand-navy">
                        <value.icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-bold leading-tight">{value.title}</h3>
                      <p className="text-[15px] leading-relaxed text-[#42566A]">{value.description}</p>
                    </div>
                  ))}
                </m.div>
              </div>
            </div>
          </section>

          {/* Proof from people who have worked with Selina. */}
          <ClientTestimonials id="about-testimonials-title" heading="In our clients’ words" />

          {/* Founder: fuller story. The homepage "Read Her Story" button lands here. */}
          <section id={SELINA_STORY_SECTION_ID} className="py-16 sm:py-20 bg-muted/30">
            <div className="wrap">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10 sm:mb-14"
              >
                <span className="inline-block text-brand-label font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-accent-warm/10 rounded-full">
                  Selina&apos;s Story
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] font-semibold text-foreground [text-wrap:balance]">
                  Why I start with your problem, not the technology
                </h2>
              </m.div>

              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-16 items-center">
                  <m.div
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
                      srcSet={`${selinaPhoto480} 480w, ${selinaPhoto720} 720w, ${selinaPhoto} 960w`}
                      sizes="(min-width: 1024px) 480px, (min-width: 640px) 384px, 320px"
                      alt="Selina Fischer, founder of IntegroAI Consulting"
                      width={960}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="relative w-80 sm:w-96 lg:w-[30rem] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/20 z-10 h-auto"
                    />
                  </m.div>

                  <m.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6 text-left self-start"
                  >
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-base leading-relaxed">
                        Throughout my career in product, technology and operations, I have turned business needs into practical, working solutions. That experience taught me to start with three questions: What problem are we solving? Why does it matter? What would a better outcome look like?
                      </p>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        That is how I approach your business. Not with a tool to sell, but with those three questions. Business owners need clarity about where to focus, what to invest in and how to make changes work in practice.
                      </p>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        I founded IntegroAI Consulting to bring that thinking to AI adoption.{" "}
                        <span className="font-semibold text-foreground">IntegroAI means integration and growth with AI.</span>{" "}
                        The name reflects my belief that AI should become a useful part of how a business works, improving everyday operations and supporting growth.
                      </p>
                      <p className="text-muted-foreground text-base leading-relaxed">
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
                  </m.div>
                </div>
              </div>
            </div>
          </section>

          {/* Closing CTA */}
          <section className="py-14 sm:py-16 bg-background">
            <div className="wrap">
              <m.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center"
              >
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-6 [text-wrap:balance]">
                  Want to know where your time is really going?
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto" asChild>
                    <a href="https://calendly.com/integroai-tech/30min" target="_blank" rel="noopener noreferrer">
                      Book a Discovery Call
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                    <Link to="/work-with-me">
                      See How We Can Work Together
                    </Link>
                  </Button>
                </div>
              </m.div>
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
