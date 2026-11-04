import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({ title, blurb, actions }: { title: string; blurb?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl">{title}</h1>
        {blurb && <p className="mt-1 text-sm text-ink-muted">{blurb}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Notice({ error, ok }: { error?: string; ok?: string }) {
  if (!error && !ok) return null;
  return (
    <p
      role="status"
      className={`mb-4 rounded-md border px-4 py-2.5 text-sm font-semibold ${
        error ? "border-brand bg-brand/10 text-brand-dark" : "border-[#9fd3b4] bg-[#dcefe3] text-[#1f6b3a]"
      }`}
    >
      {error ?? ok}
    </p>
  );
}

export function Panel({
  title,
  children,
  className = "",
  actions,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={`rounded-lg border border-line bg-paper ${className}`}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          {title && <h2 className="text-base font-bold">{title}</h2>}
          {actions}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Stat({ label, value, hint, href }: { label: string; value: string | number; hint?: string; href?: string }) {
  const inner = (
    <div className="rounded-lg border border-line bg-paper p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">{label}</p>
      <p className="mt-1 font-heading text-3xl font-extrabold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
  return href ? (
    <Link href={href} className="block transition-colors hover:[&>div]:border-brand">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function Badge({ label, tone }: { label: string; tone: string }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold ${tone}`}>{label}</span>;
}

export function Table({ head, children, empty }: { head: string[]; children: ReactNode; empty?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-paper">
      <table className="w-full text-sm">
        <thead className="bg-cream text-left text-xs font-bold uppercase tracking-wider text-ink-muted">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {empty ? (
            <tr>
              <td colSpan={head.length} className="px-4 py-10 text-center text-ink-muted">
                Nothing here yet.
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}

export const td = "px-4 py-3 align-top";
export const input =
  "mt-1 w-full rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-brand disabled:opacity-60";
export const label = "block text-xs font-bold uppercase tracking-wider text-ink-muted";

export function Field({
  name,
  title,
  children,
  className = "",
}: {
  name?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={name} className={`block ${className}`}>
      <span className={label}>{title}</span>
      {children}
    </label>
  );
}

export function Button({
  children,
  variant = "primary",
  type = "submit",
  href,
  small = false,
  name,
  value,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  type?: "submit" | "button";
  href?: string;
  small?: boolean;
  name?: string;
  value?: string;
}) {
  const v = {
    primary: "bg-brand-text text-white hover:bg-brand-dark",
    secondary: "bg-ink text-cream hover:bg-ink-soft",
    ghost: "border border-ink text-ink hover:bg-ink hover:text-cream",
    danger: "border border-[#8a2a2a] text-[#8a2a2a] hover:bg-[#8a2a2a] hover:text-white",
  }[variant];
  const cls = `inline-flex items-center justify-center rounded-md font-semibold transition-colors ${
    small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
  } ${v}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} name={name} value={value} className={cls}>
      {children}
    </button>
  );
}

export function Loading() {
  return (
    <div className="space-y-3" aria-busy="true" aria-live="polite">
      <div className="h-7 w-48 animate-pulse rounded bg-cream-dark" />
      <div className="h-32 animate-pulse rounded-lg bg-cream-dark/60" />
      <div className="h-64 animate-pulse rounded-lg bg-cream-dark/60" />
    </div>
  );
}

export function Description({ items }: { items: { k: string; v: ReactNode }[] }) {
  return (
    <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {items.map((i) => (
        <div key={i.k}>
          <dt className={label}>{i.k}</dt>
          <dd className="mt-0.5 text-sm text-ink">{i.v || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}
