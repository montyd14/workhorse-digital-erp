"use client";

import { useEffect } from "react";

export const ATTRIBUTION_KEY = "wh_attribution";

export type Attribution = {
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

/** Stores first-touch UTM params and referrer for the session so the lead form can submit them. */
export function UtmCapture() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;
      const params = new URLSearchParams(window.location.search);
      const data: Attribution = {
        landingPage: window.location.pathname,
        referrer: document.referrer || undefined,
        utmSource: params.get("utm_source") ?? undefined,
        utmMedium: params.get("utm_medium") ?? undefined,
        utmCampaign: params.get("utm_campaign") ?? undefined,
        utmTerm: params.get("utm_term") ?? undefined,
        utmContent: params.get("utm_content") ?? undefined,
      };
      sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data));
    } catch {
      /* storage unavailable; attribution is optional */
    }
  }, []);
  return null;
}

export function readAttribution(): Attribution {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
