import cover from "@/assets/guide-cover.webp";
import cover240 from "@/assets/guide-cover-240.webp";
import cover360 from "@/assets/guide-cover-360.webp";
import cover480 from "@/assets/guide-cover-480.webp";

type GuideCoverProps = {
  /** Describes the cover for screen readers. Leave empty when the title sits beside it. */
  alt?: string;
  /** Width and tilt of the cover. */
  className?: string;
  /** Load straight away (above the fold) rather than lazily. */
  eager?: boolean;
  /** How wide the cover is shown, so the browser picks the right file size. */
  sizes?: string;
};

// The guide's cover, presented like a printed booklet under a soft light:
// a cool glow behind it, the edge of its pages showing, a shadow beneath, and
// a faint sheen across the top corner. No outline; the light does the separating on dark backgrounds.
const GuideCover = ({ alt = "", className = "w-[150px]", eager = false, sizes = "150px" }: GuideCoverProps) => (
  <div className={`relative flex-none ${className}`}>
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-[34%] rounded-full bg-[radial-gradient(closest-side,rgba(130,190,235,0.42),rgba(90,150,205,0.16)_55%,rgba(90,150,205,0))] blur-2xl"
    />
    {/* The edge of the pages behind the cover. */}
    <div aria-hidden="true" className="absolute inset-0 translate-x-[5px] translate-y-[5px] rounded-[10px] bg-[#C9D6E0]/25" />
    <div aria-hidden="true" className="absolute inset-0 translate-x-[2.5px] translate-y-[2.5px] rounded-[10px] bg-[#C9D6E0]/40" />
    <div className="relative overflow-hidden rounded-[10px] shadow-[0_10px_18px_-10px_rgba(0,0,0,0.6),0_28px_48px_-22px_rgba(0,0,0,0.7)] ring-1 ring-white/[0.16]">
      <img
        src={cover}
        srcSet={`${cover240} 240w, ${cover360} 360w, ${cover480} 480w, ${cover} 720w`}
        sizes={sizes}
        alt={alt}
        width={720}
        height={1018}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        className="block h-auto w-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_28%,rgba(255,255,255,0)_52%)]"
      />
    </div>
  </div>
);

export default GuideCover;
