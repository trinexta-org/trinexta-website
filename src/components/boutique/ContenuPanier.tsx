"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useSyncExternalStore, useTransition } from "react"
import { Minus, Package, Plus, Trash2 } from "lucide-react"
import { usePanier } from "./usePanier"
import { chargerPanier } from "@/app/boutique/panier/actions"
import { BOUTIQUE_COMMANDE_URL, DISPONIBILITE_LIBELLE, PANIER_TEXTES } from "@/data/boutique"
import { euros } from "@/lib/boutique/format"
import {
  changerQuantite,
  cleLigne,
  nombreArticles,
  QUANTITE_MAX,
  retirer,
  totaux,
  urlCommande,
  type LigneDetaillee,
} from "@/lib/boutique/panier"

/** Contenu de la page panier : lignes du navigateur, complétées par le serveur avec les prix de l'API. */
export function ContenuPanier() {
  const { lignes, modifier } = usePanier()
  const [details, setDetails] = useState<Map<string, LigneDetaillee>>(new Map())
  const [chargement, demarrer] = useTransition()
  const [erreur, setErreur] = useState(false)
  // Vrai côté navigateur seulement : le panier n'existe pas au rendu serveur.
  const pret = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  // Les détails ne dépendent que des produits, pas des quantités : on ne recharge que si la liste change.
  const signature = lignes.map(cleLigne).sort().join("|")
  useEffect(() => {
    if (!signature) return
    demarrer(async () => {
      try {
        const res = await chargerPanier(lignes)
        setDetails(new Map(res.map((d) => [d.cle, d])))
        setErreur(false)
      } catch {
        setErreur(true)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- rechargement voulu sur la seule liste des produits
  }, [signature])

  if (!pret) return <p className="text-muted-foreground">Chargement du panier…</p>

  if (lignes.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-white p-8">
        <p className="text-lg font-bold text-primary">{PANIER_TEXTES.vide}</p>
        <Link href="/boutique" className="rounded-xl bg-secondary-strong px-6 py-3 font-bold text-white hover:bg-secondary-strong/90">
          {PANIER_TEXTES.continuer}
        </Link>
      </div>
    )
  }

  const vues = lignes.map((l) => {
    const d = details.get(cleLigne(l))
    return d ? { ...d, ligne: l } : null
  })
  const connues = vues.filter((v): v is LigneDetaillee => v !== null)
  const t = totaux(connues)
  const bloquantes = connues.some((v) => v.statut === "introuvable")
  const sansPrix = erreur || connues.some((v) => v.statut === "indisponible")
  const commandables = lignes.filter((l) => details.get(cleLigne(l))?.statut !== "introuvable")

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <ul className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-white">
        {lignes.map((l, i) => {
          const v = vues[i]
          return (
            <li key={cleLigne(l)} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-accent">
                  {v?.image ? (
                    <Image src={v.image} alt="" width={160} height={160} sizes="80px" className="h-full w-full bg-white object-contain p-1" />
                  ) : (
                    <Package aria-hidden="true" className="h-8 w-8 text-secondary-strong" strokeWidth={1.5} />
                  )}
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <Link href={v?.href ?? "/boutique"} className="font-bold text-primary hover:underline">
                    {v?.nom ?? (chargement ? "Chargement…" : l.slug)}
                  </Link>
                  {v?.variante && <span className="text-sm text-muted-foreground">{v.variante}</span>}
                  {v?.disponibilite && <span className="text-sm text-muted-foreground">{DISPONIBILITE_LIBELLE[v.disponibilite]}</span>}
                  {v?.statut === "introuvable" && <span className="text-sm font-semibold text-primary">{PANIER_TEXTES.indisponible}</span>}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex items-center rounded-xl border border-border">
                  <button
                    type="button"
                    onClick={() => modifier((x) => changerQuantite(x, l, l.quantite - 1))}
                    aria-label={`Retirer une unité de ${v?.nom ?? "ce produit"}`}
                    className="p-2.5 text-primary hover:bg-accent"
                  >
                    <Minus aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <span className="min-w-8 text-center font-bold text-primary" aria-label="Quantité">
                    {l.quantite}
                  </span>
                  <button
                    type="button"
                    onClick={() => modifier((x) => changerQuantite(x, l, l.quantite + 1))}
                    disabled={l.quantite >= QUANTITE_MAX}
                    aria-label={`Ajouter une unité de ${v?.nom ?? "ce produit"}`}
                    className="p-2.5 text-primary hover:bg-accent disabled:opacity-40"
                  >
                    <Plus aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
                <div className="w-32 text-right">
                  {v?.prix && v.statut === "ok" ? (
                    <>
                      <p className="font-black text-primary">{euros(v.prix.ttc * l.quantite)} TTC</p>
                      <p className="text-xs text-muted-foreground">{euros(v.prix.ht * l.quantite)} HT</p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Prix à la commande</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => modifier((x) => retirer(x, l))}
                  aria-label={`Supprimer ${v?.nom ?? "ce produit"} du panier`}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-primary"
                >
                  <Trash2 aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <aside className="flex flex-col gap-4 self-start rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-48">
        <h2 className="text-xl font-black text-primary">Récapitulatif</h2>
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Articles</dt>
            <dd className="font-semibold text-primary">{nombreArticles(lignes)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Produits HT</dt>
            <dd className="font-semibold text-primary">{euros(t.ht)}</dd>
          </div>
          {t.ecoTtc > 0 && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Éco-participation TTC</dt>
              <dd className="font-semibold text-primary">{euros(t.ecoTtc)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4 border-t border-border pt-3">
            <dt className="font-bold text-primary">Total indicatif TTC</dt>
            <dd className="text-2xl font-black text-primary">{euros(t.totalTtc)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Soit HT</dt>
            <dd className="font-semibold text-primary">{euros(t.totalHt)}</dd>
          </div>
        </dl>
        <p className="text-xs leading-relaxed text-muted-foreground">{sansPrix ? PANIER_TEXTES.horsLigne : PANIER_TEXTES.indicatif}</p>
        {bloquantes ? (
          <p className="rounded-xl bg-accent p-3 text-sm font-semibold text-primary">{PANIER_TEXTES.indisponible}</p>
        ) : (
          <a
            href={urlCommande(BOUTIQUE_COMMANDE_URL, commandables)}
            aria-disabled={chargement}
            className="inline-flex h-14 items-center justify-center rounded-xl bg-secondary-strong px-6 text-lg font-black text-white shadow-md transition-all hover:bg-secondary-strong/90 active:scale-95"
          >
            {PANIER_TEXTES.commander}
          </a>
        )}
        <Link href="/boutique" className="text-center text-sm font-bold text-secondary-strong underline underline-offset-4">
          {PANIER_TEXTES.continuer}
        </Link>
      </aside>
    </div>
  )
}
