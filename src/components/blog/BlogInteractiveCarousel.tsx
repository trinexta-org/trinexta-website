"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage, ResumeArticle } from "@/lib/sanity";
import { Container } from "../layout/Container";
import { ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  articles: ResumeArticle[];
  categoryLabel: (id: string) => string;
}

const AUTOPLAY_INTERVAL = 5000;

export function BlogInteractiveCarousel({ articles, categoryLabel }: Props) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleScrollToArticles = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsScrolling(true);
    setHoveredIndex(null);
    const element = document.getElementById("tous-les-articles");
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setIsScrolling(false), 1000);
  };

  const handlePrev = () => {
    if (isScrolling) return;
    setActiveIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (isScrolling) return;
    setActiveIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  /*
   * Défilement automatique : avance toutes les 5s, sauf pendant que
   * l'utilisateur survole une carte ou qu'un scroll manuel est en cours.
   * Les flèches restent utilisables à tout moment ; le cycle se relance
   * simplement après leur usage.
   */
  useEffect(() => {
    if (articles.length <= 1) return;
    if (hoveredIndex !== null || isScrolling) return;

    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [articles.length, hoveredIndex, isScrolling, activeIndex]);

  if (articles.length === 0) return null;

  return (
    <Container className="relative z-10 mb-20">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black text-primary mb-4">
            Dernières <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Publications</span>
          </h2>
          <p className="text-primary/60 text-lg">
            Explorez nos analyses, conseils et retours d&apos;expérience pour sécuriser et optimiser l&apos;infrastructure IT de votre entreprise.
          </p>
        </div>
        
        <Link 
          href="#tous-les-articles"
          onClick={handleScrollToArticles}
          className="inline-flex items-center gap-2 text-secondary-strong font-bold text-sm md:text-base hover:text-primary transition-colors duration-300 group whitespace-nowrap mb-2"
        >
          Voir tous les articles
          <span className="bg-secondary/10 p-1.5 rounded-full group-hover:bg-secondary transition-colors">
            <ArrowRight className="w-4 h-4 text-secondary-strong group-hover:text-white" />
          </span>
        </Link>
      </div>

      <div className="relative w-full h-[400px] md:h-[460px] flex items-center justify-center perspective-[1000px] overflow-x-clip">
        {articles.map((article, index) => {
          let position = index - activeIndex;
          if (position < -1) position += articles.length;
          if (position > 1) position -= articles.length;

          const isCenter = position === 0;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={article.slug.current}
              style={{
                transform: `translateX(${position * 110}%) scale(${isCenter ? 1 : 0.85})`,
                zIndex: isCenter ? 30 : 10,
                opacity: isCenter ? 1 : 0.4,
              }}
              className={`absolute h-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                isCenter && isHovered ? "w-[85vw] md:w-[48%]" : "w-[75vw] md:w-[32%]"
              }`}
            >
              <Link 
                href={`/blog/${article.slug.current}`}
                onMouseEnter={() => !isScrolling && setHoveredIndex(index)}
                onMouseLeave={() => !isScrolling && setHoveredIndex(null)}
                onClick={(e) => {
                  if (!isCenter) {
                    e.preventDefault();
                    if (!isScrolling) setActiveIndex(index);
                  }
                }}
                className={`block relative w-full h-full overflow-hidden rounded-[32px] border transition-all duration-500 group ${
                  isCenter 
                    ? "border-secondary/50 shadow-[0_0_50px_rgba(var(--tw-colors-secondary),0.2)] cursor-pointer" 
                    : "border-secondary/20 cursor-pointer hover:border-secondary/40"
                }`}
              >
                <div className="absolute inset-0 z-0">
                  {article.imageUne ? (
                    <Image
                      src={urlForImage(article.imageUne).width(800).url()}
                      alt={article.titre}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-secondary/10" />
                  )}

                  {isCenter && (
                    <>
                      <div className="absolute -top-32 -right-32 w-64 h-64 bg-secondary/40 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </>
                  )}

                  <div className={`absolute inset-0 transition-colors duration-500 ${
                    isCenter ? "bg-gradient-to-t from-primary via-primary/80 to-transparent" : "bg-primary/80"
                  }`} />
                  {isCenter && (
                    <div className="absolute inset-0 md:bg-gradient-to-r from-primary/80 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                </div>

                <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-end transition-opacity duration-500 z-10 ${isCenter ? "opacity-100" : "opacity-0"}`}>
                  <div className={`relative z-20 transition-all duration-500 ${isCenter && isHovered ? "w-full md:w-[55%]" : "w-full"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg">
                        {categoryLabel(article.categorie)}
                      </span>
                      {article.tempsLecture && (
                        <div className="flex items-center gap-1.5 text-white/80 text-[11px] font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                          <Clock className="w-3 h-3" />
                          <span>{article.tempsLecture} min</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-3">
                      {article.titre}
                    </h3>

                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isCenter && isHovered ? "1fr" : "0fr" }}
                    >
                      <div className={`overflow-hidden transition-opacity duration-300 ${isCenter && isHovered ? "opacity-100" : "opacity-0"}`}>
                        <p className="text-white/70 text-sm line-clamp-2 mb-4 mt-2 pr-2">
                          {article.extrait || "Découvrez l'analyse complète de nos experts Trinexta."}
                        </p>
                        <div className="flex items-center gap-2 text-secondary-strong text-sm font-bold">
                          Lire l&apos;article <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isCenter && (
                    <div
                      className={`hidden md:block absolute right-4 -bottom-8 w-[220px] h-[320px] bg-white rounded-t-[24px] border-[6px] border-b-0 border-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-30 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isHovered ? "translate-y-0 opacity-100 rotate-0" : "translate-y-[200px] opacity-0 rotate-[5deg] pointer-events-none"
                      }`}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-xl flex items-center justify-center z-40">
                        <div className="w-8 h-1 rounded-full bg-slate-800" />
                      </div>

                      <div className="w-full h-full bg-background flex flex-col relative pt-8 px-4 pb-4">
                        {article.imageUne ? (
                          <div className="w-full h-24 rounded-xl relative overflow-hidden mb-3 shadow-sm">
                            <Image src={urlForImage(article.imageUne).width(300).url()} alt="preview" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-24 rounded-xl bg-slate-200 mb-3 animate-pulse" />
                        )}
                        
                        <div className="text-slate-900 text-[10px] font-black leading-snug mb-2 line-clamp-3">
                          {article.titre}
                        </div>
                        
                        <div className="space-y-1.5 mb-3">
                          <div className="w-full h-1 bg-slate-200 rounded-full" />
                          <div className="w-5/6 h-1 bg-slate-200 rounded-full" />
                          <div className="w-4/6 h-1 bg-slate-200 rounded-full" />
                        </div>

                        <div className="mt-auto flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-secondary" />
                          </div>
                          <div className="w-12 h-1 bg-slate-300 rounded-full" />
                        </div>
                        
                        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
                      </div>
                    </div>
                )}

              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 mt-8 relative z-40">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full bg-surface-strong border border-secondary/20 flex items-center justify-center text-primary hover:bg-secondary/10 hover:border-secondary/40 transition-all active:scale-95"
          aria-label="Article précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-surface-strong border border-secondary/20 flex items-center justify-center text-secondary-strong hover:bg-secondary hover:text-white transition-all active:scale-95"
          aria-label="Article suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </Container>
  );
}