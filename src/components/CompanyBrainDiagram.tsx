// The company brain diagram for /blog/what-is-a-company-brain: four branches
// feed the brain, with bubbles running in and out along each one, and the
// result flows out of the stem below. Shown as an animated GIF, with a still
// image for anyone who has asked their device to reduce motion.

const CompanyBrainDiagram = () => (
  <figure className="not-prose my-10 rounded-[14px] border border-brand-sand bg-brand-ivory px-3 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-8">
    <picture>
      <source srcSet="/blog/company-brain-diagram.png" media="(prefers-reduced-motion: reduce)" />
      <img
        src="/blog/company-brain-diagram.gif"
        width={1280}
        height={866}
        loading="lazy"
        decoding="async"
        className="mx-auto block h-auto w-full max-w-[640px]"
        alt="A brain labelled Company Brain, connected to four branches: 01 Business context, 02 Instructions, 03 Start with one task and 04 Keep it up to date. Bubbles run in and out along each branch, and the result flows out below as consistent work."
      />
    </picture>
    <figcaption className="mx-auto mt-5 max-w-[520px] text-center text-[15px] font-bold leading-relaxed text-brand-navy">
      Less explaining. More consistent work. People and AI work from the same agreed knowledge.
    </figcaption>
  </figure>
);

export default CompanyBrainDiagram;
