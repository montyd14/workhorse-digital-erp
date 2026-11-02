import type { Industry } from "../types";

export const junkRemoval: Industry = {
  slug: "junk-removal",
  name: "Junk Removal Companies",
  shortName: "Junk Removal",
  ownerNoun: "junk removal business owner",
  priority: 6,
  metaTitle: "Junk Removal Software: Websites, Quotes & Calls",
  metaDescription:
    "Custom websites, photo-quote pipelines, and call handling for junk removal companies. Built first at no cost. Pay only if you keep it.",
  headline: "Book more hauls with faster quotes and a site that ranks.",
  intro:
    "Junk removal is won on speed. The customer wants a price from a photo and a truck tomorrow. We build the website, quote flow, and call handling that let a two-truck operation respond like a national brand.",
  painPoints: [
    { title: "Photo quotes handled by text", description: "Photos, prices, and addresses spread across three phones." },
    { title: "Website does not take bookings", description: "Customers want a time slot, not a 'call us'." },
    { title: "Calls missed on the truck", description: "Loading a sofa with two hands means the next job calls someone else." },
    { title: "No tracking of commercial accounts", description: "Property managers and realtors who refer repeat work are not in any system." },
  ],
  solutions: [
    { title: "Booking website", description: "Local pages, pricing guide, photo upload, and time-slot requests.", service: "websites" },
    { title: "Quote and dispatch dashboard", description: "Photo quotes, job board, truck assignments, and dump-fee tracking.", service: "erp-dashboards" },
    { title: "Referral partner CRM", description: "Track realtors, property managers, and contractors who send you work.", service: "crm" },
    { title: "Call handling on the road", description: "Answer, qualify, and schedule while the crew is loading.", service: "ai-call-handling" },
  ],
  keywords: ["junk removal website", "junk removal software", "junk removal CRM", "hauling business software"],
  faqs: [
    { question: "Can customers upload photos for a quote?", answer: "Yes. The quote form takes photos from a phone and drops them straight into your quote queue." },
    { question: "Does it handle pricing by load size?", answer: "We build your pricing rules into the quote tool so the office quotes consistently." },
  ],
};
