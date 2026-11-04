import type { Role } from "@/generated/prisma/enums";
import { hasRole } from "./auth";

export type NavItem = { href: string; label: string; roles: Role[] };
export type NavSection = { title: string; items: NavItem[] };

export const appSections: NavSection[] = [
  { title: "Overview", items: [{ href: "/dashboard", label: "Dashboard", roles: ["SALES", "OPS"] }] },
  {
    title: "Sales",
    items: [
      { href: "/crm", label: "Leads", roles: ["SALES"] },
      { href: "/crm/clients", label: "Clients", roles: ["SALES", "OPS"] },
    ],
  },
  { title: "Operations", items: [{ href: "/erp/projects", label: "Projects", roles: ["OPS", "SALES"] }] },
  {
    title: "Company",
    items: [
      { href: "/erp/billing", label: "Billing", roles: ["MANAGER"] },
      { href: "/erp/team", label: "Team", roles: ["ADMIN"] },
      { href: "/erp/settings", label: "Settings", roles: ["MANAGER"] },
    ],
  },
];

export function sectionsFor(role: Role): NavSection[] {
  return appSections
    .map((s) => ({ ...s, items: s.items.filter((i) => hasRole(role, i.roles)) }))
    .filter((s) => s.items.length > 0);
}
