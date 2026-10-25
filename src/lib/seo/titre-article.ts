export const MARQUE = "TRINEXTA";
const SUFFIXE_MARQUE = ` | ${MARQUE}`;
const LONGUEUR_MAX_TITRE = 60;

// Retire un suffixe de marque final (« | TRINEXTA », « - Trinexta »...), insensible à la casse.
const SUFFIXE_MARQUE_FINAL = new RegExp(`\\s*[|\\-–:]\\s*${MARQUE}\\s*$`, "i");

/**
 * Title d'un article de blog. Le gabarit du layout ajoute « | TRINEXTA » :
 * le titre SEO saisi dans Sanity contient souvent déjà la marque, d'où le
 * doublon « … | TRINEXTA | TRINEXTA ». On ne l'ajoute qu'une fois, et seulement
 * si le title reste sous 60 caractères. Le résultat est complet : le passer
 * en `title: { absolute }` pour court-circuiter le gabarit.
 */
export function titreArticle(titreSaisi: string): string {
  const titre = titreSaisi.trim().replace(SUFFIXE_MARQUE_FINAL, "").trim();

  if (titre.toLowerCase().includes(MARQUE.toLowerCase())) {
    return titre;
  }

  if (titre.length + SUFFIXE_MARQUE.length <= LONGUEUR_MAX_TITRE) {
    return `${titre}${SUFFIXE_MARQUE}`;
  }

  return titre;
}
