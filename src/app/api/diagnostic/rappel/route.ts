import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TRINEXTA_CONTACT } from "@/data/contact-trinexta";
import { sendMail } from "@/lib/mail";
import { PRODUCTION_URL } from "@/lib/site";
import { limiteParIp } from "@/lib/security/anti-abus";
import { compter, trierResultats } from "@/lib/diagnostic/analyses";
import { notificationEquipeHtml } from "@/lib/diagnostic/emails";
import { formatJetonValide, hacherJeton } from "@/lib/diagnostic/jeton";
import { lireResultats } from "@/lib/diagnostic/resultats";

/**
 * « Être rappelé par un technicien », depuis l'e-mail de rapport. En POST
 * uniquement, depuis le bouton de /diagnostic-securite/rappel : les scanners
 * de liens des messageries suivent les liens en GET et donneraient sinon
 * l'accord à la place du destinataire (même principe que /newsletter/confirm).
 * C'est ce clic, et lui seul, qui horodate consentAt et prévient l'équipe.
 */
export async function POST(request: Request) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL).replace(/\/+$/, "");
  const page = (status: string) =>
    NextResponse.redirect(`${base}/diagnostic-securite/rappel?status=${status}`, 303);

  try {
    if (!limiteParIp(request, "diagnostic-rappel", 10)) return page("erreur");
    const form = await request.formData();
    const jeton = form.get("jeton");
    if (!formatJetonValide(jeton)) return page("erreur");

    // Recherche par hash (index unique) : le jeton lui-même n'est jamais stocké.
    const diagnostic = await prisma.diagnosticSecurite.findUnique({
      where: { jetonRappelHash: hacherJeton(jeton) },
    });
    if (!diagnostic || !diagnostic.email) return page("erreur");
    if (diagnostic.consentAt) return page("ok");

    const accorde = await prisma.diagnosticSecurite.updateMany({
      where: { id: diagnostic.id, consentAt: null },
      data: { consentAt: new Date() },
    });
    if (accorde.count === 0) return page("ok");

    const resultats = trierResultats(lireResultats(diagnostic.resultats));
    try {
      await sendMail({
        to: process.env.CONTACT_TO_EMAIL || TRINEXTA_CONTACT.email,
        replyTo: diagnostic.email,
        subject: `Diagnostic sécurité · ${diagnostic.domaine} · demande de rappel`,
        html: notificationEquipeHtml({
          domaine: diagnostic.domaine,
          email: diagnostic.email,
          diagnosticId: diagnostic.id,
          compteurs: compter(resultats),
          resultats,
        }),
      });
    } catch (error) {
      // L'accord est enregistré : l'équipe le retrouvera en base même si la notification échoue.
      console.error("[api/diagnostic/rappel] notification équipe", error);
    }
    return page("ok");
  } catch (error) {
    console.error("[api/diagnostic/rappel]", error);
    return page("erreur");
  }
}
