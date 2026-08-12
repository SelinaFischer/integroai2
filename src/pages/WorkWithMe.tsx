import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Search, Target, ShieldCheck, Cog, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import selinaOffice from "@/assets/selina-office.png";

const stages = [
  {
    icon: Search,
    number: "01",
    stage: "Understand",
    service: "AI & Operations Diagnostic",
    purpose: "A clear, evidence-based view of how the business runs today, and where the real priorities sit.",
    review: ["Workflows & processes", "Systems & data", "Ownership & accountability", "Existing AI use", "Business priorities"],
    receive: ["Priority operational issues", "Readiness gaps", "Recommended next steps"],
    next: "Take the findings forward yourself, or continue with IntegroAI for the next stage.",
    note: "A paid, consultant-led engagement, separate from the free 5-Minute AI Readiness Assessment, which is only an introductory self-check.",
  },
  {
    icon: Target,
    number: "02",
    stage: "Prioritise",
    service: "AI Opportunity & Strategy Roadmap",
    purpose: "Decide what's worth solving, and which opportunities to prioritise first.",
    review: ["Business value", "Feasibility & risk", "Operational readiness", "Success measures", "Sequencing"],
    receive: ["Prioritised opportunity map", "Recommended initiatives", "A practical roadmap"],
    next: "Use the roadmap yourself, or continue with IntegroAI on the next stage.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    stage: "Prepare",
    service: "AI Foundations & Responsible Adoption",
    purpose: "The conditions needed for AI to be adopted responsibly and sustainably.",
    review: ["Data readiness", "Governance & policy", "Accountability", "Team readiness", "Adoption planning"],
    receive: ["Governance recommendations", "Accountability framework", "Adoption readiness actions"],
    next: "Carry these foundations forward yourself, or move straight into implementation with IntegroAI.",
    receiveNote: "Outputs reflect the agreed scope of the engagement.",
  },
  {
    icon: Cog,
    number: "04",
    stage: "Implement",
    service: "AI & Automation Implementation",
    purpose: "Turn validated opportunities into working solutions with a clear business case.",
    review: ["Workflow automation", "Custom GPTs & AI agents", "Proof-of-concept & MVP", "Implementation oversight", "Integration support"],
    receive: ["Clearly defined scope", "Delivery oversight", "Appropriate human oversight"],
    next: "Review outcomes yourself, or continue with IntegroAI into ongoing advisory.",
    note: "Technology follows the business requirement, not the other way round, so what gets built is grounded in a genuine business case.",
  },
  {
    icon: TrendingUp,
    number: "05",
    stage: "Evolve",
    service: "Ongoing AI & Operations Advisory",
    purpose: "Keep implemented changes delivering value as the business and technology evolve.",
    review: ["Performance reviews", "Adoption & governance review", "Course correction", "Roadmap updates", "Ongoing leadership advisory"],
    receive: ["Evidence-based review", "Recommendations", "Ongoing advisory support"],
    next: "Support scales up, down or pauses as priorities change.",
  },
];

