import type { Industry } from "../types";

export const mobileDetailing: Industry = {
  slug: "mobile-detailing",
  name: "Mobile Detailing Businesses",
  shortName: "Mobile Detailing",
  ownerNoun: "mobile detailer",
  priority: 7,
  metaTitle: "Mobile Detailing Software: Booking Sites & CRM",
  metaDescription:
    "Custom booking websites, customer CRM, and call handling for mobile detailing businesses. Built first at no cost. Pay only if you keep it.",
  headline: "Fill your calendar with repeat customers, not one-time Instagram leads.",
  intro:
    "Mobile detailing lives on social media, but a business is built on repeat bookings. We build the booking site, the customer list with reminders, and the call handling that turns a one-time wash into a monthly client.",
  painPoints: [
    { title: "Bookings scattered across DMs and texts", description: "Double bookings and no-shows because nothing is in one calendar." },
    { title: "No reminder system", description: "The customer who loved the job in March never heard from you again." },
    { title: "Website is just a link-in-bio", description: "Google searches for 'mobile detailing near me' go to competitors with real sites." },
    { title: "Calls missed mid-detail", description: "Polisher in hand, phone in pocket. That call was a fleet account." },
  ],
  solutions: [
    { title: "Booking website", description: "Packages, pricing, gallery, reviews, and a booking request form that ranks locally.", service: "websites" },
    { title: "Customer CRM with reminders", description: "Every customer, vehicle, package, and next-due date with automatic follow-ups.", service: "crm" },
    { title: "Schedule and fleet dashboard", description: "Daily schedule, route order, and fleet account tracking.", service: "erp-dashboards" },
    { title: "Call handling while detailing", description: "Answer, quote packages, and book while you work.", service: "ai-call-handling" },
  ],
  keywords: ["mobile detailing website", "detailing business software", "auto detailing CRM", "mobile detailing booking"],
  faqs: [
    { question: "Can it send reminders by text?", answer: "Yes. Reminders for the next detail, plus a thank-you after each job, go out automatically." },
    { question: "I get most leads from Instagram. Do I still need a website?", answer: "Yes. Instagram sends the lead; the website closes it. It also captures the people who search instead of scroll." },
  ],
};
