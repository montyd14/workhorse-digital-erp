import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { LeadForm } from "@/components/lead-form";
import { Breadcrumbs, Container, Eyebrow, H1, Lead } from "@/components/ui";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Get Your Free Build: Website, CRM, or Dashboard",
  description:
    "Tell us about your business and we build your website, CRM, dashboard, or call handling at no cost. You pay only if you keep it.",
  path: "/free-build",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Get a Free Build", path: "/free-build" },
];

const expectations = [
  "We call within one business day to set up a 15-minute discovery call.",
  "On the call we agree on what to build first and quote the flat fees you would pay if you keep it.",
  "We build it. You get a live preview link and weekly check-ins.",
  "You try it on real work, then decide. No deposit, no contract until you approve.",
];

export default function FreeBuildPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <div className="bg-cream">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <Eyebrow>Free build</Eyebrow>
              <H1 className="text-3xl sm:text-4xl lg:text-5xl">Tell us what slows you down. We build the fix.</H1>
              <Lead>No cost to start. No contract until you have used the finished product and decided to keep it.</Lead>
              <h2 className="mt-10 text-xl">What happens next</h2>
              <ol className="mt-4 space-y-3">
                {expectations.map((e, i) => (
                  <li key={e} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white">
                      {i + 1}
                    </span>
                    <p className="text-ink-soft">{e}</p>
                  </li>
                ))}
              </ol>
              {telHref && (
                <p className="mt-10 text-ink-soft">
                  Prefer to talk?{" "}
                  <a href={telHref} className="font-semibold text-rust underline underline-offset-4">
                    Call {site.phoneDisplay}
                  </a>
                  .
                </p>
              )}
            </div>
            <div className="relative rounded-lg border border-line bg-paper p-6 sm:p-8">
              <LeadForm />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
