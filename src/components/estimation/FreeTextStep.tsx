"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import { Textarea } from "@/components/ui/Textarea";
import { ESTIMATION_FREETEXT_MAX_LENGTH } from "@/lib/validations/estimation";

interface FreeTextStepProps {
  analyzing: boolean;
  onSubmit: (text: string) => void;
  onSkip: () => void;
}

export function FreeTextStep({ analyzing, onSubmit, onSkip }: FreeTextStepProps) {
  const [text, setText] = useState("");

  if (analyzing) {
    return (
      <Entrance direction="none">
        <div className="py-12 text-center">
          <div
            aria-hidden="true"
            className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-secondary"
          />
          <p className="text-xl font-bold text-white" role="status">
            Analyse de votre contexte en cours...
          </p>
          <p className="mt-2 text-white/60">Quelques secondes, le temps d&apos;affiner votre estimation.</p>
        </div>
      </Entrance>
    );
  }

  return (
    <Entrance key="freetext" direction="up">
      <h2 className="mb-2 text-2xl font-black text-white md:text-3xl">
        Décrivez votre contexte pour affiner l&apos;estimation
      </h2>
      <p className="mb-6 text-white/60">
        Facultatif. Deux ou trois phrases sur votre activité, vos outils ou vos contraintes
        suffisent à resserrer la fourchette.
      </p>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={ESTIMATION_FREETEXT_MAX_LENGTH}
        rows={5}
        placeholder="Exemple : nous sommes un cabinet de 12 personnes sur deux sites, avec un vieux serveur de fichiers et beaucoup de télétravail..."
        className="border-white/20 bg-black/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary"
        aria-label="Description libre de votre contexte"
      />
      <p className="mt-2 text-right text-xs text-white/40">
        {text.length}/{ESTIMATION_FREETEXT_MAX_LENGTH} caractères
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => onSubmit(text.trim())}
          disabled={text.trim().length === 0}
        >
          Affiner mon estimation
        </Button>
        <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 hover:text-white" onClick={onSkip}>
          Passer cette étape
        </Button>
      </div>
    </Entrance>
  );
}
