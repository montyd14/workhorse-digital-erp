import type { Metadata } from "next";
import { Breadcrumbs, Container, Eyebrow, H1 } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms that apply when you use the ${site.name} website and request a free build.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-cream">
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]} />
        <Eyebrow className="mt-6">Legal</Eyebrow>
        <H1 className="text-3xl sm:text-4xl">Terms of Service</H1>
        <p className="mt-2 text-sm text-ink-muted">Last updated: November 2, 2026</p>
        <div className="prose mt-8">
          <h2>Using this site</h2>
          <p>
            By using {site.url} you agree to these terms. The site is provided for information and for requesting our
            services. Do not use it to send spam, attempt to access private areas, or interfere with its operation.
          </p>
          <h2>The free build</h2>
          <p>
            When you request a free build, we may, at our discretion, build a preliminary version of a website, CRM,
            dashboard, or call handling setup at no charge. The free build is a preview. It remains our property until
            you approve it and sign a service agreement. There is no obligation to proceed, and no fee is owed if you
            choose not to.
          </p>
          <h2>Paid services</h2>
          <p>
            If you choose to keep a build, the setup fee, monthly fee, scope, and ownership terms are set out in a
            separate written service agreement. That agreement controls if it conflicts with anything here.
          </p>
          <h2>Your content</h2>
          <p>
            You keep ownership of the content, data, and domain names you provide. You grant us permission to use them
            to build and operate the services you request.
          </p>
          <h2>No guarantees</h2>
          <p>
            We work hard to deliver results, but we cannot guarantee search rankings, lead volume, or revenue. The site
            and any free build are provided &quot;as is&quot; without warranties of any kind.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {site.legalName} is not liable for indirect, incidental, or
            consequential damages arising from use of the site or a free build.
          </p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the State of Florida.</p>
          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
