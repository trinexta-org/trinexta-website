import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkRateLimit, getClientIp, hashIp } from "@/lib/estimation/rate-limit";
import { estimationEventSchema } from "@/lib/validations/estimation";

// Plafond large : un parcours complet légitime émet déjà ~9 événements
// (jusqu'à 7 questions + étape libre + résultat).
const EVENTS_MAX_REQUESTS_PER_WINDOW = 30;

export async function POST(request: Request) {
  try {
    if (!checkRateLimit(`events:${hashIp(getClientIp(request))}`, EVENTS_MAX_REQUESTS_PER_WINDOW)) {
      return new Response(null, { status: 429 });
    }

    const body = await request.json();
    const validated = estimationEventSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    await prisma.estimateEvent.create({
      data: {
        sessionId: validated.data.sessionId,
        step: validated.data.step,
      },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Erreur enregistrement événement estimation:", error);
    return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
  }
}
