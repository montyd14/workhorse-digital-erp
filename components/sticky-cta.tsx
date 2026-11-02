"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, telHref } from "@/lib/site";

/** Mobile-only bottom bar: call + free build. Hidden on the conversion pages themselves. */
export function StickyCta() {
  const pathname = usePathname();
  if (pathname === "/free-build" || pathname === "/thank-you" || pathname === "/contact") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 p-2.5 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl gap-2">
        {telHref && (
          <a
            href={telHref}
            className="flex flex-1 items-center justify-center rounded-md border-2 border-ink px-3 py-3 text-sm font-bold text-ink"
          >
            Call {site.phoneDisplay}
          </a>
        )}
        <Link
          href="/free-build"
          className="flex flex-1 items-center justify-center rounded-md bg-brand-text px-3 py-3 text-sm font-bold text-white"
        >
          Get Your Free Build
        </Link>
      </div>
    </div>
  );
}
