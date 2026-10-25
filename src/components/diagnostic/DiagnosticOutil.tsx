"use client"

import { useRef, useState, type FormEvent, type ReactNode } from "react"
import Link from "next/link"
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { SectionBackground } from "@/components/ui/SectionBackground"
import { ChampPiege } from "@/components/shared/ChampPiege"
import { Engrenage } from "@/components/diagnostic/Engrenage"
import { CHAMP_PIEGE } from "@/data/anti-abus"
import {
  DIAGNOSTIC_TEXTES as T,
  LIBELLES_STATUT,
  STATUTS,
  VERIFICATIONS,
  type StatutDiagnostic,
} from "@/data/diagnostic"
import { trackLeadConversion } from "@/lib/gtm"
import { cn } from "@/lib/utils"

interface Resultat {
  id: string
  titre: string
  statut: StatutDiagnostic
  constat: string
  risque: string
  action: string
}

interface Reponse {
  diagnosticId: string | null
  domaine: string
  resultats: Resultat[]
  compteurs: Record<StatutDiagnostic, number>
}

// Statuts distingués par la forme (pastilles et compteurs) : plein, contour,
// pointillé, clair. Jamais par une couleur d'alerte.
const FORME_STATUT: Record<StatutDiagnostic, string> = {
  "a-corriger": "bg-primary text-primary-foreground border-primary",
  "a-surveiller": "bg-background text-primary border-primary",
  indetermine: "bg-background text-primary border-primary border-dashed",
  conforme: "bg-surface text-secondary-strong border-surface",
}

const CHAMP =
  "min-h-14 w-full min-w-0 flex-[1_1_260px] rounded-xl border-2 bg-background px-4 text-base font-medium text-primary placeholder:text-muted-foreground focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary"
const BOUTON =
  "inline-flex min-h-14 items-center justify-center rounded-xl border-2 px-6 text-base font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-secondary disabled:opacity-70"

function titreResultat(c: Record<StatutDiagnostic, number>): string {
  const corriger = c["a-corriger"]
  const surveiller = c["a-surveiller"]
  if (corriger > 0) {
    const base = `${corriger} ${corriger > 1 ? "points" : "point"} à corriger`
    return surveiller > 0 ? `${base}, ${surveiller} à surveiller` : base
  }
  if (surveiller > 0) return `Rien à corriger, ${surveiller} ${surveiller > 1 ? "points" : "point"} à surveiller`
  if (c.conforme === 0) return "Analyse incomplète"
  return "Aucun point à corriger"
}

