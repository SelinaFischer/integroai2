import { useEffect, useRef } from "react";

// A line of text that comes into focus, word by word, the first time it
// scrolls into view. Adapted from the "Blur Text" idea on reactbits.dev,
// rewritten small so it adds no library and keeps the site's light setup.
//
// The words are always in the page as ordinary text. The soft-focus starting
// state is only switched on in the browser, after the page has loaded, so
// search engines, AI crawlers and anyone without JavaScript see the plain line.
// Visitors who ask for reduced motion see the plain line too.
interface BlurRevealProps {
  text: string;
  className?: string;
}

const BlurReveal = ({ text, className }: BlurRevealProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen when the page opens: leave it sharp, nothing to reveal.
    const box = element.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) return;

    element.dataset.blur = "soft";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.blur = "sharp";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.6 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`blur-reveal ${className ?? ""}`.trim()}>
      {words.map((word, index) => (
        <span key={index} style={{ transitionDelay: `${index * 140}ms` }}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
};

export default BlurReveal;
