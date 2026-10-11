import * as Accordion from "@radix-ui/react-accordion";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SectionHeader from "./SectionHeader";
import { homepageFaqs } from "@/lib/faqData";
import { fadeUp } from "@/lib/motion";
import { trackGuideClick } from "@/lib/guide";

const FAQ = () => {
  // Homepage shows a short set of questions. The fuller question set is
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

  const half = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, half), faqs.slice(half)];

  const renderItem = (faq: (typeof faqs)[number], index: number) => (
                <Accordion.Item
          key={faq.question}
          value={`item-${index}`}
          className="group rounded-[14px] border border-brand-sand bg-white transition-colors data-[state=open]:border-brand-amber data-[state=open]:ring-1 data-[state=open]:ring-brand-amber"
        >
          <Accordion.Header asChild>
            <h3 className="m-0">
              <Accordion.Trigger className="flex w-full items-center gap-4 rounded-[14px] px-5 py-5 text-left text-base font-semibold text-brand-navy sm:px-6 sm:text-[17px]">
                <span className="flex-1">{faq.question}</span>
                <Plus className="h-5 w-5 flex-none group-data-[state=open]:hidden" strokeWidth={2.4} aria-hidden="true" />
                <Minus className="hidden h-5 w-5 flex-none group-data-[state=open]:block" strokeWidth={2.4} aria-hidden="true" />
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>

          {/* forceMount keeps every answer in the page HTML, so search
              engines and AI assistants can read answers that are
              collapsed on screen. */}
          <Accordion.Content
            forceMount
            className="px-5 pb-5 text-[15px] leading-relaxed text-brand-slate data-[state=closed]:hidden sm:px-6 sm:text-base"
          >
            {faq.answer}
            {faq.link && (
              <Link
                to={faq.link.to}
                onClick={() => trackGuideClick("faq")}
                className="mt-3 flex w-fit items-center gap-1.5 font-bold text-brand-navy underline decoration-brand-amber decoration-2 underline-offset-4 hover:text-brand-ink"
              >
                {faq.link.label}
                <ArrowRight className="h-4 w-4 flex-none" strokeWidth={2.6} aria-hidden="true" />
              </Link>
            )}
          </Accordion.Content>
        </Accordion.Item>
  );

  return (
    <>
      {/* Structured data only. This section must not set <title> or the meta
          description: it sits on the homepage, and a title here replaces the
          homepage's own title in search results. */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section id="faq" className="bg-brand-ivory py-14 sm:py-16">
        <div className="wrap flex flex-col gap-8">
          <SectionHeader eyebrow="Frequently asked questions" title="AI consulting questions, answered" />

          <m.div {...fadeUp}>
            <Accordion.Root
              type="single"
              collapsible
              defaultValue="item-0"
              className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2"
            >
              {/* Two independent columns, so opening an answer on one side
                  never leaves a gap on the other. */}
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-3">
                  {column.map((faq, index) => renderItem(faq, columnIndex * half + index))}
                </div>
              ))}
            </Accordion.Root>
          </m.div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
