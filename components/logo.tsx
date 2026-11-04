import Image from "next/image";
import Link from "next/link";

const SUB = "DIGITAL CO.";

/**
 * Header/footer lockup. The small "DIGITAL CO." line is letter-spaced to exactly
 * the width of "Workhorse" above it, so the two lines form a clean block beside the mark.
 */
export function Logo({ onDark = false, className = "", href = "/" }: { onDark?: boolean; className?: string; href?: string }) {
  return (
    <Link href={href} className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/brand/horseshoe-orange.png" alt="" width={36} height={36} priority className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-[1.35rem] font-extrabold uppercase tracking-tight ${onDark ? "text-cream" : "text-ink"}`}>
          Workhorse
        </span>
        <span className="sr-only">Digital Co.</span>
        <span
          aria-hidden="true"
          className={`mt-0.5 flex justify-between text-[0.6rem] font-bold leading-none ${onDark ? "text-brand-text-on-dark" : "text-brand-text"}`}
        >
          {SUB.split("").map((ch, i) => (
            <span key={i}>{ch === " " ? " " : ch}</span>
          ))}
        </span>
      </span>
    </Link>
  );
}
