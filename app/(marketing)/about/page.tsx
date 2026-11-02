import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs, Eyebrow, H1, H2, Lead, Section } from "@/components/ui";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Workhorse Digital",
  description:
    "A South Florida software agency for owner-operated businesses. We build websites, CRMs, dashboards, and call handling first, and you pay only if you keep them.",
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const values = [
  { title: "Build first", body: "Proposals are promises. A working product is proof. We show, then ask." },
  { title: "Plain language", body: "No jargon on the call, no jargon in the software. If your crew cannot use it, it is not done." },
  { title: "Flat pricing", body: "One setup fee, one monthly fee. You should never have to do math to know what we cost." },
  { title: "Owner-operators first", body: "We build for the businesses that run on a phone and a truck, because that is who gets ignored." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Section tone="cream" className="pb-10">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Eyebrow>About</Eyebrow>
            <H1>Named after the horse that does the work.</H1>
            <Lead>
              Workhorse Digital builds software for businesses that do not have a marketing department, an IT guy, or
              time for a six-month project. Vending operators, laundromats, service trades. The ones who answer their
              own phone.
            </Lead>
          </div>
          <Image
            src="/brand/mark-orange-on-dark-1080.png"
            alt="Workhorse Digital horseshoe mark"
            width={1080}
            height={1080}
            sizes="(min-width: 1024px) 320px, 60vw"
            className="mx-auto w-48 rounded-lg lg:w-72"
          />
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Why we exist</Eyebrow>
            <H2>The agency model is backwards for small business.</H2>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              The standard agency asks an owner-operator to pay a deposit, wait months, and hope the result works.
              If it does not, the money is gone. That model works for companies with a budget line for experiments.
              It does not work for someone running routes.
            </p>
            <p>
              So we flipped it. We build the website, the CRM, the dashboard, or the call handling first, at our
              expense. You try it on real work. If it pulls its weight, you pay a flat fee and keep it. If not, you
              owe nothing. We take the risk because we are confident in what we build, and because it is the only
              honest way to sell software to someone who has been burned before.
            </p>
            <p>
              We are based in {site.serviceArea.locality} and work with businesses across the country.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <Eyebrow>How we work</Eyebrow>
        <H2>Four rules we do not break.</H2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="border-t-4 border-brand pt-4">
              <h3 className="text-xl">{v.title}</h3>
              <p className="mt-2 text-ink-soft">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
