import type { ScoreBand } from "./bands";

// Orientation narrative par palier de score, injectée dans le prompt. L'IA ne
// calcule rien : elle adapte seulement l'angle, sans jamais fabriquer un défaut
// absent des constats mesurés. Le palier est dérivé du score (bands.ts).
export const BAND_PROMPT_GUIDANCE: Record<ScoreBand, string> = {
  bas: "Palier BAS : la page perd des visiteurs dès aujourd'hui. Pars des constats les plus graves, montre l'urgence sans dramatiser, et ouvre sur la nécessité de cadrer les travaux dans le bon ordre.",
  moyen:
    "Palier MOYEN : la base est correcte mais le plafond est bas. Reconnais ce qui tient, puis explique que sans travail de fond la page restera à des positions moyennes.",
  haut: "Palier HAUT : la technique de la page est saine, ne cherche PAS de faux défaut. Reconnais explicitement cette solidité, puis ouvre honnêtement vers ce qu'un audit gratuit d'une seule page ne voit pas : conversion, SEO local, concurrence, reste du site. Ajoute l'angle GEO : une page trop maigre reste invisible pour les réponses des IA (ChatGPT, Google AI). Conclus que la technique seule ne suffit plus.",
};

// Règles de ton injectées dans le prompt de la Synthèse IA. Miroir de TONE.md,
// centralisées ici pour rester la source de vérité côté module audit SEO.
export const TONE_RULES: string[] = [
  "TON (à respecter) :",
  "- Voix active et directe, tu t'adresses au dirigeant comme à un interlocuteur sérieux.",
  "- Concret avant abstrait : nomme la situation réelle avant le bénéfice général.",
  "- Pas de jargon marketing creux (pas de \"solution innovante\", \"transformation digitale\", \"productivité décuplée\").",
  "- Pas de longs tirets (jamais de tiret cadratin), ni dans les titres ni dans le corps.",
];
