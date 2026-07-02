"use client";

import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import type { EstimationQuestion } from "@/data/estimation";
import { OptionCard } from "./OptionCard";

interface QuestionStepProps {
  question: EstimationQuestion;
  value: string | string[] | undefined;
  onSelect: (optionId: string) => void;
  onContinue: () => void;
}

export function QuestionStep({ question, value, onSelect, onContinue }: QuestionStepProps) {
  const selectedIds = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <Entrance key={question.id} direction="up">
      <fieldset className="border-0 p-0">
        <legend className="mb-2 block text-2xl font-black text-white md:text-3xl">
          {question.title}
        </legend>
        {question.subtitle && <p className="mb-6 text-white/60">{question.subtitle}</p>}
        {!question.subtitle && <div className="mb-6" />}

        <div
          role={question.multiple ? "group" : "radiogroup"}
          aria-label={question.title}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {question.options.map((option) => (
            <OptionCard
              key={option.id}
              label={option.label}
              description={option.description}
              multiple={question.multiple}
              selected={selectedIds.includes(option.id)}
              onClick={() => onSelect(option.id)}
            />
          ))}
        </div>

        {question.multiple && (
          <div className="mt-6">
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
