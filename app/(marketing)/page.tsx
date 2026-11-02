import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/cta";
import { HeroMark } from "@/components/hero-mark";
import { SearchEngineStrip } from "@/components/search-engine-strip";
import { StepsScroller } from "@/components/steps-scroller";
import { WorkShowcase } from "@/components/work-showcase";
import { ServiceIcon } from "@/components/service-icon";
import { FaqList } from "@/components/faq";
import { Button, Card, Container, Eyebrow, H2, Lead, Section } from "@/components/ui";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { nav, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Workhorse Digital | Free Build Software for Small Business",
  description:
    "Websites, CRMs, dashboards, and call handling for owner-operated businesses. We build it first at no cost. Pay only if you love it.",
  path: "/",
});

const steps = [
  { title: "Discovery call", time: "15 minutes", body: "You tell us what slows the business down. We tell you plainly what we would build first, and what we would leave alone." },
  { title: "We build it free", time: "2 to 6 weeks", body: "No deposit. No contract. We build a working version around your business, not a template, and send you a live preview link." },
  { title: "You try it and approve", time: "Up to 2 weeks", body: "Use it on real customers and real routes. Ask for changes. Decide with the finished thing in your hands." },
  { title: "You pay only if you keep it", time: "Flat fees", body: "A flat setup fee and a flat monthly fee, quoted up front. If it does not earn its keep, walk away owing nothing." },
];

const homeFaqs = [
  { question: "Is the free build really free?", answer: "Yes. We build the first working version at no cost. You pay a setup fee and a monthly fee only if you decide to keep it. If not, there is nothing to pay." },
  { question: "Why would you build it for free?", answer: "Because owner-operators have been burned by agencies that charge up front and deliver late. Showing you the working product first is how we earn the business." },
  { question: "What kind of businesses do you work with?", answer: "Owner-operated service businesses that run on the phone: vending operators, laundromats, pressure washing, pool service, HVAC and plumbing, junk removal, mobile detailing, and similar trades." },
  { question: "How long does it take?", answer: "Websites usually go live in two to three weeks. CRMs and dashboards take four to six weeks to the first version you can test." },
  { question: "Who owns the software?", answer: "You own your data and your domain. The platform is licensed to you for the monthly fee, and you can export your data at any time." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-t-8 border-brand bg-ink text-cream">
        <Container className="grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <Eyebrow className="text-brand-text-on-dark">{site.tagline}</Eyebrow>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl">
              We build your software first. <span className="text-brand">You pay only if you love it.</span>
            </h1>
            <Lead className="text-cream/85">
              Websites, CRMs, operations dashboards, and call handling for owner-operated businesses the big agencies
              ignore. No deposit. No risk. See it working before you spend a dollar.
            </Lead>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={nav.cta.href} size="lg">
                {nav.cta.label}
              </Button>
              <Button href={nav.secondaryCta.href} variant="onDark" size="lg">
                {nav.secondaryCta.label}
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
              <li>No upfront cost</li>
              <li>Optimized for Mobile and Desktop</li>
              <li>Risk-free Demo</li>
            </ul>
          </div>
          <HeroMark />
        </Container>
      </section>

      <SearchEngineStrip />

      <WorkShowcase />

      {/* How it works */}
      <Section tone="tint" id="how-it-works" className="pt-10 sm:pt-12">
        <Eyebrow>How it works</Eyebrow>
        <H2>Four steps. No deposit. No surprises.</H2>
        <div className="mt-6">
          <StepsScroller steps={steps} />
        </div>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <Button href="/how-it-works" variant="ghost">
            Cost, timeline, and ownership
          </Button>
          <p className="text-sm text-ink-muted">The full free-build model, in plain language.</p>
        </div>
      </Section>

      {/* What we build */}
      <Section tone="cream">
        <Eyebrow>What we build</Eyebrow>
        <H2>The software your business actually needs</H2>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          Start with the one that hurts most. Add the rest when you&apos;re ready. One flat fee either way.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.slug} className="flex flex-col">
              <ServiceIcon slug={s.slug} />
              <h3 className="mt-4 text-2xl">{s.name}</h3>
              <p className="mt-3 flex-1 text-ink-soft">{s.intro}</p>
              <Link
                href={`/services/${s.slug}`}
                className="mt-5 inline-flex font-semibold text-rust underline underline-offset-4 hover:text-brand"
              >
                {s.shortName} details
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section tone="dark">
        <Eyebrow className="text-brand-text-on-dark">Industries we serve</Eyebrow>
        <H2>Phone-driven trades. Owner-operated. Under-marketed.</H2>
        <p className="mt-4 max-w-2xl text-lg text-cream/80">
          We began with vending operators and now serve the industries that operate the same way: phone-driven,
          field-based, and without a dedicated marketing team.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/industries/${i.slug}`}
                className="block rounded-lg border border-cream/15 border-l-4 border-l-brand bg-ink-soft/40 p-5 transition-colors hover:border-brand hover:bg-ink-soft/70"
              >
                <span className="font-heading text-xl font-extrabold">{i.name}</span>
                <span className="mt-1 block text-sm text-cream/70">{i.headline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section tone="tint">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <H2>Straight answers.</H2>
            <p className="mt-4 text-ink-soft">
              Still have one? <Link href="/contact" className="font-semibold text-rust underline underline-offset-4">Ask us directly</Link>.
            </p>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
