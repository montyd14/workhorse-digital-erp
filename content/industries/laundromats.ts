import type { Industry } from "../types";

export const laundromats: Industry = {
  slug: "laundromats",
  name: "Laundromats",
  shortName: "Laundromat",
  ownerNoun: "laundromat owner",
  priority: 2,
  metaTitle: "Laundromat Software: Websites, Wash & Fold CRM",
  metaDescription:
    "Custom websites, wash-and-fold order tracking, and call handling for laundromat owners. Built first at no cost. Pay only if you keep it.",
  headline: "Fill the machines, grow wash-and-fold, and stop losing calls.",
  intro:
    "Laundromats win on location and convenience. The ones that grow add wash-and-fold, pickup and delivery, and commercial accounts. That takes a website people trust and a simple system to track orders. We build both, and you only pay if it earns its keep.",
  painPoints: [
    {
      title: "Wash-and-fold orders on paper tickets",
      description: "Lost tickets, mixed-up bags, and no record of who owes what.",
    },
    {
      title: "No way to book pickup online",
      description: "Customers want to schedule from their phone. If they cannot, they use the app-based competitor.",
    },
    {
      title: "Commercial accounts handled by text message",
      description: "Hotels, gyms, and salons need invoices and pickup schedules, not a thread of texts.",
    },
    {
      title: "Phone rings while the attendant is busy",
      description: "Hours, pricing, and pickup questions go unanswered during the rush.",
    },
  ],
  solutions: [
    {
      title: "Laundromat website with online booking",
      description: "Hours, pricing, services, and a pickup request form that ranks locally.",
      service: "websites",
    },
    {
      title: "Wash-and-fold order tracking",
      description: "Intake, weight, status, and pickup notifications in one screen for attendants.",
      service: "erp-dashboards",
    },
    {
      title: "Commercial account CRM",
      description: "Track prospects, contracts, recurring pickups, and invoices for business accounts.",
      service: "crm",
    },
    {
      title: "Call handling for hours and pricing",
      description: "Answer every call about hours, pricing, and pickup, and log the ones that need a callback.",
      service: "ai-call-handling",
    },
  ],
  keywords: ["laundromat website", "laundromat software", "wash and fold software", "laundromat CRM"],
  faqs: [
    {
      question: "Can customers pay online?",
      answer: "Yes. We can wire the order system to the payment processor you already use so there is nothing new to learn.",
    },
    {
      question: "Does this work with my card or coin system?",
      answer: "The tools we build sit alongside your machine payment system. They handle wash-and-fold, commercial accounts, and your website, not machine payments.",
    },
  ],
};
