import { Helmet } from "react-helmet-async";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowRight, CheckCircle2, Clock, Minus, Plus } from "lucide-react";
import { m } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import selinaOffice from "@/assets/selina-work-portrait.webp";
import selinaOffice320 from "@/assets/selina-work-portrait-320.webp";
import selinaOffice480 from "@/assets/selina-work-portrait-480.webp";
import selinaOffice640 from "@/assets/selina-work-portrait-640.webp";
import { EXTRA_SERVICES_SECTION_ID } from "@/lib/extraServices";
import ExtraServicesList from "@/components/ExtraServicesList";
import Framework from "@/components/Framework";
import ClientTestimonials from "@/components/ClientTestimonials";

// The free 5-minute check is a separate, unnumbered entry row with a button.
// The paid journey starts with the AI & Operations Diagnostic. Stages 01 to 05
// open one at a time: closed, each row shows the stage, its name and the
// result; open, it shows what we do and what you get.
const assessment = {
  label: "Free · 5 minutes",
  service: "5-Minute AI Readiness Assessment",
  result: "A quick first indication of where you stand, based on your answers.",
  ctaLabel: "Start the free assessment",
  ctaHref: "https://integroai.tech/assessment",
};

type Stage = {
  number: string;
  stage: string;
  service: string;
  result: string;
  doSteps: string[];
  deliverable: string;
  get: string[];
  extra?: string;
};

const stages: Stage[] = [
  {
    number: "01",
    stage: "Diagnose",
    service: "AI & Operations Diagnostic",
    result: "Know what is slowing your business down, what to fix first and where AI is worth the investment.",
    doSteps: [
      "Interview you and your key team members",
      "Understand how work really gets done, and where it gets stuck",
      "Identify the opportunities, the risks and what must stay in human hands",
    ],
    deliverable: "Key Findings Report, strategy, roadmap and recommendations",
    get: [
      "A clear picture of where your business stands today",
      "The opportunities worth acting on, and the risks to manage",
      "A strategy linked to your business goals",
      "A roadmap showing what to do, in what order",
      "Practical recommendations, with the reasons behind them",
    ],
    extra:
      "Every Diagnostic is scoped to your business, the areas to review and the people involved. We agree the scope, deliverables and fee before work begins.",
  },
  {
    number: "02",
    stage: "Decide",
    service: "Agree Your Priorities",
    result: "You choose what matters most right now, and we agree the next stage together.",
    doSteps: [
      "Walk through the findings and recommendations with you",
      "Choose what to act on first, based on urgency, goals and resources",
      "Agree the scope, responsibilities and measures of success for the next stage",
    ],
    deliverable: "An agreed plan for the next stage",
    get: ["Your priorities, confirmed", "A clear scope and timeline", "Measures to judge success"],
  },
  {
    number: "03",
    stage: "Prepare",
    service: "AI Foundations & Responsible Adoption",
    result: "Your workflows, data, people and governance ready for the changes you chose.",
    doSteps: [
      "Map the detailed workflow changes for your chosen priorities",
      "Check and prepare your data",
      "Agree ownership, approval points and accountability",
      "Prepare your team to adopt new ways of working",
    ],
    deliverable: "Workflow plan and adoption readiness",
    get: [
      "A detailed workflow plan",
      "Data readiness actions",
      "Governance and accountability, agreed",
      "Training and upskilling for your team",
    ],
    extra: "Outputs reflect the agreed scope of the engagement.",
  },
  {
    number: "04",
    stage: "Implement",
    service: "AI & Automation Implementation",
    result: "Working solutions your team uses, with human oversight built in.",
    doSteps: [
      "Source the right tools, resources and specialists",
      "Design, build and test the solution with your team",
      "Deploy with human oversight built in",
    ],
    deliverable: "A working solution",
    get: ["Clearly defined scope", "Delivery oversight", "Human oversight built into the solution"],
    extra: "For example: workflow automation, integrations, AI agents, voice AI agents, proof of concept and MVP. Technology follows the business requirement, not the other way round.",
  },
  {
    number: "05",
    stage: "Evolve",
    service: "Ongoing AI & Operations Advisory",
    result: "Changes that keep delivering value as your business grows.",
    doSteps: [
      "Monitor performance against the agreed measures",
      "Optimise what's working and correct what isn't",
      "Update the roadmap as priorities change",
    ],
    deliverable: "Ongoing advisory retainer",
    get: ["Regular evidence-based reviews", "Clear recommendations", "Ongoing leadership advice"],
    extra: "The level of support is agreed with you and reviewed as your priorities change.",
  },
];

