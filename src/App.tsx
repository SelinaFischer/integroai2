import { lazy, Suspense, useEffect, useState } from "react";
import { LazyMotion, PresenceContext, domAnimation } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import BlogPostPage from "./pages/blog/BlogPostPage";
import BlogPage from "./pages/Blog";
import WorkWithMe from "./pages/WorkWithMe";
import About from "./pages/About";
import AiVisibilityGuide from "./pages/AiVisibilityGuide";

// The "install this app" help page is rarely visited, so it loads on demand.
const Install = lazy(() => import("./pages/Install"));

// Three libraries the site was loading but never using have been left out to
// keep pages light: react-query (QueryClientProvider), the second toast system
// (Sonner) and tooltips (TooltipProvider). If a future feature needs one of
// them, add its provider back around the app here.

// Tells every animated element whether to play its entrance animation.
// "blocked" makes elements appear in their finished state straight away.
const entranceBlocked = { id: "saved-page", isPresent: true, initial: false as const, register: () => () => {} };
const entranceAllowed = { id: "saved-page", isPresent: true, register: () => () => {} };

interface AppProps {
  /** True when the page was saved as HTML at build time (see src/main.tsx). */
  skipEntrance?: boolean;
}

const App = ({ skipEntrance = false }: AppProps) => {
  // The first screen of a saved page is already on show, so it must not fade
  // in a second time. Once it has started, animations run as normal: later
  // pages and anything that opens afterwards animate in as designed.
  const [firstScreen, setFirstScreen] = useState(skipEntrance);
  useEffect(() => {
    setFirstScreen(false);
  }, []);

  return (
  // LazyMotion loads only the animation features the site uses (fades and
  // scroll reveals). Animated elements are written as <m.div>, not <motion.div>.
  <LazyMotion features={domAnimation} strict>
  <PresenceContext.Provider value={firstScreen ? entranceBlocked : entranceAllowed}>
  <HelmetProvider>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />

        <main id="main-content" tabIndex={-1}>
        <Routes>
          {/* your existing routes stay exactly the same */}
          <Route path="/" element={<Index />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
          <Route path="/about" element={<About />} />
          <Route path="/ai-visibility-guide" element={<AiVisibilityGuide />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/install" element={<Suspense fallback={null}><Install /></Suspense>} />
          {/* Blog index page */}
          <Route path="/blog" element={<BlogPage />} />
          {/* Data-driven blog — handles all articles in blogData.tsx automatically */}
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
        {/* On every page, so the choice can be made (and changed) anywhere. */}
        <CookieConsent />
      </BrowserRouter>
  </HelmetProvider>
  </PresenceContext.Provider>
  </LazyMotion>
  );
};

export default App;
