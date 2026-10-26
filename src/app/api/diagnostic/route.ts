import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { DIAGNOSTIC_LIMITES } from "@/data/diagnostic";
import { TRINEXTA_CONTACT } from "@/data/contact-trinexta";
import { estRobot, limiteParIp, lireCorpsJson } from "@/lib/security/anti-abus";
import { assertPublicUrl } from "@/lib/diagnostic/assert-public-url";
import { compter, trierResultats } from "@/lib/diagnostic/analyses";
import { diagnosticRequeteSchema, domaineMessagerie, MESSAGE_DOMAINE_INVALIDE } from "@/lib/diagnostic/domaine";
import { creerJeton } from "@/lib/diagnostic/jeton";
import { lancerDiagnostic } from "@/lib/diagnostic/verifications";

// Diagnostic sécurité gratuit : analyse non intrusive d'un domaine public.
// Protections : JSON strict, piège à robots, validation zod, adresse publique
// vérifiée (et revérifiée à chaque connexion), 3 analyses par IP et par 24 h,
// 10 analyses d'un même domaine (avec ou sans www.) par 24 h, comptées en base
// dès le début de l'analyse, erreurs génériques.

const TROP = `Vous avez atteint la limite de trois analyses par jour. Réessayez demain, ou appelez-nous au ${TRINEXTA_CONTACT.telephone}.`;
const TROP_DOMAINE = "Ce site a déjà été analysé plusieurs fois aujourd'hui. Réessayez demain.";
const INTROUVABLE = "Ce site est introuvable. Vérifiez l'adresse saisie.";

export async function POST(request: Request) {
  try {
    const body = await lireCorpsJson(request);
    if (body === null) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }
    // Robot : réponse vide de forme valide, sans analyse ni enregistrement.
    if (estRobot(body)) {
      return NextResponse.json({ diagnosticId: null, jeton: null, resultats: [], compteurs: null }, { status: 200 });
    }
    // Garde large sur les tentatives (saisies invalides comprises), avant tout accès réseau.
    if (!limiteParIp(request, "diagnostic-essai", 20)) {
      return NextResponse.json({ error: TROP }, { status: 429 });
    }

    const valide = diagnosticRequeteSchema.safeParse(body);
    if (!valide.success) {
      return NextResponse.json({ error: MESSAGE_DOMAINE_INVALIDE }, { status: 400 });
    }
    const { domaine } = valide.data;

    // Le domaine doit résoudre vers une adresse publique. Vérifié avant de
    // consommer le quota : une faute de frappe ne coûte pas une analyse.
    try {
      await assertPublicUrl(`https://${domaine}/`);
    } catch {
      return NextResponse.json({ error: INTROUVABLE }, { status: 422 });
    }

    // Limite par domaine : x.fr et www.x.fr comptent ensemble, analyses en
    // cours comprises (l'enregistrement est créé avant l'analyse).
    const base = domaineMessagerie(domaine);
    const depuis = new Date(Date.now() - DIAGNOSTIC_LIMITES.fenetreMs);
    const dejaAnalyse = await prisma.diagnosticSecurite.count({
      where: { domaine: { in: [base, `www.${base}`] }, createdAt: { gte: depuis } },
    });
    if (dejaAnalyse >= DIAGNOSTIC_LIMITES.parDomaine) {
      return NextResponse.json({ error: TROP_DOMAINE }, { status: 429 });
    }
    if (!limiteParIp(request, "diagnostic", DIAGNOSTIC_LIMITES.parIp, DIAGNOSTIC_LIMITES.fenetreMs)) {
      return NextResponse.json({ error: TROP }, { status: 429 });
    }

    const { jeton, hash } = creerJeton();
    const enregistre = await prisma.diagnosticSecurite.create({
      data: { domaine, statut: "en-cours", resultats: [], jetonHash: hash },
      select: { id: true },
    });

    let resultats;
    try {
      resultats = trierResultats(await lancerDiagnostic(domaine));
    } catch (error) {
      await prisma.diagnosticSecurite
        .update({ where: { id: enregistre.id }, data: { statut: "erreur" } })
        .catch(() => {});
      throw error;
    }
    const compteurs = compter(resultats);

    // L'analyse reste affichée même si l'enregistrement du résultat échoue ;
    // seul l'envoi du rapport devient indisponible.
    let diagnosticId: string | null = enregistre.id;
    try {
      await prisma.diagnosticSecurite.update({
        where: { id: enregistre.id },
        data: { statut: "termine", resultats: JSON.parse(JSON.stringify(resultats)) },
      });
    } catch (error) {
      console.error("[api/diagnostic] enregistrement", error);
      diagnosticId = null;
    }

    return NextResponse.json({ diagnosticId, jeton: diagnosticId ? jeton : null, domaine, resultats, compteurs });
  } catch (error) {
    console.error("[api/diagnostic]", error);
    return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
  }
}
