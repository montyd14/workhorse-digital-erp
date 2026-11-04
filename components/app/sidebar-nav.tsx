"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavSection } from "@/lib/app-nav";

export function SidebarNav({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();
  const active = (href: string) =>
    href === "/crm"
      ? pathname === "/crm" || pathname.startsWith("/crm/leads")
      : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <nav aria-label="App" className="flex-1 overflow-y-auto px-3 py-4">
      {sections.map((s) => (
        <div key={s.title} className="mb-4">
          <p className="px-3 pb-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cream/50">{s.title}</p>
          <ul className="space-y-0.5">
            {s.items.map((i) => {
              const on = active(i.href);
              return (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    aria-current={on ? "page" : undefined}
                    className={`block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      on ? "bg-brand text-white" : "text-cream/85 hover:bg-ink-soft hover:text-cream"
                    }`}
                  >
                    {i.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
