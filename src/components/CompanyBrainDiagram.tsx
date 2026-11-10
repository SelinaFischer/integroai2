import { useEffect, useRef } from "react";

// The company brain diagram for /blog/what-is-a-company-brain: four branches
// feed the brain, with bubbles running in and out along each one, and the
// result flows out of the stem below. Drawn as SVG so it stays sharp and light.
// The bubbles pause while the diagram is off screen, and stay still for anyone
// who has asked their device to reduce motion.

const AMBER = "#FF9900";
const SLATE = "#4F6789";
const TEAL = "#3B767C";
const NAVY = "#041B2B";

const CLOUD =
  "M400.0 166.0 A40.5 40.5 0 0 1 464.0 178.9 A36.3 36.3 0 0 1 510.9 214.0 A31.6 31.6 0 0 1 528.0 262.0 A31.6 31.6 0 0 1 510.9 310.0 A36.3 36.3 0 0 1 464.0 345.1 A40.5 40.5 0 0 1 400.0 358.0 A40.5 40.5 0 0 1 336.0 345.1 A36.3 36.3 0 0 1 289.1 310.0 A31.6 31.6 0 0 1 272.0 262.0 A31.6 31.6 0 0 1 289.1 214.0 A36.3 36.3 0 0 1 336.0 178.9 A40.5 40.5 0 0 1 400.0 166.0 Z";

type Branch = {
  id: string;
  label: string;
  colour: string;
  pill: { x: number; y: number };
  // Runs from the label towards the brain.
  path: string;
};

const BRANCHES: Branch[] = [
  { id: "cb-context", label: "01  Business context", colour: AMBER, pill: { x: 16, y: 34 }, path: "M180 86 C 210 150 250 180 300 208" },
  { id: "cb-instructions", label: "02  Instructions", colour: SLATE, pill: { x: 524, y: 34 }, path: "M620 86 C 590 150 550 180 500 208" },
  { id: "cb-task", label: "03  Start with one task", colour: TEAL, pill: { x: 16, y: 438 }, path: "M180 438 C 210 380 250 346 300 318" },
  { id: "cb-update", label: "04  Keep it up to date", colour: AMBER, pill: { x: 524, y: 438 }, path: "M620 438 C 590 380 550 346 500 318" },
];

const STEM = "M400 358 L400 470";
const PILL_W = 260;
const PILL_H = 52;
const DURATION = 3.2;

const Bubble = ({ path, colour, inward, offset }: { path: string; colour: string; inward: boolean; offset: number }) => (
  <circle r="9" fill={colour} stroke="#FFFFFF" strokeWidth="3" opacity="0">
    <animateMotion
      dur={`${DURATION}s`}
      begin={`-${offset}s`}
      repeatCount="indefinite"
      keyPoints={inward ? "0;1" : "1;0"}
      keyTimes="0;1"
      calcMode="linear"
    >
      <mpath href={`#${path}`} />
    </animateMotion>
    <animate
      attributeName="opacity"
      values="0;1;1;0"
      keyTimes="0;0.15;0.85;1"
      dur={`${DURATION}s`}
      begin={`-${offset}s`}
      repeatCount="indefinite"
    />
  </circle>
);

const CompanyBrainDiagram = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof svg.pauseAnimations !== "function") return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (reduce?.matches) {
      // Hold the bubbles part-way along their branches.
      svg.setCurrentTime(DURATION * 0.45);
      svg.pauseAnimations();
      return;
    }

    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()),
      { rootMargin: "80px 0px" },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="not-prose my-10 rounded-[14px] border border-brand-sand bg-brand-ivory px-3 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-8">
      <svg
        ref={svgRef}
        viewBox="0 0 800 540"
        className="mx-auto block h-auto w-full max-w-[640px]"
        role="img"
        aria-labelledby="cb-title cb-desc"
      >
        <title id="cb-title">The company brain at a glance</title>
        <desc id="cb-desc">
          A brain labelled Company Brain, connected to four branches: 01 Business context, 02 Instructions, 03 Start with
          one task and 04 Keep it up to date. Knowledge flows in and out along each branch, and the result flows out
          below: less explaining and more consistent work.
        </desc>

        <defs>
          {BRANCHES.map((b) => (
            <path key={b.id} id={b.id} d={b.path} />
          ))}
          <path id="cb-stem" d={STEM} />
        </defs>

        {/* Faint rings behind the brain */}
        {[150, 205, 260].map((r) => (
          <circle key={r} cx="400" cy="262" r={r} fill="none" stroke={NAVY} strokeOpacity="0.06" strokeWidth="1.5" />
        ))}

        {/* Branches and the stem */}
        {BRANCHES.map((b) => (
          <g key={b.id}>
            <use href={`#${b.id}`} fill="none" stroke={b.colour} strokeWidth="3" strokeLinecap="round" />
            <circle cx={b.path.split(" ")[0].slice(1)} cy={b.path.split(" ")[1]} r="5" fill={b.colour} />
          </g>
        ))}
        <use href="#cb-stem" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />

        {/* A soft glow that breathes behind the brain */}
        <ellipse cx="400" cy="262" rx="140" ry="108" fill={AMBER} opacity="0.12">
          <animate attributeName="opacity" values="0.06;0.2;0.06" dur="3.6s" repeatCount="indefinite" />
        </ellipse>

        {/* Bubbles: one running into the brain and one running out, on every branch */}
        {BRANCHES.map((b, i) => (
          <g key={`${b.id}-bubbles`}>
            <Bubble path={b.id} colour={b.colour} inward offset={i * 0.4} />
            <Bubble path={b.id} colour={b.colour} inward={false} offset={i * 0.4 + DURATION / 2} />
          </g>
        ))}
        <Bubble path="cb-stem" colour={TEAL} inward offset={0.3} />
        <Bubble path="cb-stem" colour={TEAL} inward offset={0.3 + DURATION / 2} />

        {/* The brain */}
        <path d={CLOUD} fill="#FFD48A" stroke="#F5A11C" strokeWidth="4" strokeLinejoin="round" />
        <text x="400" y="252" textAnchor="middle" fill={NAVY} fontSize="28" fontWeight="600">
          Company
        </text>
        <text x="400" y="296" textAnchor="middle" fill={NAVY} fontSize="42" fontWeight="700">
          Brain
        </text>

        {/* Branch labels */}
        {BRANCHES.map((b) => (
          <g key={`${b.id}-label`}>
            <rect x={b.pill.x} y={b.pill.y} width={PILL_W} height={PILL_H} rx="26" fill={b.colour} />
            <text
              x={b.pill.x + PILL_W / 2}
              y={b.pill.y + 34}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="23"
              fontWeight="600"
              style={{ whiteSpace: "pre" }}
            >
              {b.label}
            </text>
          </g>
        ))}

        {/* The result */}
        <rect x="290" y="470" width="220" height="56" rx="28" fill="#FFFFFF" stroke={TEAL} strokeWidth="2.5" />
        <text x="400" y="506" textAnchor="middle" fill={TEAL} fontSize="23" fontWeight="600">
          Consistent work
        </text>
      </svg>
      <figcaption className="mx-auto mt-5 max-w-[520px] text-center text-[15px] leading-relaxed text-brand-slate">
        <strong className="text-brand-navy">Less explaining. More consistent work.</strong> People and AI work from the
        same agreed knowledge.
      </figcaption>
    </figure>
  );
};

export default CompanyBrainDiagram;
