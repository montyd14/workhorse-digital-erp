import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Nav } from "@/components/nav";
import { StickyCta } from "@/components/sticky-cta";
import { UtmCapture } from "@/components/utm-capture";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), localBusinessJsonLd()]} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <StickyCta />
      <UtmCapture />
    </>
  );
}
