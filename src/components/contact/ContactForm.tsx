"use client";

import { useState } from "react";
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
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({ resolver: zodResolver(contactFormSchema) });

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
          <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-semibold text-lg">{serverMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">

      {/* Prénom / Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="prenom" className="text-[11px] font-bold uppercase tracking-widest text-white block">
            Prénom
          </label>
          <Input
            id="prenom"
            {...register("prenom")}
            placeholder="Jean"
            className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 rounded-lg"
          />
          {errors.prenom && <p className="text-red-400 text-xs">{errors.prenom.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="nom" className="text-[11px] font-bold uppercase tracking-widest text-white block">
            Nom
          </label>
          <Input
            id="nom"
            {...register("nom")}
            placeholder="Dupont"
            className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 rounded-lg"
          />
          {errors.nom && <p className="text-red-400 text-xs">{errors.nom.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Email professionnel
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="j.dupont@entreprise.fr"
          className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 w-full rounded-lg"
        />
        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="telephone" className="text-[11px] font-bold uppercase tracking-widest text-white block">
            Téléphone
          </label>
          <Input
            id="telephone"
            type="tel"
            {...register("telephone")}
            placeholder="06 00 00 00 00"
            className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 w-full rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="text-[11px] font-bold uppercase tracking-widest text-white block">
            Motif de contact
          </label>
          <div className="relative">
            <select
              id="type"
              {...register("type")}
              className="w-full h-12 px-4 pr-10 rounded-lg bg-black/20 border border-white/20 text-white appearance-none cursor-pointer focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
            >
              <option value="" disabled className="bg-primary text-white/50">Sélectionnez...</option>
              {CONTACT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-primary text-white">
                  {{ devis: "Demande de devis", support: "Support technique", autre: "Autre" }[t]}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
          {errors.type && <p className="text-red-400 text-xs">{errors.type.message}</p>}
        </div>
      </div>

      {/* Champs conditionnels — devis */}
      {type === "devis" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="entreprise" className="text-[11px] font-bold uppercase tracking-widest text-white block">Entreprise</label>
              <Input id="entreprise" {...register("entreprise")} placeholder="Nom de votre société" className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 w-full rounded-lg" />
              {errors.entreprise && <p className="text-red-400 text-xs">{errors.entreprise.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="siret" className="text-[11px] font-bold uppercase tracking-widest text-white block">Numéro SIRET</label>
              <Input id="siret" {...register("siret")} placeholder="12345678901234" className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 w-full rounded-lg" />
              {errors.siret && <p className="text-red-400 text-xs">{errors.siret.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="secteur" className="text-[11px] font-bold uppercase tracking-widest text-white block">Secteur d&apos;activité</label>
              <select id="secteur" {...register("secteur")} className="w-full h-12 px-4 rounded-lg bg-black/20 border border-white/20 text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors">
                <option value="" className="bg-primary text-white/50">Sélectionnez...</option>
                {SECTEURS.map((s) => <option key={s} value={s} className="bg-primary text-white">{s}</option>)}
              </select>
              {errors.secteur && <p className="text-red-400 text-xs">{errors.secteur.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="taille" className="text-[11px] font-bold uppercase tracking-widest text-white block">Taille de l&apos;entreprise</label>
              <select id="taille" {...register("taille")} className="w-full h-12 px-4 rounded-lg bg-black/20 border border-white/20 text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors">
                <option value="" className="bg-primary text-white/50">Sélectionnez...</option>
                {TAILLES.map((t) => <option key={t} value={t} className="bg-primary text-white">{t} salariés</option>)}
              </select>
              {errors.taille && <p className="text-red-400 text-xs">{errors.taille.message}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Champ conditionnel — support */}
      {type === "support" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <label htmlFor="urgence" className="text-[11px] font-bold uppercase tracking-widest text-white block">Niveau d&apos;urgence</label>
          <select id="urgence" {...register("urgence")} className="w-full h-12 px-4 rounded-lg bg-black/20 border border-white/20 text-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors">
            <option value="" className="bg-primary text-white/50">Sélectionnez...</option>
            {URGENCES.map((u) => <option key={u} value={u} className="bg-primary text-white">{u}</option>)}
          </select>
          {errors.urgence && <p className="text-red-400 text-xs">{errors.urgence.message}</p>}
        </div>
      )}

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Votre message
        </label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder={type === "support" ? "Décrivez votre incident technique..." : "Comment pouvons-nous vous aider ?"}
          rows={4}
          className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary w-full rounded-lg"
        />
        {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-red-400 text-sm text-center">{serverError}</p>}

      <Button
        variant="secondary"
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl transition-all mt-4"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
      </Button>

      <p className="text-center text-white/60 text-xs mt-4 block">
        En soumettant ce formulaire, vous acceptez notre{" "}
        <a href="/confidentialite" className="text-secondary underline hover:text-white transition-colors">
          politique de confidentialité
        </a>.
      </p>
    </form>
  );
}
