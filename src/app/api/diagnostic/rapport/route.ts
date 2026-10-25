import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { DIAGNOSTIC_LIMITES, STATUTS, VERIFICATIONS } from "@/data/diagnostic";
import { TRINEXTA_CONTACT } from "@/data/contact-trinexta";
import { sendMail } from "@/lib/mail";
import { PRODUCTION_URL } from "@/lib/site";
import { estRobot, limiteParEmail, limiteParIp, lireCorpsJson } from "@/lib/security/anti-abus";
import { compter, trierResultats } from "@/lib/diagnostic/analyses";
import { rapportRequeteSchema } from "@/lib/diagnostic/domaine";
import { notificationEquipeHtml, rapportProspectHtml } from "@/lib/diagnostic/emails";
import type { ResultatVerification } from "@/lib/diagnostic/types";

// Envoi du rapport de diagnostic par e-mail, avec consentement au recontact.
// Protections : JSON strict, piège à robots, validation zod, 5 demandes par IP
// et 3 envois vers une même adresse par 24 h, erreurs génériques.

const TROP = "Trop de demandes, réessayez demain.";
const ID_VALIDES = new Set<string>(VERIFICATIONS.map((v) => v.id));
const STATUTS_VALIDES = new Set<string>(STATUTS);

/** Relit les résultats stockés en ne gardant que des entrées bien formées. */
function lireResultats(valeur: unknown): ResultatVerification[] {
  if (!Array.isArray(valeur)) return [];
  return valeur.filter((r): r is ResultatVerification => {
    if (!r || typeof r !== "object") return false;
    const o = r as Record<string, unknown>;
    return (
      typeof o.id === "string" &&
      ID_VALIDES.has(o.id) &&
      typeof o.statut === "string" &&
      STATUTS_VALIDES.has(o.statut) &&
      ["titre", "constat", "risque", "action"].every((k) => typeof o[k] === "string")
    );
  });
}

export async function POST(request: Request) {
  try {
    const body = await lireCorpsJson(request);
    if (body === null) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }
    if (estRobot(body)) {
      return NextResponse.json({ success: true, emailEnvoye: true }, { status: 200 });
    }
    if (!limiteParIp(request, "diagnostic-rapport", DIAGNOSTIC_LIMITES.rapportParIp, DIAGNOSTIC_LIMITES.fenetreMs)) {
      return NextResponse.json({ error: TROP }, { status: 429 });
    }

    const valide = rapportRequeteSchema.safeParse(body);
    if (!valide.success) {
      const consentementManquant = valide.error.issues.some((i) => i.path[0] === "consentement");
      return NextResponse.json(
        {
          error: consentementManquant
            ? "Cochez la case pour recevoir le rapport."
            : "Vérifiez votre adresse e-mail.",
        },
        { status: 400 }
      );
    }
    const { diagnosticId, email } = valide.data;

    if (!limiteParEmail(email, "diagnostic-rapport", DIAGNOSTIC_LIMITES.rapportParEmail, DIAGNOSTIC_LIMITES.fenetreMs)) {
      return NextResponse.json({ error: TROP }, { status: 429 });
    }

    const diagnostic = await prisma.diagnosticSecurite.findUnique({ where: { id: diagnosticId } });
    if (!diagnostic) {
      return NextResponse.json({ error: "Analyse introuvable. Relancez l'analyse de votre site." }, { status: 404 });
    }

    const consentAt = new Date();
    await prisma.diagnosticSecurite.update({
      where: { id: diagnosticId },
      data: { email, consentAt },
    });

    const resultats = trierResultats(lireResultats(diagnostic.resultats));
    const compteurs = compter(resultats);
    const base = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL).replace(/\/+$/, "");

    let emailEnvoye = true;
    try {
      await sendMail({
        to: email,
        replyTo: TRINEXTA_CONTACT.email,
        subject: `Diagnostic sécurité de ${diagnostic.domaine} : votre rapport`,
        html: rapportProspectHtml({
          domaine: diagnostic.domaine,
          date: diagnostic.createdAt,
          resultats,
          compteurs,
          urlContact: `${base}/contact`,
        }),
      });
      await prisma.diagnosticSecurite.update({
        where: { id: diagnosticId },
        data: { rapportEnvoyeAt: new Date() },
      });
    } catch (error) {
      console.error("[api/diagnostic/rapport] envoi au prospect", error);
      emailEnvoye = false;
    }

    // Notification interne, même destinataire que les demandes de contact :
    // envoyée même si le rapport n'est pas parti, l'équipe doit recontacter.
    try {
      await sendMail({
        to: process.env.CONTACT_TO_EMAIL || TRINEXTA_CONTACT.email,
        replyTo: email,
        subject: `Diagnostic sécurité · ${diagnostic.domaine} · ${compteurs["a-corriger"]} à corriger`,
        html: notificationEquipeHtml({
          domaine: diagnostic.domaine,
          email,
          diagnosticId,
          compteurs,
          resultats,
          rapportEnvoye: emailEnvoye,
        }),
      });
    } catch (error) {
      console.error("[api/diagnostic/rapport] notification équipe", error);
    }

    return NextResponse.json({ success: true, emailEnvoye });
  } catch (error) {
    console.error("[api/diagnostic/rapport]", error);
    return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
  }
}
