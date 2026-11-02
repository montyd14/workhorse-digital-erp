import Image from "next/image";
import Link from "next/link";
import { serviceNames } from "@/content/services";
import { work } from "@/content/work";
import { Container, Eyebrow, H2 } from "./ui";

/** Recent work. Uses a screenshot when one is provided, otherwise a flat brand tile. */
export function WorkShowcase() {
  return (
    <section className="bg-paper py-12 sm:py-16" aria-labelledby="work-heading">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Recent work</Eyebrow>
            <H2>
              <span id="work-heading">Built for businesses like yours.</span>
            </H2>
          </div>
          <Link href="/free-build" className="font-semibold text-rust underline underline-offset-4 hover:text-brand">
            Start yours
          </Link>
        </div>

        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {work.map((w) => {
            const inner = (
              <>
                <div className="overflow-hidden rounded-md border border-line">
                  {w.image ? (
                    <Image src={`/work/${w.image}`} alt={`${w.name} website`} width={1200} height={900} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/3] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]" />
                  ) : (
                    <Tile name={w.name} industry={w.industry} accent={w.accent} />
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-2xl">{w.name}</h3>
                    {w.badge && <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-ink-muted">{w.badge}</span>}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-brand-text">{w.industry}</p>
                  <p className="mt-2 text-ink-soft">{w.blurb}</p>
                  <p className="mt-3 text-sm text-ink-muted">{w.services.map((s) => serviceNames[s]).join(" · ")}</p>
                </div>
              </>
            );
            return (
              <li key={w.slug}>
                {w.url ? (
                  <a href={w.url} target={w.url.startsWith("http") ? "_blank" : undefined} rel={w.url.startsWith("http") ? "noopener" : undefined} className="group block">
                    {inner}
                  </a>
                ) : (
                  <div>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/** Flat brand tile shown until a real screenshot is added. */
function Tile({ name, industry, accent }: { name: string; industry: string; accent: string }) {
  return (
    <div className="relative flex aspect-[4/3] w-full flex-col justify-between p-5 text-cream" style={{ backgroundColor: accent }} aria-hidden="true">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cream">{industry}</span>
      <span className="font-heading text-3xl font-extrabold uppercase leading-none sm:text-4xl">{name}</span>
      <span className="absolute bottom-0 left-0 h-1.5 w-full bg-ink/25" />
    </div>
  );
}