export function DiagnosticOutil({ entete }: { entete: ReactNode }) {
  const [saisie, setSaisie] = useState("")
  const [etat, setEtat] = useState<"saisie" | "analyse" | "resultat">("saisie")
  const [domaineEnCours, setDomaineEnCours] = useState("")
  const [erreur, setErreur] = useState<string | null>(null)
  const [reponse, setReponse] = useState<Reponse | null>(null)
  const piegeAnalyse = useRef<HTMLInputElement>(null)
  const titreResultats = useRef<HTMLHeadingElement>(null)
  const champ = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState("")
  const [consentement, setConsentement] = useState(false)
  const [envoi, setEnvoi] = useState<"repos" | "envoi" | "envoye" | "non-envoye">("repos")
  const [erreurRapport, setErreurRapport] = useState<string | null>(null)
  const piegeRapport = useRef<HTMLInputElement>(null)

  const lancer = async (e: FormEvent) => {
    e.preventDefault()
    const domaine = saisie.trim()
    if (!domaine) {
      setErreur("Saisissez l'adresse de votre site, par exemple votre-site.fr.")
      return
    }
    setErreur(null)
    setReponse(null)
    setEnvoi("repos")
    setErreurRapport(null)
    setDomaineEnCours(domaine.replace(/^https?:\/\//i, "").replace(/\/.*$/, ""))
    setEtat("analyse")
    try {
      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domaine, [CHAMP_PIEGE]: piegeAnalyse.current?.value ?? "" }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json || !Array.isArray(json.resultats)) {
        throw new Error(json?.error ?? "L'analyse n'a pas pu aboutir. Réessayez dans quelques instants.")
      }
      setReponse(json as Reponse)
      setEtat("resultat")
      requestAnimationFrame(() => titreResultats.current?.focus())
    } catch (err) {
      setErreur(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "L'analyse n'a pas pu aboutir. Réessayez dans quelques instants."
      )
      setEtat("saisie")
      requestAnimationFrame(() => champ.current?.focus())
    }
  }

  const recommencer = () => {
    setEtat("saisie")
    setReponse(null)
    setSaisie("")
    setEnvoi("repos")
    requestAnimationFrame(() => champ.current?.focus())
  }

  const envoyerRapport = async (e: FormEvent) => {
    e.preventDefault()
    setErreurRapport(null)
    if (!reponse?.diagnosticId) return
    setEnvoi("envoi")
    try {
      const res = await fetch("/api/diagnostic/rapport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          diagnosticId: reponse.diagnosticId,
          email: email.trim(),
          recontact: consentement,
          [CHAMP_PIEGE]: piegeRapport.current?.value ?? "",
        }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok) throw new Error(json?.error ?? "L'envoi a échoué. Réessayez.")
      await trackLeadConversion({ form_id: "diagnostic_securite" }, { email: email.trim() })
      setEnvoi(json?.emailEnvoye === false ? "non-envoye" : "envoye")
    } catch (err) {
      setErreurRapport(
        err instanceof Error && err.message !== "Failed to fetch" ? err.message : "L'envoi a échoué. Réessayez."
      )
      setEnvoi("repos")
    }
  }

  const compteurs = reponse?.compteurs
  const domaineAffiche = reponse?.domaine ?? domaineEnCours

  return (
    <>
      <Section container={false} className="relative overflow-hidden bg-primary py-16 md:py-20 lg:py-24">
        <SectionBackground tone="dark" intensity="low" />
        <Container className="relative z-10 flex flex-col gap-6">
          {entete}
          <form onSubmit={lancer} noValidate className="mt-2 flex max-w-3xl flex-wrap gap-3">
            <ChampPiege ref={piegeAnalyse} />
            <label htmlFor="diagnostic-adresse" className="sr-only">
              {T.champ}
            </label>
            <input
              ref={champ}
              id="diagnostic-adresse"
              name="domaine"
              type="text"
              inputMode="url"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck={false}
              placeholder={T.placeholder}
              value={saisie}
              onChange={(e) => setSaisie(e.target.value)}
              aria-invalid={erreur ? true : undefined}
              aria-describedby={erreur ? "diagnostic-erreur" : "diagnostic-mention"}
              className={cn(CHAMP, "border-background")}
            />
            <button
              type="submit"
              disabled={etat === "analyse"}
              className={cn(BOUTON, "border-background bg-background text-primary hover:bg-surface")}
            >
              {etat === "analyse" ? T.enCours : T.bouton}
            </button>
          </form>
          {erreur && (
            <p id="diagnostic-erreur" role="alert" className="max-w-3xl text-base font-semibold text-white">
              {erreur}
            </p>
          )}
          <p id="diagnostic-mention" className="text-sm text-white/70">
            {T.mention}
          </p>
        </Container>
      </Section>

      <div aria-live="polite">
        {etat === "analyse" && (
          <Section className="py-12 md:py-16 lg:py-16">
            <div className="flex flex-wrap items-center gap-10">
              <Engrenage tourne />
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
                <p className="text-xl font-semibold text-primary">
                  Analyse de {domaineAffiche} en cours
                </p>
                <ul className="flex flex-col gap-2 text-base text-muted-foreground">
                  {VERIFICATIONS.map((v) => (
                    <li key={v.id} className="flex items-center gap-3">
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {v.titre}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        )}
      </div>

      {etat === "resultat" && reponse && compteurs && (
        <>
          <Section className="py-12 pb-6 md:py-14 md:pb-6 lg:py-14 lg:pb-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold uppercase tracking-widest text-secondary-strong">
                    Résultat pour {reponse.domaine}
                  </p>
                  <h2
                    ref={titreResultats}
                    tabIndex={-1}
                    className="text-3xl font-bold text-primary outline-none md:text-4xl"
                  >
                    {titreResultat(compteurs)}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={recommencer}
                  className={cn(BOUTON, "border-primary bg-background text-primary hover:bg-surface")}
                >
                  {T.recommencer}
                </button>
              </div>

              <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {STATUTS.filter((s) => compteurs[s] > 0).map((s) => (
                  <li key={s} className={cn("flex flex-col gap-1 rounded-2xl border-2 p-6", FORME_STATUT[s])}>
                    <span className="text-5xl font-bold leading-none">{compteurs[s]}</span>
                    <span className="text-base">{LIBELLES_STATUT[s]}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4">
                {reponse.resultats.map((r) => (
                  <article
                    key={r.id}
                    className="flex flex-col gap-4 rounded-2xl border border-surface-strong bg-background p-6 md:px-7"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h3 className="text-xl font-bold text-primary">{r.titre}</h3>
                      <span className={cn("rounded-full border-2 px-3 py-1 text-sm font-semibold", FORME_STATUT[r.statut])}>
                        {LIBELLES_STATUT[r.statut]}
                      </span>
                    </div>
                    <p className="max-w-3xl text-base leading-relaxed text-primary">{r.constat}</p>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="rounded-xl bg-surface px-5 py-4">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-secondary-strong">
                          {T.ceQueCaVeutDire}
                        </p>
                        <p className="text-[15px] leading-relaxed text-primary">{r.risque}</p>
                      </div>
                      <div className="rounded-xl bg-surface px-5 py-4">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-secondary-strong">
                          {T.ceQuIlFautFaire}
                        </p>
                        <p className="text-[15px] leading-relaxed text-primary">{r.action}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Section>

          <Section className="pt-6 pb-16 md:pt-6 md:pb-20 lg:pt-6 lg:pb-24">
            <div className="flex flex-wrap items-center gap-10 rounded-3xl bg-primary p-8 text-primary-foreground md:p-10">
              <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
                <h2 className="text-3xl font-bold leading-tight text-white">{T.rapportTitre}</h2>
                <p className="text-base leading-relaxed text-white/80">{T.rapportTexte}</p>
              </div>

              {envoi === "envoye" || envoi === "non-envoye" ? (
                <p role="status" className="flex-[1_1_380px] text-base font-semibold text-secondary-soft">
                  {envoi === "envoye" ? T.rapportEnvoye : T.rapportNonEnvoye}
                </p>
              ) : (
                <form onSubmit={envoyerRapport} className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
                  <ChampPiege ref={piegeRapport} />
                  {reponse.diagnosticId ? (
                    <>
                      <label htmlFor="diagnostic-email" className="text-sm font-semibold">
                        {T.rapportEmail}
                      </label>
                      <input
                        id="diagnostic-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="prenom.nom@entreprise.fr"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={cn(CHAMP, "flex-none border-background")}
                      />
                      <label className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
                        <input
                          type="checkbox"
                          checked={consentement}
                          onChange={(e) => setConsentement(e.target.checked)}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-secondary"
                        />
                        <span>
                          {T.rapportConsentement}{" "}
                          <a
                            href="/confidentialite"
                            target="_blank"
                            rel="noopener"
                            className="text-secondary-soft underline hover:text-white"
                          >
                            Données personnelles
                          </a>
                        </span>
                      </label>
                    </>
                  ) : (
                    <p className="text-sm text-white/80">
                      L&apos;envoi par e-mail est indisponible pour cette analyse. Demandez à être rappelé : un
                      technicien reprend le résultat avec vous.
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {reponse.diagnosticId && (
                      <button
                        type="submit"
                        disabled={envoi === "envoi"}
                        className={cn(BOUTON, "border-background bg-background text-primary hover:bg-surface")}
                      >
                        {envoi === "envoi" ? "Envoi en cours" : T.rapportBouton}
                      </button>
                    )}
                    <Link
                      href="/contact#formulaire"
                      className={cn(BOUTON, "border-background bg-transparent text-white hover:bg-white/10")}
                    >
                      {T.rappelBouton}
                    </Link>
                  </div>
                  {erreurRapport && (
                    <p role="alert" className="text-sm font-semibold text-white">
                      {erreurRapport}
                    </p>
                  )}
                  <p className="text-xs text-white/70">{T.conservation}</p>
                </form>
              )}
            </div>
          </Section>
        </>
      )}
    </>
  )
}
