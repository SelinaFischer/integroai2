import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const FAQ = () => {
  const faqs = [
    {
      question: "What makes IntegroAI Consulting different from other AI consultants?",
      answer:
        "IntegroAI starts with Operational Clarity before investing in any AI tool. The focus is on people, processes, and commercial outcomes first.",
    },
    {
      question: "Who is IntegroAI Consulting best suited for?",
      answer:
        "IntegroAI is best suited for service-based, founder-led and growing businesses where manual work, fragmented processes, and capacity pressure are affecting performance. It is a strong fit for leaders who want clear guidance before making any AI investment.",
    },
    {
      question: "What is an AI Readiness Assessment and what does IntegroAI cover?",
      answer:
        "Our free AI Readiness Assessment is a short online questionnaire that helps you understand whether your business is ready to invest in AI at all. It looks at leadership alignment, process quality, data foundations, team capacity, and where AI is actually relevant, so you can see where AI is worth pursuing and where it is not.",
    },
    {
      question: "How long does the AI Readiness Assessment take and how much does it cost?",
      answer:
        "The assessment takes around five minutes to complete and is free. You receive an initial score and a clear view of your operational readiness for AI without any obligation.",
    },
    {
      question: "What happens after I complete the AI Readiness Assessment?",
      answer:
        "You receive your AI readiness score and summary on screen and by email. Based on the results, you can then book a free 30-minute discovery call to walk through the analysis and define practical next steps for your business.",
    },
    {
      question: "When should a business not invest in AI?",
      answer:
        "A business should hold off on AI when the core problem is unclear, processes are inconsistent, or data is unreliable. AI scales what already exists, so introducing it on top of broken workflows or poor data can add cost and complexity without delivering value.",
    },
    {
      question: "If our internal processes are already broken, can AI still help?",
      answer:
        "AI can help, but not as the first step. The priority is to understand the workflow bottlenecks, data issues, and ownership gaps first. Once those foundations are clearer, AI can be applied selectively where it genuinely removes friction and saves time.",
    },
    {
      question: "Can you help us choose between AI, automation, and workflow improvement?",
      answer:
        "Yes. IntegroAI helps you decide whether the right solution is AI, automation, workflow redesign, clearer data structure, or better process ownership. Not every operational problem needs AI.",
    },
    {
      question: "Do we need technical staff or a data team to work with IntegroAI?",
      answer:
        "No. You do not need a data team or in-house technical staff to get started. The work begins with understanding your operations, goals, and constraints. Specialist technical support can be introduced later if it is genuinely needed.",
    },
    {
      question: "What does a typical engagement with IntegroAI look like from start to finish?",
      answer:
        "Most engagements begin with the free AI Readiness Assessment, followed by a discovery session to interpret your score and operational context. From there, IntegroAI identifies key bottlenecks, builds Operational Clarity around how work actually gets done, and prioritises where AI may or may not add value.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>
          IntegroAI Consulting FAQ | AI Readiness Assessment & Operational Clarity
        </title>
        <meta
          name="description"
          content="Answers to common questions about IntegroAI Consulting, AI readiness assessment, operational clarity, and practical AI adoption for service-based SMEs."
        />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section className="relative overflow-hidden bg-background py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-4xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Common Questions
            </span>

            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Frequently Asked Questions
            </h2>

            <p className="text-xl leading-relaxed text-muted-foreground">
              Quick answers to the questions we hear most often from business leaders.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-4xl"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-border/50 bg-card/50 px-6 backdrop-blur-sm"
                >
                  <AccordionTrigger className="py-6 text-left text-lg font-medium hover:no-underline">
                    <div className="flex items-start gap-4 pr-4">
                      <span className="min-w-[2rem] text-sm font-medium text-primary/70 md:text-base">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{faq.question}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pb-6 pl-12 text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
