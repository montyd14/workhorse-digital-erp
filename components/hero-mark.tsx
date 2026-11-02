import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Hero visual built from the real brand assets: the logo tile, a stamped
 * circular badge, and a patch-style tag. No mock UI.
 */
export function HeroMark() {
  return (
    <div className="relative mx-auto mt-8 w-full max-w-sm lg:mt-0 lg:max-w-md" aria-hidden="true">
      {/* Shop-floor stripe backdrop */}
      <div
        className="absolute -inset-6 rounded-2xl opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 18px, rgba(245,239,228,0.35) 18px 20px)",
        }}
      />

      {/* Logo tile */}
      <div className="relative -rotate-3 overflow-hidden rounded-2xl border-4 border-ink shadow-2xl shadow-black/50">
        <Image
          src="/brand/mark-orange-on-cream-1080.png"
          alt=""
          width={1080}
          height={1080}
          priority
          sizes="(min-width: 1024px) 448px, 90vw"
          className="block h-auto w-full"
        />
      </div>

      {/* Stamped circular badge */}
      <div className="absolute -bottom-8 -left-6 h-36 w-36 rotate-6 sm:h-40 sm:w-40">
        <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-xl">
          <defs>
            <path id="badge-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
          </defs>
          <circle cx="100" cy="100" r="96" fill="#e2582c" />
          <circle cx="100" cy="100" r="88" fill="none" stroke="#1e2328" strokeWidth="3" strokeDasharray="6 5" />
          <circle cx="100" cy="100" r="54" fill="#1e2328" />
          <text fontSize="17" fontWeight="800" fill="#1e2328" letterSpacing="2.5" fontFamily="var(--font-heading), Impact, sans-serif">
            <textPath href="#badge-circle" startOffset="0%">
              BUILT FIRST • PAY ONLY IF YOU LOVE IT • NO DEPOSIT •
            </textPath>
          </text>
          <image href="/brand/horseshoe-orange.png" x="62" y="62" width="76" height="76" />
        </svg>
      </div>

      {/* Patch tag */}
      <div className="absolute -right-4 top-6 rotate-3 rounded-md border-2 border-gold bg-ink px-3 py-2 text-center shadow-lg">
        <p className="font-heading text-lg font-extrabold uppercase leading-none text-gold">Est. {site.foundingYear}</p>
        <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-cream/80">{site.serviceArea.locality}</p>
      </div>
    </div>
  );
}
