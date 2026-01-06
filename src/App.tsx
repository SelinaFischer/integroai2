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
import BeyondChatbotsAIAgents from "./pages/blog/BeyondChatbotsAIAgents";
import WhyAIFailsDataGap from "./pages/blog/WhyAIFailsDataGap";
import ROTToResilience from "./pages/blog/ROTToResilience";
import AdminStats from "./pages/AdminStats";
import Install from "./pages/Install";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/blog/beyond-chatbots-ai-agents" element={<BeyondChatbotsAIAgents />} />
          <Route path="/blog/why-ai-fails-the-data-gap" element={<WhyAIFailsDataGap />} />
          <Route path="/blog/rot-to-resilience-data-cleanup" element={<ROTToResilience />} />
          <Route path="/install" element={<Install />} />
          <Route path="/admin/stats" element={<AdminStats />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
