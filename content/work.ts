import type { ServiceSlug } from "./types";

export type WorkItem = {
  slug: string;
  name: string;
  industry: string;
  /** Live URL. Demo entries point at the in-repo demo pages; real clients point at their domain. */
  url?: string;
  /** Optional screenshot in public/work/<file>. 1200x750 recommended. When absent, a styled mock is shown. */
  image?: string;
  blurb: string;
  services: ServiceSlug[];
  /** Shown as a small badge; use "Demo build" until a real client site replaces it. */
  badge?: string;
  /** Accent used for the mock when no screenshot exists */
  accent: string;
};

/**
 * Websites and systems to show on the home page.
 * Replace the demo entries with real client work as it ships:
 * add a screenshot to public/work/, set `image`, set `url`, and remove `badge`.
 */
export const work: WorkItem[] = [
  {
    slug: "route-ready-vending",
    url: "/demo/route-ready-vending",
    image: "route-ready-vending.jpg",
    name: "Route Ready Vending",
    industry: "Vending operator",
    blurb: "Placement site with machine pages, a quote form wired to the CRM, and local pages for three counties.",
    services: ["websites", "crm"],
    badge: "Demo build",
    accent: "#b8431a",
  },
  {
    slug: "clearline-pressure-washing",
    url: "/demo/clearline-pressure-washing",
    image: "clearline-pressure-washing.jpg",
    name: "Clearline Pressure Washing",
    industry: "Pressure washing",
    blurb: "Before-and-after galleries, instant quote request, and a job board the crew runs from their phones.",
    services: ["websites", "erp-dashboards"],
    badge: "Demo build",
    accent: "#1e2328",
  },
  {
    slug: "bluewater-pool-care",
    url: "/demo/bluewater-pool-care",
    image: "bluewater-pool-care.jpg",
    name: "Bluewater Pool Care",
    industry: "Pool service",
    blurb: "Weekly-service booking site plus a customer login that shows visit history, readings, and photos.",
    services: ["websites", "crm", "ai-call-handling"],
    badge: "Demo build",
    accent: "#2b6b66",
  },
];
