// The brand tagline: deep teal words separated by amber dots.
// Used beside the logo in the header, in the mobile menu and in the footer.
const WORDS = ["Simplify", "Prioritise", "Grow"];

const Tagline = () => (
  <>
    {WORDS.map((word, index) => (
      <span key={word}>
        {index > 0 && <span className="text-brand-amber"> · </span>}
        {word}
      </span>
    ))}
  </>
);

export default Tagline;
