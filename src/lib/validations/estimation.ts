import { z } from "zod";
import { isValidAnswer } from "@/lib/estimation/flow";

export const ESTIMATION_FREETEXT_MAX_LENGTH = 1500;

/** Réponses du wizard : uniquement des identifiants de questions et d'options connus. */
const answersSchema = z
  .record(z.string().max(40), z.union([z.string().max(40), z.array(z.string().max(40)).max(10)]))
  .refine((answers) => Object.keys(answers).length <= 12, {
    message: "Trop de réponses",
  })
  .refine(
    (answers) => Object.entries(answers).every(([questionId, value]) => isValidAnswer(questionId, value)),
    { message: "Réponses invalides" }
  );

export const estimationEventSchema = z.object({
  sessionId: z.uuid(),
  step: z.string().min(1).max(60),
});

export const estimationCompletionSchema = z.object({
  sessionId: z.uuid(),
  answers: answersSchema,
  aiModifierIds: z.array(z.string().max(60)).max(12).optional(),
  aiAnalyzed: z.boolean().optional(),
});

export const estimationAnalyzeSchema = z.object({
  answers: answersSchema,
  text: z.string().trim().min(1).max(ESTIMATION_FREETEXT_MAX_LENGTH),
});

export const estimationEmailSchema = z.object({
  estimateId: z.string().min(1).max(40),
  email: z.email("Le format de l'email est invalide"),
  consent: z.literal(true, "Le consentement est requis"),
});

export type EstimationCompletionData = z.infer<typeof estimationCompletionSchema>;
export type EstimationAnalyzeData = z.infer<typeof estimationAnalyzeSchema>;
export type EstimationEmailData = z.infer<typeof estimationEmailSchema>;
