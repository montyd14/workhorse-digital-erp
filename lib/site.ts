/**
 * Site-wide settings. Public values come from NEXT_PUBLIC_* env vars so they
 * can change per environment without touching code.
 */
export const site = {
  name: "Workhorse Digital",
  legalName: "Workhorse Digital Co.",
  tagline: "Software that pulls its weight.",
  description:
    "We build websites, CRMs, dashboards, and call handling for owner-operated businesses. We build it first at no cost. Pay only if you love it.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  phone: process.env.NEXT_PUBLIC_PHONE ?? "",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? process.env.NEXT_PUBLIC_PHONE ?? "",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@workhorsedigital.co",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "/contact",
  serviceArea: {
    locality: "South Florida",
    region: "FL",
    country: "US",
  },
  foundingYear: "2026",
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  },
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
} as const;

export const telHref = site.phone ? `tel:${site.phone.replace(/[^+\d]/g, "")}` : "";

export const nav = {
  primary: [
    { href: "/services", label: "Services" },
    { href: "/industries", label: "Industries" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ],
  cta: { href: "/free-build", label: "Get Your Free Build" },
  login: { href: "/login", label: "Log In" },
  secondaryCta: { href: site.bookingUrl, label: "Book a 15-Min Call" },
} as const;
