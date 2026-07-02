// Types du tunnel d'estimation : questions du wizard et grilles tarifaires.
// Les grilles sont la seule source de prix : le moteur (src/lib/estimation)
// ne fait que les combiner de façon déterministe.

export type EstimationServiceId =
  | "infogerance"
  | "cybersecurite"
  | "cloud-sauvegarde"
  | "microsoft-365"
  | "support"
  | "regie"
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

/** Tranche dégressive : prix unitaire mensuel applicable jusqu'à `upTo` unités (null = illimité) */
export interface RecurringTier {
  upTo: number | null;
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
  /** Socle mensuel fixe en euros */
  base: number;
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

/** Ajustement déterministe déclenché par une réponse du wizard */
export interface AnswerAdjustment {
  questionId: string;
  optionId: string;
  /** Pourcentage borné, ex. 15 => +15 %, -10 => -10 % */
  percent: number;
  label: string;
}

/** Modificateur borné sélectionnable uniquement par l'analyse IA (jamais un prix) */
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
  pricing: RecurringPricing | OneShotPricing;
  /** Demi-largeur de la fourchette autour du prix calculé, en % */
  spreadPercent: number;
  /** Demi-largeur élargie quand aucune analyse IA n'a affiné l'estimation */
  widenedSpreadPercent: number;
  answerAdjustments: AnswerAdjustment[];
  aiModifiers: AiModifier[];
}
