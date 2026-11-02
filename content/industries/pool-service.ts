import type { Industry } from "../types";

export const poolService: Industry = {
  slug: "pool-service",
  name: "Pool Service Companies",
  shortName: "Pool Service",
  ownerNoun: "pool service owner",
  priority: 4,
  metaTitle: "Pool Service Software: Routes, CRM & Websites",
  metaDescription:
    "Custom route tracking, customer portals, and websites for pool service companies. Built first at no cost. Pay only if you keep it.",
  headline: "Run your routes, bill on time, and win more weekly accounts.",
  intro:
    "Pool service is a recurring-revenue business with a route problem. Techs need to know which pools, in what order, with what chemicals. Owners need to know who paid, who did not, and which accounts are at risk. We build it the way your company works.",
  painPoints: [
    { title: "Route changes communicated by text", description: "Add a pool, skip a pool, swap a tech. Nobody has the current list." },
    { title: "Chemical logs on paper", description: "When a customer disputes a green pool, you have nothing to show." },
    { title: "Monthly billing takes a weekend", description: "Invoices built by hand, late payments chased by phone." },
    { title: "New accounts call during route hours", description: "The call that would add a weekly account goes to voicemail." },
  ],
  solutions: [
    { title: "Route and service log dashboard", description: "Daily routes per tech, chemical readings, photos, and a customer-ready service record.", service: "erp-dashboards" },
    { title: "Pool service website", description: "Local SEO pages for weekly service, repairs, and openings with a quote form.", service: "websites" },
    { title: "Account and billing CRM", description: "Prospects, active accounts, billing status, and at-risk flags in one view.", service: "crm" },
    { title: "Call handling during routes", description: "Every new-account and service call answered and logged.", service: "ai-call-handling" },
  ],
  keywords: ["pool service software", "pool route software", "pool service CRM", "pool company website"],
  faqs: [
    { question: "Can customers see their service history?", answer: "Yes. A simple customer login shows visit dates, readings, and photos. It cuts down on 'did you come today' calls." },
    { question: "Does this replace my billing software?", answer: "It can track billing status and generate invoice records. Card processing stays with your current provider." },
  ],
};
