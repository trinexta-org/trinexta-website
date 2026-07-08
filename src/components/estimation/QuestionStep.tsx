"use client";

import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import type { EstimationQuestion } from "@/data/estimation";
import { ChatBubble } from "./ChatBubble";
import { OptionCard } from "./OptionCard";

interface QuestionStepProps {
  question: EstimationQuestion;
  value: string | string[] | undefined;
  avatar: string;
  onSelect: (optionId: string) => void;
  onContinue: () => void;
}

export function QuestionStep({ question, value, avatar, onSelect, onContinue }: QuestionStepProps) {
  const selectedIds = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <Entrance key={question.id} direction="up" duration={0.5}>
      <fieldset className="border-0 p-0">
        <legend className="sr-only">{question.title}</legend>

        <ChatBubble side="trinexta" avatar={avatar}>
          <p className="font-serif text-lg font-bold text-white md:text-xl">{question.title}</p>
          {question.subtitle && <p className="mt-1 text-sm text-white/60">{question.subtitle}</p>}
        </ChatBubble>

        {/* Réponses rapides, alignées sous le texte de la bulle */}
        <div
          role={question.multiple ? "group" : "radiogroup"}
          aria-label={question.title}
          className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:pl-15"
        >
          {question.options.map((option, index) => (
            <Entrance
              key={option.id}
              direction="up"
              duration={0.4}
              delay={0.05 + index * 0.06}
              className="h-full"
            >
              <OptionCard
                label={option.label}
                description={option.description}
                multiple={question.multiple}
                selected={selectedIds.includes(option.id)}
                onClick={() => onSelect(option.id)}
              />
            </Entrance>
          ))}
        </div>

        {question.multiple && (
          <div className="mt-5 sm:pl-15">
            <Button
              variant="secondary"
              size="lg"
              onClick={onContinue}
              disabled={selectedIds.length === 0}
            >
              Continuer
            </Button>
          </div>
        )}
      </fieldset>
    </Entrance>
  );
}
