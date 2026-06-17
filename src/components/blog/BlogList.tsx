"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ResumeArticle } from "@/lib/sanity";
import { CategorieOption, CATEGORIES_FILTRE } from "@/data/categories";
import { TransitionTitle } from "@/components/TransitionTitle";
import { BlogHero } from "./BlogHero";
import { BlogPaginatedGrid } from "./BlogPaginatedGrid";
import { FinalCTA } from "../FinalCTA";
import { BlogCasClientPromo } from "./BlogCasClientPromo";
import { BlogInteractiveCarousel } from "./BlogInteractiveCarousel";

export { CATEGORIES_FILTRE as CATEGORIES };

export function BlogList({ initialArticles, categories }: { initialArticles: ResumeArticle[], categories: CategorieOption[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState("tous");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const ITEMS_PER_PAGE = 6; 

  const carouselArticles = initialArticles.slice(0, 3);
  
  const filtered = initialArticles.filter((a) => {
    const matchesCat = activeCategory === "tous" || a.categorie === activeCategory;
    const matchesSearch = a.titre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.extrait?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });
  
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPaginatedArticles = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getCategoryLabel = (catId: string) => {
    return categories.find(c => c.id === catId)?.label || catId;
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setCurrentPage(1); 
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);

    if (value) {
      router.replace(`/blog?q=${encodeURIComponent(value)}`, { scroll: false });
    } else {
      router.replace(`/blog`, { scroll: false });
    }
  };

  return (
    <main className="relative bg-primary pb-32">
      <BlogHero />


      <div className="mt-12 mb-8">
        <TransitionTitle
          surtitle="À la une"
          line1="Le Mag"
          line2="Trinexta"
        />
      </div>

      {/* 2. CARROUSEL */}
      {carouselArticles.length > 0 && (
        <div className="mb-20">
          <BlogInteractiveCarousel 
            articles={carouselArticles} 
            categoryLabel={getCategoryLabel} 
          />
        </div>
      )}

      <div className="mb-12">
        <TransitionTitle
          surtitle="Études de cas"
          line1="Notre expertise"
          line2="en action"
        />
      </div>

     {/* 3. SÉPARATEUR : ÉTUDE DE CAS */}
      <BlogCasClientPromo />

      {/* 4. SECTION DES ARTICLES AVEC RECHERCHE */}
      <div id="tous-les-articles">
        <TransitionTitle
          surtitle={activeCategory !== "tous" || searchQuery ? "Résultats" : "Notre Blog"}
          line1={activeCategory !== "tous" || searchQuery ? "Articles" : "Voir tous"}
          line2={activeCategory !== "tous" || searchQuery ? "trouvés" : "les articles"}
        />
      </div>

      <BlogPaginatedGrid 
        articles={currentPaginatedArticles}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        categoryLabel={getCategoryLabel}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <div className="mt-20">
        <FinalCTA />
      </div>
    </main>
  );
}