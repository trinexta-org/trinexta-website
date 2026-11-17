import { isIndexable } from "@/lib/site"

// Ouverture publique de la boutique sur trinexta.fr.
// Fermée : en production, /boutique affiche « La boutique ouvre bientôt » (non indexée) et la boutique
// disparaît du menu, du pied de page, du sitemap et de llms.txt. Staging et local la gardent visible pour la recette.
// Pour ouvrir : passer BOUTIQUE_OUVERTE à true, PR vers dev puis vers main.

export const BOUTIQUE_OUVERTE = false

export const boutiqueVisible = BOUTIQUE_OUVERTE || !isIndexable

export const BOUTIQUE_FERMEE = {
  surtitre: "Boutique TRINEXTA",
  titre: "La boutique ouvre *bientôt*",
  texte:
    "Nous finalisons la boutique de matériel professionnel. En attendant, vous pouvez déjà nous commander un poste, un écran ou des accessoires : décrivez votre besoin, nous vous faisons une proposition.",
  cta: { label: "Demander une proposition", href: "/contact?besoin=materiel#formulaire" },
}
