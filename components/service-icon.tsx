import type { ServiceSlug } from "@/content/types";

const COLORS: Record<ServiceSlug, string> = {
  websites: "bg-brand text-white",
  crm: "bg-gold-dark text-white",
  "erp-dashboards": "bg-ink text-brand-light",
  "ai-call-handling": "bg-rust text-cream",
};

/** Colored icon badge per service. Inline SVG, no icon library. */
export function ServiceIcon({ slug, className = "" }: { slug: ServiceSlug; className?: string }) {
  return (
    <span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${COLORS[slug]} ${className}`}
      aria-hidden="true"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {slug === "websites" && (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
          </>
        )}
        {slug === "crm" && (
          <>
            <path d="M3 5h18l-7 8v6l-4-2v-4z" />
          </>
        )}
        {slug === "erp-dashboards" && (
          <>
            <rect x="3" y="3" width="8" height="8" rx="1.5" />
            <rect x="13" y="3" width="8" height="5" rx="1.5" />
            <rect x="13" y="11" width="8" height="10" rx="1.5" />
            <rect x="3" y="14" width="8" height="7" rx="1.5" />
          </>
        )}
        {slug === "ai-call-handling" && (
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.8 2z" />
        )}
      </svg>
    </span>
  );
}
