import type { Metadata } from "next";
import { buildPageMetadata } from "@/data/seo";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = buildPageMetadata("/");

export default function QorvaynologyHomePage() {
  return <HomeClient />;
}
