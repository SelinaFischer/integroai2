import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting config
const MAX_ATTEMPTS = 5; // Max attempts per window
const WINDOW_MINUTES = 15; // Time window in minutes
const LOCKOUT_MINUTES = 30; // Lockout duration after max attempts

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password } = await req.json();
    const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD");

    // Get client IP (use forwarded header or fallback)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor?.split(",")[0]?.trim() || "unknown";

    if (!ADMIN_PASSWORD) {
      console.error("ADMIN_PASSWORD not configured");
      return new Response(
        JSON.stringify({ error: "Admin access not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check recent failed attempts for this IP
    const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
    const lockoutStart = new Date(Date.now() - LOCKOUT_MINUTES * 60 * 1000).toISOString();

    const { data: recentAttempts, error: queryError } = await supabase
      .from("admin_login_attempts")
      .select("id, success, attempted_at")
      .eq("ip_address", clientIp)
      .gte("attempted_at", lockoutStart)
      .order("attempted_at", { ascending: false });

    if (queryError) {
      console.error("Failed to check rate limit:", queryError);
    }

    // Count failed attempts in the window
    const failedAttempts = (recentAttempts || []).filter(
      (a) => !a.success && new Date(a.attempted_at) >= new Date(windowStart)
    ).length;

    // Check if locked out
    if (failedAttempts >= MAX_ATTEMPTS) {
      const oldestFailure = recentAttempts?.find((a) => !a.success);
      const lockoutEnds = oldestFailure 
        ? new Date(new Date(oldestFailure.attempted_at).getTime() + LOCKOUT_MINUTES * 60 * 1000)
        : new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
      
      const remainingMinutes = Math.ceil((lockoutEnds.getTime() - Date.now()) / 60000);
      
      console.log(`Rate limit exceeded for IP: ${clientIp}, ${failedAttempts} failed attempts`);
      
      return new Response(
        JSON.stringify({ 
          error: `Too many failed attempts. Try again in ${remainingMinutes} minutes.`,
          locked: true,
          remainingMinutes 
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isValid = password === ADMIN_PASSWORD;

    // Log this attempt
    await supabase.from("admin_login_attempts").insert({
      ip_address: clientIp,
      success: isValid,
    });

    if (isValid) {
      console.log(`Successful admin login from IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const attemptsRemaining = MAX_ATTEMPTS - failedAttempts - 1;
    console.log(`Failed admin login from IP: ${clientIp}, ${attemptsRemaining} attempts remaining`);

    return new Response(
      JSON.stringify({ 
        error: "Invalid password",
        attemptsRemaining: Math.max(0, attemptsRemaining)
      }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Verify admin error:", e);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
