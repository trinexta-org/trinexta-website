"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

// Progression simulée côté client : aucun retour temps réel du backend
// (analyzeTarget répond en un seul bloc). Les durées sont des estimations —
// PageSpeed domine largement le temps total et varie fort (5 à 45s). Le
// pourcentage ne dépasse jamais ~97% tant que la vraie réponse n'est pas là,
// pour ne jamais mentir sur un état "terminé".
const STEPS = [
  { label: "Récupération de la page", estMs: 1500 },
  { label: "Analyse technique & contenu", estMs: 2000 },
  { label: "Test de performance", estMs: 15000 },
  { label: "Génération de la synthèse IA", estMs: 4000 },
  { label: "Finalisation du rapport", estMs: 2000 },
];

const TOTAL_MS = STEPS.reduce((sum, step) => sum + step.estMs, 0);
const TICK_MS = 100;
const FAST_PHASE_CAP = 90;
const CREEP_CAP = 97;

function computePercent(elapsedMs: number): number {
  const fraction = elapsedMs / TOTAL_MS;
  if (fraction < 1) return fraction * FAST_PHASE_CAP;
  const overshoot = fraction - 1;
  return FAST_PHASE_CAP + (CREEP_CAP - FAST_PHASE_CAP) * (1 - Math.exp(-overshoot * 0.6));
}

function computeStepIndex(elapsedMs: number): number {
  let cumulative = 0;
  for (let i = 0; i < STEPS.length; i++) {
    cumulative += STEPS[i].estMs;
    if (elapsedMs < cumulative) return i;
  }
  return STEPS.length - 1;
}

export function AuditProgress() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((prev) => prev + TICK_MS), TICK_MS);
    return () => clearInterval(interval);
  }, []);

  const percent = computePercent(elapsed);
  const activeIndex = computeStepIndex(elapsed);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-10">
      <div className="text-center">
        <p className="font-bold text-white">Analyse en cours</p>
        <p className="mt-1 text-sm text-white/60">
          On inspecte votre page, ça prend quelques dizaines de secondes.
        </p>
      </div>

      <div className="mx-auto mt-6 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-secondary transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="mx-auto mt-8 max-w-md space-y-3 text-left">
        {STEPS.map((step, index) => {
          const isDone = index < activeIndex;
          const isActive = index === activeIndex;
          return (
            <li key={step.label} className="flex items-center gap-3">
              {isDone && <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" />}
              {isActive && <Loader2 className="h-5 w-5 shrink-0 animate-spin text-secondary" />}
              {!isDone && !isActive && <Circle className="h-5 w-5 shrink-0 text-white/20" />}
              <span
                className={
                  isDone
                    ? "text-sm text-white/40"
                    : isActive
                      ? "text-sm font-bold text-white"
                      : "text-sm text-white/40"
                }
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
