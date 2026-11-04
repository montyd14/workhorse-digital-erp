import { signOutAction } from "@/app/(app)/actions";
import { Logo } from "@/components/logo";
import { sectionsFor } from "@/lib/app-nav";
import { requireUser } from "@/lib/guard";
import { ROLES } from "@/lib/status";
import { SidebarNav } from "./sidebar-nav";

/** Reads the session, so it renders inside <Suspense> in the layout. */
export async function Sidebar() {
  const user = await requireUser();
  const sections = sectionsFor(user.role);
  const roleLabel = ROLES.find((r) => r.value === user.role)?.label ?? user.role;
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-ink-soft bg-ink text-cream md:flex">
        <div className="border-b border-cream/10 px-5 py-4">
          <Logo onDark href="/dashboard" />
        </div>
        <SidebarNav sections={sections} />
        <div className="border-t border-cream/10 px-5 py-4 text-xs">
          <p className="font-semibold text-cream">{user.name}</p>
          <p className="text-cream/60">{roleLabel}</p>
          <form action={signOutAction} className="mt-2">
            <button className="font-semibold text-brand-light hover:text-cream">Sign out</button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <details className="border-b border-line bg-ink text-cream md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 [&::-webkit-details-marker]:hidden">
          <Logo onDark href="/dashboard" />
          <span className="rounded-md border border-cream/30 px-3 py-1 text-xs font-bold">Menu</span>
        </summary>
        <div className="border-t border-cream/10 px-2 pb-3">
          <SidebarNav sections={sections} />
          <form action={signOutAction} className="px-3 pt-2">
            <button className="text-sm font-semibold text-brand-light">Sign out ({user.name})</button>
          </form>
        </div>
      </details>
    </>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-ink-soft bg-ink md:block">
      <div className="border-b border-cream/10 px-5 py-4">
        <Logo onDark href="/dashboard" />
      </div>
      <div className="space-y-2 p-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-7 animate-pulse rounded bg-cream/10" />
        ))}
      </div>
    </aside>
  );
}