const WorkWithMe = () => {
  return (
    <>
      <Helmet>
        <title>Work With Me | AI Consulting &amp; Operations Advisory | IntegroAI Consulting</title>
        <meta
          name="description"
          content="Work with IntegroAI: start with the AI & Operations Diagnostic. Interviews with your key people lead to a Key Findings Report, strategy, roadmap and recommendations. You choose your priorities, then we prepare, implement and improve together. Independent and technology-agnostic."
        />
        <link rel="canonical" href="https://integroai.tech/work-with-me" />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <main id="main-content" className="pt-24 lg:pt-32">
          {/* Intro */}
          <section className="pb-12 sm:pb-16 bg-background">
            <div className="wrap">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto grid sm:grid-cols-[1fr,auto] gap-8 sm:gap-10 items-center text-center sm:text-left"
              >
                <div className="relative flex justify-center sm:order-2 sm:justify-end">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[85%] h-[85%] bg-gradient-to-br from-primary/10 via-accent-warm/10 to-primary/5 rounded-full blur-3xl" />
                  </div>
                  {/* Source photo is portrait (4:5). Matching that aspect ratio here
                      (rather than forcing a square) keeps the full head in frame
                      instead of cropping it off. */}
                  <img
                    src={selinaOffice}
                    srcSet={`${selinaOffice320} 320w, ${selinaOffice480} 480w, ${selinaOffice640} 640w, ${selinaOffice} 900w`}
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 224px"
                    alt="Selina Fischer, Founder of IntegroAI Consulting"
                    width={288}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="relative w-56 sm:w-72 lg:w-80 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/20 z-10 object-cover object-top"
                  />
                </div>

                <div className="sm:order-1">
                  <div className="text-center">
                    <span className="inline-block text-brand-label font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-accent-warm/10 rounded-full">
                      How Engagements Work
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-foreground mb-4">
                      Work With Me
                    </h1>
                  </div>
                  <p className="text-base sm:text-[17px] text-accent-warm font-medium mb-4">
                    AI Adoption &amp; Transformation Consultant for Founder-Led Service Businesses
                  </p>

                  <p className="text-foreground text-base sm:text-[17px] font-semibold leading-snug mb-6">
                    Cut firefighting and repetitive work, and reclaim time for the work you love.
                  </p>

                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      I work with you to understand what is slowing your business down and identify where workflow improvements, AI or automation could make the biggest difference.
                    </p>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      It starts with the AI &amp; Operations Diagnostic. I speak with you and your key people, then give you a Key Findings Report, strategy, roadmap and recommendations. You choose what to act on first, and we agree each next stage before it begins.
                    </p>
                  </div>
                </div>
              </m.div>

              {/* Engagement principle — highly visible */}
              <m.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="max-w-3xl mx-auto mt-10"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent-warm/20 to-primary/20 rounded-xl blur-lg" />
                  <p
                    className="relative text-sm sm:text-base font-semibold bg-card border border-border/50 rounded-xl p-5 sm:p-6 shadow-lg text-center leading-relaxed [text-wrap:balance]"
                    style={{ color: "#041B2B" }}
                  >
                    Every engagement is led by me, one stage at a time, and we agree each stage before it begins.
                  </p>
                </div>
              </m.div>
            </div>
          </section>

          {/* Stages: an unnumbered free entry row, then five stages that open one at a time. */}
          <section className="py-12 sm:py-16 bg-subtle">
            <div className="wrap">
              <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] mb-4">How We Can Work Together</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed [text-wrap:balance]">
                  Five stages, from diagnosis to ongoing support. We start by understanding your business, your people and your goals. You receive your findings, strategy and roadmap, choose your priorities, and I help you put them into practice. I lead every stage personally, and we agree the scope together before it begins.
                </p>
              </div>

              <m.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto flex flex-col gap-3"
              >
                {/* Free check: separate from the paid stages, so it gets a button instead of details. */}
                <div className="flex flex-col gap-4 rounded-[14px] border border-brand-amber bg-white px-5 py-5 sm:flex-row sm:items-center sm:px-6">
                  <div className="flex flex-1 items-start gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-amber text-brand-navy" aria-hidden="true">
                      <Clock className="h-[18px] w-[18px]" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-teal">
                        {assessment.label}
                      </p>
                      <h3 className="mt-1 text-base font-semibold leading-snug text-brand-navy sm:text-[17px]">{assessment.service}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-brand-slate sm:text-[15px]">{assessment.result}</p>
                    </div>
                  </div>
                  <a href={assessment.ctaHref} target="_blank" rel="noopener noreferrer" className="btn-amber group w-fit flex-none sm:ml-4">
                    {assessment.ctaLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>

                <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
                  {stages.map((item) => (
                    <Accordion.Item
                      key={item.number}
                      value={item.number}
                      className="group rounded-[14px] border border-brand-sand bg-white transition-colors data-[state=open]:border-brand-amber data-[state=open]:ring-1 data-[state=open]:ring-brand-amber"
                    >
                      <Accordion.Header asChild>
                        <h3 className="m-0">
                          <Accordion.Trigger className="flex w-full items-start gap-4 rounded-[14px] px-5 py-5 text-left sm:px-6">
                            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white" aria-hidden="true">
                              {item.number}
                            </span>
                            <span className="flex-1">
                              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-brand-teal">
                                Stage {item.number} · {item.stage}
                              </span>
                              <span className="mt-1 block text-base font-semibold leading-snug text-brand-navy sm:text-[17px]">{item.service}</span>
                              <span className="mt-1 block text-sm font-normal leading-relaxed text-brand-slate sm:text-[15px]">{item.result}</span>
                            </span>
                            <Plus className="mt-2.5 h-[18px] w-[18px] flex-none text-brand-navy group-data-[state=open]:hidden" strokeWidth={2} aria-hidden="true" />
                            <Minus className="mt-2.5 hidden h-[18px] w-[18px] flex-none text-brand-navy group-data-[state=open]:block" strokeWidth={2} aria-hidden="true" />
                          </Accordion.Trigger>
                        </h3>
                      </Accordion.Header>

                      {/* forceMount keeps the details in the page HTML for search
                          engines and AI assistants while they are collapsed. */}
                      <Accordion.Content forceMount className="px-5 pb-6 data-[state=closed]:hidden sm:px-6 sm:pl-[80px]">
                        <div className="grid gap-6 border-t border-brand-sand pt-5 sm:grid-cols-2 sm:gap-8">
                          <div>
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-slate">What we do</p>
                            <ol className="flex list-none flex-col gap-2.5">
                              {item.doSteps.map((step, stepIndex) => (
                                <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-brand-navy sm:text-[15px]">
                                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand-chip text-[11px] font-bold text-brand-navy" aria-hidden="true">
                                    {stepIndex + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div>
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-slate">What you get</p>
                            <p className="mb-2.5 text-[15px] font-semibold text-brand-navy sm:text-base">{item.deliverable}</p>
                            <ul className="flex flex-col gap-2">
                              {item.get.map((g) => (
                                <li key={g} className="flex items-start gap-2 text-sm leading-relaxed text-brand-slate sm:text-[15px]">
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-teal" aria-hidden="true" />
                                  {g}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {item.extra && (
                          <p className="mt-5 text-[13px] leading-relaxed text-brand-slate sm:text-sm">{item.extra}</p>
                        )}
                      </Accordion.Content>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </m.div>
            </div>
          </section>

          {/* Client testimonials: proof at the point of decision. */}
          <Framework titleClassName="font-heading text-3xl sm:text-4xl lg:text-[40px]" />

          <ClientTestimonials id="client-testimonials-title" heading="In our clients’ words">
            <div className="flex justify-center">
              <a
                href="https://calendly.com/integroai-tech/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-amber group"
              >
                Book a Discovery Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
              </a>
            </div>
          </ClientTestimonials>

          {/* Standalone services, kept brief on purpose. */}
          <section id={EXTRA_SERVICES_SECTION_ID} className="bg-white py-12 sm:py-14">
            <div className="wrap">
              <m.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="mx-auto flex max-w-5xl flex-col items-center gap-7"
              >
                <h2 className="text-center font-heading text-3xl sm:text-4xl">More practical solutions to support your business</h2>
                <ExtraServicesList />
                <a
                  href="https://calendly.com/integroai-tech/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-navy"
                >
                  Book a Discovery Call
                </a>
              </m.div>
            </div>
          </section>

          {/* What You Can Expect */}
          <section className="py-16 sm:py-20 lg:py-24 bg-[#041B2B] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-warm/10 rounded-full blur-[150px]" />
            <div className="wrap relative z-10">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto text-center"
              >
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[40px] font-semibold text-white mb-6">
                  What You Can Expect
                </h2>
                <div className="space-y-4 mb-10 text-left sm:text-center">
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    I lead every engagement personally, from the first interviews through to recommendations and delivery support.
                  </p>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    My advice is independent and technology-agnostic. Recommendations follow the needs of your business, not a preferred platform, vendor or predetermined solution. Sometimes the right answer is a simpler process, not AI.
                  </p>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    Every engagement is scoped to your priorities, your team and your existing systems. Fees are agreed with you before work begins, and support adapts as your needs change.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto" asChild>
                    <a href="https://calendly.com/integroai-tech/30min" target="_blank" rel="noopener noreferrer">
                      Book a Discovery Call
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button variant="heroOutline" size="lg" className="w-full sm:w-auto" asChild>
                    <a href="https://integroai.tech/assessment" target="_blank" rel="noopener noreferrer">
                      Start the free assessment
                    </a>
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

export default WorkWithMe;
