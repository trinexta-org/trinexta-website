"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Segment = "devis" | "support" | "candidature" | "autre";

export default function ContactForm() {
  const [activeSegment, setActiveSegment] = useState<Segment>("devis");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      
      {/* 1. Onglets de Navigation Internes - Version Subtile Haut de Gamme */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-black/30 rounded-xl border border-white/10 mb-6">
        {(["devis", "support", "candidature", "autre"] as Segment[]).map((seg) => (
          <button
            key={seg}
            type="button"
            onClick={() => setActiveSegment(seg)}
            className={`py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${
              activeSegment === seg 
                ? "bg-secondary text-white shadow-lg" // Onglet Actif (Bleu d'accent)
                : "text-white/70 hover:text-white hover:bg-white/5" // Onglets Inactifs (Texte blanc transparent et discret)
            }`}
          >
            {seg}
          </button>
        ))}
      </div>

      {/* 2. Champs Prénom / Nom */}
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

      {/* 3. Email Professionnel */}
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

      {/* 4. Conditionnel : Entreprise */}
      {activeSegment === "devis" && (
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

      {/* 5. Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-white block">
          Votre message
        </label>
        <Textarea
          id="message"
          placeholder={activeSegment === "support" ? "Décrivez votre incident technique..." : "Comment pouvons-nous vous aider ?"}
          rows={4}
          required
          className="bg-black/20 border-white/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary w-full rounded-lg"
        />
      </div>

      {/* 6. Bouton d'action Bleu Nuit Uni avec bordure fine */}
      <Button 
        type="submit" 
        disabled={status === "loading"}
        className="w-full border border-white/10 py-4 text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl transition-all mt-4"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
      </Button>

      {/* 7. Mentions de confidentialité révisées pour la lisibilité */}
      <p className="text-center text-white/60 text-xs mt-4 block">
        En soumettant ce formulaire, vous acceptez notre{" "}
        <a href="#" className="text-secondary underline hover:text-white transition-colors">
          politique de confidentialité
        </a>.
      </p>
    </form>
  );
}