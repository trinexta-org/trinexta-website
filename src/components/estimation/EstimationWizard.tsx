"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EstimationAnswers } from "@/data/estimation";
import { ESTIMATION_QUESTIONS_BY_ID } from "@/data/estimation";
import { computeEstimate, type EstimationResult } from "@/lib/estimation/engine";
import { getQuestionSequence } from "@/lib/estimation/flow";
import { FreeTextStep } from "./FreeTextStep";
import { QuestionStep } from "./QuestionStep";
import { ResultScreen } from "./ResultScreen";

type WizardPhase = "questions" | "freetext" | "analyzing" | "result";

const FIRST_QUESTION_ID = "effectif";

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
  const skipInitialScroll = useRef(true);

  // Après un clic sur une carte en bas de page, la question suivante s'affiche
  // plus haut : on ramène le haut du wizard dans le viewport.
  useEffect(() => {
    if (skipInitialScroll.current) {
      skipInitialScroll.current = false;
      return;
    }
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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

  const handleBack = () => {
    if (phase === "freetext") {
      setPhase("questions");
      setCurrentId(sequence[sequence.length - 1]);
    } else if (currentIndex > 0) {
      setCurrentId(sequence[currentIndex - 1]);
    }
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
  const canGoBack = phase === "freetext" || (phase === "questions" && currentIndex > 0);

  return (
    <div ref={containerRef} className="scroll-mt-24">
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white/50">
          <span>
            {phase === "questions" ? `Question ${stepNumber} sur ${totalSteps - 1}` : "Dernière étape"}
          </span>
          <span>{Math.round((stepNumber / totalSteps) * 100)} %</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-500"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {canGoBack && (
        <button
          type="button"
          onClick={handleBack}
          className="mb-6 inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>
      )}

      {phase === "questions" && (
        <QuestionStep
          question={ESTIMATION_QUESTIONS_BY_ID[currentId]}
          value={answers[currentId]}
          onSelect={handleSelect}
          onContinue={handleContinue}
        />
      )}

      {(phase === "freetext" || phase === "analyzing") && (
        <FreeTextStep
          analyzing={phase === "analyzing"}
          onSubmit={handleFreeTextSubmit}
          onSkip={handleSkip}
        />
      )}
    </div>
  );
}
