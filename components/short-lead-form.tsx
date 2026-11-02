"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { shortLeadSchema } from "@/lib/lead-schema";
import { trackLeadSubmitted } from "@/lib/analytics";
import { readAttribution } from "./utm-capture";

/** Name / business / phone only. Used in the footer and the mobile sticky bar. */
export function ShortLeadForm({ variant = "light", location }: { variant?: "light" | "dark"; location: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const input =
    variant === "dark"
      ? "w-full rounded-md border border-cream/20 bg-ink px-3 py-2.5 text-base text-cream placeholder:text-cream/50 focus:border-brand"
      : "w-full rounded-md border border-line bg-paper px-3 py-2.5 text-base text-ink placeholder:text-ink-muted/70 focus:border-brand";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const attribution = readAttribution();
    const payload = {
      name: fd.get("name"),
      businessName: fd.get("businessName"),
      phone: fd.get("phone"),
      sourcePage: `${window.location.pathname}#${location}`,
      referrer: attribution.referrer,
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      utmTerm: attribution.utmTerm,
      utmContent: attribution.utmContent,
      company_website: fd.get("company_website") || undefined,
    };
    const check = shortLeadSchema.safeParse(payload);
    if (!check.success) {
      setError(check.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...check.data, short: true, needs: [] }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong. Please call us.");
        setSubmitting(false);
        return;
      }
      trackLeadSubmitted({ source: location });
      router.push("/thank-you");
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-4 space-y-2.5">
      <label className="sr-only" htmlFor={`${location}-name`}>
        Your name
      </label>
      <input id={`${location}-name`} name="name" placeholder="Your name" autoComplete="name" required className={input} />
      <label className="sr-only" htmlFor={`${location}-business`}>
        Business name
      </label>
      <input id={`${location}-business`} name="businessName" placeholder="Business name" autoComplete="organization" required className={input} />
      <label className="sr-only" htmlFor={`${location}-phone`}>
        Phone
      </label>
      <input id={`${location}-phone`} name="phone" type="tel" inputMode="tel" placeholder="Phone" autoComplete="tel" required className={input} />
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${location}-hp`}>Leave this empty</label>
        <input id={`${location}-hp`} name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      {error && (
        <p role="alert" className="text-sm font-semibold text-brand">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-brand px-4 py-3 text-base font-bold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Request a Free Build"}
      </button>
    </form>
  );
}
