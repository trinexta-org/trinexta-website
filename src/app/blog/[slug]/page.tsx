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
import { PortableTextBlock } from "@portabletext/types";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { generateSlug } from "@/lib/utils";
import { ScrollToTop } from "@/components/blog/ScrollToTop";
import {
  getArticleBySlug,
  getArticlesPopulaires,
  urlForImage,
  LIBELLES_CATEGORIES,
  formatDatePublication,
  ResumeArticle,
  HeadingTOC
} from "@/lib/sanity";
import { JsonLd } from "@/components/seo/JsonLd";

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
            fetchPriority="high"
            className="object-cover scale-105 blur-sm" 
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        
        <Container className=" relative max-w-4xl">
          <div className="flex gap-3 mb-6">
            <span className="bg-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {LIBELLES_CATEGORIES[article.categorie]}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-normal leading-[1.1] mb-8">
            {article.titre}
          </h1>
          
          <div className="flex items-center gap-6 text-white/60 font-medium uppercase tracking-widest text-sm border-t border-white/10 pt-8">
            <span>{formatDatePublication(article.datePublication)}</span>
            <span>{article.tempsLecture} min de lecture</span>
          </div>
        </Container>
      </header>

      <Section className="py-10 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 md:gap-16">
            <aside className="hidden lg:block w-[240px]">
              <div className="sticky top-32 h-[calc(100vh-160px)] overflow-y-auto no-scrollbar space-y-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
        </Container>
      </Section>

      {article.related && article.related.length > 0 && (
        <Section className="border-t border-white/5 py-20">
          <Container>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-bold tracking-normal">Articles similaires</h2>
              <Link href="/blog" className="text-secondary font-bold hover:underline">Voir tout le blog</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {article.related.map((relatedPost: ResumeArticle) => (
                <RelatedPostCard key={relatedPost.slug.current} article={relatedPost} />
              ))}
            </div>
          </Container>
        </Section>
      )}
      <ScrollToTop/>
    </main>
  );
}

function extractHeadings(value: unknown[]): HeadingTOC[] {
  if (!Array.isArray(value)) return [];
  
  return value
    .filter((item): item is PortableTextBlock & { _key: string; style: "h2" | "h3"; children: { text: string }[] } => {
      const block = item as Record<string, unknown>;
      
      return (
        typeof block === "object" &&
        block !== null &&
        block._type === "block" &&
        (block.style === "h2" || block.style === "h3") &&
        Array.isArray(block.children) &&
        block.children.length > 0 &&
        typeof block.children[0] === "object" &&
        block.children[0] !== null &&
        typeof (block.children[0] as Record<string, unknown>).text === "string"
      );
    })
    .map((item) => ({
      _key: item._key || "", 
      level: item.style,
      text: item.children[0].text,
      id: generateSlug(item.children[0].text),
    }));
}
