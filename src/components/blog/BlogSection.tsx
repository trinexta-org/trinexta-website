"use client";

import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage, formatDatePublication, ResumeArticle} from "@/lib/sanity";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { HaloBackground } from "@/components/ui/HaloBackground";

interface BlogSectionProps {
  articles: ResumeArticle[]; 
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  searchQuery?: string;
}

export function BlogSection({ articles, categories, activeCategory, onCategoryChange }: BlogSectionProps) {
  
  return (
    <Section className="bg-primary py-8 md:py-32 relative overflow-hidden">
      <HaloBackground intensity="low" />
      <Container>
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar des catégories */}
          <div className="w-full lg:w-1/3 px-4 md:px-0">
            <div className="sticky top-40 z-30">
              <h2 className="text-xl md:text-5xl font-black text-white tracking-normal leading-none mb-12">
                Le Mag <span className="text-secondary">Trinexta</span>
              </h2>
              
              <nav className="flex flex-col gap-6 border-white/10 pl-6">
                  {categories.map((cat) => (
                      <button
                      key={cat.id}
                      onClick={() => onCategoryChange(cat.id)}
                      className={`text-left transition-all duration-300 ${
                          activeCategory === cat.id 
                          ? "text-secondary scale-105 border-l-2 border-secondary pl-4" 
                          : "text-white/40 hover:text-white/80 pl-4"
                      }`}
                      >
                      <h3 className="text-xl font-bold tracking-normal">{cat.label}</h3>
                      </button>
                  ))}
              </nav>
            </div>
          </div>

          {/* Grille d'articles */}
          <div className="w-full lg:w-2/3 px-4 md:px-0 space-y-12">

            {articles.length === 0 && (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-[40px]">
                <h3 className="text-2xl font-bold text-white mb-2">Aucun article trouvé</h3>
                <p className="text-white/50 mb-6">Essayez une autre recherche ou changez de catégorie.</p>
                <Link href="/blog" className="text-secondary font-bold hover:underline">
                  Réinitialiser la recherche
                </Link>
              </div>
            )}

            {articles.map((post, index) => (
              <div
                key={post.slug.current}
                id={`post-${post.slug.current}`}
                className="relative aspect-video rounded-[40px] overflow-hidden group shadow-2xl border border-white/5 transition-all duration-500 hover:shadow-secondary/20 hover:border-white/20"
              >
                {post.imageUne ? (
                  <Image
                    src={urlForImage(post.imageUne).width(1200).url()}
                    alt={post.titre}
                    fill
                    fetchPriority={index === 0 ? "high" : "auto"}
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Image indisponible</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                <div className="absolute inset-0 p-4 md:p-10 flex flex-col justify-end transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="bg-primary/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 max-w-xl transition-colors duration-500 group-hover:bg-primary/95">
                    
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-3 md:mb-4 text-[9px] md:text-xs font-bold uppercase tracking-widest text-secondary">
                      <span className="flex items-center gap-1.5 md:gap-2 text-white/90">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 text-secondary" /> {formatDatePublication(post.datePublication)}
                      </span>
                      {post.auteur && (
                        <span className="flex items-center gap-1.5 md:gap-2 text-white/90">
                          <User className="w-3 h-3 md:w-4 md:h-4 text-secondary" /> TRINEXTA
                        </span>
                      )}
                      {post.tempsLecture && (
                        <span className="flex items-center gap-1.5 md:gap-2 text-white/90">
                          <Clock className="w-3 h-3 md:w-4 md:h-4 text-secondary" /> {post.tempsLecture} min
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-black tracking-normal mb-3 md:mb-4 text-white leading-tight line-clamp-3">
                      {post.titre}
                    </h3>
                    
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="inline-flex items-center gap-2 md:gap-3 bg-white text-primary px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-secondary hover:text-white transition-all text-xs md:text-base w-fit"
                    >
                      Lire l&apos;article <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>  
    </Section>
  );
}
