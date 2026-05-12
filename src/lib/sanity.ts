import imageUrlBuilder from "@sanity/image-url";
import { createClient, type PortableTextBlock } from "next-sanity";

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
    imageUne?: ImageArticle;
    seoTitre?: string;
    seoDescription?: string;
    contenu: CorpsArticle[];
}

export type ImageArticle = {
    _type: "image";
    _key: string;
    alt?: string;
    legende?: string;
    asset?: {
        _ref: string;
        _type: "reference";
    };
};

export type CorpsArticle = PortableTextBlock | ImageArticle;

export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2026-05-12",
    useCdn: true,
});

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: ImageArticle) {
    return imageBuilder.image(source);
}

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
            imageUne,
            seoTitre,
            seoDescription,
            contenu
        }`, 
        { slug }
    );
}
