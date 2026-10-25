"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChampPiege } from "@/components/shared/ChampPiege";
import { CHAMP_PIEGE } from "@/data/anti-abus";
import Link from "next/link";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData, type ContactFormInput } from "@/lib/validations/contact";
import {
  BESOINS,
  BESOIN_VALUES,
  MOMENTS,
  POSTES,
  PROFILS,
  RDV_FORMATS,
  SUITES_CONTACT,
  TRINEXTA_CONTACT,
  TYPE_HERITE,
  postesPourNombre,
  type Besoin,
} from "@/data/contact-trinexta";
import { isOffreSlug, LIBELLES_OFFRES } from "@/data/offres";
import { dernierJourRdv, formaterDateRdv, formaterSiret, formaterTelephone, premierJourRdv } from "@/lib/contact/rdv";
import { pushGtmEvent, trackLeadConversion } from "@/lib/gtm";

const fieldClass =
  "h-13 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 aria-[invalid=true]:border-red-600";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-primary";
const facultatif = (
  <span className="font-normal normal-case tracking-normal text-muted-foreground"> (facultatif)</span>
);

function Erreur({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-red-600">
      {message}
    </p>
  );
}

/** Groupe de boutons-radio en pastilles. */
function Choix({
  legende,
  options,
  registration,
  erreur,
  name,
  colonnes = "grid-cols-1 sm:grid-cols-3",
}: {
  legende: ReactNode;
  options: readonly { value: string; label: string }[];
  registration: UseFormRegisterReturn;
  erreur?: string;
  name: string;
  colonnes?: string;
}) {
  return (
    <fieldset aria-describedby={erreur ? `err-${name}` : undefined}>
      <legend className={labelClass}>{legende}</legend>
      <div className={`grid gap-2 ${colonnes}`}>
        {options.map((o) => (
          <label key={o.value} className="group relative cursor-pointer">
            <input type="radio" value={o.value} {...registration} className="peer sr-only" />
            <span className="flex h-full min-h-12 items-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-primary transition-colors group-hover:border-secondary peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-secondary">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <Erreur id={`err-${name}`} message={erreur} />
    </fieldset>
  );
}

/**
 * Formulaire de contact TRINEXTA (même principe que Studio) : court, adapté à la situation
 * du visiteur. Par défaut, une demande de rappel. Liens entrants pris en charge :
 * `?besoin=`, `?type=` (anciens liens), `?offre=` (Sérénité), `?postes=` (calculateur).
 */
export default function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    // Un champ masqué (SIRET d'un indépendant, créneau d'un simple message) sort des valeurs envoyées.
    shouldUnregister: true,
    defaultValues: { suite: "rappel" },
  });

  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [bornes, setBornes] = useState<{ min: string; max: string } | null>(null);

  const profil = watch("profil");
  const suite = watch("suite");
  const rdvDate = watch("rdvDate");
  const offre = watch("offre");

  useEffect(() => {
    // Bornes calculées côté navigateur : la page reste statique.
    setBornes({ min: premierJourRdv(), max: dernierJourRdv() });
    const params = new URLSearchParams(window.location.search);
    const besoin = params.get("besoin") ?? TYPE_HERITE[params.get("type") ?? ""];
    if (besoin && (BESOIN_VALUES as readonly string[]).includes(besoin)) setValue("besoin", besoin as Besoin);
    const o = params.get("offre");
    if (isOffreSlug(o)) {
      setValue("offre", o);
      setValue("besoin", "infogerance");
    }
    // Calculateur Sérénité : nombre de postes transmis par `?postes=`
    const n = Number(params.get("postes"));
    if (Number.isInteger(n) && n > 0 && n < 10000) {
      setValue("postes", postesPourNombre(n));
      if (!getValues("message")) {
        const libelle = isOffreSlug(o) ? LIBELLES_OFFRES[o] : "Sérénité";
        setValue("message", `Bonjour, je souhaite un devis ${libelle} pour ${n} poste${n > 1 ? "s" : ""}.`);
      }
    }
  }, [setValue, getValues]);

  // Pré-remplit l'entreprise et la ville depuis le SIRET (API publique recherche-entreprises), sans écraser la saisie.
  const derniereRecherche = useRef<string | null>(null);
  const piegeRef = useRef<HTMLInputElement>(null);
  const rechercherSiret = async (saisie: string) => {
    const siret = saisie.replace(/\s/g, "");
    if (!/^\d{14}$/.test(siret) || siret === derniereRecherche.current) return;
    derniereRecherche.current = siret;
    try {
      const res = await fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${siret}&per_page=1`);
      if (!res.ok) return;
      const json = await res.json();
      const r = json.results?.[0];
      const etab = [r?.siege, ...(r?.matching_etablissements ?? [])].find((e) => e?.siret === siret);
      if (!r || !etab) return;
      if (!getValues("entreprise")) setValue("entreprise", r.nom_complet);
      if (!getValues("ville") && etab.libelle_commune) setValue("ville", etab.libelle_commune);
    } catch {
      // Saisie manuelle en repli.
    }
  };

  const telephone = register("telephone");
  const siret = register("siret");

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, [CHAMP_PIEGE]: piegeRef.current?.value ?? "" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(json.error ?? "L'envoi n'a pas abouti.");
        return;
      }
      pushGtmEvent("form_submit", { form_id: "contact_principal", besoin: data.besoin, suite: data.suite, offre: data.offre });
      await trackLeadConversion(
        { form_id: "contact_principal", besoin: data.besoin, suite: data.suite },
        { email: data.email, telephone: data.telephone }
      );
      setServerMessage(json.message);
    } catch {
      setServerError("L'envoi n'a pas abouti.");
    }
  };

  if (serverMessage) {
    return (
      <div role="status" className="flex flex-col gap-4 py-6">
        <p className="text-3xl font-bold text-primary md:text-4xl">Demande reçue.</p>
        <p className="max-w-lg text-lg leading-relaxed text-primary">{serverMessage}</p>
        <p className="max-w-lg text-muted-foreground">Un récapitulatif vient de partir sur votre boîte e-mail.</p>
        <Link
          href="/serenite"
          className="w-fit border-b border-primary pb-1 font-bold text-primary hover:border-secondary-strong hover:text-secondary-strong"
        >
          En attendant, voir nos formules <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  const libelleBouton =
    suite === "message" ? "Envoyer mon message" : suite === "rdv" ? "Demander mon rendez-vous" : "Être rappelé";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8 text-left">
        <ChampPiege ref={piegeRef} />
      {offre && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-secondary bg-secondary/10 px-4 py-3">
          <p className="text-base text-foreground">
            Votre demande concerne l&apos;offre <strong className="text-secondary-strong">{LIBELLES_OFFRES[offre]}</strong>
          </p>
          <button
            type="button"
            onClick={() => setValue("offre", undefined)}
            className="shrink-0 text-sm text-muted-foreground underline hover:text-foreground"
          >
            Retirer
          </button>
        </div>
      )}

      <Choix legende="Vous êtes" name="profil" options={PROFILS} registration={register("profil")} erreur={errors.profil?.message} />

      <Choix
        legende="Votre demande"
        name="besoin"
        options={BESOINS}
        registration={register("besoin")}
        erreur={errors.besoin?.message}
        colonnes="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      />

      <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="prenom" className={labelClass}>Prénom</label>
          <input id="prenom" autoComplete="given-name" {...register("prenom")} aria-invalid={!!errors.prenom} aria-describedby="err-prenom" className={fieldClass} />
          <Erreur id="err-prenom" message={errors.prenom?.message} />
        </div>
        <div>
          <label htmlFor="nom" className={labelClass}>Nom</label>
          <input id="nom" autoComplete="family-name" {...register("nom")} aria-invalid={!!errors.nom} aria-describedby="err-nom" className={fieldClass} />
          <Erreur id="err-nom" message={errors.nom?.message} />
        </div>
        <div>
          <label htmlFor="telephone" className={labelClass}>Téléphone</label>
          <input
            id="telephone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            {...telephone}
            onChange={(e) => {
              e.target.value = formaterTelephone(e.target.value);
              void telephone.onChange(e);
            }}
            aria-invalid={!!errors.telephone}
            aria-describedby="err-telephone"
            className={fieldClass}
          />
          <Erreur id="err-telephone" message={errors.telephone?.message} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>E-mail</label>
          <input id="email" type="email" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} aria-describedby="err-email" className={fieldClass} />
          <Erreur id="err-email" message={errors.email?.message} />
        </div>

        {profil === "entreprise" && (
          <>
            <div>
              <label htmlFor="entreprise" className={labelClass}>Entreprise</label>
              <input id="entreprise" autoComplete="organization" {...register("entreprise")} aria-invalid={!!errors.entreprise} aria-describedby="err-entreprise" className={fieldClass} />
              <Erreur id="err-entreprise" message={errors.entreprise?.message} />
            </div>
            <div>
              <label htmlFor="siret" className={labelClass}>SIRET{facultatif}</label>
              <input
                id="siret"
                inputMode="numeric"
                placeholder="123 456 789 00012"
                {...siret}
                onChange={(e) => {
                  e.target.value = formaterSiret(e.target.value);
                  void siret.onChange(e);
                  void rechercherSiret(e.target.value);
                }}
                aria-invalid={!!errors.siret}
                aria-describedby="err-siret"
                className={fieldClass}
              />
              <Erreur id="err-siret" message={errors.siret?.message} />
            </div>
            <input type="hidden" {...register("ville")} />
          </>
        )}

        {profil && profil !== "entreprise" && (
          <div className="sm:col-span-2">
            <label htmlFor="entreprise" className={labelClass}>
              {profil === "creation" ? "Nom du projet" : "Nom de l'activité"}
              {facultatif}
            </label>
            <input id="entreprise" autoComplete="organization" {...register("entreprise")} className={fieldClass} />
          </div>
        )}
      </div>

      <Choix
        legende={<>Nombre de postes{facultatif}</>}
        name="postes"
        options={POSTES}
        registration={register("postes")}
        colonnes="grid-cols-2 sm:grid-cols-4"
      />

      <div>
        <label htmlFor="message" className={labelClass}>
          Votre besoin en quelques mots{suite === "message" ? "" : <>{facultatif}</>}
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Ce qui vous gêne aujourd'hui, ce que vous voulez confier, votre échéance."
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby="err-message"
          className={`${fieldClass} h-auto resize-y`}
        />
        <Erreur id="err-message" message={errors.message?.message} />
      </div>

      <div className="flex flex-col gap-5 rounded-2xl bg-background p-5 md:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xl font-extrabold text-primary">Et ensuite ?</p>
          <p className="text-sm font-semibold text-secondary-strong">État des lieux offert</p>
        </div>
        <Choix
          legende="Je souhaite"
          name="suite"
          options={SUITES_CONTACT}
          registration={register("suite")}
          erreur={errors.suite?.message}
        />

        {suite === "rappel" && (
          <Choix
            legende={<>De préférence{facultatif}</>}
            name="moment"
            options={MOMENTS}
            registration={register("moment")}
            colonnes="grid-cols-2"
          />
        )}

        {suite === "rdv" && (
          <>
            <div className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="rdvDate" className={labelClass}>Date souhaitée</label>
                <input
                  id="rdvDate"
                  type="date"
                  min={bornes?.min}
                  max={bornes?.max}
                  {...register("rdvDate")}
                  aria-invalid={!!errors.rdvDate}
                  aria-describedby="err-rdvDate rdvDate-aide"
                  className={fieldClass}
                />
                <p id="rdvDate-aide" className="mt-2 text-sm text-muted-foreground">
                  {rdvDate && !errors.rdvDate
                    ? `${formaterDateRdv(rdvDate)}, sous réserve de confirmation.`
                    : "Du lundi au vendredi, sous réserve de confirmation."}
                </p>
                <Erreur id="err-rdvDate" message={errors.rdvDate?.message} />
              </div>
              <Choix
                legende="Moment"
                name="moment"
                options={MOMENTS}
                registration={register("moment")}
                erreur={errors.moment?.message}
                colonnes="grid-cols-2"
              />
            </div>
            <Choix
              legende="Format"
              name="rdvFormat"
              options={RDV_FORMATS}
              registration={register("rdvFormat")}
              erreur={errors.rdvFormat?.message}
            />
          </>
        )}

        {suite === "rappel" && (
          <p className="text-sm text-muted-foreground">
            Nous vous rappelons {TRINEXTA_CONTACT.horaires}. Urgent ? Appelez le{" "}
            <a href={TRINEXTA_CONTACT.telephoneHref} className="font-bold text-primary underline">
              {TRINEXTA_CONTACT.telephone}
            </a>
            .
          </p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="border-l-2 border-red-600 pl-4 text-red-600">
          {serverError} Appelez le{" "}
          <a href={TRINEXTA_CONTACT.telephoneHref} className="font-bold underline">
            {TRINEXTA_CONTACT.telephone}
          </a>{" "}
          ou écrivez à{" "}
          <a href={`mailto:${TRINEXTA_CONTACT.email}`} className="font-bold underline">
            {TRINEXTA_CONTACT.email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 items-center justify-center rounded-xl bg-primary px-8 font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {isSubmitting ? "Envoi en cours…" : libelleBouton}
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
          Vos coordonnées servent uniquement à répondre à votre demande.{" "}
          <Link href="/confidentialite" className="underline hover:text-primary">
            Confidentialité
          </Link>
        </p>
      </div>
    </form>
  );
}
