import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/cta";
import { FaqList } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, Button, Card, Eyebrow, H1, H2, Lead, Section } from "@/components/ui";
import { getIndustry, industries } from "@/content/industries";
import { serviceNames } from "@/content/services";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { nav } from "@/lib/site";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ];
  const posts = getAllPosts().filter((p) => p.industry === industry.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          serviceJsonLd({
            name: `Software for ${industry.name}`,
            description: industry.metaDescription,
            path: `/industries/${industry.slug}`,
          }),
        ]}
      />
      <Section tone="dark" className="pb-12">
        <Breadcrumbs items={crumbs} />
        <Eyebrow className="mt-6">For {industry.name.toLowerCase()}</Eyebrow>
        <H1>{industry.headline}</H1>
        <Lead className="text-cream/85">{industry.intro}</Lead>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={nav.cta.href} size="lg">
            {nav.cta.label}
          </Button>
          <Button href={nav.secondaryCta.href} variant="onDark" size="lg">
            {nav.secondaryCta.label}
          </Button>
        </div>
      </Section>

      <Section tone="cream">
        <Eyebrow>Sound familiar?</Eyebrow>
        <H2>What we hear from every {industry.ownerNoun}.</H2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {industry.painPoints.map((p) => (
            <Card key={p.title}>
              <h3 className="text-xl">{p.title}</h3>
              <p className="mt-2 text-ink-soft">{p.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>What we build</Eyebrow>
        <H2>The fix, piece by piece.</H2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {industry.solutions.map((s) => (
            <Card key={s.title} className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">{serviceNames[s.service]}</span>
              <h3 className="mt-2 text-xl">{s.title}</h3>
              <p className="mt-2 flex-1 text-ink-soft">{s.description}</p>
              <Link
                href={`/services/${s.service}`}
                className="mt-4 inline-flex text-sm font-semibold text-rust underline underline-offset-4 hover:text-brand"
              >
                How our {serviceNames[s.service].toLowerCase()} work
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {industry.deepDive && (
        <Section tone="cream">
          <Eyebrow>In depth</Eyebrow>
          <H2>How the {industry.shortName.toLowerCase()} system fits together.</H2>
          <div className="mt-10 space-y-10">
            {industry.deepDive.map((d, i) => (
              <div key={d.title} className="grid gap-6 border-t border-line pt-8 lg:grid-cols-[1fr_1.4fr]">
                <div>
                  <span className="font-heading text-3xl font-extrabold text-brand">0{i + 1}</span>
                  <h3 className="mt-2 text-2xl">{d.title}</h3>
                </div>
                <div>
                  <p className="text-lg text-ink-soft">{d.description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {d.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-ink">
                        <span className="text-brand" aria-hidden="true">
                          &#9632;
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <H2>From {industry.name.toLowerCase()}.</H2>
            <p className="mt-4 text-ink-soft">
              Read <Link href="/how-it-works" className="font-semibold text-rust underline underline-offset-4">how the free build works</Link> or{" "}
              <Link href="/contact" className="font-semibold text-rust underline underline-offset-4">ask us directly</Link>.
            </p>
          </div>
          <FaqList faqs={industry.faqs} />
        </div>
      </Section>

      {posts.length > 0 && (
        <Section tone="cream">
          <Eyebrow>From the blog</Eyebrow>
          <H2>Reading for {industry.name.toLowerCase()}.</H2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="block h-full rounded-lg border border-line bg-paper p-5 hover:border-brand">
                  <span className="font-heading text-lg font-extrabold leading-snug">{p.title}</span>
                  <span className="mt-2 block text-sm text-ink-soft">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <FinalCta title={`See your ${industry.shortName.toLowerCase()} software working before you pay.`} />
    </>
  );
}
