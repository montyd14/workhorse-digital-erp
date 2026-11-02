import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { FinalCta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, Container, Eyebrow } from "@/components/ui";
import { getIndustry } from "@/content/industries";
import { getService } from "@/content/services";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({ source: post.content });
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
  const industry = post.industry ? getIndustry(post.industry) : undefined;
  const relatedServices = post.services.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          articleJsonLd({
            title: post.title,
            description: post.description,
            path: `/blog/${post.slug}`,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
          }),
        ]}
      />
      <article className="bg-cream">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={crumbs.slice(0, 2)} />
          <header className="mt-6 max-w-3xl">
            <Eyebrow>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> &middot; {post.readingMinutes} min read
            </Eyebrow>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg text-ink-soft sm:text-xl">{post.description}</p>
          </header>
          <div className="prose mt-10 text-lg">{content}</div>

          {(industry || relatedServices.length > 0) && (
            <aside className="mt-14 max-w-3xl rounded-lg border border-line bg-paper p-6">
              <h2 className="text-xl">Related</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {industry && (
                  <li>
                    <Link href={`/industries/${industry.slug}`} className="inline-flex rounded-full bg-cream px-4 py-1.5 text-sm font-semibold text-rust hover:bg-cream-dark">
                      Software for {industry.name}
                    </Link>
                  </li>
                )}
                {relatedServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="inline-flex rounded-full bg-cream px-4 py-1.5 text-sm font-semibold text-rust hover:bg-cream-dark">
                      {s.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </Container>
      </article>
      <FinalCta />
    </>
  );
}
