import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  buildEstimateEmailHtml,
  buildTeamNotificationHtml,
  type EstimateEmailData,
} from "@/lib/estimation/emails";
import { sendMail } from "@/lib/mail";
import { checkRateLimit, getClientIp, hashIp } from "@/lib/estimation/rate-limit";
import { estimationEmailSchema } from "@/lib/validations/estimation";
import type { EstimationAnswers } from "@/data/estimation";

const EMAIL_MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request: Request) {
  try {
    if (!checkRateLimit(`email:${hashIp(getClientIp(request))}`, EMAIL_MAX_REQUESTS_PER_WINDOW)) {
      return NextResponse.json({ error: "Trop de requêtes, réessayez plus tard." }, { status: 429 });
    }

    const body = await request.json();
    const validated = estimationEmailSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { estimateId, email } = validated.data;

    const estimate = await prisma.estimate.findUnique({ where: { id: estimateId } });
    if (!estimate) {
      return NextResponse.json({ error: "Estimation introuvable" }, { status: 404 });
    }

    // L'estimation ne devient identifiée qu'après consentement explicite (validé par le schéma).
    const consentAt = new Date();
    await prisma.estimate.update({
      where: { id: estimateId },
      data: { email, consentAt, status: "lead" },
    });

    const emailData: EstimateEmailData = {
      answers: estimate.answers as EstimationAnswers,
      breakdown: estimate.breakdown as unknown as EstimateEmailData["breakdown"],
      monthlyMin: estimate.monthlyMin,
      monthlyMax: estimate.monthlyMax,
      oneShotMin: estimate.oneShotMin,
      oneShotMax: estimate.oneShotMax,
    };

    try {
      await sendMail({
        to: email,
        subject: "Votre estimation Trinexta, en détail",
        html: buildEstimateEmailHtml(emailData, process.env.NEXT_PUBLIC_BOOKINGS_URL),
      });
    } catch (error) {
      console.error("Erreur envoi email estimation:", error);

      // L'envoi a échoué : on ne conserve pas l'email sans service rendu.
      await prisma.estimate.update({
        where: { id: estimateId },
        data: { email: null, consentAt: null, status: "complete" },
      });

      return NextResponse.json(
        { error: "L'envoi de l'email a échoué. Votre estimation reste affichée, réessayez dans un instant." },
        { status: 500 }
      );
    }

    // Notification interne : un échec ne doit pas faire échouer la demande du visiteur.
    try {
      const teamEmail = process.env.AZURE_FROM_EMAIL;
      if (teamEmail) {
        await sendMail({
          to: teamEmail,
          subject: `Nouveau lead estimation : ${estimate.services.join(", ")}`,
          html: buildTeamNotificationHtml(emailData, email, estimateId),
        });
      }
    } catch (error) {
      console.error("Erreur notification équipe estimation:", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur traitement email estimation:", error);
    return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
  }
}
