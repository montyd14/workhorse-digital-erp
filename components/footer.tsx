import Link from "next/link";
import { cacheLife } from "next/cache";
import { Logo } from "./logo";
import { ShortLeadForm } from "./short-lead-form";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { site, telHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
          <div>
            <Logo onDark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/80">{site.tagline}</p>
            <p className="mt-4 text-sm text-cream/70">
              Based in {site.serviceArea.locality}. Serving owner-operated businesses nationwide.
            </p>
            <ul className="mt-4 space-y-1 text-sm">
              {telHref && (
                <li>
                  <a href={telHref} className="hover:text-brand">
                    {site.phoneDisplay}
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-brand">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-text-on-dark">Services</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-brand">
                    {s.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/how-it-works" className="hover:text-brand">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-text-on-dark">Industries</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className="hover:text-brand">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-ink-soft/60 p-5">
            <h2 className="font-heading text-xl font-extrabold">Get your free build</h2>
            <p className="mt-1 text-sm text-cream/80">Tell us where to reach you. We call within one business day.</p>
            <ShortLeadForm variant="dark" location="footer" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <CopyrightYear /> {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href="/privacy" className="hover:text-cream">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cream">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-cream">
                Client Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

/** Cached so the static shell never depends on request time; refreshes daily. */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
