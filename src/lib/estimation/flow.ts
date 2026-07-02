import {
  ESTIMATION_QUESTIONS_BY_ID,
  MAX_QUESTIONS,
  type EstimationAnswers,
  type EstimationServiceId,
} from "@/data/estimation";

// Logique d'adaptativité du tunnel : quelles questions poser, dans quel ordre,
// et quels services déduire des réponses. Fonctions pures et déterministes.

const BASE_QUESTION_IDS = ["effectif", "besoins"] as const;

/** Questions de suivi, par ordre de priorité. Tronquées au-delà de MAX_QUESTIONS. */
const FOLLOW_UPS: { questionId: string; when: (besoins: string[]) => boolean }[] = [
  { questionId: "parc", when: (b) => hasAny(b, ["lenteurs", "securite", "sauvegarde", "depannage"]) },
  { questionId: "criticite", when: (b) => hasAny(b, ["lenteurs", "securite", "sauvegarde", "depannage"]) },
  { questionId: "projet-type", when: (b) => b.includes("projet") },
  { questionId: "projet-envergure", when: (b) => b.includes("projet") },
  { questionId: "serveurs", when: (b) => hasAny(b, ["lenteurs", "securite", "sauvegarde"]) },
  { questionId: "renfort-profil", when: (b) => b.includes("renfort") },
  { questionId: "collab-etat", when: (b) => b.includes("collaboration") },
];

function hasAny(besoins: string[], ids: string[]) {
  return ids.some((id) => besoins.includes(id));
}

function getBesoins(answers: EstimationAnswers): string[] {
  const value = answers["besoins"];
  return Array.isArray(value) ? value : [];
}

/** Séquence complète des questions applicables au vu des réponses, plafonnée à MAX_QUESTIONS. */
export function getQuestionSequence(answers: EstimationAnswers): string[] {
  const besoins = getBesoins(answers);
  const sequence: string[] = [...BASE_QUESTION_IDS];
  for (const followUp of FOLLOW_UPS) {
    if (sequence.length >= MAX_QUESTIONS) break;
    if (followUp.when(besoins)) sequence.push(followUp.questionId);
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
  if (besoins.includes("securite")) services.push("cybersecurite");
  if (besoins.includes("sauvegarde")) services.push("cloud-sauvegarde");
  if (besoins.includes("collaboration")) services.push("microsoft-365");

  if (besoins.includes("projet")) {
    const projetType = answers["projet-type"];
    if (projetType === "outil" || projetType === "automatisation") {
      services.push("solutions-metier");
    } else {
      services.push("trinexta-studio");
    }
  }

  if (besoins.includes("renfort")) services.push("regie");

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
