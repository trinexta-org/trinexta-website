"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage, ResumeArticle } from "@/lib/sanity";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/Container"; // <-- Ajout de l'import du Container

interface BlogMarqueeProps {
  articles: ResumeArticle[];
  categoryLabel: (id: string) => string;
}

export function BlogMarquee({ articles, categoryLabel }: BlogMarqueeProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  if (articles.length === 0) return null;

  const marqueeArticles = [...articles, ...articles, ...articles];

  return (
    <section className="my-8">
      <Container>
        <div className="w-full overflow-hidden py-12 relative rounded-[32px]">
          
          
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-primary to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-primary to-transparent z-20 pointer-events-none" />

          <div className="flex gap-4 md:gap-6 w-max animate-marquee hover:[animation-play-state:paused] px-4">
            {marqueeArticles.map((article, index) => {
              const isHovered = hoveredSlug === article.slug.current;
              const uniqueKey = `${article.slug.current}-${index}`;

              return (
                <Link href={`/blog/${article.slug.current}`} key={uniqueKey}>
                  <div
                    onMouseEnter={() => setHoveredSlug(article.slug.current)}
                    onMouseLeave={() => setHoveredSlug(null)}
                    className={`relative h-[300px] md:h-[380px] rounded-[32px] overflow-hidden border border-white/10 cursor-pointer bg-white/5 transition-all duration-300 ${
                      isHovered
                        ? "w-[320px] md:w-[580px] border-secondary/40 shadow-[0_0_30px_rgba(var(--secondary-rgb),0.1)]"
                        : "w-[240px] md:w-[290px]"
                    }`}
                  >
                    {/* Image de fond */}
                    {article.imageUne ? (
                      <Image
                        src={urlForImage(article.imageUne).width(800).url()}
                        alt={article.titre}
                        fill
                        sizes="(max-width: 768px) 300px, 600px"
                        className="object-cover transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5" />
                    )}

                    {/* Voile sombre dégradé */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-90" />

                    {/* Contenu textuel */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                      <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-secondary">
                        <span>{categoryLabel(article.categorie)}</span>
                      </div>
                      
                      <h4 className="text-white font-black text-base md:text-lg leading-snug line-clamp-2">
                        {article.titre}
                      </h4>

                      {/* Révélation de l'extrait au survol */}
                      <div
                        className="grid transition-[grid-template-rows] duration-300 ease-out"
                        style={{ gridTemplateRows: isHovered ? "1fr" : "0fr" }}
                      >
                        <div className={`overflow-hidden transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                          <div className={`transition-[margin-top] duration-300 ${isHovered ? "mt-3" : "mt-0"}`}>
                            <p className="text-white/60 text-xs md:text-sm line-clamp-2 mb-4 font-medium">
                              {article.extrait || "Découvrez l'analyse complète de nos experts Trinexta et optimisez vos infrastructures informatiques."}
                            </p>
                            <div className="flex items-center gap-2 text-secondary text-xs md:text-sm font-bold">
                              Lire la suite <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}