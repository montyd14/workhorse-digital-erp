import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { default: "Demo site", template: "%s | Workhorse Digital demo" },
  robots: { index: false, follow: false },
};

/** Demo client sites. Each page brings its own styling; this layout only adds the return bar. */
export default function DemoLayout({ children }: LayoutProps<"/demo">) {
  return (
    <>
      <div className="bg-ink px-4 py-2 text-center text-xs font-semibold text-cream">
        Demo build by Workhorse Digital. Fictional business.{" "}
        <Link href="/" className="underline underline-offset-2 hover:text-brand-light">
          Back to workhorsedigital
        </Link>
      </div>
      {children}
    </>
  );
}
