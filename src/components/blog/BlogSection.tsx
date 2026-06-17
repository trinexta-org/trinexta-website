"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage, formatDatePublication, ResumeArticle} from "@/lib/sanity";
import { Container } from "../layout/Container";
import { Section } from "../layout/Section";
import { BlogMarquee } from "./blogMarquee";


interface BlogSectionProps {
  heroArticle: ResumeArticle | null;
  marqueeArticles: ResumeArticle[];
  articles: ResumeArticle[]; 
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  searchQuery?: string;
}

export function BlogSection({ marqueeArticles, articles, categories, activeCategory, onCategoryChange }: BlogSectionProps) {
  
  const getCategoryLabel = (catId: string) => {
    return categories.find(c => c.id === catId)?.label || catId;
  };

  return (
    <Section className="bg-primary py-8 md:py-24 relative overflow-hidden">
      
      <Container>
        {/* Titre Editorial Style */}
        <div className="text-center mb-16 md:mb-20 relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-normal leading-none mb-6">
            Insights & <span className="text-secondary">Innovations</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-medium">
            Explorez nos articles d&apos;experts, les tendances tech et nos guides pratiques pour maintenir votre entreprise performante.
          </p>
        </div>

      
      </Container>

      {/* CARROUSEL DÉFILANT */}
      <BlogMarquee articles={marqueeArticles} categoryLabel={getCategoryLabel} />

      <Container className="mt-16 md:mt-24">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Catégories Latérales */}
          <div className="w-full lg:w-1/4 px-4 md:px-0">
            <div className="sticky top-40 z-30">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-white/10 pb-3">Sujets d&apos;expertise</h3>
              <nav className="flex flex-col gap-3">
                  {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => onCategoryChange(cat.id)}
                        className={`text-left transition-all duration-300 py-1.5 text-base ${
                            activeCategory === cat.id 
                            ? "text-secondary font-black translate-x-1" 
                            : "text-white/40 hover:text-white/80"
                        }`}
                      >
                        {cat.label}
                      </button>
                  ))}
              </nav>
            </div>
          </div>

          {/* Grille Principale "Knowledge Posts" */}
          <div className="w-full lg:w-3/4 px-4 md:px-0">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-white/10 pb-3">Tous les articles</h3>
            
            {articles.length === 0 && (
              <div className="text-center py-16 border border-dashed border-white/10 rounded-3xl">
                <h4 className="text-xl font-bold text-white mb-2">Aucun article trouvé</h4>
                <p className="text-white/50 text-sm">Modifiez vos filtres ou essayez une autre recherche.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {articles.map((post) => (
                <Link
                  key={post.slug.current}
                  href={`/blog/${post.slug.current}`}
                  className="group flex flex-col bg-white/5 border border-white/10 rounded-[28px] overflow-hidden hover:border-secondary/40 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {post.imageUne ? (
                      <Image
                        src={urlForImage(post.imageUne).width(800).url()}
                        alt={post.titre}
                        fill
                        sizes="(max-width: 768px) 100vw, 38vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-104"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 bg-primary/80 backdrop-blur-md border border-white/10 rounded-full text-white text-[9px] font-bold uppercase tracking-wider">
                        {getCategoryLabel(post.categorie)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <span className="text-secondary text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {formatDatePublication(post.datePublication)}
                    </span>
                    
                    <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-4 line-clamp-3 group-hover:text-secondary transition-colors font-sans">
                      {post.titre}
                    </h3>
                    
                    <div className="mt-auto pt-4 flex items-center gap-1.5 text-white/40 text-xs md:text-sm font-semibold group-hover:text-white transition-colors">
                      Lire l&apos;article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </Container>  
    </Section>
  );
}