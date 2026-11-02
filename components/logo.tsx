import Image from "next/image";
import Link from "next/link";

export function Logo({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Workhorse Digital home">
      <Image
        src="/brand/horseshoe-orange.png"
        alt=""
        width={36}
        height={36}
        priority
        className="h-9 w-9"
      />
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-xl font-extrabold tracking-tight ${onDark ? "text-cream" : "text-ink"}`}>
          Workhorse
        </span>
        <span className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-brand">Digital Co.</span>
      </span>
    </Link>
  );
}
