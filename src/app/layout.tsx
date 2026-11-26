import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import {
  BING_VERIFICATION_TOKEN,
  BRAND_NAME,
  GSC_VERIFICATION_TOKEN,
  PAGE_SEO,
  SITE_URL,
  buildKnowledgeGraphJsonLd,
} from "@/data/seo";
import "./globals.css";

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

const homeSeo = PAGE_SEO["/"];

export const viewport: Viewport = {
  themeColor: "#050B1C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeSeo.title,
    template: `%s | ${BRAND_NAME}`,
  },
  description: homeSeo.description,
  applicationName: BRAND_NAME,
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
  verification: {
    google: GSC_VERIFICATION_TOKEN,
    other: {
      "msvalidate.01": BING_VERIFICATION_TOKEN,
    },
  },
  alternates: {
    canonical: SITE_URL,
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
    siteName: BRAND_NAME,
    title: homeSeo.title,
    description: homeSeo.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: homeSeo.ogAlt || "Qorvaynology® — Design & Technology Studio built by QORVAYN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeSeo.title,
    description: homeSeo.description,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const safeJsonLd = JSON.stringify(buildKnowledgeGraphJsonLd()).replace(
    /</g,
    "\\u003c"
  );

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
