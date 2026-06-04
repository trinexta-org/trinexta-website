"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogSection } from "./BlogSection";
import { ResumeArticle } from "@/lib/sanity";
import { CategorieOption, CATEGORIES_FILTRE } from "@/data/categories";
import { ArrowRight } from "lucide-react";

export { CATEGORIES_FILTRE as CATEGORIES };

export function BlogList({ initialArticles, categories }: { initialArticles: ResumeArticle[], categories: CategorieOption[], searchQuery?: string }) {
  const [activeCategory, setActiveCategory] = useState("tous");
  const [visibleCount, setVisibleCount] = useState(4); 

  const filtered = activeCategory === "tous" 
    ? initialArticles 
    : initialArticles.filter((a) => a.categorie === activeCategory);
    
  const visibleArticles = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="relative">
      <BlogSection 
        articles={visibleArticles}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(id) => {
          setActiveCategory(id);
          setVisibleCount(4); 
        }}
      />

      <AnimatePresence>
        {hasMore && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-center pb-32"
          >
            <button 
              onClick={() => setVisibleCount(p => p + 4)}
              className="group relative inline-flex items-center gap-4 md:gap-6 bg-transparent border border-white/20 px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:border-secondary"
            >
              <div className="absolute inset-0 bg-white translate-y-[102%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />

              <span className="relative z-10 text-white group-hover:text-primary font-black text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] transition-colors duration-500">
                Voir plus d&apos;articles
              </span>
              
              <div className="relative z-10 text-secondary group-hover:text-primary transition-colors duration-500">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}