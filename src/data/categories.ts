export const CATEGORIES_BLOG = [
  { id: "cybersecurite", label: "Cybersécurité" },
  { id: "infogerance", label: "Infogérance" },
  { id: "cloud", label: "Cloud" },
  { id: "productivite", label: "Productivité" },
  { id: "actualites", label: "Actualités Trinexta" },
] as const;

export type CategorieArticle = (typeof CATEGORIES_BLOG)[number]["id"];

export const LIBELLES_CATEGORIES: Record<CategorieArticle, string> = {
  cybersecurite: "Cybersécurité",
  infogerance: "Infogérance",
  cloud: "Cloud",
  productivite: "Productivité",
  actualites: "Actualités Trinexta",
};

export type CategorieOption = {
  id: "tous" | CategorieArticle;
  label: string;
};

export const CATEGORIES_FILTRE: CategorieOption[] = [
  { id: "tous", label: "Tous les articles" },
  ...CATEGORIES_BLOG,
];
