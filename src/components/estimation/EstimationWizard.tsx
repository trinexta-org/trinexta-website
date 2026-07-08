"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EstimationAnswers } from "@/data/estimation";
import { ESTIMATION_QUESTIONS_BY_ID } from "@/data/estimation";
import { computeEstimate, type EstimationResult } from "@/lib/estimation/engine";
import { getQuestionSequence } from "@/lib/estimation/flow";
import { cn } from "@/lib/utils";
import { ChatBubble } from "./ChatBubble";
import { FreeTextStep } from "./FreeTextStep";
import { QuestionStep } from "./QuestionStep";
import { ResultScreen } from "./ResultScreen";

type WizardPhase = "questions" | "freetext" | "analyzing" | "result";

const FIRST_QUESTION_ID = "effectif";

/** Nexi accueille au début, varie ses poses pendant la conversation. */
function nexiAvatar(index: number): string {
  if (index <= 0) return "/images/nexi/nexi1-avatar.png";
  return index % 2 === 1 ? "/images/nexi/nexi2-avatar.png" : "/images/nexi/nexi4-avatar.png";
}

/** Petite phrase d'accompagnement, à la place d'un pourcentage froid. */
function stepMood(step: number, total: number): string {
  if (step >= total) return "La dernière ligne droite";
  if (step === total - 1) return "Dernière question";
  if (step === 1) return "On commence simple";
  if (step / total >= 0.5) return "Vous y êtes presque";
  return "Chaque réponse affine le prix";
}

