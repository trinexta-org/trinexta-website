"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import { Textarea } from "@/components/ui/Textarea";
import { ESTIMATION_FREETEXT_MAX_LENGTH } from "@/lib/validations/estimation";
import { ChatBubble } from "./ChatBubble";

interface FreeTextStepProps {
  analyzing: boolean;
  avatar: string;
  onSubmit: (text: string) => void;
  onSkip: () => void;
}

export function FreeTextStep({ analyzing, avatar, onSubmit, onSkip }: FreeTextStepProps) {
  const [text, setText] = useState("");

  if (analyzing) {
    return (
      <div className="space-y-4">
        {text.trim().length > 0 && (
          <ChatBubble side="user">
            <p className="whitespace-pre-wrap text-sm text-white">{text.trim()}</p>
          </ChatBubble>
        )}
        <Entrance direction="none">
          <ChatBubble side="trinexta" avatar={avatar}>
            <span className="flex items-center gap-1.5" role="status" aria-label="Analyse en cours">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </span>
            <p className="mt-2 text-sm text-white/60">
              On lit ce que vous venez d&apos;écrire, le temps d&apos;ajuster la fourchette
              à votre situation...
            </p>
          </ChatBubble>
        </Entrance>
      </div>
    );
  }

  return (
    <Entrance key="freetext" direction="up" duration={0.5}>
      <ChatBubble side="trinexta" avatar={avatar}>
        <p className="font-serif text-lg font-bold text-white md:text-xl">
          Dernière chose : dites-le avec vos mots
        </p>
        <p className="mt-1 text-sm text-white/60">
          Facultatif. Votre activité, vos outils, ce qui coince au quotidien : deux ou
          trois phrases suffisent à resserrer la fourchette.
        </p>
      </ChatBubble>

      <div className="mt-4 sm:pl-15">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={ESTIMATION_FREETEXT_MAX_LENGTH}
          rows={5}
          placeholder="Exemple : nous sommes un cabinet de 12 personnes sur deux sites, avec un vieux serveur de fichiers et beaucoup de télétravail..."
          className="border-white/20 bg-black/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary"
          aria-label="Description libre de votre contexte"
        />
        <p className="mt-2 text-right font-mono text-xs text-white/40">
          {text.length}/{ESTIMATION_FREETEXT_MAX_LENGTH} caractères
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => onSubmit(text.trim())}
            disabled={text.trim().length === 0}
          >
            Affiner mon estimation
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 hover:text-white"
            onClick={onSkip}
          >
            Passer cette étape
          </Button>
        </div>
      </div>
    </Entrance>
  );
}
