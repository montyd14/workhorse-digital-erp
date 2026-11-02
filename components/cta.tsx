import { Button, Container } from "./ui";
import { nav } from "@/lib/site";

export function FinalCta({
  title = "See your software working before you spend a dollar.",
  body = "Tell us what slows your business down. We build the fix, you try it, and you only pay if you keep it.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-paper py-12 sm:py-16">
      <Container>
        <div className="rounded-3xl bg-brand-text px-6 py-12 text-center text-cream shadow-xl shadow-brand/20 sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-3xl text-4xl sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-cream">{body}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={nav.cta.href} variant="secondary" size="lg">
              {nav.cta.label}
            </Button>
            <Button href={nav.secondaryCta.href} variant="onDark" size="lg">
              {nav.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
