import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/cta";
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
  { title: "Discovery call", body: "Fifteen minutes. You tell us what slows the business down. We tell you plainly what we would build." },
  { title: "We build it free", body: "No deposit. No contract. We build a working version around your business, not a template." },
  { title: "You try it and approve", body: "Use it on real customers and real routes. Ask for changes. Decide with the thing in your hands." },
  { title: "You pay only if you keep it", body: "A flat setup fee and a flat monthly fee, quoted up front. If it does not earn its keep, walk away." },
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
      <section className="bg-ink text-cream">
        <Container className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Eyebrow>{site.tagline}</Eyebrow>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl">
              We build your software first. <span className="text-brand">You pay only if you love it.</span>
            </h1>
            <Lead className="text-cream/85">
              Websites, CRMs, operations dashboards, and call handling for owner-operated businesses the big agencies
              ignore. No deposit. No risk. See it working before you spend a dollar.
            </Lead>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={nav.cta.href} size="lg">
                {nav.cta.label}
              </Button>
              <Button href={nav.secondaryCta.href} variant="onDark" size="lg">
                {nav.secondaryCta.label}
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
              <li>No upfront cost</li>
              <li>Flat monthly fee</li>
              <li>Built for phone-driven trades</li>
            </ul>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-lg border border-cream/15 bg-ink-soft/50 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">The offer</p>
              <ol className="mt-4 space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand font-heading font-extrabold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="text-sm text-cream/75">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <H2>Big agencies do not want your business. We built ours for it.</H2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              If you run a vending route, a laundromat, a pressure washing crew, or a plumbing truck, you have heard the
              pitch. Five-figure deposit. Six-month timeline. A template with your logo on it. Then a monthly bill for a
              site that never rings the phone.
            </p>
            <p>
              Owner-operated businesses do not need a flashy agency. They need software that pulls its weight: a site
              that gets calls, a CRM that fits how you sell, a dashboard your crew will use, and a phone that gets
              answered. That is what we build, and we build it first.
            </p>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section tone="paper" id="how-it-works">
        <Eyebrow>How it works</Eyebrow>
        <H2>Four steps. No deposit. No surprises.</H2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Card className="h-full">
                <span className="font-heading text-4xl font-extrabold text-brand">0{i + 1}</span>
                <h3 className="mt-3 text-xl">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link href="/how-it-works" className="font-semibold text-rust underline underline-offset-4 hover:text-brand">
            Read the full free-build model, including cost, timeline, and ownership
          </Link>
        </div>
      </Section>

      {/* What we build */}
      <Section tone="cream">
        <Eyebrow>What we build</Eyebrow>
        <H2>Four tools. One flat fee. Built around how your business runs.</H2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.slug} className="flex flex-col">
              <h3 className="text-2xl">{s.name}</h3>
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
        <Eyebrow>Industries we serve</Eyebrow>
        <H2>Phone-driven trades. Owner-operated. Under-marketed.</H2>
        <p className="mt-4 max-w-2xl text-lg text-cream/80">
          We started with vending operators and expanded to the industries that run the same way: on the phone, on the
          road, and without a marketing department.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/industries/${i.slug}`}
                className="block rounded-lg border border-cream/15 bg-ink-soft/40 p-5 transition-colors hover:border-brand hover:bg-ink-soft/70"
              >
                <span className="font-heading text-xl font-extrabold">{i.name}</span>
                <span className="mt-1 block text-sm text-cream/70">{i.headline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
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
