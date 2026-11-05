import Image from "next/image";
import { Button, Container } from "./ui";
import { nav, site, telHref } from "@/lib/site";

export function FinalCta({
  title = "See it working before you pay a dime.",
  body = "Tell us what's slowing you down. We build it. You run it on real work. You keep it only if it pulls its weight.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-paper py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-lg border-4 border-ink bg-brand-text px-6 py-10 text-cream sm:px-10 sm:py-12 lg:px-14">
          {/* Horseshoe watermark */}
          <Image
            src="/brand/horseshoe-cream.png"
            alt=""
            width={1024}
            height={1024}
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-1/2 hidden w-56 -translate-y-1/2 opacity-15 md:block lg:right-16 lg:w-72"
          />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cream">Ready when you are</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-cream">{body}</p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button href={nav.cta.href} variant="secondary" size="lg">
                {nav.cta.label}
              </Button>
              <Button href={nav.secondaryCta.href} variant="secondary" size="lg">
                Book a 15-Minute Call
              </Button>
            </div>
            {telHref && (
              <p className="mt-6 text-sm text-cream">
                Rather talk now? Call{" "}
                <a href={telHref} className="font-semibold text-cream underline underline-offset-4">
                  {site.phoneDisplay}
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
