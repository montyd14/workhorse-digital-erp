import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  size?: "md" | "lg";
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight transition-colors focus-visible:outline-none";
const variants = {
  primary: "bg-brand-text text-white hover:bg-brand-dark shadow-sm",
  secondary: "bg-ink text-cream hover:bg-ink-soft",
  ghost: "border-2 border-ink text-ink hover:bg-ink hover:text-cream",
  onDark: "border-2 border-cream text-cream hover:bg-cream hover:text-ink",
};
const sizes = { md: "px-5 py-3 text-base", lg: "px-7 py-4 text-lg" };

export function Button({ href, children, variant = "primary", size = "md", className = "" }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={cls} rel={href.startsWith("http") ? "noopener" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "cream",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "paper" | "dark" | "brand" | "tint";
  id?: string;
}) {
  const tones = {
    cream: "bg-cream text-ink",
    paper: "bg-paper text-ink",
    dark: "bg-ink text-cream",
    brand: "bg-brand text-white",
    tint: "bg-brand-tint text-ink",
  };
  return (
    <section id={id} className={`py-12 sm:py-16 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-text ${className}`}>{children}</p>
  );
}

export function H1({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h1 className={`text-5xl sm:text-6xl lg:text-7xl ${className}`}>{children}</h1>;
}

export function H2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-4xl sm:text-5xl ${className}`}>{children}</h2>;
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl ${className}`}>{children}</p>;
}

export function Card({
  children,
  className = "",
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-line bg-paper p-6 shadow-[0_1px_0_rgba(30,35,40,0.06)] ${accent ? "border-t-4 border-t-brand" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function Breadcrumbs({ items, onDark = false }: { items: { name: string; path: string }[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${onDark ? "text-cream/75" : "text-ink-muted"}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className={onDark ? "text-cream" : "text-ink"}>
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-brand">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
