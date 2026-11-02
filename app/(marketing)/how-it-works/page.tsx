import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/cta";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, Card, Eyebrow, H1, H2, Lead, Section } from "@/components/ui";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How the Free Build Works: Cost, Timeline, Ownership",
  description:
    "We build your website, CRM, or dashboard first at no cost. You try it, then pay a flat setup and monthly fee only if you keep it. Here is exactly how.",
  path: "/how-it-works",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "How It Works", path: "/how-it-works" },
];

const steps = [
  {
    title: "Discovery call",
    time: "15 minutes",
    body: "You tell us what the business does, where the time goes, and what is falling through the cracks. We tell you what we would build first and what we would leave alone. No pitch deck.",
  },
  {
    title: "We build it, free",
    time: "2 to 6 weeks",
    body: "We write the copy, design the screens, and build a working version around your business. You get a live preview link and we check in weekly. There is no deposit and nothing to sign.",
  },
  {
    title: "You try it on real work",
    time: "Up to 2 weeks",
    body: "Put it on real customers, real routes, real calls. Ask for changes. We make them. You decide with the finished thing in your hands, not from a proposal.",
  },
  {
    title: "Approve and go live",
    time: "Same week",
    body: "If you keep it, you pay a flat setup fee and a flat monthly fee, both quoted before we started. We move it to your domain, connect your phone and email, and train your team.",
  },
];

const faqs = [
  { question: "What does it cost?", answer: "A flat setup fee and a flat monthly fee, quoted on the discovery call before any work starts. The monthly fee covers hosting, security, updates, support, and reasonable changes. No per-user or per-machine pricing." },
  { question: "What if I do not like it?", answer: "You walk away and pay nothing. We keep the work, you keep your data, and there are no hard feelings. That risk is ours to carry, not yours." },
  { question: "How long does it take?", answer: "Websites: two to three weeks. CRMs and dashboards: four to six weeks to a first working version. Call handling: about a week to test on a separate number." },
  { question: "Who owns the software?", answer: "You own your domain, your content, and your data, and you can export your data any time. The platform itself is licensed to you for the monthly fee, which is how we can afford to build it for free." },
  { question: "What happens if I cancel later?", answer: "Give us thirty days. We hand over your data in a standard format and point your domain wherever you want." },
  { question: "Is there a limit on changes?", answer: "Reasonable changes are included. If you want a whole new module, we scope it and quote it before building, same as the first time." },
  { question: "Do you work outside South Florida?", answer: "Yes. We are based in South Florida and work with businesses nationwide. Everything happens by phone and screen share." },
];

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Section tone="cream" className="pb-10">
        <Breadcrumbs items={crumbs} />
        <Eyebrow className="mt-6">How it works</Eyebrow>
        <H1>We carry the risk so you do not have to.</H1>
        <Lead>
          Agencies ask for a deposit and a leap of faith. We ask for a fifteen-minute call. Then we build the thing,
          you use it, and you pay only if it pulls its weight.
        </Lead>
      </Section>

      <Section tone="paper" className="pt-4">
        <ol className="grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Card className="h-full">
                <div className="flex items-baseline justify-between">
                  <span className="font-heading text-4xl font-extrabold text-brand">0{i + 1}</span>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">{s.time}</span>
                </div>
                <h2 className="mt-3 text-2xl">{s.title}</h2>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <Eyebrow>Cost</Eyebrow>
            <H2 className="text-2xl sm:text-3xl">Flat. Quoted first.</H2>
            <p className="mt-3 text-cream/80">One setup fee, one monthly fee. Both on the table before we write a line.</p>
          </div>
          <div>
            <Eyebrow>Timeline</Eyebrow>
            <H2 className="text-2xl sm:text-3xl">Weeks, not quarters.</H2>
            <p className="mt-3 text-cream/80">A website in two to three weeks. A CRM or dashboard in four to six.</p>
          </div>
          <div>
            <Eyebrow>Ownership</Eyebrow>
            <H2 className="text-2xl sm:text-3xl">Your data. Your domain.</H2>
            <p className="mt-3 text-cream/80">Export any time. Leave any time with thirty days notice.</p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <H2>Cost, timeline, ownership.</H2>
            <p className="mt-4 text-ink-soft">
              Ready? <Link href="/free-build" className="font-semibold text-rust underline underline-offset-4">Request your free build</Link>.
            </p>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
