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
      question: "Do we need perfect processes before using AI?",
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
    {
      question: "How much does AI consulting with IntegroAI cost?",
      answer:
        "Pricing is scoped individually based on your industry, business size, and the nature of the engagement. Every project begins with the free AI Readiness Assessment, which gives both of us a clear picture of your situation before any investment is discussed. There is no obligation at that stage.",
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
          content="Answers to common questions about IntegroAI Consulting, AI readiness assessment, Operational Clarity, and practical AI adoption for business leaders."
        />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section
        id="faq"
        className="py-16 sm:py-20 lg:py-24 bg-subtle relative overflow-hidden"
      >
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
          >
            <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-accent-warm/10 rounded-full">
              Common Questions
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Quick answers to the questions we hear most often from business
              leaders.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-lg sm:rounded-xl border border-border/50 shadow-card px-4 sm:px-5 data-[state=open]:shadow-lg transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base hover:no-underline py-4 sm:py-5">
                    <div className="flex items-start gap-3">
                      <span className="min-w-[1.5rem] text-xs sm:text-sm font-semibold text-accent-warm/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{faq.question}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent forceMount className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-4 sm:pb-5 pl-9">
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
