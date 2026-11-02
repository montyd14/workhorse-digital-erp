import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, Eyebrow, H1, Lead, Section } from "@/components/ui";
import { formatDate, getAllPosts } from "@/lib/blog";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog: Software Advice for Owner-Operators",
  description:
    "Plain-spoken guides on websites, CRMs, route software, and call handling for vending operators and other phone-driven businesses.",
  path: "/blog",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Section tone="cream" className="pb-10">
        <Breadcrumbs items={crumbs} />
        <Eyebrow className="mt-6">Blog</Eyebrow>
        <H1>Software advice without the sales pitch.</H1>
        <Lead>Practical reading for owner-operators who want the tools to work and the phone to ring.</Lead>
      </Section>
      <Section tone="paper" className="pt-4">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <article className="h-full">
                <Link href={`/blog/${p.slug}`} className="flex h-full flex-col rounded-lg border border-line bg-cream p-6 hover:border-brand">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">
                    <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time> &middot; {p.readingMinutes} min read
                  </p>
                  <h2 className="mt-3 text-xl leading-snug">{p.title}</h2>
                  <p className="mt-3 flex-1 text-ink-soft">{p.description}</p>
                  <span className="mt-4 font-semibold text-rust underline underline-offset-4">Read the article</span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Section>
      <FinalCta />
    </>
  );
}
