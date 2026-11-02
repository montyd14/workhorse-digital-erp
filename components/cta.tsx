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
    <section className="bg-brand py-16 text-white sm:py-20">
      <Container className="text-center">
        <h2 className="mx-auto max-w-3xl text-3xl sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{body}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={nav.cta.href} variant="secondary" size="lg">
            {nav.cta.label}
          </Button>
          <Button href={nav.secondaryCta.href} variant="onDark" size="lg">
            {nav.secondaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
