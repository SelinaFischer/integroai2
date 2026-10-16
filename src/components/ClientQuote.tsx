// One client quote set as an editorial pull quote: large serif italic with a
// hanging amber quotation mark and a short amber rule above the name.
// Shared by the homepage trust strip and the Work With Me page.
interface ClientQuoteProps {
  quote: string;
  name: string;
  role: string;
  received?: string;
  tone?: "light" | "dark";
}

const ClientQuote = ({ quote, name, role, received }: ClientQuoteProps) => (
  <figure className="relative m-0 flex h-full flex-col pl-7 sm:pl-10">
    <span
      aria-hidden="true"
      className="font-heading pointer-events-none absolute -top-3 left-0 select-none text-[64px] leading-none text-brand-amber sm:-top-4 sm:text-[80px]"
    >
      “
    </span>
    <blockquote className="m-0 flex-1">
      <p className="font-heading text-[22px] italic leading-[1.45] text-brand-navy sm:text-[25px]">{quote}</p>
    </blockquote>
    <figcaption className="mt-6 flex flex-col gap-1">
      <span aria-hidden="true" className="mb-2 block h-[2px] w-8 bg-brand-amber" />
      <span className="text-[15px] font-bold text-brand-navy">{name}</span>
      <span className="text-[14px] text-brand-slate">{role}</span>
      {received && <span className="mt-1 text-[13px] text-brand-teal">Received: {received}</span>}
    </figcaption>
  </figure>
);

export default ClientQuote;
