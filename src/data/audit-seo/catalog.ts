import type { CheckDefinition, CheckId } from "./types";

// Seuils du Barème (figés, déterministes).
export const THRESHOLDS = {
  titleMinLength: 10,
  titleMaxLength: 65,
  metaDescriptionMinLength: 50,
  metaDescriptionMaxLength: 160,
  contentMinWords: 300,
} as const;

// Catalogue des Constats. Chaque check retire `weight` points au sous-score de
// son axe quand il échoue. La somme des poids d'un axe fait 100 : une page qui
// échoue à tout tombe à 0, une page nickel reste à 100. Les textes s'arrêtent
// au symptôme et à l'impact business, jamais la méthode (vendue en RDV).
export const CHECK_CATALOG: Record<CheckId, CheckDefinition> = {
  // ---- Axe on-page (somme des poids = 100) ----
  "title-missing": {
    id: "title-missing",
    axis: "on-page",
    severity: "critique",
    weight: 20,
    symptom: "La page n'a pas de titre exploitable.",
    impact:
      "Google invente un titre à votre place dans ses résultats, souvent peu vendeur : vous perdez des clics au profit des concurrents.",
  },
  "title-length": {
    id: "title-length",
    axis: "on-page",
    severity: "mineur",
    weight: 4,
    symptom: "Le titre de la page est trop court ou trop long.",
    impact:
      "Un titre mal calibré est tronqué ou peu incitatif dans les résultats de recherche, ce qui réduit le nombre de visiteurs qui cliquent.",
  },
  "meta-description-missing": {
    id: "meta-description-missing",
    axis: "on-page",
    severity: "majeur",
    weight: 15,
    symptom: "La page n'a pas de méta description.",
    impact:
      "Google compose un extrait au hasard sous votre lien : votre promesse commerciale n'apparaît pas et le lien attire moins de clics.",
  },
  "meta-description-length": {
    id: "meta-description-length",
    axis: "on-page",
    severity: "mineur",
    weight: 4,
    symptom: "La méta description est trop courte ou trop longue.",
    impact:
      "L'extrait affiché sous votre lien est coupé ou trop maigre, il donne moins envie de cliquer que celui des concurrents.",
  },
  "h1-missing": {
    id: "h1-missing",
    axis: "on-page",
    severity: "majeur",
    weight: 14,
    symptom: "La page n'a pas de titre principal (H1).",
    impact:
      "Google comprend mal le sujet de la page et la positionne sur des recherches moins pertinentes, donc moins de trafic qualifié.",
  },
  "h1-multiple": {
    id: "h1-multiple",
    axis: "on-page",
    severity: "mineur",
    weight: 5,
    symptom: "La page a plusieurs titres principaux (H1).",
    impact:
      "Le message central de la page est dilué : Google hésite sur le sujet à retenir et vous positionne moins bien.",
  },
  "img-alt-missing": {
    id: "img-alt-missing",
    axis: "on-page",
    severity: "majeur",
    weight: 12,
    symptom: "Des images n'ont pas de texte alternatif.",
    impact:
      "Vos images n'apparaissent pas dans Google Images et la page perd en accessibilité, deux sources de visiteurs en moins.",
  },
  "canonical-missing": {
    id: "canonical-missing",
    axis: "on-page",
    severity: "mineur",
    weight: 4,
    symptom: "La page ne déclare pas d'URL canonique.",
    impact:
      "En cas de doublons d'adresses, Google répartit votre popularité sur plusieurs versions au lieu d'une seule, ce qui affaiblit votre classement.",
  },
  "open-graph-missing": {
    id: "open-graph-missing",
    axis: "on-page",
    severity: "mineur",
    weight: 4,
    symptom: "La page n'a pas de balises de partage (Open Graph).",
    impact:
      "Partagée sur LinkedIn, Facebook ou WhatsApp, votre page s'affiche sans titre ni visuel soigné et récolte beaucoup moins de clics.",
  },
  "structured-data-missing": {
    id: "structured-data-missing",
    axis: "on-page",
    severity: "mineur",
    weight: 4,
    symptom: "La page n'a pas de données structurées.",
    impact:
      "Vous passez à côté des affichages enrichis de Google (étoiles, informations entreprise), qui rendent votre lien plus visible.",
  },
  "content-thin": {
    id: "content-thin",
    axis: "on-page",
    severity: "majeur",
    weight: 14,
    symptom: "La page contient très peu de texte.",
    impact:
      "Avec trop peu de contenu, Google manque d'éléments pour vous juger crédible sur le sujet, et les assistants IA (ChatGPT, Google AI) n'ont rien à citer : vous restez derrière des pages plus fournies.",
  },

  // ---- Axe technique / crawlabilité (somme des poids = 100) ----
  "https-missing": {
    id: "https-missing",
    axis: "technique",
    severity: "critique",
    weight: 25,
    // Grave mais la page reste fonctionnelle : plafonne le global à 55.
    scoreCap: 55,
    symptom: "La page n'est pas servie en HTTPS.",
    impact:
      "Les navigateurs affichent un avertissement de sécurité qui fait fuir les visiteurs, et Google défavorise les sites non sécurisés.",
  },
  "robots-noindex": {
    id: "robots-noindex",
    axis: "technique",
    severity: "critique",
    weight: 30,
    // Page invisible dans Google : le reste du score est théorique, plafond 30.
    scoreCap: 30,
    symptom: "La page demande explicitement à ne pas être indexée.",
    impact:
      "Cette page est invisible dans Google : aucun visiteur ne peut la trouver via une recherche, quoi qu'elle contienne.",
  },
  "viewport-missing": {
    id: "viewport-missing",
    axis: "technique",
    severity: "majeur",
    weight: 20,
    symptom: "La page n'est pas configurée pour le mobile.",
    impact:
      "Sur téléphone, l'affichage est cassé ou minuscule : la majorité de vos visiteurs repartent, et Google classe d'abord les sites adaptés au mobile.",
  },
  "lang-missing": {
    id: "lang-missing",
    axis: "technique",
    severity: "mineur",
    weight: 8,
    symptom: "La langue de la page n'est pas déclarée.",
    impact:
      "Google peut se tromper sur la langue et présenter votre page à un public qui ne la comprend pas, ou la traduire de travers.",
  },
  "robots-txt-missing": {
    id: "robots-txt-missing",
    axis: "technique",
    severity: "mineur",
    weight: 9,
    symptom: "Le site n'a pas de fichier robots.txt.",
    impact:
      "Sans ce fichier d'aiguillage, Google explore votre site à l'aveugle et gaspille son temps sur des pages sans intérêt.",
  },
  "sitemap-missing": {
    id: "sitemap-missing",
    axis: "technique",
    severity: "mineur",
    weight: 8,
    symptom: "Aucun plan de site (sitemap) n'est déclaré.",
    impact:
      "Google découvre vos pages plus lentement et peut en oublier : vos nouveautés mettent plus longtemps à remonter dans les résultats.",
  },
};

export const CHECK_LIST: CheckDefinition[] = Object.values(CHECK_CATALOG);
