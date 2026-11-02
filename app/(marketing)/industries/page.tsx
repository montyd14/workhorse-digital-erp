import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, Card, Eyebrow, H1, Lead, Section } from "@/components/ui";
import { industries } from "@/content/industries";
import { serviceNames } from "@/content/services";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries We Build Software For",
  description:
    "Websites, CRMs, dashboards, and call handling for vending, laundromats, pressure washing, pool service, HVAC, plumbing, junk removal, and detailing.",
  path: "/industries",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Section tone="cream" className="pb-10">
        <Breadcrumbs items={crumbs} />
        <Eyebrow className="mt-6">Industries</Eyebrow>
        <H1>Built for trades that run on the phone.</H1>
        <Lead>
          We started with vending operators and expanded to the businesses that work the same way: owner-operated,
          on the road, and ignored by the agencies that chase bigger logos. If your industry is not listed, ask. If it
          runs on inbound calls and routes, we can build for it.
        </Lead>
      </Section>
      <Section tone="paper" className="pt-4">
        <div className="grid gap-6 md:grid-cols-2">
          {industries.map((i) => (
            <Card key={i.slug} className="flex flex-col">
              <h2 className="text-2xl">{i.name}</h2>
              <p className="mt-2 font-semibold text-ink-soft">{i.headline}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {i.solutions.map((s) => (
                  <li key={s.service} className="rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-rust">
                    {serviceNames[s.service]}
                  </li>
                ))}
              </ul>
              <Link
                href={`/industries/${i.slug}`}
                className="mt-6 inline-flex font-semibold text-rust underline underline-offset-4 hover:text-brand"
              >
                Software for {i.name.toLowerCase()}
              </Link>
            </Card>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
