import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Qorvaynology® — Design & Technology Studio | Built by QORVAYN",
    short_name: "Qorvaynology",
    description:
      "Qorvaynology is QORVAYN's design and technology studio in Bangladesh, crafting brand identities, Figma UI/UX, and full-stack Next.js and Supabase web apps.",
    start_url: "/",
    display: "standalone",
    background_color: "#050B1C",
    theme_color: "#050B1C",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon",
      },
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
