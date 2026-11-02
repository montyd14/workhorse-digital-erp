import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/cta";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, Button, Card, Eyebrow, H1, H2, Lead, Section } from "@/components/ui";
import { industriesForService } from "@/content/industries";
import { getService, services } from "@/content/services";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { nav } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.shortName, path: `/services/${service.slug}` },
  ];
  const related = industriesForService(service.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          serviceJsonLd({ name: service.name, description: service.metaDescription, path: `/services/${service.slug}` }),
        ]}
      />
      <Section tone="dark" className="pb-12">
        <Breadcrumbs items={crumbs} />
        <Eyebrow className="mt-6">{service.shortName}</Eyebrow>
        <H1>{service.headline}</H1>
        <Lead className="text-cream/85">{service.intro}</Lead>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={nav.cta.href} size="lg">
            {nav.cta.label}
          </Button>
          <Button href={nav.secondaryCta.href} variant="onDark" size="lg">
            {nav.secondaryCta.label}
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>What you get</Eyebrow>
        <H2>Built in from day one.</H2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {service.features.map((f) => (
            <Card key={f.title}>
              <h3 className="text-xl">{f.title}</h3>
              <p className="mt-2 text-ink-soft">{f.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>What changes</Eyebrow>
            <H2>The outcomes we build for.</H2>
            <ul className="mt-6 space-y-3 text-lg">
              {service.outcomes.map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="mt-1 text-brand" aria-hidden="true">
                    &#10003;
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Process</Eyebrow>
            <H2>From first call to live.</H2>
            <ol className="mt-6 space-y-4">
              {service.process.map((p, i) => (
                <li key={p} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-heading font-extrabold text-cream">
                    {i + 1}
                  </span>
                  <p className="pt-1">{p}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="paper">
          <Eyebrow>Industries</Eyebrow>
          <H2>Who we build {service.shortName.toLowerCase()} for.</H2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((i) => {
              const solution = i.solutions.find((s) => s.service === service.slug);
              return (
                <li key={i.slug}>
                  <Link
                    href={`/industries/${i.slug}`}
                    className="block h-full rounded-lg border border-line bg-cream p-5 hover:border-brand"
                  >
                    <span className="font-heading text-lg font-extrabold">{i.name}</span>
                    {solution && <span className="mt-1 block text-sm text-ink-soft">{solution.title}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <H2>About {service.shortName.toLowerCase()}.</H2>
            <p className="mt-4 text-ink-soft">
              See also <Link href="/how-it-works" className="font-semibold text-rust underline underline-offset-4">how the free build works</Link>.
            </p>
          </div>
          <FaqList faqs={service.faqs} />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
