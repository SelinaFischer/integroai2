import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { homepageFaqs } from "@/lib/faqData";

const FAQ = () => {
  // Homepage shows a maximum of 8 questions. The fuller question set is
  // preserved in src/lib/faqData.tsx (extendedFaqs) for future use.
  const faqs = homepageFaqs;

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
