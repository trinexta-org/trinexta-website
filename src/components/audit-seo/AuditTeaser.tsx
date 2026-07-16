import { Sparkles } from "lucide-react";
import {
  AUDIT_BLIND_SPOTS,
  buildAuditContactUrl,
  DEEP_AUDIT_OFFER_LABEL,
  getScoreBand,
  SCORE_BAND_NARRATIVE,
  type ScoreBand,
} from "@/data/audit-seo";
import type { Finding, TeaserResponse } from "@/lib/audit-seo/types";
import { ScoreGauge } from "./ScoreGauge";
import { AxisBreakdown } from "./AxisBreakdown";

const severityLabel: Record<Finding["severity"], string> = {
  critique: "Critique",
  majeur: "Majeur",
  mineur: "Mineur",
};

const severityClass: Record<Finding["severity"], string> = {
  critique: "bg-red-500/15 text-red-300 border-red-500/30",
  majeur: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  mineur: "bg-white/10 text-white/70 border-white/20",
};

// Accent latéral par gravité — donne du relief aux lignes sans les enfermer
// dans une nième carte identique.
const severityAccent: Record<Finding["severity"], string> = {
  critique: "border-red-500/70",
  majeur: "border-amber-500/70",
  mineur: "border-white/25",
};

const scoreToneByBand: Record<ScoreBand, string> = {
  haut: "text-emerald-400",
  moyen: "text-amber-400",
  bas: "text-red-400",
};

const bandLabel: Record<ScoreBand, string> = {
  haut: "Bonne base",
  moyen: "Des points à corriger",
  bas: "Chantier prioritaire",
};

export function AuditTeaser({ teaser }: { teaser: TeaserResponse }) {
  const band = getScoreBand(teaser.scoreGlobal);
  const narrative = SCORE_BAND_NARRATIVE[band];
  const contactUrl = buildAuditContactUrl("", teaser.url, teaser.scoreGlobal);

  return (
    <div className="space-y-6">
      {teaser.reportSent ? (
        <div className="rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-center text-sm text-white/80">
          Le rapport complet vient d&apos;être envoyé par email.
        </div>
      ) : (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-white/80">
          L&apos;envoi de votre rapport par email a échoué, notre équipe a été notifiée et vous
          recontactera.
        </div>
      )}

      {/* Bloc focal : la jauge est le moment fort du rapport */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-8 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/3 rounded-full bg-secondary/15 blur-[90px]"
        />
        <div className="relative">
          <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
            Score SEO de votre page
          </p>
          <div className="mt-5 flex justify-center">
            <ScoreGauge score={teaser.scoreGlobal} colorClass={scoreToneByBand[band]} />
          </div>
          <p className={`mt-4 text-sm font-bold ${scoreToneByBand[band]}`}>{bandLabel[band]}</p>
          <p className="mt-1 truncate text-xs text-white/50">{teaser.url}</p>
        </div>
      </div>

      {teaser.axes.length > 0 && <AxisBreakdown axes={teaser.axes} />}

      {teaser.aiSummary && (
        <div className="rounded-2xl border border-secondary/30 bg-secondary/[0.07] p-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-secondary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Analyse IA
          </p>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/85">
            {teaser.aiSummary}
          </p>
        </div>
      )}

      <div>
        <h2 className="text-lg font-black text-white">Ce qu&apos;on a repéré</h2>
        {teaser.topFindings.length > 0 ? (
          <ul className="mt-4 space-y-2.5">
            {teaser.topFindings.map((finding) => (
              <li
                key={finding.id}
                className={`rounded-r-lg border-l-2 bg-white/[0.03] py-3 pl-4 pr-4 ${severityAccent[finding.severity]}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${severityClass[finding.severity]}`}
                  >
                    {severityLabel[finding.severity]}
                  </span>
                  <p className="font-bold text-white">{finding.symptom}</p>
                </div>
                <p className="mt-1 text-sm text-white/60">{finding.impact}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
            Le détail des constats arrive dans le rapport complet.
          </p>
        )}
      </div>

      {/* Limites : mises en avant — c'est l'angle qui justifie l'audit approfondi */}
      <div className="rounded-2xl border border-secondary/30 bg-secondary/[0.07] p-6 sm:p-8">
        <h2 className="text-lg font-black text-white">Ce que cet audit ne mesure pas</h2>
        <p className="mt-2 text-sm text-white/70">
          Cette page, analysée automatiquement. Quatre angles décisifs pour votre visibilité
          restent hors de portée d&apos;un audit gratuit.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {AUDIT_BLIND_SPOTS.map((spot) => (
            <li key={spot.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="font-bold text-white">{spot.title}</p>
              <p className="mt-1 text-sm text-white/60">{spot.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-6 sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
          Et maintenant ?
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/80">{narrative.conclusion}</p>
        <p className="mt-4 text-sm text-white/60">{DEEP_AUDIT_OFFER_LABEL}.</p>
        <p className="mt-4 font-bold text-white">{narrative.ctaHook}</p>
        <a
          href={contactUrl}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-secondary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-secondary/90"
        >
          Discuter de ma visibilité
        </a>
      </div>
    </div>
  );
}
