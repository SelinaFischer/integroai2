import { useEffect, useRef, useState } from "react";

// Tells a section when to play its one-off entrance, the first time it scrolls
// into view.
//
//   "idle"  : the finished look. This is what the saved HTML contains, what
//             crawlers read, and what reduced-motion visitors always see.
//   "armed" : set in the browser only, for sections still below the screen.
//             The section waits in its starting position.
//   "go"    : the section has scrolled into view; play the entrance.
//
// A section already on screen when the page opens stays "idle", so nothing
// that a visitor can see ever jumps backwards.
export type ScrollCue = "idle" | "armed" | "go";

export const useScrollCue = <T extends Element>(threshold = 0.35) => {
  const ref = useRef<T>(null);
  const [cue, setCue] = useState<ScrollCue>("idle");

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const box = element.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return;

    setCue("armed");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setCue("go");
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, cue };
};

// Counts a whole number up from zero while the cue is "go".
export const useCountUp = (target: number, cue: ScrollCue, duration = 1400) => {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (cue === "idle") return;
    if (cue === "armed") {
      setValue(0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [cue, target, duration]);

  return value;
};
