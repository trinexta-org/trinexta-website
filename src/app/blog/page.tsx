import { getArticles } from "@/lib/sanity";
import { BlogList } from "@/components/blog/BlogList";
import { CATEGORIES } from "@/components/blog/BlogList";
import { SearchBar } from "@/components/blog/SearchBar";
import { Suspense } from "react";
import { ScrollToTop } from "@/components/blog/ScrollToTop";

type BlogPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q } = await searchParams;
  const { articles } = await getArticles({ query: q });

  return (
    <main className="bg-primary min-h-screen pt-8 lg:pt-12 relative">
      <Suspense fallback={<div className="h-14" />}>
        <SearchBar />
      </Suspense>

      <BlogList initialArticles={articles} categories={CATEGORIES} searchQuery={q} />
      <ScrollToTop />
    </main>
  );
}