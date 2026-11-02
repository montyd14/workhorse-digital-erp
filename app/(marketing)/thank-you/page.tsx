import type { Metadata } from "next";
import Link from "next/link";
import { Button, Container, Eyebrow, H1, Lead } from "@/components/ui";
import { getAllPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Thanks, We Will Be in Touch",
  description: "We received your request and will call within one business day.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <div className="bg-cream">
      <Container className="py-16 sm:py-24">
        <Eyebrow>Request received</Eyebrow>
        <H1>Good. Now we get to work.</H1>
        <Lead>
          We will call you within one business day to set up a 15-minute discovery call. If you want to move faster,
          grab a time now.
        </Lead>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={site.bookingUrl} size="lg">
            Book the Discovery Call
          </Button>
          {telHref && (
            <Button href={telHref} variant="ghost" size="lg">
              Call {site.phoneDisplay}
            </Button>
          )}
        </div>

        <h2 className="mt-16 text-2xl">What to have ready for the call</h2>
        <ul className="mt-4 max-w-2xl space-y-2 text-ink-soft">
          <li>A rough count of customers, locations, or jobs per week.</li>
          <li>Where the time goes today: spreadsheets, texts, paper, apps.</li>
          <li>The one thing you would fix first if it were free. It is.</li>
        </ul>

        {posts.length > 0 && (
          <>
            <h2 className="mt-16 text-2xl">While you wait</h2>
            <ul className="mt-4 grid gap-4 md:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="block h-full rounded-lg border border-line bg-paper p-5 hover:border-brand">
                    <span className="font-heading text-lg font-extrabold leading-snug">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </div>
  );
}
