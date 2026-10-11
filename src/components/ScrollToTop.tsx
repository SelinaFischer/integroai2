import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// On every page change: go to the top, unless the link names a section
// (for example /about#selinas-story), in which case go straight to it.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const jumpToSection = () => {
      const section = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!section) return false;
      // Jump rather than glide: the visitor has just arrived on a new page.
      section.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      return true;
    };

    if (jumpToSection()) {
      // Once more after the page has settled, in case anything above moved.
      const settle = window.setTimeout(jumpToSection, 350);
      return () => window.clearTimeout(settle);
    }
    // No such section: behave like a normal page change.
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
