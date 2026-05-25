import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ProgressBar } from "@/components/blog/ProgressBar";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { RelatedPostCard } from "@/components/blog/RelatedPostCard";
import { CtaAudit } from "@/components/blog/CtaAudit";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { SearchInput } from "@/components/blog/SearchInput";
import { PortableTextArticle } from "@/components/portable-text-article";
import {
  getArticleBySlug,
  getArticlesPopulaires,
  urlForImage,
  LIBELLES_CATEGORIES,
  formatDatePublication,
} from "@/lib/sanity";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const loadArticleBySlug = cache(async (slug: string) => getArticleBySlug(slug));

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable",
    };
  }

  const title = article.seoTitre ?? article.titre;
  const description = article.seoDescription ?? article.extrait;
  const ogImage = article.imageUne?.asset?._ref
    ? [
        {
          url: urlForImage(article.imageUne)
            .width(1200)
            .height(630)
            .fit("crop")
            .auto("format")
            .url(),
          width: 1200,
          height: 630,
          alt: article.imageUne.alt ?? article.titre,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${article.slug.current}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${article.slug.current}`,
      images: ogImage,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [article, populaires] = await Promise.all([
    getArticleBySlug(slug),
    getArticlesPopulaires(3)
  ]);
 ;
  if (!article) notFound();

  const headings = extractHeadings(article.contenu || []);

  return (
    <main className="bg-primary min-h-screen text-white">
      <ProgressBar />
      
      <header className="relative w-full min-h-[40vh] md:min-h-[60vh] flex flex-col justify-center pt-24 pb-8 overflow-hidden">
        {article.imageUne && (
          <Image 
            src={urlForImage(article.imageUne).width(1200).url()} 
            alt={article.titre}
            fill 
            className="object-cover scale-105 blur-sm" 
            sizes="100vw"
            priority 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-6 w-full">
          <div className="flex gap-3 mb-6">
            <span className="bg-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {LIBELLES_CATEGORIES[article.categorie]}
            </span>
          </div>
          
          <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] mb-8">
            {article.titre}
          </h1>
          
          <div className="flex items-center gap-6 text-white/60 font-medium uppercase tracking-widest text-sm border-t border-white/10 pt-8">
            <span>{formatDatePublication(article.datePublication)}</span>
            <span>{article.tempsLecture} min de lecture</span>
          </div>
        </div>
      </header>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-10 md:py-20 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 md:gap-16">
        <aside className="hidden lg:block w-[240px]">
          <div className="sticky top-32 h-[calc(100vh-160px)] overflow-y-auto no-scrollbar space-y-12">
            <TableOfContents headings={headings} />
            <SearchInput />

            <div className="px-4">
              <h4 className="text-[10px] font-bold uppercase text-white/40 tracking-widest mb-4">
                Articles populaires
              </h4>
              <div className="space-y-4">
                {populaires.map((post) => (
                  <Link 
                    key={post.slug.current} 
                    href={`/blog/${post.slug.current}`} 
                    className="block group"
                  >
                    <p className="text-sm font-medium text-white/70 group-hover:text-secondary transition-colors leading-snug">
                      {post.titre}
                    </p>
                    <span className="text-[10px] text-white/30 uppercase mt-1 block">
                      {formatDatePublication(post.datePublication)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <article className="w-full min-w-0">
          <div className="prose prose-invert prose-lg max-w-full">
            <PortableTextArticle value={article.contenu} />
          </div>
          <ShareButtons title={article.titre} url={`/blog/${article.slug.current}`} />
          <CtaAudit />
        </article>
      </div>

      {article.related && article.related.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 py-20 border-t border-white/5">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold uppercase tracking-tight">Articles similaires</h2>
            <Link href="/blog" className="text-secondary font-bold hover:underline">Voir tout le blog</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {article.related.map((relatedPost: any) => (
              <RelatedPostCard key={relatedPost._id} article={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function extractHeadings(value: any[]) {
  if (!value) return [];
  return value
    .filter((item) => item._type === "block" && (item.style === "h2" || item.style === "h3"))
    .map((item) => ({
      text: item.children[0].text,
      level: item.style,
      id: item.children[0].text.toLowerCase().replace(/\s+/g, '-'),
    }));
}