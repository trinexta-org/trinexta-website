import type { Metadata } from "next";
import { getArticles } from "@/lib/sanity";
import { BlogList } from "@/components/blog/BlogList";
import { CATEGORIES } from "@/components/blog/BlogList";
import { SearchBar } from "@/components/blog/SearchBar";
import { Suspense } from "react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const title = "Blog informatique TPE PME - Conseils IT";
const description = "Découvrez nos articles, conseils et guides en infogérance, cybersécurité et maintenance informatique pour les entreprises en Île-de-France.";

type BlogPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/blog",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-default.png"],
  },
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q } = await searchParams;
  const { articles } = await getArticles({ query: q });

  return (
    <main className="bg-primary min-h-screen pt-8 lg:pt-12 relative">
      <BreadcrumbJsonLd 
        items={[
          { name: "Accueil", url: "/" },
          { name: "blog", url: "/blog" }
        ]} 
      />
      <Suspense fallback={<div className="h-14" />}>
        <SearchBar />
      </Suspense>

      <BlogList initialArticles={articles} categories={CATEGORIES} searchQuery={q} />
    </main>
  );
}
