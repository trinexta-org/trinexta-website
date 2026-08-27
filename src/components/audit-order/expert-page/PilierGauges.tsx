import { getScoreBand, type ScoreBand } from "@/data/audit-seo";
import type { PilierScore } from "@/data/audit-seo/expert-demo-report";

const barByBand: Record<ScoreBand, string> = {
    haut: "bg-emerald-400",
    moyen: "bg-amber-400",
    bas: "bg-red-400",
};

const textByBand: Record<ScoreBand, string> = {
    haut: "text-emerald-400",
    moyen: "text-amber-400",
    bas: "text-red-400",
};

export function PilierGauges({ piliers }: { piliers: PilierScore[] }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-strong">
                Scores par pilier
            </p>
            <ul className="mt-5 space-y-4">
                {piliers.map((pilier) => {
                    const band = getScoreBand(pilier.score);
                    return (
                        <li key={pilier.id}>
                            <div className="flex items-baseline justify-between gap-3 text-sm">
                                <span className="text-white/70">{pilier.label}</span>
                                <span className={`font-bold tabular-nums ${textByBand[band]}`}>
                                    {pilier.score}
                                    <span className="text-white/40">/100</span>
                                </span>
                            </div>
                            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                <div
                                    className={`h-full rounded-full ${barByBand[band]}`}
                                    style={{ width: `${pilier.score}%` }}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}