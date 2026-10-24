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

  const disallow = ["/studio", "/api/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Robots des assistants IA nommés explicitement : le site veut être lu et cité (GEO).
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
