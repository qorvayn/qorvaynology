import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qorvaynology® — Design & Technology Studio | Built by QORVAYN",
  description:
    "Qorvaynology is a design and technology studio from Kushtia & Dhaka, Bangladesh, built by the team behind QORVAYN. Brand identity systems, Figma UI/UX, fast modern websites, e-commerce stores, and full-stack Next.js & Supabase web apps.",
  keywords: [
    "Qorvaynology",
    "QORVAYN",
    "Design and Technology Studio",
    "Next.js Web App Development",
    "Brand Identity Design",
    "UI/UX Design Studio Bangladesh",
    "Ryan Zannah",
    "Orbyn",
    "SnowVayn",
  ],
  authors: [{ name: "Ryan Zannah — Qorvaynology" }],
  openGraph: {
    title: "Qorvaynology® — The QORVAYN Way of Building",
    description:
      "We design, build, and grow digital products for businesses that want to look world-class — made by a team that ships its own.",
    url: "https://qorvaynology.com",
    siteName: "Qorvaynology",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
