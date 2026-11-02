import type { Industry } from "../types";

export const vending: Industry = {
  slug: "vending",
  name: "Vending Operators",
  shortName: "Vending",
  ownerNoun: "vending operator",
  priority: 1,
  metaTitle: "Vending Operator Software: CRM, Routes & Websites",
  metaDescription:
    "Custom vending CRM, route management, pre-kitting, and machine-sales websites for vending operators. Built first at no cost. Pay only if you keep it.",
  headline: "Software built for how a vending business actually runs.",
  intro:
    "Most vending software is built for the big guys or bolted onto a telemetry system you did not ask for. We build the tools a growing operator needs: route sales, location tracking, pre-kitting, and a website that wins new accounts. You see it working on your machines before you pay anything.",
  painPoints: [
    {
      title: "Route sales live in a spreadsheet",
      description:
        "Which locations are hot, which machines are dying, and who owes you a service visit are stuck in a notebook or someone's head.",
    },
    {
      title: "Your website looks like it is from 2009",
      description:
        "Property managers and office admins Google you before they call back. A dated site costs you placements you never hear about.",
    },
    {
      title: "Pre-kitting is a guessing game",
      description:
        "Drivers kit from memory, run out of the top sellers, and bring back product that never should have left the warehouse.",
    },
    {
      title: "Missed calls are missed placements",
      description:
        "You are on a route with your hands full. The new-location call goes to voicemail, and they call the next operator on the list.",
    },
  ],
  solutions: [
    {
      title: "Route sales CRM",
      description:
        "Track prospects, placements, contracts, and commission schedules by location. Know exactly where each deal stands.",
      service: "crm",
    },
    {
      title: "Machine-sales and placement website",
      description:
        "A fast, mobile-first site that ranks for your area and turns property managers into placement requests.",
      service: "websites",
    },
    {
      title: "Pre-kitting and operations dashboard",
      description:
        "Employee logins, per-machine par levels, kitting lists per route day, and a manager view of what moved.",
      service: "erp-dashboards",
    },
    {
      title: "Call handling for new locations",
      description:
        "Every inbound placement or service call gets answered, qualified, and logged while you are on the road.",
      service: "ai-call-handling",
    },
  ],
  deepDive: [
    {
      title: "Route sales CRM",
      description:
        "A pipeline built around locations, not generic contacts. Every prospect has an address, a decision maker, a foot-traffic estimate, and a next step.",
      bullets: [
        "Pipeline stages from cold lead to signed placement",
        "Location profiles with contract terms, commission rates, and machine inventory",
        "Follow-up reminders so no property manager goes cold",
        "Win and loss tracking by territory and rep",
      ],
    },
    {
      title: "Machine-sales websites",
      description:
        "If you sell or lease machines, your site should close the first call for you. We build pages for each machine type with specs, photos, and a quote form that lands in your CRM.",
      bullets: [
        "Machine catalog pages that rank for your market",
        "Quote and placement request forms wired straight to your pipeline",
        "Local SEO for your service area",
        "Click-to-call on every page for mobile visitors",
      ],
    },
    {
      title: "Pre-kitting with employee logins",
      description:
        "Drivers and warehouse staff log in and see what to kit for the day. Managers see what actually went out and what came back.",
      bullets: [
        "Per-machine planograms and par levels",
        "Daily kitting lists generated per route",
        "Role-based access for drivers, warehouse, and managers",
        "Returns and shrink tracking by driver",
      ],
    },
    {
      title: "QR codes on every machine",
      description:
        "A unique QR code on each machine links back to your system. Customers report a stuck product, request a refund, or ask for a new item. Your team gets the ticket with the machine ID already filled in.",
      bullets: [
        "Machine-specific service and refund requests",
        "Product requests that feed your planogram decisions",
        "Service tickets routed to the right driver",
        "Printable code sheets generated from the system",
      ],
    },
  ],
  keywords: [
    "vending operator software",
    "vending CRM",
    "vending route management software",
    "website for vending business",
    "vending machine business software",
    "vending pre-kitting software",
  ],
  faqs: [
    {
      question: "Does this replace my telemetry or VMS?",
      answer:
        "No. We build around what you already use. If you have telemetry, we can pull sales data from it. If you do not, the system works on manual counts and still saves you hours.",
    },
    {
      question: "How long does a vending build take?",
      answer:
        "A website is usually live in two to three weeks. A CRM or pre-kitting system takes four to six weeks for the first working version you can test on real routes.",
    },
    {
      question: "I only have a few machines. Is this for me?",
      answer:
        "Yes. The operators who benefit most are the ones about to grow from a few machines to a few dozen. The system is sized to you and grows with you.",
    },
    {
      question: "What does it cost if I keep it?",
      answer:
        "A flat setup fee and a flat monthly fee, both quoted before we start. No per-machine or per-user pricing surprises. If you do not love it, you pay nothing.",
    },
  ],
};
