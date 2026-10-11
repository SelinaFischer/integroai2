import { lazy, Suspense, useEffect, useState } from "react";
import { PresenceContext } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import BlogPostPage from "./pages/blog/BlogPostPage";
import BlogPage from "./pages/Blog";
import WorkWithMe from "./pages/WorkWithMe";
import About from "./pages/About";
import Install from "./pages/Install";
import AiVisibilityGuide from "./pages/AiVisibilityGuide";

// The private stats page brings a large charting library with it.
// Loading it on demand keeps that out of every visitor's download.
const AdminStats = lazy(() => import("./pages/AdminStats"));

const queryClient = new QueryClient();

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
  <PresenceContext.Provider value={firstScreen ? entranceBlocked : entranceAllowed}>
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
          <Route path="/install" element={<Install />} />
          <Route path="/admin/stats" element={<Suspense fallback={null}><AdminStats /></Suspense>} />
          {/* Blog index page */}
          <Route path="/blog" element={<BlogPage />} />
          {/* Data-driven blog — handles all articles in blogData.tsx automatically */}
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  </PresenceContext.Provider>
  );
};

export default App;
