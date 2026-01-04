import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BeyondChatbotsAIAgents from "./pages/blog/BeyondChatbotsAIAgents";
import WhyAIFailsDataGap from "./pages/blog/WhyAIFailsDataGap";
import ROTToResilience from "./pages/blog/ROTToResilience";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog/beyond-chatbots-ai-agents" element={<BeyondChatbotsAIAgents />} />
          <Route path="/blog/why-ai-fails-the-data-gap" element={<WhyAIFailsDataGap />} />
          <Route path="/blog/rot-to-resilience-data-cleanup" element={<ROTToResilience />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
