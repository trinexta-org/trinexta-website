// Offres promues qu'un CTA peut transmettre au formulaire de contact via `?offre=`.
// Le slug est stocké en base et repris dans l'email : ne pas le renommer sans migrer les données.
export const OFFRE_SLUGS = ["serenite-essentielle"] as const;

export type OffreSlug = (typeof OFFRE_SLUGS)[number];

export const LIBELLES_OFFRES: Record<OffreSlug, string> = {
  "serenite-essentielle": "Sérénité Essentielle",
};

export function isOffreSlug(value: string | null | undefined): value is OffreSlug {
  return !!value && (OFFRE_SLUGS as readonly string[]).includes(value);
}

/** Lien du formulaire de contact pré-qualifié pour une offre (demande de devis). */
export function getOffreContactHref(slug: OffreSlug) {
  return `/contact?type=devis&offre=${slug}`;
}
