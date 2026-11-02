import type { Metadata } from "next";
import { site } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

/** Build consistent per-page metadata: title, description, canonical, OG, Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMeta): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/* ---------- JSON-LD builders ---------- */

const SCHEMA = "https://schema.org";

export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": SCHEMA,
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/brand/mark-orange-on-dark-512.png`,
    slogan: site.tagline,
    description: site.description,
    foundingDate: site.foundingYear,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": SCHEMA,
    "@type": "ProfessionalService",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    image: `${site.url}/brand/mark-orange-on-dark-1080.png`,
    description: site.description,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressRegion: site.serviceArea.region,
      addressCountry: site.serviceArea.country,
    },
    areaServed: [
      { "@type": "Place", name: site.serviceArea.locality },
      { "@type": "Country", name: "United States" },
    ],
    parentOrganization: { "@id": `${site.url}/#organization` },
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": SCHEMA,
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    offers: {
      "@type": "Offer",
      description: "Built first at no cost. Flat setup fee plus monthly fee only if you keep it.",
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": SCHEMA,
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": SCHEMA,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
}) {
  return {
    "@context": SCHEMA,
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${site.url}${input.path}`,
    mainEntityOfPage: `${site.url}${input.path}`,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: { "@type": "Organization", name: input.author ?? site.name },
    publisher: { "@id": `${site.url}/#organization` },
    image: `${site.url}/opengraph-image`,
  };
}
