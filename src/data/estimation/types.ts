// Types du tunnel d'estimation : questions du wizard et grilles tarifaires.
// Les grilles sont la seule source de prix : le moteur (src/lib/estimation)
// ne fait que les combiner de façon déterministe.

export type EstimationServiceId =
  | "infogerance"
  | "cybersecurite"
  | "sauvegarde-managee"
  | "cloud-pra"
  | "microsoft-365-gestion"
  | "microsoft-365-mise-en-place"
  | "support"
  | "regie-support-infra"
  | "regie-developpement"
  | "regie-cybersecurite"
  | "regie-pilotage"
  | "solutions-metier"
  | "trinexta-studio";

export type EstimationAnswers = Record<string, string | string[]>;

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  /** Volume associé à l'option (nombre de postes, d'utilisateurs, de jours/mois...) */
  units?: number;
}

export interface EstimationQuestion {
  id: string;
  title: string;
  subtitle?: string;
  /** Plusieurs réponses possibles (cartes à cocher + bouton continuer) */
  multiple?: boolean;
  options: QuestionOption[];
}

/** Tranche dégressive : prix unitaire mensuel applicable jusqu'à `upTo` unités.
 * Tout volume au-delà du dernier palier bascule en "sur devis" (voir moteur). */
export interface RecurringTier {
  upTo: number;
  unitPrice: number;
}

export interface RecurringPricing {
  kind: "recurring";
  /** Libellé de l'unité facturée ("poste", "utilisateur", "jour") */
  unitLabel: string;
  /** Question dont l'option répond au volume (via `units`) */
  unitQuestionId: string;
  /** Volume retenu si la question a été tronquée par le plafond de 7 questions */
  fallbackUnits: number;
  tiers: RecurringTier[];
}

/** Palier de complexité one-shot, sélectionné par une réponse */
export interface OneShotTier {
  optionId: string;
  min: number;
  max: number;
}

export interface OneShotPricing {
  kind: "one-shot";
  /** Question de complexité qui sélectionne le palier */
  tierQuestionId: string;
  /** Palier retenu si la question a été tronquée */
  fallbackTierOptionId: string;
  tiers: OneShotTier[];
}

/** Calcul one-shot exact : frais fixes + prix par unité (ex. M365 mise en place) */
export interface OneShotFormulaPricing {
  kind: "one-shot-formula";
  setupFee: number;
  perUnit: number;
  /** Libellé de l'unité ("boîte mail") */
  unitLabel: string;
  /** Question dont l'option répond au volume (via `units`) */
  unitQuestionId: string;
  fallbackUnits: number;
}

/** Fourchette native avec curseur borné, pour la régie par catégorie.
 * Le tarif jour est positionné dans [low, high] par l'effectif et les
 * modificateurs, puis une décote Mode B (engagement long) peut s'appliquer. */
export interface RangePricing {
  kind: "range";
  /** Libellé de l'unité ("jour") */
  unitLabel: string;
  low: number;
  high: number;
  /** Question donnant le volume jours/mois (via `units`) */
  unitQuestionId: string;
  fallbackUnits: number;
  /** Question dont certaines options rendent éligible au Mode B (engagement) */
  modeBQuestionId: string;
  modeBOptionIds: string[];
  /** Question de durée d'engagement (Mode B) */
  engagementQuestionId: string;
  /** Décote par option de durée, en % (ex. { "6-mois": -5, "12-mois": -10 }) */
  engagementDiscounts: Record<string, number>;
  /** Plancher = low × ce facteur après décote (jamais sous le coût interne) */
  floorFactor: number;
}

/** Service toujours sur devis : aucun calcul, carte sans montant */
export interface QuotePricing {
  kind: "quote";
}

export type ServicePricing =
  | RecurringPricing
  | OneShotPricing
  | OneShotFormulaPricing
  | RangePricing
  | QuotePricing;

/** Ajustement déterministe déclenché par une réponse du wizard.
 * `percent` est multiplicatif (% du prix) pour recurring/one-shot/one-shot-formula,
 * additif en position (percent/100 de la largeur [low, high], borné) pour range. */
export interface AnswerAdjustment {
  questionId: string;
  optionId: string;
  /** Pourcentage borné, ex. 15 => +15 %, -10 => -10 % */
  percent: number;
  label: string;
}

/** Modificateur borné sélectionnable uniquement par l'analyse IA (jamais un prix).
 * `percent` suit la même dualité d'interprétation que AnswerAdjustment :
 * multiplicatif pour recurring/one-shot/one-shot-formula, additif en position pour range. */
export interface AiModifier {
  id: string;
  label: string;
  /** Description donnée au modèle pour décider de la sélection */
  hint: string;
  percent: number;
}

export interface ServiceGrid {
  serviceId: EstimationServiceId;
  label: string;
  pricing: ServicePricing;
  /** Demi-largeur de la fourchette autour du prix calculé, en % */
  spreadPercent: number;
  /** Demi-largeur élargie quand aucune analyse IA n'a affiné l'estimation.
   * Ignoré par le moteur pour les kinds one-shot, one-shot-formula et quote. */
  widenedSpreadPercent?: number;
  /** Mention informative affichée après les lignes de calcul (hors total) */
  note?: string;
  answerAdjustments: AnswerAdjustment[];
  aiModifiers: AiModifier[];
}
