"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactFormSchema, ContactFormData, CONTACT_TYPES, SECTEURS, TAILLES, URGENCES } from "@/lib/validations/contact";
import { pushGtmEvent } from "@/lib/gtm";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const auditUrl = params.get("audit_url");
    if (type && (CONTACT_TYPES as readonly string[]).includes(type)) {
      setValue("type", type as ContactFormData["type"]);
    }
    if (auditUrl) {
      const auditScore = params.get("audit_score");
      const score = auditScore ? ` (score ${auditScore}/100)` : "";
      setValue(
        "message",
        `Bonjour, j'ai réalisé l'audit SEO gratuit de la page ${auditUrl}${score}. Je souhaite en discuter, notamment l'audit approfondi et les pistes pour améliorer ma visibilité.`
      );
    }
  }, [setValue]);

  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const type = watch("type");

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    if (res.ok) {
      pushGtmEvent('form_submit', {
        form_id: 'contact_principal'
      });

      setServerMessage(json.message);
    } else {
      setServerError(json.error ?? "Une erreur est survenue.");
    }
  };

  if (serverMessage) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6 text-secondary-strong" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-foreground font-semibold text-xl">{serverMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">

      {/* Prénom / Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="prenom" className="text-sm font-bold uppercase tracking-widest text-foreground block">
            Prénom
          </label>
          <Input
            id="prenom"
            {...register("prenom")}
            placeholder="Jean"
            className="bg-background border-border text-foreground text-base placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary h-14 rounded-lg"
          />
          {errors.prenom && <p className="text-red-600 text-sm">{errors.prenom.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="nom" className="text-sm font-bold uppercase tracking-widest text-foreground block">
            Nom
          </label>
          <Input
            id="nom"
            {...register("nom")}
            placeholder="Dupont"
            className="bg-background border-border text-foreground text-base placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary h-14 rounded-lg"
          />
          {errors.nom && <p className="text-red-600 text-sm">{errors.nom.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-foreground block">
          Email professionnel
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="j.dupont@entreprise.fr"
          className="bg-background border-border text-foreground text-base placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary h-14 w-full rounded-lg"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="telephone" className="text-sm font-bold uppercase tracking-widest text-foreground block">
            Téléphone
          </label>
          <Input
            id="telephone"
            type="tel"
            {...register("telephone")}
            placeholder="06 00 00 00 00"
            className="bg-background border-border text-foreground text-base placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary h-14 w-full rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-bold uppercase tracking-widest text-foreground block">
            Motif de contact
          </label>
          <div className="relative">
            <select
              id="type"
              {...register("type")}
              className="w-full h-14 px-4 pr-10 rounded-lg bg-background border border-border text-foreground text-base appearance-none cursor-pointer focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            >
              <option value="" disabled className="bg-background text-muted-foreground">Sélectionnez...</option>
              {CONTACT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-background text-foreground">
                  {{ devis: "Demande de devis", support: "Support technique", autre: "Autre" }[t]}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
          {errors.type && <p className="text-red-600 text-sm">{errors.type.message}</p>}
        </div>
      </div>

      {/* Champs conditionnels — devis */}
      {type === "devis" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="entreprise" className="text-sm font-bold uppercase tracking-widest text-foreground block">Entreprise</label>
              <Input id="entreprise" {...register("entreprise")} placeholder="Nom de votre société" className="bg-background border-border text-foreground text-base placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary h-14 w-full rounded-lg" />
              {errors.entreprise && <p className="text-red-600 text-sm">{errors.entreprise.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="siret" className="text-sm font-bold uppercase tracking-widest text-foreground block">Numéro SIRET</label>
              <Input id="siret" {...register("siret")} placeholder="12345678901234" className="bg-background border-border text-foreground text-base placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary h-14 w-full rounded-lg" />
              {errors.siret && <p className="text-red-600 text-sm">{errors.siret.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="secteur" className="text-sm font-bold uppercase tracking-widest text-foreground block">Secteur d&apos;activité</label>
              <select id="secteur" {...register("secteur")} className="w-full h-14 px-4 rounded-lg bg-background border border-border text-foreground text-base focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors">
                <option value="" className="bg-background text-muted-foreground">Sélectionnez...</option>
                {SECTEURS.map((s) => <option key={s} value={s} className="bg-background text-foreground">{s}</option>)}
              </select>
              {errors.secteur && <p className="text-red-600 text-sm">{errors.secteur.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="taille" className="text-sm font-bold uppercase tracking-widest text-foreground block">Taille de l&apos;entreprise</label>
              <select id="taille" {...register("taille")} className="w-full h-14 px-4 rounded-lg bg-background border border-border text-foreground text-base focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors">
                <option value="" className="bg-background text-muted-foreground">Sélectionnez...</option>
                {TAILLES.map((t) => <option key={t} value={t} className="bg-background text-foreground">{t} salariés</option>)}
              </select>
              {errors.taille && <p className="text-red-600 text-sm">{errors.taille.message}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Champ conditionnel — support */}
      {type === "support" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <label htmlFor="urgence" className="text-sm font-bold uppercase tracking-widest text-foreground block">Niveau d&apos;urgence</label>
          <select id="urgence" {...register("urgence")} className="w-full h-14 px-4 rounded-lg bg-background border border-border text-foreground text-base focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors">
            <option value="" className="bg-background text-muted-foreground">Sélectionnez...</option>
            {URGENCES.map((u) => <option key={u} value={u} className="bg-background text-foreground">{u}</option>)}
          </select>
          {errors.urgence && <p className="text-red-600 text-sm">{errors.urgence.message}</p>}
        </div>
      )}

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-foreground block">
          Votre message
        </label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder={type === "support" ? "Décrivez votre incident technique..." : "Comment pouvons-nous vous aider ?"}
          rows={4}
          className="bg-background border-border text-foreground text-base placeholder:text-muted-foreground focus:border-secondary focus:ring-secondary w-full rounded-lg"
        />
        {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-red-600 text-sm text-center">{serverError}</p>}

      <Button
        variant="secondary"
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 text-base font-bold uppercase tracking-wider rounded-xl shadow-xl transition-all mt-4"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
      </Button>

      <p className="text-center text-muted-foreground text-sm mt-4 block">
        En soumettant ce formulaire, vous acceptez notre{" "}
        <a href="/confidentialite" className="text-secondary-strong underline hover:text-foreground transition-colors">
          politique de confidentialité
        </a>.
      </p>
    </form>
  );
}