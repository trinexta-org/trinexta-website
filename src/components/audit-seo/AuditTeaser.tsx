import type { Finding, TeaserResponse } from "@/lib/audit-seo/types";

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

function scoreTone(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-red-400";
}

export function AuditTeaser({ teaser }: { teaser: TeaserResponse }) {
  return (
    <div className="space-y-8">
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

      <div className="rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
          Score SEO de votre page
        </p>
        <p className={`mt-3 text-6xl font-black ${scoreTone(teaser.scoreGlobal)}`}>
          {teaser.scoreGlobal}
          <span className="text-2xl text-white/40">/100</span>
        </p>
        <p className="mt-2 truncate text-sm text-white/50">{teaser.url}</p>
      </div>

      {teaser.aiSummary && (
        <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
            Notre lecture
          </p>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-white/80">
            {teaser.aiSummary}
          </p>
        </div>
      )}

      <div>
        <h2 className="text-lg font-black text-white">Ce qu&apos;on a repéré</h2>
        {teaser.topFindings.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {teaser.topFindings.map((finding) => (
              <li
                key={finding.id}
                className="rounded-xl border border-white/10 bg-black/20 p-4"
              >
                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${severityClass[finding.severity]}`}
                >
                  {severityLabel[finding.severity]}
                </span>
                <p className="mt-2 font-bold text-white">{finding.symptom}</p>
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
    </div>
  );
}
