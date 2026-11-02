import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/cta";
import { ServiceIcon } from "@/components/service-icon";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, Card, Eyebrow, H1, Lead, Section } from "@/components/ui";
import { services } from "@/content/services";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services: Websites, CRM, Dashboards, Call Handling",
  description:
    "Four tools built for owner-operated businesses: websites, CRM and sales systems, operations dashboards, and call handling. Built first at no cost.",
  path: "/services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Section tone="cream" className="pb-10">
        <Breadcrumbs items={crumbs} />
        <Eyebrow className="mt-6">What we build</Eyebrow>
        <H1>Services</H1>
        <p className="mt-4 max-w-3xl font-heading text-2xl font-bold leading-tight text-ink-soft sm:text-3xl">
          Software built to do the work, not add to it.
        </p>
        <Lead>Every tool we build has one goal: more jobs booked, less time lost to paperwork.</Lead>
        <ul className="mt-5 grid max-w-2xl gap-2.5 text-lg">
          {[
            "Start with one tool or combine several.",
            "We build it first, at no cost to you.",
            "You keep it only if it earns its place.",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-text text-xs font-bold text-white" aria-hidden="true">
                &#10003;
              </span>
              {line}
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="paper" className="pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.slug} className="flex flex-col">
              <ServiceIcon slug={s.slug} />
              <h2 className="mt-4 text-2xl">{s.name}</h2>
              <p className="mt-3 text-ink-soft">{s.intro}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
                {s.features.slice(0, 3).map((f) => (
                  <li key={f.title} className="flex gap-2">
                    <span className="text-brand" aria-hidden="true">
                      &#9632;
                    </span>
                    {f.title}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${s.slug}`}
                className="mt-6 inline-flex font-semibold text-rust underline underline-offset-4 hover:text-brand"
              >
                Learn about {s.shortName}
              </Link>
            </Card>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
