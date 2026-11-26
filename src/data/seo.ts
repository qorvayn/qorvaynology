import type { Metadata } from "next";
import { FAQ_ITEMS, SERVICES_LIST, VERIFIED_SOCIALS } from "@/data/studioData";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.qorvaynology.com"
).replace(/\/+$/, "");

export const PARENT_ORG_URL = "https://www.qorvayn.tech";
export const BRAND_NAME = "Qorvaynology®";

export const GSC_VERIFICATION_TOKEN =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
  "_1nW4wEcrGLfURhRakCT1V47hKVvfewMreZnfsA1XA0";

export interface PageSeoEntry {
  path: string;
  title: string;
  description: string;
  lastModified: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
  noindex?: boolean;
  ogImage?: string;
  ogAlt?: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  "/": {
    path: "/",
    // 58 chars (within 50-60 standard)
    title: "Qorvaynology® — Design & Web App Studio | Built by QORVAYN",
    // 155 chars (within 140-160 standard)
    description:
      "Qorvaynology is QORVAYN's design and technology studio in Bangladesh, crafting brand identities, Figma UI/UX, and full-stack Next.js and Supabase web apps.",
    lastModified: "2026-03-17",
    changeFrequency: "weekly",
    priority: 1.0,
    noindex: false,
    ogImage: "/og-image.png",
    ogAlt: "Qorvaynology® — Design & Technology Studio built by QORVAYN",
  },
};

export function toCanonicalUrl(path: string): string {
  const withoutHash = path.split("#")[0] || "/";
  const cleanPath =
    withoutHash === "/" ? "" : `/${withoutHash.replace(/^\/+|\/+$/g, "")}`;
  return `${SITE_URL}${cleanPath}`;
}

export function buildPageMetadata(routeKey: keyof typeof PAGE_SEO): Metadata {
  const entry = PAGE_SEO[routeKey] || PAGE_SEO["/"];
  const canonical = toCanonicalUrl(entry.path);
  const isHome = entry.path === "/";
  const ogImage = entry.ogImage || "/og-image.png";
  const ogAlt =
    entry.ogAlt ||
    "Qorvaynology® — Design & Technology Studio built by QORVAYN";

  return {
    title: isHome ? { absolute: entry.title } : entry.title,
    description: entry.description,
    alternates: {
      canonical,
    },
    robots: entry.noindex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: BRAND_NAME,
      title: entry.title,
      description: entry.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      site: "@qorvaynology",
      creator: "@qorvaynology",
      images: [ogImage],
    },
  };
}

export function buildKnowledgeGraphJsonLd() {
  const homeSeo = PAGE_SEO["/"];
  const sameAs = Array.from(
    new Set([
      "https://github.com/qorvayn",
      ...VERIFIED_SOCIALS.filter(
        (s) => s.url.startsWith("https://") && !s.url.includes("wa.me")
      ).map((s) => s.url),
    ])
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        name: "Qorvaynology",
        alternateName: "Qorvaynology® Studio",
        legalName: "Qorvaynology Studio",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/brand/qorvaynology-mark-dark-bg.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/og-image.png`,
        description: homeSeo.description,
        foundingDate: "2026-03-10",
        email: "qorvaynology@gmail.com",
        telephone: "+8801410831205",
        priceRange: "$$",
        parentOrganization: {
          "@type": "Organization",
          "@id": `${PARENT_ORG_URL}/#organization`,
          name: "QORVAYN",
          url: PARENT_ORG_URL,
          foundingDate: "2026-03-10",
        },
        founder: {
          "@id": `${SITE_URL}/#person`,
        },
        address: [
          {
            "@type": "PostalAddress",
            addressLocality: "Kushtia",
            addressRegion: "Khulna",
            addressCountry: "BD",
          },
          {
            "@type": "PostalAddress",
            addressLocality: "Dhaka",
            addressRegion: "Dhaka",
            addressCountry: "BD",
          },
        ],
        areaServed: ["BD", "US", "GB", "CA", "AU", "AE", "SG", "Worldwide"],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+8801410831205",
          email: "qorvaynology@gmail.com",
          contactType: "customer support and project inquiries",
          availableLanguage: ["English", "Bengali"],
        },
        sameAs,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Qorvaynology Design & Technology Services",
          itemListElement: SERVICES_LIST.map((srv, idx) => ({
            "@type": "Offer",
            position: idx + 1,
            itemOffered: {
              "@type": "Service",
              name: srv.title,
              description: srv.summary,
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Ryan Zannah",
        jobTitle: "Founder & CEO",
        url: SITE_URL,
        image: `${SITE_URL}/brand/qorvaynology-profile-picture.png`,
        worksFor: {
          "@type": "Organization",
          "@id": `${PARENT_ORG_URL}/#organization`,
          name: "QORVAYN",
          url: PARENT_ORG_URL,
        },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND_NAME,
        description: homeSeo.description,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: homeSeo.title,
        description: homeSeo.description,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#organization`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og-image.png`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ_ITEMS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
