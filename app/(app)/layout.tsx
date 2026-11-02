import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: { default: "Workhorse ERP", template: "%s | Workhorse ERP" },
  robots: { index: false, follow: false },
};

/**
 * Phase 2 private area shell. Nav items are placeholders; each becomes a real
 * section when its module ships. See PHASE2.md.
 */
export const appNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/crm", label: "Leads / CRM" },
  { href: "/crm/clients", label: "Clients" },
  { href: "/erp/projects", label: "Projects" },
  { href: "/erp/billing", label: "Billing" },
  { href: "/erp/team", label: "Team" },
  { href: "/erp/settings", label: "Settings" },
];

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-full flex-1 bg-cream">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-ink text-cream md:flex">
        <div className="border-b border-cream/10 px-5 py-4">
          <Logo onDark />
        </div>
        <nav aria-label="App" className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {appNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-cream/80 hover:bg-ink-soft hover:text-cream"
                >
                  {item.label}
                  <span className="text-[0.6rem] font-bold uppercase tracking-wider text-brand-text-on-dark">Phase 2</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-cream/10 px-5 py-4 text-xs text-cream/50">Internal. Not indexed.</div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-line bg-paper px-4 md:hidden">
          <Logo />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-text-on-dark">Phase 2</span>
        </header>
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
