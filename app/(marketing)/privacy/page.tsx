import type { Metadata } from "next";
import { Breadcrumbs, Container, Eyebrow, H1 } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects the information you share with us.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="bg-cream">
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }]} />
        <Eyebrow className="mt-6">Legal</Eyebrow>
        <H1 className="text-3xl sm:text-4xl">Privacy Policy</H1>
        <p className="mt-2 text-sm text-ink-muted">Last updated: November 2, 2026</p>
        <div className="prose mt-8">
          <h2>Who we are</h2>
          <p>
            {site.legalName} (&quot;we&quot;, &quot;us&quot;) operates {site.url}. This policy explains what information we collect
            when you use the site and how we use it.
          </p>
          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Information you give us.</strong> When you submit a form, we collect your name, business name, phone
              number, email address, industry, and anything you type in the message field.
            </li>
            <li>
              <strong>Attribution data.</strong> We record the page you submitted from, the referring site, and campaign
              parameters in the URL so we know how you found us.
            </li>
            <li>
              <strong>Usage data.</strong> We use Google Analytics to understand which pages are visited. IP addresses are
              anonymized. You can opt out with the Google Analytics browser add-on.
            </li>
          </ul>
          <h2>How we use it</h2>
          <p>
            We use your information to respond to your request, schedule calls, build and deliver the software you ask
            for, and improve the site. We do not sell your information. We do not share it with third parties except
            service providers that help us run the business (hosting, email) and only as needed for that purpose.
          </p>
          <h2>Retention</h2>
          <p>
            We keep lead information for as long as we have a business reason to. You can ask us to delete it at any
            time by emailing {site.email}.
          </p>
          <h2>Security</h2>
          <p>
            Form submissions are sent over HTTPS and stored in a password-protected database. No method of transmission
            is perfectly secure, but we take reasonable steps to protect your data.
          </p>
          <h2>Your choices</h2>
          <p>
            You can request a copy of the information we hold about you, ask us to correct it, or ask us to delete it.
            Email {site.email} and we will respond within thirty days.
          </p>
          <h2>Changes</h2>
          <p>We will post any changes to this policy on this page and update the date at the top.</p>
          <h2>Contact</h2>
          <p>
            Questions about privacy: <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
