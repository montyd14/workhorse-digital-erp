export type Faq = { question: string; answer: string };

export type ServiceSlug = "websites" | "crm" | "erp-dashboards" | "ai-call-handling";

export type Industry = {
  slug: string;
  /** Full name used in headings, e.g. "Vending Operators" */
  name: string;
  /** Short label for dropdowns and nav, e.g. "Vending" */
  shortName: string;
  /** Business owner noun, e.g. "vending operator" */
  ownerNoun: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  /** Pain points we hear from this industry */
  painPoints: { title: string; description: string }[];
  /** What we build for them, each tied to a service */
  solutions: { title: string; description: string; service: ServiceSlug }[];
  /** Optional deep-dive feature sections (vending uses these) */
  deepDive?: { title: string; description: string; bullets: string[] }[];
  keywords: string[];
  faqs: Faq[];
  /** Industries that are listed first get more prominence on the index */
  priority: number;
};

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  features: { title: string; description: string }[];
  outcomes: string[];
  process: string[];
  faqs: Faq[];
  keywords: string[];
};
