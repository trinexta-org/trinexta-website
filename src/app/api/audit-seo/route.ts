import { NextResponse } from "next/server";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { generateSynthesis } from "@/lib/audit-seo/ai-synthesis";
import { analyzeTarget } from "@/lib/audit-seo/analyze";
import { AuditUrlError } from "@/lib/audit-seo/assert-public-url";
import { extractVisibleText } from "@/lib/audit-seo/checks/html";
import {
  buildAuditReportHtml,
  buildAuditTeamNotificationHtml,
  type AuditEmailData,
} from "@/lib/audit-seo/emails";
import { AuditFetchError, fetchTargetHtml } from "@/lib/audit-seo/fetch";
import type { TeaserResponse } from "@/lib/audit-seo/types";
import { sendMail } from "@/lib/mail";
import { checkRateLimit, getClientIp, hashIp } from "@/lib/estimation/rate-limit";
import { auditSeoRequestSchema } from "@/lib/validations/audit-seo";

const AUDIT_MAX_PER_IP = 8;
const AUDIT_MAX_PER_EMAIL = 4;
const AUDIT_MAX_PER_DOMAIN = 5;

const RATE_LIMITED = NextResponse.json(
  { error: "Trop de requêtes, réessayez plus tard." },
  { status: 429 }
);

export async function POST(request: Request) {
  try {
    const ipHash = hashIp(getClientIp(request));
    if (!checkRateLimit(`audit-seo:${ipHash}`, AUDIT_MAX_PER_IP)) return RATE_LIMITED;

    const body = await request.json().catch(() => null);
    const validated = auditSeoRequestSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { url, prenom, nom, email, entreprise, telephone } = validated.data;

    // Rate-limit additionnel : par email (anti-abus) et par domaine analysé
    // (anti-boucle sur une même Cible). L'email est haché, jamais stocké en clair.
    if (!checkRateLimit(`audit-seo-email:${hashIp(email.toLowerCase())}`, AUDIT_MAX_PER_EMAIL)) {
      return RATE_LIMITED;
    }
    const requestedDomain = new URL(url).hostname.toLowerCase();
    if (!checkRateLimit(`audit-seo-domain:${requestedDomain}`, AUDIT_MAX_PER_DOMAIN)) {
      return RATE_LIMITED;
    }

    // Récupération bridée de la Cible (anti-SSRF + brides). Une URL refusée ou
    // une page injoignable renvoie une erreur claire, sans crash.
    let target;
    try {
      target = await fetchTargetHtml(url);
    } catch (error) {
      if (error instanceof AuditUrlError || error instanceof AuditFetchError) {
        return NextResponse.json({ error: error.message }, { status: 422 });
      }
      throw error;
    }

    const { result, pagespeed } = await analyzeTarget(target);
    const domain = new URL(target.finalUrl).hostname;

    // Synthèse IA bornée. Dégradation propre : null si indisponible, l'audit
    // aboutit alors sans narratif. L'IA ne touche jamais aux chiffres ci-dessus.
    const synthesis = await generateSynthesis({
      scoreGlobal: result.scoreGlobal,
      result,
      pageText: extractVisibleText(target.html),
    });

    const audit = await prisma.seoAudit.create({
      data: {
        prenom,
        nom,
        email,
        entreprise,
        telephone: telephone ? telephone : null,
        consentAt: new Date(),
        url: target.finalUrl,
        domain,
        scoreGlobal: result.scoreGlobal,
        sousScores: result.axes as unknown as Prisma.InputJsonValue,
        findings: result.findings as unknown as Prisma.InputJsonValue,
        pagespeed: pagespeed
          ? (pagespeed as unknown as Prisma.InputJsonValue)
          : Prisma.DbNull,
        aiSummary: synthesis?.summary ?? null,
        status: "lead",
        ipHash,
      },
    });

    // Livrable : rapport au prospect + notification équipe. Le lead est déjà
    // persisté (status "lead") : même si l'envoi échoue, l'équipe est notifiée
    // et peut rappeler. Un échec d'email ne fait pas échouer l'audit.
    const emailData: AuditEmailData = {
      url: target.finalUrl,
      scoreGlobal: result.scoreGlobal,
      axes: result.axes,
      findings: result.findings,
      aiSummary: synthesis?.summary ?? null,
    };

    let reportSent = true;
    try {
      await sendMail({
        to: email,
        subject: "Votre audit SEO Trinexta",
        html: buildAuditReportHtml(emailData, prenom, process.env.NEXT_PUBLIC_BOOKINGS_URL),
      });
    } catch (mailError) {
      console.error("Erreur envoi rapport audit SEO:", mailError);
      reportSent = false;
    }

    try {
      const teamEmail = process.env.AZURE_FROM_EMAIL;
      if (teamEmail) {
        await sendMail({
          to: teamEmail,
          subject: `Nouveau lead audit SEO : ${domain} (${result.scoreGlobal}/100)`,
          html: buildAuditTeamNotificationHtml(
            emailData,
            { prenom, nom, email, telephone: telephone || null, entreprise },
            audit.id,
            reportSent
          ),
        });
      }
    } catch (notifError) {
      console.error("Erreur notification équipe audit SEO:", notifError);
    }

    const teaser: TeaserResponse = {
      id: audit.id,
      url: target.finalUrl,
      scoreGlobal: result.scoreGlobal,
      axes: result.axes,
      topFindings: result.findings.slice(0, 3),
      aiSummary: synthesis?.summary ?? null,
      reportSent,
    };

    return NextResponse.json(teaser, { status: 201 });
  } catch (error) {
    console.error("Erreur audit SEO:", error);
    return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
  }
}
