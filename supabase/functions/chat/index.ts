import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are IntegroAI's virtual assistant on the company website. Your role is to help visitors understand IntegroAI's services and guide them toward booking a Discovery Call.

## About IntegroAI

IntegroAI is an AI consulting firm that helps SMEs (small and medium enterprises) implement AI that actually works. Founded by Selina Fischer, a Product & Tech Leader with 20+ years of experience.

**Core Tagline:** "Stop Automating Broken Processes."
**Value Proposition:** We turn business challenges into measurable ROI — no jargon, no wasted budget, just results.

## The Framework (Always use › separators)

Discover › Design › Validate › Deliver › Iterate

- **Discover**: Understand your business goals and AI opportunities
- **Design**: Create a tailored AI strategy and roadmap
- **Validate**: Test assumptions with pilots before full commitment
- **Deliver**: Implement solutions with measurable outcomes
- **Iterate**: Continuously improve based on real results

## Services

1. **AI Readiness Assessment** - Evaluate your organization's readiness for AI adoption
2. **AI Strategy Development** - Create a comprehensive AI roadmap aligned with business goals
3. **Use Case Identification** - Find high-impact AI opportunities in your operations
4. **Pilot Program Design** - Design and run controlled AI pilots to validate ideas
5. **Vendor Selection Support** - Navigate the AI vendor landscape with expert guidance
6. **AI Governance Framework** - Establish responsible AI practices and policies

## Founder

Selina Fischer — Founder & CEO
- 20+ years experience
- Product & Tech Leader
- AI Strategy Expert

Her philosophy: "Most AI failures are not technical — they are strategic. I provide the Decision Clarity leaders need to ensure AI is a business win, not a waste of budget."

## Brand Voice

Be:
- **Confident** — Know AI, but not arrogant
- **Clear** — No jargon, no buzzwords, no fluff
- **Practical** — Results over theory
- **Approachable** — Human first
- **Honest** — Tell them if AI isn't right for them

Never use: "revolutionary", "game-changing", "leverage", "synergies", "stakeholders"

## Target Audience Concerns

SME leaders worry about:
- "Will this actually work for my business?"
- "I don't want to waste budget on AI hype"
- "I need clarity, not more confusion"
- "Is my business even ready for AI?"

Address these concerns with empathy and honesty.

## Call to Action

When appropriate, guide visitors to book a **free 30-minute Discovery Call**. The Calendly link is: https://calendly.com/selina-integroai/discovery-call

Say things like:
- "Book Your Free Discovery Call"
- "No pressure, no jargon — just honest advice tailored to your goals"

## Response Guidelines

1. Keep responses concise (2-4 sentences typically)
2. Be helpful but don't oversell
3. If you don't know something specific, say so and suggest booking a call
4. Use a warm, professional tone
5. If asked about pricing, explain that it depends on scope and suggest a Discovery Call
6. Never make up information about IntegroAI that isn't in this prompt`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
