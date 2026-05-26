"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Motif = "" | "devis" | "support" | "autre";

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
          <label className="text-[11px] font-bold uppercase tracking-widest text-white block">
            Prénom
          </label>
          <Input
            placeholder="Jean"
            required
            className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-white block">
            Nom
          </label>
          <Input
            placeholder="Dupont"
            required
            className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 rounded-lg"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Email professionnel
        </label>
        <Input
          type="email"
          placeholder="j.dupont@entreprise.fr"
          required
          className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 w-full rounded-lg"
        />
      </div>

      {/* Téléphone */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Téléphone
        </label>
        <Input
          type="tel"
          placeholder="06 00 00 00 00"
          className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 w-full rounded-lg"
        />
      </div>

      {/* Entreprise */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Entreprise
        </label>
        <Input
          placeholder="Nom de votre société"
          className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary h-12 w-full rounded-lg"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Votre message
        </label>
        <Textarea
          placeholder="Comment pouvons-nous vous aider ?"
          rows={4}
          required
          className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary w-full rounded-lg"
        />
      </div>

      {/* Motif — Dropdown */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Motif de contact
        </label>
        <div className="relative">
          <select
            value={motif}
            onChange={(e) => setMotif(e.target.value as Motif)}
            required
            className="w-full h-12 px-4 pr-10 rounded-lg bg-black/20 border border-white/20 text-white appearance-none cursor-pointer focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
          >
            <option value="" disabled className="bg-[#0a233e] text-white/50">
              Sélectionnez...
            </option>
            <option value="devis" className="bg-[#0a233e] text-white">
              Demande de devis
            </option>
            <option value="support" className="bg-[#0a233e] text-white">
              Support technique
            </option>
            <option value="autre" className="bg-[#0a233e] text-white">
              Autre
            </option>
          </select>
          {/* Flèche custom */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bouton */}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#0a233e] hover:bg-[#0e2f54] text-white border border-white/10 py-4 text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl transition-all mt-4"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
      </Button>

      {/* Confidentialité */}
      <p className="text-center text-white/60 text-xs mt-4 block">
        En soumettant ce formulaire, vous acceptez notre{" "}
        <a href="#" className="text-secondary underline hover:text-white transition-colors">
          politique de confidentialité
        </a>.
      </p>
    </form>
  );
}