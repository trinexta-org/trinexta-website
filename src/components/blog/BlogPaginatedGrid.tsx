"use client";

import { Container } from "../layout/Container";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { urlForImage, ResumeArticle } from "@/lib/sanity";
import { SearchBar } from "./SearchBar";
import { SearchX } from "lucide-react";

interface Props {
  articles: ResumeArticle[];
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryLabel: (id: string) => string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BlogPaginatedGrid({ 
  articles, categories, activeCategory, onCategoryChange, 
  searchQuery, onSearchChange, categoryLabel, currentPage, totalPages, onPageChange 
}: Props) {
  
  const safeTotalPages = Math.max(1, totalPages);

  return (
    <Container className="mt-12 relative z-10">
      
      {/* HEADER : Filtres (à gauche) + Recherche (à droite) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-6">
        
        {/* Catégories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat.id 
                ? "bg-secondary text-white" 
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Barre de Recherche */}
        <SearchBar value={searchQuery} onChange={onSearchChange} />
        
      </div>

      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-white/5 rounded-[32px] bg-gradient-to-b from-white/[0.02] to-transparent mb-16">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <SearchX className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            Aucun article trouvé
          </h3>
          <p className="text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
            Nous n'avons pas trouvé de contenu correspondant à "{searchQuery}". Essayez d'autres mots-clés ou parcourez nos catégories.
          </p>
          <button
            onClick={() => onSearchChange("")}
            className="px-6 py-3 bg-secondary/10 text-secondary text-sm font-semibold rounded-xl hover:bg-secondary/20 transition-colors"
          >
            Effacer la recherche
          </button>
        </div>
      ) : (
        /* GRILLE D'ARTICLES  */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">
          {articles.map((post) => (
            <Link
              key={post.slug.current}
              href={`/blog/${post.slug.current}`}
              className="group flex flex-col h-full"
            >
              {/* IMAGE EN HAUT */}
              <div className="relative w-full aspect-video rounded-[24px] overflow-hidden border border-white/10 mb-6">
                {post.imageUne ? (
                  <Image
                    src={urlForImage(post.imageUne).width(600).url()}
                    alt={post.titre}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/5" />
                )}
              </div>
              
              {/* TEXTE EN BAS */}
              <div className="flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-secondary text-[11px] font-bold uppercase tracking-wider block">
                    {categoryLabel(post.categorie)}
                  </span>
                  {post.tempsLecture && (
                    <div className="flex items-center gap-1 text-white/40 text-[10px] font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{post.tempsLecture} min</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                  {post.titre}
                </h3>
                <p className="text-white/60 text-sm line-clamp-3">
                  {post.extrait || "Cliquez ici pour lire cet article et découvrir nos recommandations."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* SYSTÈME DE PAGINATION */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
        <div className="flex items-center gap-2">
          {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                currentPage === page 
                ? "bg-secondary text-white" 
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 disabled:cursor-not-allowed transition-all"
            aria-label="page précédente"
          >
            <ArrowLeft className="w-5 h-5" />
            
          </button>
          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === safeTotalPages}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white disabled:opacity-30 disabled:hover:bg-white/5 disabled:text-white disabled:cursor-not-allowed transition-all"
            aria-label="page suivante"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Container>
  );
}