/** Envoi d'événement de parcours, jamais bloquant pour le visiteur. */
function trackEvent(sessionId: string, step: string) {
  try {
    fetch("/api/estimation/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, step }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Aucun échec de tracking ne doit remonter au visiteur.
  }
}

export function EstimationWizard({ bookingsUrl }: { bookingsUrl?: string }) {
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const [phase, setPhase] = useState<WizardPhase>("questions");
  const [answers, setAnswers] = useState<EstimationAnswers>({});
  const [currentId, setCurrentId] = useState(FIRST_QUESTION_ID);
  const [result, setResult] = useState<EstimationResult | null>(null);
  const [estimateId, setEstimateId] = useState<string | null>(null);
  const trackedSteps = useRef(new Set<string>());
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const skipInitialScroll = useRef(true);

  // Le fil grandit vers le bas : on suit le dernier message, comme une messagerie.
  // Sur le résultat, on remonte en haut du wizard.
  useEffect(() => {
    if (skipInitialScroll.current) {
      skipInitialScroll.current = false;
      return;
    }
    if (phase === "result") {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [currentId, phase]);

  const track = useCallback(
    (step: string) => {
      if (trackedSteps.current.has(step)) return;
      trackedSteps.current.add(step);
      trackEvent(sessionId, step);
    },
    [sessionId]
  );

  const sequence = getQuestionSequence(answers);
  const currentIndex = sequence.indexOf(currentId);
  const totalSteps = sequence.length + 1; // + l'étape contexte libre

  const goForward = (newAnswers: EstimationAnswers, fromId: string) => {
    const newSequence = getQuestionSequence(newAnswers);
    const nextId = newSequence[newSequence.indexOf(fromId) + 1];
    if (nextId) {
      setCurrentId(nextId);
    } else {
      setPhase("freetext");
    }
  };

  const handleSelect = (optionId: string) => {
    const question = ESTIMATION_QUESTIONS_BY_ID[currentId];
    if (question.multiple) {
      const selected = Array.isArray(answers[currentId]) ? (answers[currentId] as string[]) : [];
      const next = selected.includes(optionId)
        ? selected.filter((id) => id !== optionId)
        : [...selected, optionId];
      setAnswers({ ...answers, [currentId]: next });
    } else {
      const newAnswers = { ...answers, [currentId]: optionId };
      setAnswers(newAnswers);
      track(`question:${currentId}`);
      goForward(newAnswers, currentId);
    }
  };

  const handleContinue = () => {
    track(`question:${currentId}`);
    goForward(answers, currentId);
  };

  /** Revenir sur une réponse du fil : la conversation reprend à cette question. */
  const handleEdit = (questionId: string) => {
    setPhase("questions");
    setCurrentId(questionId);
  };

  const finish = useCallback(
    (aiModifierIds: string[], aiAnalyzed: boolean) => {
      const computed = computeEstimate(answers, { aiModifierIds, aiAnalyzed });
      setResult(computed);
      setPhase("result");
      track("result");

      // Persistance en arrière-plan : un échec n'empêche pas l'affichage.
      fetch("/api/estimation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, answers, aiModifierIds, aiAnalyzed }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          if (json?.id) setEstimateId(json.id);
        })
        .catch(() => {});
    },
    [answers, sessionId, track]
  );

  const handleFreeTextSubmit = async (text: string) => {
    setPhase("analyzing");
    track("freetext");
    try {
      const res = await fetch("/api/estimation/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, text }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error("analyse indisponible");
      const json = await res.json();
      finish(Array.isArray(json.modifierIds) ? json.modifierIds : [], true);
    } catch {
      // Dégradation propre : fourchette élargie, annoncée comme telle.
      finish([], false);
    }
  };

  const handleSkip = () => {
    track("freetext:skip");
    finish([], false);
  };

  const handleRestart = () => {
    setSessionId(crypto.randomUUID());
    setPhase("questions");
    setAnswers({});
    setCurrentId(FIRST_QUESTION_ID);
    setResult(null);
    setEstimateId(null);
    trackedSteps.current = new Set();
  };

  if (phase === "result" && result) {
    return (
      <div ref={containerRef} className="scroll-mt-24">
        <ResultScreen
          result={result}
          estimateId={estimateId}
          bookingsUrl={bookingsUrl}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  const stepNumber = phase === "questions" ? currentIndex + 1 : totalSteps;

  // Questions déjà répondues, affichées comme historique de conversation.
  const answeredIds = phase === "questions" ? sequence.slice(0, Math.max(currentIndex, 0)) : sequence;

  const answerLabel = (questionId: string): string | null => {
    const question = ESTIMATION_QUESTIONS_BY_ID[questionId];
    const value = answers[questionId];
    if (value == null) return null;
    const ids = Array.isArray(value) ? value : [value];
    const labels = ids
      .map((id) => question.options.find((option) => option.id === id)?.label)
      .filter((label): label is string => Boolean(label));
    return labels.length > 0 ? labels.join(" · ") : null;
  };

  return (
    <div ref={containerRef} className="scroll-mt-24">
      {/* Progression : un segment par étape, une phrase plutôt qu'un pourcentage */}
      <div className="mb-8">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-white/50">
            {phase === "questions" ? `Question ${stepNumber} sur ${totalSteps - 1}` : "Dernière étape"}
          </span>
          <span className="font-serif text-sm italic text-secondary">
            {stepMood(stepNumber, totalSteps)}
          </span>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-500",
                i < stepNumber ? "bg-secondary" : "bg-white/10"
              )}
            />
          ))}
        </div>
      </div>

      {/* Historique de la conversation */}
      {answeredIds.length > 0 && (
        <div className="mb-6 space-y-5">
          {answeredIds.map((questionId, index) => {
            const label = answerLabel(questionId);
            if (!label) return null;
            return (
              <div key={questionId} className="space-y-2">
                <ChatBubble side="trinexta" avatar={nexiAvatar(index)}>
                  <p className="font-serif font-bold text-white">
                    {ESTIMATION_QUESTIONS_BY_ID[questionId].title}
                  </p>
                </ChatBubble>
                <div className="flex flex-col items-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-md border border-secondary/40 bg-secondary/15 px-4 py-2.5 sm:max-w-[75%]">
                    <p className="text-sm font-bold text-white">{label}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEdit(questionId)}
                    className="mt-1 text-xs text-white/40 underline-offset-2 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Message courant */}
      <div aria-live="polite">
        {phase === "questions" && (
          <QuestionStep
            question={ESTIMATION_QUESTIONS_BY_ID[currentId]}
            value={answers[currentId]}
            avatar={nexiAvatar(currentIndex)}
            onSelect={handleSelect}
            onContinue={handleContinue}
          />
        )}

        {(phase === "freetext" || phase === "analyzing") && (
          <FreeTextStep
            analyzing={phase === "analyzing"}
            avatar={nexiAvatar(sequence.length)}
            onSubmit={handleFreeTextSubmit}
            onSkip={handleSkip}
          />
        )}
      </div>

      <div ref={endRef} className="scroll-mb-6" aria-hidden="true" />
    </div>
  );
}
