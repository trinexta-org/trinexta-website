import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { DIAGNOSTIC_LIMITES } from "@/data/diagnostic";
import { TRINEXTA_CONTACT } from "@/data/contact-trinexta";
import { sendMail } from "@/lib/mail";
import { PRODUCTION_URL } from "@/lib/site";
import { estRobot, limiteParEmail, limiteParIp, lireCorpsJson } from "@/lib/security/anti-abus";
import { compter, trierResultats } from "@/lib/diagnostic/analyses";
import { rapportRequeteSchema } from "@/lib/diagnostic/domaine";
import { rapportProspectHtml } from "@/lib/diagnostic/emails";
import { creerJeton, jetonValide } from "@/lib/diagnostic/jeton";
import { lireResultats } from "@/lib/diagnostic/resultats";

// Envoi du rapport de diagnostic par e-mail, à la demande du visiteur.
// - Jeton exigé : seul le navigateur qui a lancé l'analyse peut demander le rapport.
// - Un seul envoi par diagnostic (réservation atomique de rapportEnvoyeAt).
// - Aucun accord au recontact ici : le rapport contient un bouton « Être rappelé »
//   qui, seul, horodate consentAt et prévient l'équipe (/api/diagnostic/rappel).
// Protections : JSON strict, piège à robots, validation zod, 5 demandes par IP
// et 3 envois vers une même adresse par 24 h, erreurs génériques.

const TROP = "Trop de demandes, réessayez demain.";
const INTROUVABLE = "Analyse introuvable. Relancez l'analyse de votre site.";
const DEJA_ENVOYE = "Le rapport de cette analyse a déjà été envoyé.";

export async function POST(request: Request) {
  try {
    const body = await lireCorpsJson(request);
    if (body === null) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }
    if (estRobot(body)) {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    if (!limiteParIp(request, "diagnostic-rapport", DIAGNOSTIC_LIMITES.rapportParIp, DIAGNOSTIC_LIMITES.fenetreMs)) {
      return NextResponse.json({ error: TROP }, { status: 429 });
    }

    const valide = rapportRequeteSchema.safeParse(body);
    if (!valide.success) {
      const jetonEnCause = valide.error.issues.some((i) => i.path[0] !== "email");
      return NextResponse.json(
        { error: jetonEnCause ? INTROUVABLE : "Vérifiez votre adresse e-mail." },
        { status: jetonEnCause ? 404 : 400 }
      );
    }
    const { diagnosticId, jeton, email } = valide.data;

    if (!limiteParEmail(email, "diagnostic-rapport", DIAGNOSTIC_LIMITES.rapportParEmail, DIAGNOSTIC_LIMITES.fenetreMs)) {
      return NextResponse.json({ error: TROP }, { status: 429 });
    }

    const diagnostic = await prisma.diagnosticSecurite.findUnique({ where: { id: diagnosticId } });
    // Même réponse pour un identifiant inconnu et un jeton faux : rien à deviner.
    if (!diagnostic || diagnostic.statut !== "termine" || !jetonValide(jeton, diagnostic.jetonHash)) {
      if (diagnostic?.rapportEnvoyeAt) {
        return NextResponse.json({ error: DEJA_ENVOYE }, { status: 409 });
      }
      return NextResponse.json({ error: INTROUVABLE }, { status: 404 });
    }

    // Réservation atomique : deux demandes simultanées ne peuvent pas envoyer deux rapports.
    const rappel = creerJeton();
    const reserve = await prisma.diagnosticSecurite.updateMany({
      where: { id: diagnosticId, rapportEnvoyeAt: null },
      data: { rapportEnvoyeAt: new Date(), email, jetonRappelHash: rappel.hash, jetonHash: null },
    });
    if (reserve.count === 0) {
      return NextResponse.json({ error: DEJA_ENVOYE }, { status: 409 });
    }

    const resultats = trierResultats(lireResultats(diagnostic.resultats));
    const base = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL).replace(/\/+$/, "");

    try {
      await sendMail({
        to: email,
        replyTo: TRINEXTA_CONTACT.email,
        subject: `Diagnostic sécurité de ${diagnostic.domaine} : votre rapport`,
        html: rapportProspectHtml({
          domaine: diagnostic.domaine,
          date: diagnostic.createdAt,
          resultats,
          compteurs: compter(resultats),
          urlRappel: `${base}/diagnostic-securite/rappel?jeton=${rappel.jeton}`,
        }),
      });
    } catch (error) {
      console.error("[api/diagnostic/rapport] envoi au prospect", error);
      // Envoi échoué : on libère la réservation pour permettre un nouvel essai.
      await prisma.diagnosticSecurite
        .update({
          where: { id: diagnosticId },
          data: { rapportEnvoyeAt: null, email: null, jetonRappelHash: null, jetonHash: diagnostic.jetonHash },
        })
        .catch((e) => console.error("[api/diagnostic/rapport] libération", e));
      return NextResponse.json(
        { error: "L'envoi du rapport a échoué. Réessayez dans quelques minutes, ou appelez-nous." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/diagnostic/rapport]", error);
    return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
  }
}
