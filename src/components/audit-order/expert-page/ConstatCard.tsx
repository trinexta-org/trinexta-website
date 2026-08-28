import type { ConstatMajeur } from "@/data/audit-seo/expert-demo-report";

export function ConstatCard({ constat }: { constat: ConstatMajeur }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <p className="text-lg font-black text-white">{constat.titre}</p>

            <div className="mt-4 space-y-4">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-strong">
                        Le problème
                    </p>
                    <p className="mt-1 text-sm text-white/70">{constat.probleme}</p>
                </div>

                <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-strong">
                        Pourquoi c&apos;est grave
                    </p>
                    <p className="mt-1 text-sm text-white/70">{constat.pourquoiCestGrave}</p>
                </div>

                <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-strong">
                        Analogie
                    </p>
                    <p className="mt-1 text-sm italic text-white/70">{constat.analogie}</p>
                </div>

                <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-strong">
                        Comment on le voit
                    </p>
                    <p className="mt-1 text-sm text-white/70">{constat.commentOnLeVoit}</p>
                </div>
            </div>
        </div>
    );
}