const WorkWithMe = () => {
  return (
    <>
      <Helmet>
        <title>Work With Me | AI Consulting &amp; Operations Advisory | IntegroAI Consulting</title>
        <meta
          name="description"
          content="How engagements with IntegroAI work: AI & Operations Diagnostic, Opportunity & Strategy Roadmap, Foundations & Responsible Adoption, Implementation and ongoing advisory. Independent, technology-agnostic, tailored to your business."
        />
        <link rel="canonical" href="https://integroai.tech/work-with-me" />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main id="main-content" className="pt-24 lg:pt-32">
          {/* Intro */}
          <section className="pb-12 sm:pb-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto grid sm:grid-cols-[auto,1fr] gap-8 sm:gap-10 items-center text-center sm:text-left"
              >
                <div className="relative flex justify-center sm:justify-start">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[85%] h-[85%] bg-gradient-to-br from-primary/10 via-accent-warm/10 to-primary/5 rounded-full blur-3xl" />
                  </div>
                  {/* Source photo is portrait (4:5). Matching that aspect ratio here
                      (rather than forcing a square) keeps the full head in frame
                      instead of cropping it off. */}
                  <img
                    src={selinaOffice}
                    alt="Selina Fischer, Founder of IntegroAI Consulting"
                    width={288}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="relative w-56 sm:w-72 lg:w-80 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/20 z-10 object-cover object-top"
                  />
                </div>

                <div>
                  <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-accent-warm/10 rounded-full">
                    How Engagements Work
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                    Work With Me
                  </h1>
                  <p className="text-base sm:text-lg text-accent-warm font-medium mb-8">
                    AI Consulting &amp; Business Operations Advisory for Founder-Led Service Businesses
                  </p>

                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      IntegroAI works with founders and business leaders to understand how their operations function today, identify where meaningful improvement is possible, and determine where AI can contribute to better business outcomes.
                    </p>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      Every engagement begins with clarity on the business need. From there, the work is scoped around the priorities, complexity and level of support required.
                    </p>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      There is no fixed technology stack or predetermined solution. Each engagement is tailored to the operational reality of the business.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Engagement principle — highly visible */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="max-w-3xl mx-auto mt-10"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent-warm/20 to-primary/20 rounded-xl blur-lg" />
                  <p
                    className="relative text-sm sm:text-base font-semibold bg-card border border-border/50 rounded-xl p-5 sm:p-6 shadow-lg text-center leading-relaxed"
                    style={{ color: "#012f46" }}
                  >
                    Each engagement is scoped around what your business needs. You can engage IntegroAI for a specific piece of work, take the outputs forward independently, or continue working together where further support adds value.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Stages */}
          <section className="py-12 sm:py-16 bg-subtle">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4">A Potential Consulting Journey</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Five stages to draw on as your business needs them, not a mandatory package. Engage one piece at a time, or together.
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
                {stages.map((item, index) => (
                  <motion.article
                    key={item.stage}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-card rounded-xl sm:rounded-2xl border border-border/50 shadow-card p-6 sm:p-8"
                  >
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-accent-warm font-bold text-xs uppercase tracking-widest">
                          Stage {item.number} — {item.stage}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mt-1">
                          {item.service}
                        </h3>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                      <div className="sm:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Purpose</p>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item.purpose}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">What we review</p>
                        <div className="flex flex-wrap gap-2">
                          {item.review.map((r) => (
                            <span key={r} className="text-xs sm:text-sm font-medium bg-secondary text-foreground px-2.5 py-1 rounded-full">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">What you receive</p>
                        <ul className="space-y-1.5">
                          {item.receive.map((r) => (
                            <li key={r} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 text-accent-warm flex-shrink-0 mt-0.5" aria-hidden="true" />
                              {r}
                            </li>
                          ))}
                        </ul>
                        {item.receiveNote && (
                          <p className="text-xs text-muted-foreground/80 italic mt-2">{item.receiveNote}</p>
                        )}
                      </div>

                      <div className="sm:col-span-2 pt-2 border-t border-border/50">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 mt-4">What happens next</p>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{item.next}</p>
                        {item.note && (
                          <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed mt-3 bg-muted/50 rounded-lg p-3">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* What You Can Expect */}
          <section className="py-16 sm:py-20 lg:py-24 bg-[#012F46] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-warm/10 rounded-full blur-[150px]" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto text-center"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                  What You Can Expect
                </h2>
                <div className="space-y-4 mb-10 text-left sm:text-center">
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    Selina leads IntegroAI engagements personally, providing continuity from initial diagnosis through to recommendations and delivery support.
                  </p>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    Advice is independent and technology-agnostic. Recommendations are based on the needs of the business rather than a preferred platform, vendor or predetermined solution.
                  </p>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    Engagements are tailored to the organisation's priorities, operational maturity and existing environment. The level of support can adapt as those needs evolve.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto" asChild>
                    <a href="https://integroai.tech/assessment" target="_blank" rel="noopener noreferrer">
                      Start AI Readiness Assessment
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="heroOutline" size="lg" className="w-full sm:w-auto" asChild>
                    <a href="https://calendly.com/integroai-tech/30min" target="_blank" rel="noopener noreferrer">
                      Book a Discovery Call
                    </a>
                  </Button>
                </div>

                <p className="mt-8 text-white/60 text-xs sm:text-sm">
                  Prefer to read about the person leading the work first?{" "}
                  <Link to="/about" className="text-accent-warm hover:underline font-medium">
                    More About Selina
                  </Link>
                </p>
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

export default WorkWithMe;
