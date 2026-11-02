import type { Service, ServiceSlug } from "./types";

export const services: Service[] = [
  {
    slug: "websites",
    name: "Websites That Bring In Work",
    shortName: "Websites",
    metaTitle: "Custom Websites for Small Businesses | Free Build",
    metaDescription:
      "Fast, mobile-first websites built to rank locally and turn visitors into calls. We build it first at no cost. You pay only if you keep it.",
    headline: "A website that does the job of your best salesperson.",
    intro:
      "Your customers search on their phone, skim for thirty seconds, and call the first company that looks real. We build sites that load instantly, rank for your area, and make calling you the obvious next step.",
    features: [
      { title: "Built for mobile first", description: "Most of your visitors are on a phone. Click-to-call, short forms, and fast load times come standard." },
      { title: "Local SEO built in", description: "Service pages, city pages, structured data, and Google Business Profile alignment so you show up where you work." },
      { title: "Lead forms wired to you", description: "Every form submission hits your inbox and, if you have one, your CRM. Nothing gets lost." },
      { title: "You own it", description: "Your domain, your content, your site. If you ever leave, it goes with you." },
    ],
    outcomes: ["More calls from local search", "Fewer tire-kickers thanks to clear pricing and service pages", "A site you are not embarrassed to put on the truck"],
    process: ["Discovery call to learn your services and area", "We write the copy and build the site", "You review a live preview and request changes", "Approve, go live, and we handle hosting and updates"],
    faqs: [
      { question: "How long does a website take?", answer: "Most sites are live in two to three weeks from the discovery call." },
      { question: "Do you write the copy?", answer: "Yes. We write plain-spoken copy for your industry. You review and correct anything we got wrong." },
      { question: "What about hosting and updates?", answer: "Hosting, security, and routine updates are included in the monthly fee." },
    ],
    keywords: ["small business website", "website for vending business", "local business website design"],
  },
  {
    slug: "crm",
    name: "CRM & Sales Systems",
    shortName: "CRM & Sales",
    metaTitle: "Custom CRM for Small Businesses | Free Build",
    metaDescription:
      "A CRM built around how your business sells: leads, follow-ups, quotes, and accounts in one place. Built first at no cost. Pay only if you keep it.",
    headline: "A CRM shaped to your business, not the other way around.",
    intro:
      "Off-the-shelf CRMs are built for software salespeople. You sell placements, service agreements, or hauls. We build a pipeline with your stages, your fields, and your follow-up rules, then connect it to your website and phone.",
    features: [
      { title: "Your pipeline, your stages", description: "Lead, quoted, follow-up, won, lost. Or whatever your business actually does." },
      { title: "Follow-up reminders", description: "Nothing goes cold. The system tells you who to call today." },
      { title: "Connected to your website and calls", description: "Form fills and answered calls land in the pipeline automatically." },
      { title: "Simple enough to use from the truck", description: "Works on a phone. No training manual needed." },
    ],
    outcomes: ["Higher close rate from consistent follow-up", "A real number for your pipeline instead of a guess", "New hires can pick it up in an afternoon"],
    process: ["Discovery call to map how you sell today", "We build the pipeline and import your contacts", "You use it on real leads for two weeks", "Approve, and we train your team"],
    faqs: [
      { question: "Can you import my spreadsheet?", answer: "Yes. Bring your spreadsheet or export from your old CRM and we load it in." },
      { question: "Is there a per-user fee?", answer: "No. One flat monthly fee covers your whole team." },
    ],
    keywords: ["vending CRM", "small business CRM", "custom CRM", "service business CRM"],
  },
  {
    slug: "erp-dashboards",
    name: "ERP & Operations Dashboards",
    shortName: "ERP / Dashboards",
    metaTitle: "Custom Operations Dashboards & ERP | Free Build",
    metaDescription:
      "Route management, job boards, inventory, employee logins, and manager dashboards built for your operation. Built first at no cost. Pay only if you keep it.",
    headline: "One screen that shows you how the business is running.",
    intro:
      "Routes, jobs, inventory, crews, and money are scattered across texts, paper, and three apps. We build a single system where your team logs in, does their work, and you see the whole picture.",
    features: [
      { title: "Employee logins with roles", description: "Drivers see routes. Managers see everything. Office sees billing." },
      { title: "Routes, jobs, and kitting", description: "Daily lists generated from your data, not from memory." },
      { title: "Inventory and par levels", description: "Know what is on the truck, in the warehouse, and in the machine." },
      { title: "Manager dashboard", description: "Revenue, jobs completed, and problems flagged, updated as the day happens." },
    ],
    outcomes: ["Fewer mistakes in the field", "Hours saved on scheduling and reconciliation", "Decisions based on numbers you can trust"],
    process: ["Discovery call to walk through a typical day", "We build the first working version", "Your team runs it alongside the old way for a few weeks", "Approve, and we retire the spreadsheets"],
    faqs: [
      { question: "Can it connect to QuickBooks or my accounting software?", answer: "Often yes. We review your tools in the discovery call and tell you plainly what can connect." },
      { question: "What if my process changes?", answer: "Changes are part of the monthly fee. The system should match how you work, not freeze it." },
    ],
    keywords: ["vending route management software", "operations dashboard", "small business ERP", "route management software"],
  },
  {
    slug: "ai-call-handling",
    name: "AI Call Handling",
    shortName: "Call Handling",
    metaTitle: "AI Call Answering for Small Business | Free Build",
    metaDescription:
      "Never miss a call. Smart call answering that qualifies callers, books appointments, and logs every detail. Built first at no cost. Pay only if you keep it.",
    headline: "Every call answered, even when your hands are full.",
    intro:
      "You are on a ladder, under a sink, or loading a truck. The phone rings. That caller is a new account or an emergency job, and they will not leave a voicemail. Our call handling answers in your business's voice, asks the right questions, and sends you the details.",
    features: [
      { title: "Answers in your business's voice", description: "Greets callers by your company name and knows your services, hours, and area." },
      { title: "Qualifies and books", description: "Collects name, address, what they need, and when. Books into your calendar if you want it to." },
      { title: "Flags emergencies", description: "Urgent keywords trigger an immediate text to you or the on-call tech." },
      { title: "Logs everything", description: "Every call lands in your CRM or inbox with a summary and the caller's details." },
    ],
    outcomes: ["No more lost after-hours calls", "Jobs booked while you are working", "A record of every call for follow-up"],
    process: ["Discovery call to script your common calls", "We set it up on a test number", "You listen to real calls for a week", "Approve, and we forward your line"],
    faqs: [
      { question: "Will callers know it is automated?", answer: "We are upfront about it when asked. Most callers care about getting an answer and a callback time, and they get both." },
      { question: "Can it transfer to a real person?", answer: "Yes. Transfer rules are yours: always, only for emergencies, or only during business hours." },
      { question: "What happens to existing calls?", answer: "Nothing changes until you approve. We test on a separate number first." },
    ],
    keywords: ["AI call answering for small business", "call answering service", "missed call solution", "after hours call answering"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceNames: Record<ServiceSlug, string> = Object.fromEntries(
  services.map((s) => [s.slug, s.shortName]),
) as Record<ServiceSlug, string>;
