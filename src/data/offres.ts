// Offres promues qu'un CTA peut transmettre au formulaire de contact via `?offre=`.
// Le slug est stocké en base et repris dans l'email : ne pas le renommer sans migrer les données.
export const OFFRE_SLUGS = ["serenite-essentielle", "serenite-complete"] as const;

export type OffreSlug = (typeof OFFRE_SLUGS)[number];

export const LIBELLES_OFFRES: Record<OffreSlug, string> = {
  // Slug historique conservé (stocké en base), libellé aligné sur le nom commercial actuel
  "serenite-essentielle": "Sérénité Essentiel",
  "serenite-complete": "Sérénité Complète",
};

export function isOffreSlug(value: string | null | undefined): value is OffreSlug {
  return !!value && (OFFRE_SLUGS as readonly string[]).includes(value);
}

/** Lien du formulaire de contact pré-qualifié pour une offre (demande de devis). */
export function getOffreContactHref(slug: OffreSlug) {
  return `/contact?type=devis&offre=${slug}`;
}
