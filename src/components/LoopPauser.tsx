import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Keeps the repeating animations cheap: anything that loops (button rings,
// tapping arrows, the floating guide cover, the hero light) is paused while it
// is off screen and resumes when it scrolls back into view. Pausing is done in
// CSS through the data-offscreen attribute (see src/index.css).
const LOOPING = ".hero-light, .halo, .btn-focus, .float-cover, .live-dot, .lead-arrive, .route";

const LoopPauser = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.removeAttribute("data-offscreen");
          else entry.target.setAttribute("data-offscreen", "");
        }
      },
      { rootMargin: "80px 0px" },
    );

    // Wait a moment so the new page's sections are on the page before looking.
    const timer = window.setTimeout(() => {
      document.querySelectorAll(LOOPING).forEach((element) => observer.observe(element));
    }, 300);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
};

export default LoopPauser;
