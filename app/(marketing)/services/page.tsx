import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/cta";
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
        <Eyebrow className="mt-6">Services</Eyebrow>
        <H1>Software that does a job, not software that makes one.</H1>
        <Lead>
          Every tool we build has one purpose: more work booked, less time wasted. Pick one or combine them. Each is
          built first at no cost and kept only if it earns its place.
        </Lead>
      </Section>
      <Section tone="paper" className="pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.slug} className="flex flex-col">
              <h2 className="text-2xl">{s.name}</h2>
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
                Learn about {s.shortName.toLowerCase()}
              </Link>
            </Card>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
