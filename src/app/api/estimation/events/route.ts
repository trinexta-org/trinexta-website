import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { estimationEventSchema } from "@/lib/validations/estimation";

export async function POST(request: Request) {
  try {
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
