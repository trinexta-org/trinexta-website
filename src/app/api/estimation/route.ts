import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { computeEstimate } from "@/lib/estimation/engine";
import { detectServices } from "@/lib/estimation/flow";
import { checkRateLimit, getClientIp, hashIp } from "@/lib/estimation/rate-limit";
import { estimationCompletionSchema } from "@/lib/validations/estimation";

const CREATE_MAX_REQUESTS_PER_WINDOW = 15;

export async function POST(request: Request) {
  try {
    if (!checkRateLimit(`create:${hashIp(getClientIp(request))}`, CREATE_MAX_REQUESTS_PER_WINDOW)) {
      return NextResponse.json({ error: "Trop de requêtes, réessayez plus tard." }, { status: 429 });
    }

    const body = await request.json();
    const validated = estimationCompletionSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const { sessionId, answers, aiModifierIds = [], aiAnalyzed = false } = validated.data;

    const services = detectServices(answers);
    if (services.length === 0) {
      return NextResponse.json({ error: "Aucun service détecté" }, { status: 400 });
    }

    // Le serveur recalcule tout : les montants du client ne sont jamais repris.
    const result = computeEstimate(answers, { aiModifierIds, aiAnalyzed });
    const appliedAiModifiers = result.services.flatMap((s) =>
      s.appliedModifiers.filter((m) => m.source === "ia").map((m) => ({ serviceId: s.serviceId, ...m }))
    );

    const estimate = await prisma.estimate.create({
      data: {
        sessionId,
        answers,
        services,
        monthlyMin: result.monthlyMax > 0 ? result.monthlyMin : null,
        monthlyMax: result.monthlyMax > 0 ? result.monthlyMax : null,
        oneShotMin: result.oneShotMax > 0 ? result.oneShotMin : null,
        oneShotMax: result.oneShotMax > 0 ? result.oneShotMax : null,
        breakdown: result.services.map((s) => ({
          serviceId: s.serviceId,
          label: s.label,
          kind: s.kind,
          min: s.min,
          max: s.max,
          lines: s.lines,
          ...(s.note ? { note: s.note } : {}),
        })),
        aiModifiers: appliedAiModifiers.length > 0 ? appliedAiModifiers : undefined,
        aiAnalyzed,
      },
    });

    // Rattache les événements déjà émis pour cette session au parcours complété.
    await prisma.estimateEvent.updateMany({
      where: { sessionId, estimateId: null },
      data: { estimateId: estimate.id },
    });

    return NextResponse.json({ id: estimate.id }, { status: 201 });
  } catch (error) {
    console.error("Erreur enregistrement estimation:", error);
    return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
  }
}
