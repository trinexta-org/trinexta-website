import { isIndexable } from "@/lib/site"

/**
 * Boutique fermée au public tant que le paiement Stripe n'est pas branché.
 * `false` : en production, /boutique affiche « arrive bientôt », les sous-pages y redirigent, et la boutique
 * sort du sitemap, du menu, du pied de page et de llms.txt.
 */
export const BOUTIQUE_OUVERTE = true

/** Staging et local gardent la boutique visible pour la recette ; la production attend `BOUTIQUE_OUVERTE`. */
export const boutiqueVisible = BOUTIQUE_OUVERTE || !isIndexable

export const BOUTIQUE_BIENTOT = {
  surtitre: "Boutique TRINEXTA",
  titre: "La boutique *arrive bientôt*",
  texte:
    "Nous finalisons la commande en ligne de matériel informatique professionnel. En attendant, décrivez-nous le matériel qu'il vous faut : nous vous répondons avec une proposition.",
  cta: "Nous écrire",
  href: "/contact?besoin=materiel#formulaire",
}
