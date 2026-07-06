import type { MetadataRoute } from "next";
import { sanityClient } from "@/lib/sanity";
import { caseClients } from "@/data/cas-clients";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://trinexta.fr";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}`, changeFrequency: "monthly", priority: 1 },
  { url: `${BASE_URL}/serenite`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/technicien-sous-regie`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/services-annexes`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/trinexta-studio`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/infogerance`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/cybersecurite`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/cloud-sauvegarde`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/support-informatique`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/microsoft-365`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/solutions-metier`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/estimation`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/cas-clients`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/a-propos`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
  { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
];

type ArticleSlug = {
  slug: { current: string };
  _updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await sanityClient
    .fetch<ArticleSlug[]>(
      `*[_type == "article" && datePublication <= now()]{ slug, _updatedAt }`
    )
    .catch(() => [] as ArticleSlug[]);

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug.current}`,
    lastModified: new Date(a._updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const caseClientRoutes: MetadataRoute.Sitemap = caseClients.map((c) => ({
    url: `${BASE_URL}/cas-clients/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...STATIC_ROUTES, ...articleRoutes, ...caseClientRoutes];
}
