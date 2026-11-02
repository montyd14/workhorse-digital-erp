import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ShortLeadForm } from "@/components/short-lead-form";
import { Breadcrumbs, Button, Container, Eyebrow, H1, Lead } from "@/components/ui";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Workhorse Digital",
  description: "Call, email, or send a quick note. We reply within one business day.",
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const hasBooking = site.bookingUrl.startsWith("http");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <div className="bg-cream">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <H1 className="text-3xl sm:text-4xl lg:text-5xl">Talk to a person, not a ticket queue.</H1>
              <Lead>Call, email, or leave your number. We reply within one business day, usually faster.</Lead>
              <dl className="mt-10 space-y-5">
                {telHref && (
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-text">Phone</dt>
                    <dd className="mt-1 text-xl font-semibold">
                      <a href={telHref} className="hover:text-brand">
                        {site.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-text">Email</dt>
                  <dd className="mt-1 text-xl font-semibold">
                    <a href={`mailto:${site.email}`} className="hover:text-brand">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.18em] text-brand-text">Service area</dt>
                  <dd className="mt-1 text-ink-soft">Based in {site.serviceArea.locality}. Working with businesses nationwide.</dd>
                </div>
              </dl>
              {hasBooking && (
                <div className="mt-10">
                  <Button href={site.bookingUrl} size="lg">
                    Book a 15-Min Call
                  </Button>
                </div>
              )}
              <p className="mt-10 text-ink-soft">
                Want the full picture?{" "}
                <Link href="/free-build" className="font-semibold text-rust underline underline-offset-4">
                  Request a free build
                </Link>{" "}
                and tell us about the business.
              </p>
            </div>
            <div className="rounded-lg border border-line bg-paper p-6 sm:p-8">
              <h2 className="text-2xl">Leave your number</h2>
              <p className="mt-1 text-ink-soft">We call back within one business day.</p>
              <ShortLeadForm location="contact" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
