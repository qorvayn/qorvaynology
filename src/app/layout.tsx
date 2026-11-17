import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
