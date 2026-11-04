import type { LeadStatus, Role } from "@/generated/prisma/enums";

export const LEAD_STATUSES: { value: LeadStatus; label: string; tone: string }[] = [
  { value: "NEW", label: "New", tone: "bg-brand-tint text-brand-text" },
  { value: "CONTACTED", label: "Contacted", tone: "bg-cream-dark text-ink" },
  { value: "DISCOVERY_BOOKED", label: "Discovery booked", tone: "bg-gold/25 text-gold-dark" },
  { value: "BUILDING", label: "Building", tone: "bg-ink text-cream" },
  { value: "PREVIEW_SENT", label: "Preview sent", tone: "bg-ink-soft text-cream" },
  { value: "WON", label: "Won", tone: "bg-[#dcefe3] text-[#1f6b3a]" },
  { value: "LOST", label: "Lost", tone: "bg-[#f3dede] text-[#8a2a2a]" },
];

export const PROJECT_STATUSES = [
  { value: "planned", label: "Planned", tone: "bg-cream-dark text-ink" },
  { value: "building", label: "Building", tone: "bg-ink text-cream" },
  { value: "preview", label: "Preview", tone: "bg-gold/25 text-gold-dark" },
  { value: "approved", label: "Approved", tone: "bg-brand-tint text-brand-text" },
  { value: "live", label: "Live", tone: "bg-[#dcefe3] text-[#1f6b3a]" },
  { value: "cancelled", label: "Cancelled", tone: "bg-[#f3dede] text-[#8a2a2a]" },
] as const;

export const PROJECT_TYPES = [
  { value: "website", label: "Website" },
  { value: "crm", label: "CRM" },
  { value: "erp", label: "ERP / Dashboard" },
  { value: "call_handling", label: "Call handling" },
] as const;

export const INVOICE_STATUSES = [
  { value: "draft", label: "Draft", tone: "bg-cream-dark text-ink" },
  { value: "sent", label: "Sent", tone: "bg-gold/25 text-gold-dark" },
  { value: "paid", label: "Paid", tone: "bg-[#dcefe3] text-[#1f6b3a]" },
  { value: "void", label: "Void", tone: "bg-[#f3dede] text-[#8a2a2a]" },
] as const;

export const INVOICE_KINDS = [
  { value: "setup", label: "Setup fee" },
  { value: "monthly", label: "Monthly fee" },
  { value: "other", label: "Other" },
] as const;

export const ACTIVITY_TYPES = [
  { value: "note", label: "Note" },
  { value: "call", label: "Call" },
  { value: "email", label: "Email" },
  { value: "task", label: "Follow-up task" },
] as const;

export const ROLES: { value: Role; label: string; blurb: string }[] = [
  { value: "SALES", label: "Sales", blurb: "Leads, clients, activities" },
  { value: "OPS", label: "Operations", blurb: "Projects, clients" },
  { value: "MANAGER", label: "Manager", blurb: "Everything except team admin" },
  { value: "ADMIN", label: "Admin", blurb: "Everything, including team and settings" },
];

const fallback = (v: string) => ({ value: v, label: v, tone: "bg-cream-dark text-ink" });

export function leadStatus(v: string) {
  return LEAD_STATUSES.find((s) => s.value === v) ?? fallback(v);
}
export function projectStatus(v: string) {
  return PROJECT_STATUSES.find((s) => s.value === v) ?? fallback(v);
}
export function invoiceStatus(v: string) {
  return INVOICE_STATUSES.find((s) => s.value === v) ?? fallback(v);
}
export function projectTypeLabel(v: string) {
  return PROJECT_TYPES.find((t) => t.value === v)?.label ?? v;
}
export function needLabel(v: string) {
  const map: Record<string, string> = {
    website: "Website",
    crm: "CRM",
    erp: "ERP / Dashboard",
    call_handling: "Call handling",
    not_sure: "Not sure",
  };
  return map[v] ?? v;
}
