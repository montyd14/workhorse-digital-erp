import type { Industry } from "../types";

export const hvacPlumbing: Industry = {
  slug: "hvac-plumbing",
  name: "HVAC & Plumbing Contractors",
  shortName: "HVAC / Plumbing",
  ownerNoun: "HVAC or plumbing contractor",
  priority: 5,
  metaTitle: "HVAC & Plumbing Software: Websites, CRM, Calls",
  metaDescription:
    "Custom websites, dispatch dashboards, and call handling for HVAC and plumbing contractors. Built first at no cost. Pay only if you keep it.",
  headline: "Answer every emergency call and turn more of them into jobs.",
  intro:
    "In HVAC and plumbing, the job goes to whoever answers first. The big franchises spend on call centers and ads. You can compete with a site that ranks, a dispatch board that works, and call handling that never sends an emergency to voicemail.",
  painPoints: [
    { title: "After-hours calls lost", description: "A burst pipe at 9pm is your most profitable call. It should never hit voicemail." },
    { title: "Dispatch on a whiteboard", description: "Techs call in for the next address. The office plays phone tag all day." },
    { title: "Website buried under franchises", description: "Without local service pages, you do not show up for 'AC repair near me'." },
    { title: "Maintenance agreements not tracked", description: "Recurring revenue slips because renewals live in a filing cabinet." },
  ],
  solutions: [
    { title: "Local service website", description: "Pages for each service and city you cover, with click-to-call and a booking form.", service: "websites" },
    { title: "Dispatch and job dashboard", description: "Job board, tech assignments, status updates, and job notes on mobile.", service: "erp-dashboards" },
    { title: "Lead and agreement CRM", description: "Estimates, follow-ups, and maintenance agreement renewals in one pipeline.", service: "crm" },
    { title: "24/7 call handling", description: "Every call answered, emergencies flagged, and details logged before a tech calls back.", service: "ai-call-handling" },
  ],
  keywords: ["HVAC website", "plumbing CRM", "HVAC dispatch software", "plumbing company software", "HVAC call answering"],
  faqs: [
    { question: "We already use a field service app. Why this?", answer: "Many contractors keep their field app and add our website and call handling in front of it. We build what fills the gap, not a replacement for what works." },
    { question: "Can emergencies get escalated to me?", answer: "Yes. Call handling can flag emergency keywords and text the on-call tech immediately." },
  ],
};
