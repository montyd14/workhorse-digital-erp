/**
 * Client-side helpers for Google Analytics 4. Safe to call anywhere; no-ops
 * when GA is not configured or the gtag script has not loaded.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** Fire the lead conversion. GA4 treats "generate_lead" as a recommended conversion event. */
export function trackLeadSubmitted(params: { industry?: string; source?: string } = {}) {
  trackEvent("generate_lead", { currency: "USD", value: 0, ...params });
}
