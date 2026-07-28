import { ScoreGauge } from "@/components/audit-seo/ScoreGauge";
import { Heading, Text } from "@/components/ui/Typography";
import { getScoreBand } from "@/data/audit-seo";
import { expertReportDemoData } from "@/data/audit-seo/expert-demo-report";
import { ConstatCard } from "./ConstatCard";
import { PilierGauges } from "./PilierGauges";

const bandGaugeClass: Record<ReturnType<typeof getScoreBand>, string> = {
    haut: "text-emerald-400",
    moyen: "text-amber-400",
    bas: "text-red-400",
};

const palierLabels = {
    "quick-wins": "Quick wins",
    "moyen-terme": "Moyen terme",
    strategique: "Stratégique",
} as const;

export function ApercuLivrable() {
    const data = expertReportDemoData;
    const [premierConstat, ...autresConstats] = data.constatsMajeurs;
    const globalBand = getScoreBand(data.syntheseExecutive.scoreGlobal);

    return (
        <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                    Couverture
                </p>
                <Heading as="h3" className="mt-2 text-white">
                    {data.couverture.titreRapport}
                </Heading>
                <Text className="mt-1 text-white/60">
                    {data.couverture.client} — {data.couverture.url}
                </Text>
                <Text className="mt-1 text-white/40" variant="small">
                    {data.couverture.date} · Réalisé par {data.couverture.realisePar}
                </Text>
            </div>

            <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
                <div className="flex justify-center">
                    <ScoreGauge
                        score={data.syntheseExecutive.scoreGlobal}
                        colorClass={bandGaugeClass[globalBand]}
                        size={180}
                        label="Score global"
                    />
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                        Synthèse exécutive
                    </p>
                    <ul className="mt-4 space-y-2">
                        {data.syntheseExecutive.constatsCritiques.map((constat) => (
                            <li key={constat} className="text-sm text-white/70">
                                {constat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <PilierGauges piliers={data.scoresParPilier} />

            <div className="space-y-4">
                <ConstatCard constat={premierConstat} />
                {autresConstats.map((constat) => (
                    <div key={constat.titre} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                        <p className="font-black text-white">{constat.titre}</p>
                        <p className="mt-2 text-sm text-white/70">{constat.probleme}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                    Constats secondaires
                </p>
                <ul className="mt-4 space-y-2">
                    {data.constatsSecondaires.map((constat) => (
                        <li key={constat.texte} className="text-sm text-white/70">
                            {constat.texte}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {data.recommandations.map((reco) => (
                    <div key={reco.palier} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                            {palierLabels[reco.palier]}
                        </p>
                        <ul className="mt-3 space-y-2">
                            {reco.items.map((item) => (
                                <li key={item} className="text-sm text-white/70">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}