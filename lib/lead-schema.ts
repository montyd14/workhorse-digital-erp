import { z } from "zod";

/** Shared between the lead form (client) and /api/leads (server). */
export const NEEDS = [
  { value: "website", label: "Website" },
  { value: "crm", label: "CRM / sales system" },
  { value: "erp", label: "ERP / operations dashboard" },
  { value: "call_handling", label: "Call handling" },
  { value: "not_sure", label: "Not sure yet" },
] as const;

export type NeedValue = (typeof NEEDS)[number]["value"];
const needValues = NEEDS.map((n) => n.value) as [NeedValue, ...NeedValue[]];

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  businessName: z.string().trim().min(2, "Please enter your business name").max(160),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number")
    .max(30)
    .regex(/^[+()\-.\s\d]+$/, "Please enter a valid phone number"),
  email: z.email("Please enter a valid email"),
  industry: z.string().trim().min(1, "Please choose an industry").max(80),
  needs: z.array(z.enum(needValues)).default([]),
  websiteUrl: optionalTrimmed(300),
  message: optionalTrimmed(3000),

  // attribution (hidden)
  sourcePage: optionalTrimmed(300),
  utmSource: optionalTrimmed(120),
  utmMedium: optionalTrimmed(120),
  utmCampaign: optionalTrimmed(160),
  utmTerm: optionalTrimmed(160),
  utmContent: optionalTrimmed(160),
  referrer: optionalTrimmed(1000),

  // honeypot: real users never fill this
  company_website: z.string().optional(),
});

/** Short form used in the footer / sticky bar. Email is optional there. */
export const shortLeadSchema = leadSchema.pick({
  name: true,
  businessName: true,
  phone: true,
  sourcePage: true,
  utmSource: true,
  utmMedium: true,
  utmCampaign: true,
  utmTerm: true,
  utmContent: true,
  referrer: true,
  company_website: true,
});

export type LeadInput = z.input<typeof leadSchema>;
