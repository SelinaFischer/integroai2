// Free AI visibility check. The scan runs in Google Apps Script (see
// apps-script/ai-visibility-check and docs/ai-visibility-check-setup.md).
// Paste the deployed web app URL here. It is public, so it is not a secret.
export const VISIBILITY_CHECK_ENDPOINT = "";
export const VISIBILITY_CHECK_PATH = "/ai-visibility-check";

export type VisibilityCheckItem = {
  id: string;
  label: string;
  status: "pass" | "warn" | "fail" | "info";
  found: string;
};

export type VisibilityCheckResult = {
  ok: boolean;
  status?: "scanned" | "unreadable" | "ignored";
  error?: string;
  url?: string;
  score?: number | null;
  band?: string;
  checks?: VisibilityCheckItem[];
  emailSent?: boolean;
};

// Sends demand-test events to Google Tag Manager.
export const trackVisibilityCheck = (event: string) => {
  try {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event });
  } catch {
    // Tracking must never affect the check itself.
  }
};

// text/plain avoids a browser preflight request, which Apps Script cannot answer.
export const runVisibilityCheck = async (payload: Record<string, unknown>): Promise<VisibilityCheckResult> => {
  if (!VISIBILITY_CHECK_ENDPOINT) return { ok: false, error: "not_configured" };
  const response = await fetch(VISIBILITY_CHECK_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  return response.json();
};
