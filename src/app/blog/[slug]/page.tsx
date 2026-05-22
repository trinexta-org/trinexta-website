import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { PortableTextArticle } from "@/components/portable-text-article";
import {
  getArticleBySlug,
  urlForImage,
  LIBELLES_CATEGORIES,
  formatDatePublication,
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
  const article = await loadArticleBySlug(slug);

  if (!article) {
    notFound();
  }
  const title = article.seoTitre ?? article.titre;
  const description = article.seoDescription ?? article.extrait;
  const imageUrl = article.imageUne?.asset?._ref
    ? urlForImage(article.imageUne).url()
    : "https://trinexta.fr/images/trinexta-logo.png";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": [imageUrl],
    "datePublished": article.datePublication ? new Date(article.datePublication).toISOString() : undefined,
    "author": {
      "@type": "Person",
      "name": article.auteur || "Équipe Trinexta",
      "url": "https://trinexta.fr/blog"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TRINEXTA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://trinexta.fr/images/trinexta-logo.png" 
      }
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16">

      <JsonLd data={articleJsonLd} />

      <div>
        <Link
          href="/blog"
          className="text-sm font-medium text-zinc-600 underline underline-offset-4"
        >
          Retour au blog
        </Link>
      </div>

      <article className="space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-700">
              {LIBELLES_CATEGORIES[article.categorie]}
            </span>
            <span>{formatDatePublication(article.datePublication)}</span>
            {article.auteur ? <span>Par {article.auteur}</span> : null}

            {article.tempsLecture ? (
              <>
                <span>•</span>
                <span>{article.tempsLecture} min de lecture</span>
              </>
            ) : null}
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
              {article.titre}
            </h1>
          </div>
        </header>

        <section>
          <PortableTextArticle value={article.contenu} />
        </section>
      </article>
    </main>
  );
}
