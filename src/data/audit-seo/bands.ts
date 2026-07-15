// Palier de score : source de vérité unique des seuils et du narratif par
// palier, consommée par le Teaser (écran), l'email et le prompt IA. Avant, les
// seuils étaient dupliqués (scoreTone, scoreColor, exemple page). Un seul
// endroit décide désormais bas / moyen / haut et le discours associé.

export type ScoreBand = "bas" | "moyen" | "haut";

/** Bas < 50, moyen 50-79, haut >= 80. Fonction pure. */
export function getScoreBand(score: number): ScoreBand {
  if (score >= 80) return "haut";
  if (score >= 50) return "moyen";
  return "bas";
}

export interface BandNarrative {
  /** Conclusion honnête posée sous le score, orientée vers l'échange. */
  conclusion: string;
  /** Accroche courte juste avant le bouton de contact. */
  ctaHook: string;
}

// Narratif par palier. Offre identique quel que soit le palier (audit approfondi
// déduit) : seul le discours change. Jamais de fausse alarme, jamais de méthode.
export const SCORE_BAND_NARRATIVE: Record<ScoreBand, BandNarrative> = {
  bas: {
    conclusion:
      "Cette page perd des visiteurs aujourd'hui. Les constats ci-dessus se corrigent, mais pris à la volée ils reviennent. Un audit approfondi cadre les travaux dans le bon ordre.",
    ctaHook: "Partons de votre score pour prioriser ce qui compte vraiment.",
  },
  moyen: {
    conclusion:
      "La base est correcte, mais le plafond est bas : en l'état, cette page ne dépassera pas quelques positions moyennes. L'audit approfondi montre où sont les vrais gains.",
    ctaHook: "Voyons ensemble jusqu'où cette page peut monter.",
  },
  haut: {
    conclusion:
      "Techniquement, cette page tient la route. Justement : le levier est ailleurs. Un audit gratuit d'une seule page ne voit ni votre conversion, ni votre SEO local, ni vos concurrents, ni le reste du site. S'y ajoute un angle nouveau : une page trop maigre reste invisible pour les réponses des IA (ChatGPT, Google AI). La technique ne suffit plus à faire la différence.",
    ctaHook: "Votre technique est saine : parlons de ce qui vous fera vraiment décoller.",
  },
};

/**
 * Ce que l'audit gratuit (une page, mécanique) ne mesure PAS. Bloc constant quel
 * que soit le score : c'est le pont honnête vers l'audit approfondi. Symptôme et
 * enjeu, jamais la méthode.
 */
export interface BlindSpot {
  title: string;
  description: string;
}

export const AUDIT_BLIND_SPOTS: BlindSpot[] = [
  {
    title: "Le SEO local",
    description:
      "Votre visibilité auprès des clients proches de vous : fiche établissement, avis, présence sur les recherches géolocalisées. Cet audit ne l'évalue pas.",
  },
  {
    title: "La conversion",
    description:
      "Être vu ne suffit pas : encore faut-il que le visiteur passe à l'action. Le parcours, les appels à l'action, la confiance ne sont pas mesurés ici.",
  },
  {
    title: "La concurrence",
    description:
      "Votre score est bon dans l'absolu, mais vos concurrents sont peut-être meilleurs sur vos mots-clés. Cet audit regarde votre page, pas le marché.",
  },
  {
    title: "Le reste du site",
    description:
      "Une seule page a été analysée. Les autres pages, l'architecture, le maillage interne pèsent lourd sur votre référencement global.",
  },
];
