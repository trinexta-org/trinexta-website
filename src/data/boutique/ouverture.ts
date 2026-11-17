/**
 * Boutique fermée au public tant que le paiement Stripe n'est pas branché.
 * `false` : /boutique affiche « arrive bientôt », les sous-pages y redirigent, rien dans le sitemap.
 */
export const BOUTIQUE_OUVERTE = false

export const BOUTIQUE_BIENTOT = {
  surtitre: "Boutique TRINEXTA",
  titre: "La boutique *arrive bientôt*",
  texte:
    "Nous finalisons la commande en ligne de matériel informatique professionnel. En attendant, décrivez-nous le matériel qu'il vous faut : nous vous répondons avec une proposition.",
  cta: "Nous écrire",
  href: "/contact?besoin=materiel#formulaire",
}
