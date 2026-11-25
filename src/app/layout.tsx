import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { FAQ_ITEMS, SERVICES_LIST, VERIFIED_SOCIALS } from "@/data/studioData";
import "./globals.css";

const SITE_URL = "https://www.qorvaynology.com";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

const PAGE_TITLE =
  "Qorvaynology® — Design & Web App Studio | Built by QORVAYN"; // 58 chars (50-60 standard)
const PAGE_DESCRIPTION =
  "Qorvaynology is QORVAYN's design and technology studio in Bangladesh, crafting brand identities, Figma UI/UX, and full-stack Next.js and Supabase web apps."; // 155 chars (140-160 standard)

export const viewport: Viewport = {
  themeColor: "#050B1C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PAGE_TITLE,
    template: "%s | Qorvaynology®",
  },
  description: PAGE_DESCRIPTION,
  applicationName: "Qorvaynology®",
  keywords: [
    "Qorvaynology",
    "QORVAYN",
    "Design and Technology Studio Bangladesh",
    "Next.js Web App Development",
    "Supabase Full-Stack Studio",
    "Brand Identity Design Studio",
    "Figma UI/UX Design Agency",
    "Ryan Zannah",
    "Orbyn",
    "SnowVayn",
  ],
  authors: [{ name: "Ryan Zannah", url: SITE_URL }],
  creator: "Ryan Zannah — QORVAYN",
  publisher: "Qorvaynology Studio (QORVAYN)",
  alternates: {
    canonical: "/",
  },
  robots: {
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
    url: SITE_URL,
    siteName: "Qorvaynology®",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Qorvaynology® — Design & Technology Studio built by QORVAYN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    site: "@qorvaynology",
    creator: "@qorvaynology",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-256.png", sizes: "256x256", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
};

const verifiedSameAs = VERIFIED_SOCIALS.filter(
  (s) => s.url.startsWith("https://") && !s.url.includes("wa.me")
).map((s) => s.url);

const jsonLdGraph = {
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
      description: PAGE_DESCRIPTION,
      foundingDate: "2026-03-10",
      email: "qorvaynology@gmail.com",
      telephone: "+8801410831205",
      priceRange: "$$",
      parentOrganization: {
        "@type": "Organization",
        "@id": "https://www.qorvayn.tech/#organization",
        name: "QORVAYN",
        url: "https://www.qorvayn.tech",
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
      sameAs: verifiedSameAs,
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
        "@id": "https://www.qorvayn.tech/#organization",
        name: "QORVAYN",
        url: "https://www.qorvayn.tech",
      },
      sameAs: verifiedSameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Qorvaynology®",
      description: PAGE_DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const safeJsonLd = JSON.stringify(jsonLdGraph).replace(/</g, "\\u003c");

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd }}
        />
        {children}
      </body>
    </html>
  );
}
