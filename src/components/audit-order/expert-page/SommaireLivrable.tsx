const SOMMAIRE_ITEMS = [
    "Couverture : identification du client, de l'URL auditée et de la date de réalisation",
    "Synthèse exécutive : score global sur 100 et les 3 constats les plus critiques",
    "Scores par pilier : Performance, Contenu, Technique et Local, chacun noté sur 100",
    "Constats majeurs : le problème, pourquoi c'est grave, une analogie et comment on le voit",
    "Constats secondaires : la liste des points additionnels à corriger",
    "Recommandations : un plan d'action en 3 paliers, du plus rapide au plus stratégique",
];

export function SommaireLivrable() {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
                Ce que contient votre livrable
            </p>
            <ol className="mt-5 space-y-3">
                {SOMMAIRE_ITEMS.map((item, index) => (
                    <li key={item} className="flex gap-3 text-sm text-white/70">
                        <span className="font-black text-secondary">{index + 1}.</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}