import { createClient } from "next-sanity";

type SlugSanity = {
    current: string;
}

export type CategorieArticle = 
    | "cybersecurite"
    | "infogerance"
    | "cloud"
    | "productivite"
    | "actualites";

export type ResumeArticle = {
    titre: string;
    slug: SlugSanity;
    categorie: CategorieArticle;
    datePublication: string;
    auteur?: string;
    extrait?: string;
}

export type ArticleComplet = ResumeArticle & {
    contenu: unknown[]; // Le contenu est un tableau de blocs Sanity, mais on peut le typer plus précisément si besoin
}

export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2026-05-12",
    useCdn: true,
});

export async function getArticles(): Promise<ResumeArticle[]> {
    return sanityClient.fetch<ResumeArticle[]>(`
        *[_type == "article"] | order(datePublication desc) {
            titre,
            slug,
            categorie,
            datePublication,
            auteur,
            extrait
        }`
    );
}

export async function getArticleBySlug(slug: string): Promise<ArticleComplet | null> {
    return sanityClient.fetch<ArticleComplet | null>(`
        *[_type == "article" && slug.current == $slug][0] {
            titre,
            slug,
            categorie,
            datePublication,
            auteur,
            extrait,
            contenu
        }`, 
        { slug }
    );
}
