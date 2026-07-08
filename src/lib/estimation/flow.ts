import {
  ESTIMATION_QUESTIONS_BY_ID,
  MAX_QUESTIONS,
  type EstimationAnswers,
  type EstimationServiceId,
} from "@/data/estimation";

// Logique d'adaptativité du tunnel : quelles questions poser, dans quel ordre,
// et quels services déduire des réponses. Fonctions pures et déterministes.

const BASE_QUESTION_IDS = ["effectif", "besoins"] as const;

/** Profils de renfort éligibles au Mode B (engagement long, question durée). */
const RENFORT_MODE_B_PROFILS = ["regulier", "plein"];

/** Régie par catégorie choisie à `renfort-categorie` (fallback si tronquée). */
const REGIE_BY_CATEGORIE: Record<string, EstimationServiceId> = {
  "support-infra": "regie-support-infra",
  developpement: "regie-developpement",
  cybersecurite: "regie-cybersecurite",
  pilotage: "regie-pilotage",
};

/** Questions de suivi, par ordre de priorité. Tronquées au-delà de MAX_QUESTIONS. */
const FOLLOW_UPS: { questionId: string; when: (answers: EstimationAnswers) => boolean }[] = [
  { questionId: "parc", when: (a) => hasAnyBesoin(a, ["lenteurs", "securite", "sauvegarde", "depannage"]) },
  { questionId: "criticite", when: (a) => hasAnyBesoin(a, ["lenteurs", "securite", "sauvegarde", "depannage"]) },
  { questionId: "projet-type", when: (a) => hasAnyBesoin(a, ["projet"]) },
  { questionId: "projet-envergure", when: (a) => hasAnyBesoin(a, ["projet"]) },
  { questionId: "serveurs", when: (a) => hasAnyBesoin(a, ["lenteurs", "securite", "sauvegarde"]) },
  { questionId: "renfort-categorie", when: (a) => hasAnyBesoin(a, ["renfort"]) },
  { questionId: "renfort-profil", when: (a) => hasAnyBesoin(a, ["renfort"]) },
  {
    questionId: "renfort-duree",
    when: (a) =>
      hasAnyBesoin(a, ["renfort"]) && RENFORT_MODE_B_PROFILS.includes(String(a["renfort-profil"])),
  },
  { questionId: "collab-etat", when: (a) => hasAnyBesoin(a, ["collaboration"]) },
];

function hasAnyBesoin(answers: EstimationAnswers, ids: string[]) {
  const besoins = getBesoins(answers);
  return ids.some((id) => besoins.includes(id));
}

function getBesoins(answers: EstimationAnswers): string[] {
  const value = answers["besoins"];
  return Array.isArray(value) ? value : [];
}

/** Séquence complète des questions applicables au vu des réponses, plafonnée à MAX_QUESTIONS. */
export function getQuestionSequence(answers: EstimationAnswers): string[] {
  const sequence: string[] = [...BASE_QUESTION_IDS];
  for (const followUp of FOLLOW_UPS) {
    if (sequence.length >= MAX_QUESTIONS) break;
    if (followUp.when(answers)) sequence.push(followUp.questionId);
  }
  return sequence;
}

/** Prochaine question sans réponse, ou null si le questionnaire est terminé. */
export function getNextQuestionId(answers: EstimationAnswers): string | null {
  for (const questionId of getQuestionSequence(answers)) {
    const value = answers[questionId];
    if (value === undefined || (Array.isArray(value) && value.length === 0)) {
      return questionId;
    }
  }
  return null;
}

/** Services déduits des réponses. Jamais choisis directement par le visiteur. */
export function detectServices(answers: EstimationAnswers): EstimationServiceId[] {
  const besoins = getBesoins(answers);
  const services: EstimationServiceId[] = [];

  if (besoins.includes("lenteurs")) services.push("infogerance");

  // La cybersécurité est déjà incluse dans l'infogérance : pas de doublon.
  if (besoins.includes("securite") && !besoins.includes("lenteurs")) {
    services.push("cybersecurite");
  }

  if (besoins.includes("sauvegarde")) {
    services.push("sauvegarde-managee");
    if (answers["serveurs"] === "plusieurs") services.push("cloud-pra");
  }

  if (besoins.includes("collaboration")) {
    services.push("microsoft-365-gestion");
    // Mise en place ajoutée sauf si M365 est déjà en place ; question tronquée
    // (non répondue) = on prévoit la mise en place, hypothèse prudente.
    if (answers["collab-etat"] !== "m365-sous-exploite") {
      services.push("microsoft-365-mise-en-place");
    }
  }

  if (besoins.includes("projet")) {
    const projetType = answers["projet-type"];
    if (projetType === "outil" || projetType === "automatisation") {
      services.push("solutions-metier");
    } else {
      services.push("trinexta-studio");
    }
  }

  if (besoins.includes("renfort")) {
    services.push(REGIE_BY_CATEGORIE[String(answers["renfort-categorie"])] ?? "regie-support-infra");
  }

  // Le support est couvert par l'infogérance quand les deux besoins sont exprimés.
  if (besoins.includes("depannage") && !besoins.includes("lenteurs")) {
    services.push("support");
  }

  return services;
}

/** Validation structurelle d'une réponse : question connue et options valides. */
export function isValidAnswer(questionId: string, value: string | string[]): boolean {
  const question = ESTIMATION_QUESTIONS_BY_ID[questionId];
  if (!question) return false;
  const optionIds = new Set(question.options.map((o) => o.id));
  if (question.multiple) {
    return Array.isArray(value) && value.length > 0 && value.every((v) => optionIds.has(v));
  }
  return typeof value === "string" && optionIds.has(value);
}
