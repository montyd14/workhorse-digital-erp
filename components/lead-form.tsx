"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { industries } from "@/content/industries";
import { NEEDS, leadSchema } from "@/lib/lead-schema";
import { trackLeadSubmitted } from "@/lib/analytics";
import { readAttribution } from "./utm-capture";

const inputCls =
  "mt-1.5 w-full rounded-md border border-line bg-paper px-3.5 py-3 text-base text-ink placeholder:text-ink-muted/70 focus:border-brand";
const labelCls = "block text-sm font-semibold text-ink";

export function LeadForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const attribution = readAttribution();

    const payload = {
      name: fd.get("name"),
      businessName: fd.get("businessName"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      industry: fd.get("industry"),
      needs: fd.getAll("needs"),
      websiteUrl: fd.get("websiteUrl") || undefined,
      message: fd.get("message") || undefined,
      sourcePage: window.location.pathname,
      referrer: attribution.referrer,
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      utmTerm: attribution.utmTerm,
      utmContent: attribution.utmContent,
      company_website: fd.get("company_website") || undefined,
    };

    const check = leadSchema.safeParse(payload);
    if (!check.success) {
      setError(check.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check.data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error ?? "Something went wrong. Please call us instead.");
        setSubmitting(false);
        return;
      }
      trackLeadSubmitted({ industry: String(payload.industry), source: "free-build-form" });
      router.push("/thank-you");
    } catch {
      setError("Network error. Please try again or call us.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Your name
          </label>
          <input id="name" name="name" autoComplete="name" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="businessName" className={labelCls}>
            Business name
          </label>
          <input id="businessName" name="businessName" autoComplete="organization" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required className={inputCls} />
        </div>
      </div>

      <div>
        <label htmlFor="industry" className={labelCls}>
          Industry
        </label>
        <select id="industry" name="industry" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            Choose one
          </option>
          {industries.map((i) => (
            <option key={i.slug} value={i.slug}>
              {i.name}
            </option>
          ))}
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend className={labelCls}>What do you need? (pick any)</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {NEEDS.map((n) => (
            <label key={n.value} className="flex cursor-pointer items-center gap-3 rounded-md border border-line bg-paper px-3.5 py-3 text-base">
              <input type="checkbox" name="needs" value={n.value} className="h-5 w-5 accent-brand" />
              {n.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="websiteUrl" className={labelCls}>
          Current website <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <input id="websiteUrl" name="websiteUrl" type="url" inputMode="url" placeholder="https://" className={inputCls} />
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          What slows you down right now? <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <textarea id="message" name="message" rows={4} className={inputCls} />
      </div>

      {/* Honeypot: hidden from humans, filled by bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-brand bg-brand/10 px-4 py-3 text-sm font-semibold text-brand-dark">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-brand px-6 py-4 text-lg font-bold text-white hover:bg-brand-dark disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending..." : "Request My Free Build"}
      </button>
      <p className="text-sm text-ink-muted">No cost to start. No contract until you approve the finished build.</p>
    </form>
  );
}
