"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { nav, site, telHref } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.primary.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-ink hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {telHref && (
            <a
              href={telHref}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-ink text-ink md:hidden"
              aria-label={`Call ${site.phoneDisplay}`}
            >
              <PhoneIcon />
            </a>
          )}
          {telHref && (
            <a href={telHref} className="mr-2 hidden text-sm font-bold text-ink hover:text-brand-text md:inline">
              {site.phoneDisplay}
            </a>
          )}
          <Link
            href={nav.cta.href}
            className="hidden rounded-md bg-brand-text px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-dark md:inline-flex"
          >
            {nav.cta.label}
          </Link>
          <Link
            href={nav.login.href}
            className="hidden items-center gap-1.5 rounded-md border-2 border-ink px-3.5 py-2 text-sm font-bold text-ink hover:bg-ink hover:text-cream md:inline-flex"
          >
            <LockIcon />
            {nav.login.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border-2 border-ink text-ink md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-cream md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {nav.primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-semibold text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={nav.login.href} onClick={() => setOpen(false)} className="flex items-center gap-2 py-3 text-base font-semibold text-ink-soft">
                <LockIcon />
                {nav.login.label}
              </Link>
            </li>
            <li className="pt-2">
              <Link
                href={nav.cta.href}
                onClick={() => setOpen(false)}
                className="block rounded-md bg-brand-text px-4 py-3 text-center text-base font-bold text-white"
              >
                {nav.cta.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.8 2z" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
