import Image from "next/image";
import Link from "next/link";
import { serviceNames } from "@/content/services";
import { work } from "@/content/work";
import { Container, Eyebrow } from "./ui";

/** "Websites we have built" section. Uses a screenshot when provided, otherwise a styled mock. */
export function WorkShowcase() {
  return (
    <section className="bg-paper py-12 sm:py-16" aria-labelledby="work-heading">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Our work</Eyebrow>
            <h2 id="work-heading" className="font-hand text-3xl font-normal normal-case tracking-normal text-ink sm:text-4xl">
              Websites and systems we&apos;ve built.
            </h2>
          </div>
          <Link href="/free-build" className="font-hand text-xl text-brand-text underline decoration-wavy underline-offset-4 hover:text-brand">
            Yours could be next &rarr;
          </Link>
        </div>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {work.map((w) => {
            const card = (
              <>
                <div className="overflow-hidden rounded-t-lg border-b border-line">
                  <div className="flex items-center gap-1.5 bg-ink px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-brand" />
                    <span className="h-2 w-2 rounded-full bg-gold" />
                    <span className="h-2 w-2 rounded-full bg-cream/40" />
                    <span className="ml-2 h-1.5 w-24 rounded bg-cream/20" />
                  </div>
                  {w.image ? (
                    <Image src={`/work/${w.image}`} alt={`${w.name} website`} width={1200} height={750} className="aspect-[16/10] w-full object-cover object-top" />
                  ) : (
                    <Mock name={w.name} industry={w.industry} accent={w.accent} />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-text">{w.industry}</p>
                    {w.badge && <span className="rounded-full bg-cream px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-ink-muted">{w.badge}</span>}
                  </div>
                  <h3 className="mt-1 font-hand text-2xl font-normal tracking-normal">{w.name}</h3>
                  <p className="mt-2 text-ink-soft">{w.blurb}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {w.services.map((s) => (
                      <li key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs font-semibold text-ink-soft">
                        {serviceNames[s]}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            );
            const cls = `group block h-full rounded-lg border-2 border-ink bg-cream shadow-[6px_6px_0_0_#1e2328] transition-transform hover:-translate-y-1`;
            return (
              <li key={w.slug}>
                {w.url ? (
                  <a href={w.url} target="_blank" rel="noopener" className={cls}>
                    {card}
                  </a>
                ) : (
                  <div className={cls}>{card}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/** Lightweight site mock used until a real screenshot is added. */
function Mock({ name, industry, accent }: { name: string; industry: string; accent: string }) {
  return (
    <div className="aspect-[16/10] w-full bg-paper p-4 [background-image:radial-gradient(#1e232814_1px,transparent_1px)] [background-size:12px_12px]" aria-hidden="true">
      <div className="flex items-center justify-between">
        <span className="h-3 w-20 rounded" style={{ backgroundColor: accent }} />
        <span className="flex gap-2">
          <span className="h-2 w-8 rounded bg-ink/15" />
          <span className="h-2 w-8 rounded bg-ink/15" />
          <span className="h-2 w-8 rounded bg-ink/15" />
          <span className="h-3 w-12 rounded" style={{ backgroundColor: accent }} />
        </span>
      </div>
      <div className="mt-4 rounded-md p-4 text-cream" style={{ backgroundColor: "#1e2328" }}>
        <p className="font-hand text-xl leading-none sm:text-2xl">{name}</p>
        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.18em] text-cream/80">{industry}</p>
        <span className="mt-3 inline-block h-5 w-24 rounded" style={{ backgroundColor: accent }} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-dashed border-ink/40 bg-cream p-2">
            <span className="block h-6 w-6 rounded" style={{ backgroundColor: accent, opacity: 0.85 }} />
            <span className="mt-2 block h-1.5 w-full rounded bg-ink/15" />
            <span className="mt-1 block h-1.5 w-2/3 rounded bg-ink/15" />
          </div>
        ))}
      </div>
    </div>
  );
}
