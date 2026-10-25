import type { IdVerification, StatutDiagnostic } from "@/data/diagnostic";

export type { IdVerification, StatutDiagnostic };

/** Résultat d'une vérification, tel qu'affiché, stocké et envoyé par e-mail. */
export interface ResultatVerification {
  id: IdVerification;
  titre: string;
  statut: StatutDiagnostic;
  /** Ce qui a été observé, sans affirmation non prouvée. */
  constat: string;
  /** « Ce que ça veut dire ». */
  risque: string;
  /** « Ce qu'il faut faire ». */
  action: string;
}

export type Compteurs = Record<StatutDiagnostic, number>;
