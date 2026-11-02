import type { Industry } from "../types";

export const pressureWashing: Industry = {
  slug: "pressure-washing",
  name: "Pressure Washing Companies",
  shortName: "Pressure Washing",
  ownerNoun: "pressure washing business owner",
  priority: 3,
  metaTitle: "Pressure Washing Software: Websites, CRM, Quotes",
  metaDescription:
    "Custom websites, quote tracking, and call handling for pressure washing companies. Built first at no cost. Pay only if you keep it.",
  headline: "More quotes, fewer missed calls, and a schedule that makes sense.",
  intro:
    "Pressure washing is a phone-and-photo business. Someone sees a dirty driveway, searches, calls the first company that answers, and books whoever sends a quote fastest. We build the website, the quote pipeline, and the call handling that make you that company.",
  painPoints: [
    { title: "Quotes sent from a phone and forgotten", description: "No follow-up, no record, no idea what your close rate is." },
    { title: "Website does not show your work", description: "Before-and-after photos sell this service. A thin site wastes them." },
    { title: "Calls missed while on a job", description: "You are running a surface cleaner. The call goes to voicemail. They book someone else." },
    { title: "Recurring customers not tracked", description: "The HOA that books yearly should be on a reminder list, not in your memory." },
  ],
  solutions: [
    { title: "Lead-generating website", description: "Service pages, galleries, reviews, and a quote request form built to rank in your area.", service: "websites" },
    { title: "Quote and job CRM", description: "Every request, quote, follow-up, and booked job in one pipeline with reminders.", service: "crm" },
    { title: "Scheduling and crew dashboard", description: "Daily job board, crew assignments, and job photos in one place.", service: "erp-dashboards" },
    { title: "Call handling while you work", description: "Every call answered, qualified, and turned into a quote request.", service: "ai-call-handling" },
  ],
  keywords: ["pressure washing website", "pressure washing CRM", "pressure washing software", "power washing business software"],
  faqs: [
    { question: "Can the system send quotes?", answer: "Yes. Quotes can go out by text or email from the CRM, and you see when they are opened." },
    { question: "I work alone. Is this overkill?", answer: "The website and call handling alone pay for themselves for a solo operator. Add the CRM when you hire your first crew." },
  ],
};
