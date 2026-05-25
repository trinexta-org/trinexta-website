"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogSection } from "./BlogSection";

export const CATEGORIES = [
  { id: "tous", label: "Tous les articles" },
  { id: "cybersecurite", label: "Cybersécurité" }, 
  { id: "infogerance", label: "Infogérance" },
  { id: "cloud", label: "Cloud" },
  { id: "productivite", label: "Productivité" },
  { id: "actualites", label: "Actualités" },
];

export function BlogList({ initialArticles, categories, searchQuery }: { initialArticles: any[], categories: any[], searchQuery?: string }) {
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
              className="group relative px-10 py-4 bg-transparent border border-white/10 rounded-full overflow-hidden transition-all hover:border-secondary"
            >
              <span className="relative z-10 text-white/60 font-bold uppercase tracking-widest text-sm group-hover:text-white transition-colors">
                Voir plus d'articles
              </span>
              <div className="absolute inset-0 bg-secondary/10 translate-y-full transition-transform group-hover:translate-y-0" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}