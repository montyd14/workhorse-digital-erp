import type { Industry } from "../types";

export const cleaningProperty: Industry = {
  slug: "cleaning-and-property-services",
  name: "Cleaning & Property Services",
  shortName: "Cleaning / Property",
  ownerNoun: "cleaning or property service owner",
  priority: 8,
  metaTitle: "Cleaning & Property Service Software: Booking, CRM",
  metaDescription:
    "Booking websites, scheduling, and customer systems for house cleaning, mobile home and rental turnover cleaning, and property care. Built first at no cost.",
  headline: "One system for cleaning crews, rental turnovers, and the homes you look after.",
  intro:
    "Whether you clean houses, turn over rentals and mobile homes between tenants, or manage a handful of properties, the work is the same: bookings, schedules, crews, and customers who expect to hear back fast. We build the website and the back office that keep all of it in one place.",
  painPoints: [
    { title: "Bookings scattered across texts and calls", description: "Double bookings, missed jobs, and no record of who asked for what." },
    { title: "Turnover schedules on a whiteboard", description: "Move-out dates change and the crew finds out late." },
    { title: "No reminders for recurring clients", description: "The weekly house that paused never comes back because no one followed up." },
    { title: "Phone rings while the crew is working", description: "New clients and property managers call during jobs and get voicemail." },
  ],
  solutions: [
    { title: "Booking website", description: "Service pages, pricing, and an online request form that ranks for your area.", service: "websites" },
    { title: "Scheduling and crew dashboard", description: "Daily job board, crew assignments, checklists, and before-and-after photos.", service: "erp-dashboards" },
    { title: "Client and property CRM", description: "Every client, property, recurring schedule, and follow-up in one place.", service: "crm" },
    { title: "Call handling", description: "Every call answered, quoted, and booked while your crew works.", service: "ai-call-handling" },
  ],
  keywords: ["cleaning business software", "house cleaning website", "rental turnover cleaning software", "property services CRM"],
  faqs: [
    { question: "Does this work for both residential and rental cleaning?", answer: "Yes. The system handles one-time homes, recurring clients, and turnover work for landlords and property managers." },
    { question: "Can property managers book directly?", answer: "Yes. A simple portal lets them request a turnover, see the schedule, and get the completion photos." },
  ],
};
