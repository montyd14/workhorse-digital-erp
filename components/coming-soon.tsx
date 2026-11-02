import Link from "next/link";

export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-text">Coming in Phase 2</p>
      <h1 className="mt-2 text-3xl">{title}</h1>
      <p className="mt-3 text-ink-soft">{description}</p>
      <p className="mt-8 text-sm text-ink-muted">
        This area is scaffolded and protected but not built yet. See PHASE2.md in the repository for the plan.{" "}
        <Link href="/" className="font-semibold text-rust underline underline-offset-4">
          Back to the site
        </Link>
        .
      </p>
    </div>
  );
}
