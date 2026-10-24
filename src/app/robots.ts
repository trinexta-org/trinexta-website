import type { MetadataRoute } from "next";
import { isIndexable } from "@/lib/site";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://trinexta.fr";

export default function robots(): MetadataRoute.Robots {
  // Hors production, l'exploration reste autorisee le temps que Google lise le
  // noindex et desindexe les pages deja connues. Un Disallow les figerait dans l'index.
  if (!isIndexable) {
    return { rules: { userAgent: "*", allow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
