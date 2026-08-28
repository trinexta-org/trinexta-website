"use client";

import { Container } from "../layout/Container";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, SearchX } from "lucide-react";
import { urlForImage, ResumeArticle } from "@/lib/sanity";
import { SearchBar } from "./SearchBar";

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
  articles,
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  categoryLabel,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const safeTotalPages = Math.max(1, totalPages);

  return (
    <Container className="mt-12 relative z-10">

      {/* FILTRES + RECHERCHE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-secondary/20 pb-6">

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-secondary text-white"
                  : "bg-surface-strong text-primary/60 hover:bg-secondary/10 hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
        />

      </div>

      {/* ARTICLES */}
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-secondary/20 rounded-[32px] bg-surface-strong mb-16">

          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
            <SearchX className="w-8 h-8 text-primary/40" />
          </div>

          <h3 className="text-xl font-bold text-primary mb-3">
            Aucun article trouvé
          </h3>

          <p className="text-primary/60 max-w-md mx-auto mb-8 leading-relaxed">
            Nous n&apos;avons pas trouvé de contenu correspondant à
            &quot;{searchQuery}&quot;. Essayez d&apos;autres mots-clés ou
            parcourez nos catégories.
          </p>

          <button
            onClick={() => onSearchChange("")}
            className="px-6 py-3 bg-secondary/10 text-secondary-strong text-sm font-semibold rounded-xl hover:bg-secondary/20 transition-colors"
          >
            Effacer la recherche
          </button>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">

          {articles.map((post) => (
            <Link
              key={post.slug.current}
              href={`/blog/${post.slug.current}`}
              className="group flex flex-col h-full"
            >

              {/* IMAGE */}
              <div className="relative w-full aspect-video rounded-[24px] overflow-hidden border border-secondary/20 mb-6">

                {post.imageUne ? (
                  <Image
                    src={urlForImage(post.imageUne).width(600).url()}
                    alt={post.imageUne.alt || post.titre}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-secondary/10" />
                )}

              </div>

              {/* CONTENU */}
              <div className="flex-grow flex flex-col">

                <div className="flex items-center justify-between mb-3">

                  <span className="text-secondary-strong text-[11px] font-bold uppercase tracking-wider block">
                    {categoryLabel(post.categorie)}
                  </span>

                  {post.tempsLecture && (
                    <div className="flex items-center gap-1 text-primary/40 text-[10px] font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{post.tempsLecture} min</span>
                    </div>
                  )}

                </div>

                <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-secondary-strong transition-colors">
                  {post.titre}
                </h3>

                <p className="text-primary/60 text-sm line-clamp-3">
                  {post.extrait ||
                    "Cliquez ici pour lire cet article et découvrir nos recommandations."}
                </p>

              </div>

            </Link>
          ))}

        </div>
      )}

      {/* PAGINATION */}
      {safeTotalPages > 1 && (
        <div className="flex items-center justify-center mt-12 pt-8 border-t border-secondary/20">

          <div className="flex items-center gap-4">

            {/* FLÈCHE GAUCHE */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="
                w-12 h-12
                rounded-full
                bg-surface-strong border border-secondary/30
                flex items-center justify-center
                text-secondary-strong
                hover:bg-secondary/10 hover:border-secondary/50
                disabled:opacity-30
                disabled:hover:bg-surface-strong
                disabled:cursor-not-allowed
                transition-all
              "
              aria-label="Page précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* FLÈCHE DROITE */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === safeTotalPages}
              className="
                w-12 h-12
                rounded-full
                bg-surface-strong border border-secondary/30
                flex items-center justify-center
                text-secondary-strong
                hover:bg-secondary/10 hover:border-secondary/50
                disabled:opacity-30
                disabled:hover:bg-surface-strong
                disabled:cursor-not-allowed
                transition-all
              "
              aria-label="Page suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

        </div>
      )}

    </Container>
  );
}