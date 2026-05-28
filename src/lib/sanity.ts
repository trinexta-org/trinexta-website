import imageUrlBuilder from "@sanity/image-url";
import { createClient, type PortableTextBlock } from "next-sanity";

type SlugSanity = {
  current: string;
};

export type CategorieArticle =
  | "cybersecurite"
  | "infogerance"
  | "cloud"
  | "productivite"
  | "actualites";

export const LIBELLES_CATEGORIES: Record<CategorieArticle, string> = {
  cybersecurite: "Cybersécurité",
  infogerance: "Infogérance",
  cloud: "Cloud",
  productivite: "Productivité",
  actualites: "Actualités Trinexta",
};

export type ResumeArticle = {
  titre: string;
  slug: SlugSanity;
  categorie: CategorieArticle;
  datePublication: string;
  auteur?: string;
  extrait?: string;
  imageUne?: ImageArticle;
  tempsLecture?: number;
};

export type ArticleComplet = ResumeArticle & {
  seoTitre?: string;
  seoDescription?: string;
  contenu: CorpsArticle[] | null;
  related?: ResumeArticle[];
};

export interface OptionsRecherchesArticles {
  debut? : number;
  limite? : number;
  categorie? : CategorieArticle;
  query? : string;
  inclureFuturs?: boolean;
}

export interface HeadingTOC {
  _key: string;
  level: "h2" | "h3";
  text: string;
  id: string;
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
  useCdn: process.env.NODE_ENV === "production",
});

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: ImageArticle) {
  return imageBuilder.image(source);
}

export function formatDatePublication(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Paris",
  }).format(new Date(date));
}

export async function getArticles(options?: OptionsRecherchesArticles): Promise<{articles: ResumeArticle[]; total: number}> {
  const { debut = 0, limite, categorie, query: searchString, inclureFuturs = false } = options || {};

  const filtre = [
    `_type == "article"`,
    categorie ? `categorie == $categorie` : null,
    searchString ? `(titre match $searchString || extrait match $searchString)` : null,
    !inclureFuturs ? `datePublication <= now()` : null
  ].filter(Boolean).join(" && ");

  const possedeLimite = limite !== undefined;
  const fin = possedeLimite ? debut + limite : null;
  const tranche = possedeLimite ? `[$debut...$fin]` : `[$debut...10000]`; 

  const query = `{
    "articles": *[${filtre}] | order(datePublication desc) ${tranche} {
      titre,
      slug,
      categorie,
      datePublication,
      auteur,
      extrait,
      imageUne,
      tempsLecture
    },
    "total": count(*[${filtre}])
  }`;

  const params: Record<string, string | number> = { debut };
  if (possedeLimite && fin !== null) params.fin = fin;
  if (categorie) params.categorie = categorie;
  if (searchString) params.searchString = `*${searchString}*`;

  return sanityClient.fetch<{ articles: ResumeArticle[]; total: number }>(query, params);
}


export async function getArticleBySlug(slug: string): Promise<ArticleComplet | null> {
  return sanityClient.fetch<ArticleComplet | null>(`
    *[_type == "article" && slug.current == $slug][0] {
      _id,
      titre,
      slug,
      categorie,
      datePublication,
      auteur,
      extrait,
      tempsLecture, 
      imageUne,
      seoTitre,
      seoDescription,
      contenu,
      "related": *[_type == "article" && categorie == ^.categorie && slug.current != $slug && datePublication <= now()] | order(datePublication desc)[0...3] {
        _id,
        titre,
        slug,
        categorie,
        datePublication,
        auteur,
        extrait,
        imageUne,
        tempsLecture
      }
    }`,
    { slug }
  );
}


/**
 * Récupère des articles de la même catégorie pour la section "Articles connexes",
 * en excluant l'article actuellement consulté.
 */
export async function getArticlesConnexes(
  slug: string,
  categorie: CategorieArticle,
  limite: number = 3
): Promise<ResumeArticle[]> {
  const query = `*[
    _type == "article" && 
    categorie == $categorie && 
    slug.current != $slug &&
    datePublication <= now()
  ] | order(datePublication desc)[0...$limite] {
    titre,
    slug,
    categorie,
    datePublication,
    auteur,
    extrait,
    imageUne,
    tempsLecture
  }`;

  const params: Record<string, string | number> = { 
    slug, 
    categorie, 
    limite 
  };

  return sanityClient.fetch<ResumeArticle[]>(query, params);
}

export async function getArticlesPopulaires(limite: number = 3): Promise<ResumeArticle[]> {
  const query = `*[_type == "article" && datePublication <= now()] | order(datePublication desc)[0...$limite] {
    _id,
    titre,
    slug,
    categorie,
    datePublication,
    auteur,
    extrait,
    imageUne,
    tempsLecture
  }`;

  return sanityClient.fetch<ResumeArticle[]>(query, { limite });
}