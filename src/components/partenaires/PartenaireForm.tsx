"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChampPiege } from "@/components/shared/ChampPiege"
import { CHAMP_PIEGE } from "@/data/anti-abus"
import { PARTENAIRES_SOURCES } from "@/data/programme-partenaires"
import {
  partenaireFormSchema,
  type PartenaireFormData,
  type PartenaireFormInput,
} from "@/lib/validations/partenaire"
import { pushGtmEvent } from "@/lib/gtm"

const fieldClass =
  "h-13 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 aria-[invalid=true]:border-red-600"
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-primary"

function Erreur({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-red-600">
      {message}
    </p>
  )
}

type Champ = Exclude<keyof PartenaireFormInput, "source">

const CHAMPS: { name: Champ; label: string; type?: string; autoComplete?: string; placeholder?: string; inputMode?: "numeric" | "tel" | "email" }[] = [
  { name: "prenom", label: "Prénom", autoComplete: "given-name" },
  { name: "nom", label: "Nom", autoComplete: "family-name" },
  { name: "activite", label: "Votre activité", placeholder: "Graphiste, commercial multicarte…" },
  { name: "entreprise", label: "Nom de votre entreprise", autoComplete: "organization" },
  { name: "siret", label: "SIRET", inputMode: "numeric", placeholder: "14 chiffres" },
  { name: "ville", label: "Ville", autoComplete: "address-level2" },
  { name: "telephone", label: "Téléphone", type: "tel", autoComplete: "tel", inputMode: "tel" },
  { name: "email", label: "E-mail", type: "email", autoComplete: "email", inputMode: "email" },
]

/** Candidature TRINEXTA Partenaires : courte, envoyée à partenaire@trinexta.fr. */
export function PartenaireForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartenaireFormInput, unknown, PartenaireFormData>({
    resolver: zodResolver(partenaireFormSchema),
  })
  const [succes, setSucces] = useState<string | null>(null)
  const [erreurServeur, setErreurServeur] = useState<string | null>(null)

  const envoyer = async (data: PartenaireFormData, piege: string) => {
    setErreurServeur(null)
    try {
      const res = await fetch("/api/partenaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, [CHAMP_PIEGE]: piege }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErreurServeur(json.error ?? "L'envoi n'a pas abouti.")
        return
      }
      pushGtmEvent("form_submit", { form_id: "partenaires", source: data.source })
      setSucces(json.message)
    } catch {
      setErreurServeur("L'envoi n'a pas abouti.")
    }
  }

  // Le champ piège est lu dans le formulaire soumis, sans ref lue au rendu.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const piege = String(new FormData(e.currentTarget).get(CHAMP_PIEGE) ?? "")
    return handleSubmit((data) => envoyer(data, piege))(e)
  }

  if (succes) {
    return (
      <div role="status" className="flex flex-col gap-4 py-6">
        <p className="text-3xl font-bold text-primary md:text-4xl">Candidature reçue.</p>
        <p className="max-w-lg text-lg leading-relaxed text-primary">{succes}</p>
        <p className="max-w-lg text-muted-foreground">Un récapitulatif vient de partir sur votre boîte e-mail.</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-6">
      <ChampPiege ref={null} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {CHAMPS.map((c) => (
          <div key={c.name}>
            <label htmlFor={`partenaire-${c.name}`} className={labelClass}>
              {c.label}
            </label>
            <input
              id={`partenaire-${c.name}`}
              type={c.type ?? "text"}
              autoComplete={c.autoComplete}
              inputMode={c.inputMode}
              placeholder={c.placeholder}
              aria-invalid={errors[c.name] ? "true" : "false"}
              aria-describedby={errors[c.name] ? `err-partenaire-${c.name}` : undefined}
              className={fieldClass}
              {...register(c.name)}
            />
            <Erreur id={`err-partenaire-${c.name}`} message={errors[c.name]?.message} />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="partenaire-source" className={labelClass}>
          Comment nous avez-vous connus ?
          <span className="font-normal normal-case tracking-normal text-muted-foreground"> (facultatif)</span>
        </label>
        <select id="partenaire-source" className={fieldClass} defaultValue="" {...register("source")}>
          <option value="">Choisir</option>
          {PARTENAIRES_SOURCES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {erreurServeur && (
        <p role="alert" className="text-sm font-semibold text-red-600">
          {erreurServeur}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-8 font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {isSubmitting ? "Envoi en cours…" : "Je deviens partenaire"}
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          Vos coordonnées servent à étudier votre candidature et à vous recontacter au sujet du partenariat.{" "}
          <Link href="/confidentialite" className="underline hover:text-primary">
            Confidentialité
          </Link>
        </p>
      </div>
    </form>
  )
}
