import { getArticles } from "@/lib/sanity";
import { BlogList } from "@/components/blog/BlogList";
import { CATEGORIES } from "@/components/blog/BlogList";
import { SearchBar } from "@/components/blog/SearchBar";
import { Suspense } from "react";


type BlogPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { q } = await searchParams;
  const { articles } = await getArticles({ query: q });

  return (
    <main className="bg-primary min-h-screen">
      <div className="pt-10">
        <Suspense fallback={<div className="h-14" />}>
          <SearchBar />
        </Suspense>
      </div>

      <BlogList initialArticles={articles} categories={CATEGORIES} searchQuery={q} />
    </main>
  );
}