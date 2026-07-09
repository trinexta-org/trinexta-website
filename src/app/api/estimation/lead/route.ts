import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  buildEstimateEmailHtml,
  buildTeamNotificationHtml,
  type EstimateEmailData,
} from "@/lib/estimation/emails";
import { sendMail } from "@/lib/mail";
import { checkRateLimit, getClientIp, hashIp } from "@/lib/estimation/rate-limit";
import { estimationLeadSchema } from "@/lib/validations/estimation";
import type { EstimationAnswers } from "@/data/estimation";

const LEAD_MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request: Request) {
  try {
    if (!checkRateLimit(`lead:${hashIp(getClientIp(request))}`, LEAD_MAX_REQUESTS_PER_WINDOW)) {
      return NextResponse.json({ error: "Trop de requêtes, réessayez plus tard." }, { status: 429 });
    }

    const body = await request.json();
    const validated = estimationLeadSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { estimateId, prenom, nom, email, telephone, entreprise } = validated.data;

    const estimate = await prisma.estimate.findUnique({ where: { id: estimateId } });
    if (!estimate) {
      return NextResponse.json({ error: "Estimation introuvable" }, { status: 404 });
    }

    // Le lead est exploitable dès le consentement : le rappel téléphonique ne
    // dépend pas de la réussite de l'envoi de l'email de détail ci-dessous.
    const consentAt = new Date();
    await prisma.estimate.update({
      where: { id: estimateId },
      data: { prenom, nom, email, telephone, entreprise, consentAt, status: "lead" },
    });

    const emailData: EstimateEmailData = {
      answers: estimate.answers as EstimationAnswers,
      breakdown: estimate.breakdown as unknown as EstimateEmailData["breakdown"],
      monthlyMin: estimate.monthlyMin,
      monthlyMax: estimate.monthlyMax,
      oneShotMin: estimate.oneShotMin,
      oneShotMax: estimate.oneShotMax,
    };

    let emailSent = true;
    try {
      await sendMail({
        to: email,
        subject: "Votre estimation Trinexta, en détail",
        html: buildEstimateEmailHtml(emailData, prenom, process.env.NEXT_PUBLIC_BOOKINGS_URL),
      });
    } catch (error) {
      console.error("Erreur envoi email estimation:", error);
      emailSent = false;
    }

    // Notification interne : envoyée même si l'email au prospect a échoué,
    // l'équipe doit savoir qu'il y a un lead à rappeler.
    try {
      const teamEmail = process.env.AZURE_FROM_EMAIL;
      if (teamEmail) {
        await sendMail({
          to: teamEmail,
          subject: `Nouveau lead estimation : ${estimate.services.join(", ")}`,
          html: buildTeamNotificationHtml(
            emailData,
            { prenom, nom, email, telephone, entreprise },
            estimateId,
            emailSent
          ),
        });
      }
    } catch (error) {
      console.error("Erreur notification équipe estimation:", error);
    }

    return NextResponse.json({ success: true, emailSent });
  } catch (error) {
    console.error("Erreur traitement lead estimation:", error);
    return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
  }
}
