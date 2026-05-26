"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Motif = "" | "devis" | "support" | "candidature" | "autre";

export default function ContactForm() {
  const [motif, setMotif] = useState<Motif>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">

      {/* Prénom / Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="prenom" className="text-[11px] font-bold uppercase tracking-widest text-white block">
            Prénom
          </label>
          <Input
            id="prenom"
            placeholder="Jean"
            required
            className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="nom" className="text-[11px] font-bold uppercase tracking-widest text-white block">
            Nom
          </label>
          <Input
            id="nom"
            placeholder="Dupont"
            required
            className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 rounded-lg"
          />
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
          placeholder="j.dupont@entreprise.fr"
          required
          className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 w-full rounded-lg"
        />
      </div>

      {/* Téléphone */}
      <div className="space-y-2">
        <label htmlFor="telephone" className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Téléphone
        </label>
        <Input
          id="telephone"
          type="tel"
          placeholder="06 00 00 00 00"
          className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 w-full rounded-lg"
        />
      </div>

      {/* Motif */}
      <div className="space-y-2">
        <label htmlFor="motif" className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Motif de contact
        </label>
        <div className="relative">
          <select
            id="motif"
            name="motif"
            value={motif}
            onChange={(e) => setMotif(e.target.value as Motif)}
            required
            className="w-full h-12 px-4 pr-10 rounded-lg bg-black/20 border border-white/20 text-white appearance-none cursor-pointer focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
          >
            <option value="" disabled className="bg-primary text-white/50">
              Sélectionnez...
            </option>
            <option value="devis" className="bg-primary text-white">
              Demande de devis
            </option>
            <option value="support" className="bg-primary text-white">
              Support technique
            </option>
            <option value="candidature" className="bg-primary text-white">
              Candidature
            </option>
            <option value="autre" className="bg-primary text-white">
              Autre
            </option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Entreprise (conditionnel devis) */}
      {motif === "devis" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <label htmlFor="entreprise" className="text-[11px] font-bold uppercase tracking-widest text-white block">
            Entreprise
          </label>
          <Input
            id="entreprise"
            placeholder="Nom de votre société"
            className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 w-full rounded-lg"
          />
        </div>
      )}

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Votre message
        </label>
        <Textarea
          id="message"
          placeholder={motif === "support" ? "Décrivez votre incident technique..." : "Comment pouvons-nous vous aider ?"}
          rows={4}
          required
          className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary w-full rounded-lg"
        />
      </div>

      <Button
        variant="secondary"
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl transition-all mt-4"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
      </Button>

      <p className="text-center text-white/60 text-xs mt-4 block">
        En soumettant ce formulaire, vous acceptez notre{" "}
        <a href="#" className="text-secondary underline hover:text-white transition-colors">
          politique de confidentialité
        </a>.
      </p>
    </form>
  );
}
