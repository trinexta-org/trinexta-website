import { CGV_CONSOMMATEURS } from "@/data/cgv-consommateurs"

/** Article 23 des CGV : vente en ligne au consommateur. L'encadré légal est présenté à part, comme l'impose l'article D211-2. */
export function ArticleConsommateurs() {
  return (
    <div className="space-y-6">
      {CGV_CONSOMMATEURS.rubriques.map((r) => (
        <div key={r.titre} className="space-y-3">
          <h3 className="text-base md:text-lg font-bold text-primary">{r.titre}</h3>
          {r.paragraphes.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {"lien" in r && r.lien && (
            <p>
              {r.lien.avant}{" "}
              <a href={r.lien.href} className="font-semibold text-secondary-strong">
                {r.lien.libelle}
              </a>
              .
            </p>
          )}
          {"encadre" in r && r.encadre && (
            <aside aria-label={r.encadre.titre} className="space-y-2 rounded-xl border-2 border-primary bg-white p-5 text-primary">
              <p className="font-bold">{r.encadre.titre}</p>
              {r.encadre.paragraphes.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className="text-xs text-primary/60">{r.encadre.source}</p>
            </aside>
          )}
        </div>
      ))}
    </div>
  )
}
