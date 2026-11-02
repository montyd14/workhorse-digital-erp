import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";

/** Shared frame for the two login pages with a Client / Team switch at the top. */
export function LoginShell({
  mode,
  title,
  blurb,
  children,
}: {
  mode: "client" | "team";
  title: string;
  blurb: string;
  children: ReactNode;
}) {
  const tab = (active: boolean) =>
    `flex-1 rounded-md px-3 py-2 text-center text-sm font-bold transition-colors ${
      active ? "bg-brand-text text-white" : "text-cream/80 hover:text-cream"
    }`;
  return (
    <main className="flex flex-1 items-center justify-center bg-ink px-4 py-16">
      <div className="w-full max-w-md rounded-lg border border-cream/15 bg-ink-soft/40 p-8">
        <Logo onDark />
        <nav aria-label="Login type" className="mt-8 flex gap-1 rounded-lg bg-ink p-1">
          <Link href="/login" className={tab(mode === "client")} aria-current={mode === "client" ? "page" : undefined}>
            Client portal
          </Link>
          <Link href="/login/team" className={tab(mode === "team")} aria-current={mode === "team" ? "page" : undefined}>
            Team / ERP
          </Link>
        </nav>
        <h1 className="mt-6 text-3xl text-cream">{title}</h1>
        <p className="mt-1 text-sm text-cream/60">{blurb}</p>
        {children}
        <p className="mt-6 text-sm text-cream/60">
          Not a client yet?{" "}
          <Link href="/free-build" className="font-semibold text-brand-text-on-dark underline underline-offset-4">
            Get your free build
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
