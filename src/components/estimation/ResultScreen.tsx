"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import type { EstimationResult } from "@/lib/estimation/engine";
import { EmailCapture } from "./EmailCapture";

interface ResultScreenProps {
  result: EstimationResult;
  estimateId: string | null;
  bookingsUrl?: string;
  onRestart: () => void;
}

function euros(value: number) {
  return `${value.toLocaleString("fr-FR")} €`;
}

/** "X €" si calcul exact, "X € à Y €" sinon. */
function eurosRange(min: number, max: number) {
  return min === max ? euros(min) : `${euros(min)} à ${euros(max)}`;
}

export function ResultScreen({ result, estimateId, bookingsUrl, onRestart }: ResultScreenProps) {
  const hasMonthly = result.monthlyMax > 0;
  const hasOneShot = result.oneShotMax > 0;

  return (
    <Entrance direction="up">
      <div className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
          Votre estimation
        </p>
        <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
          Voici votre fourchette
        </h2>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row sm:justify-center">
          {hasMonthly && (
            <div className="flex-1 rounded-2xl border border-secondary/40 bg-secondary/10 p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-white/60">Au mois</p>
              <p className="mt-2 text-2xl font-black text-white md:text-3xl">
                {eurosRange(result.monthlyMin, result.monthlyMax)}
              </p>
              <p className="mt-1 text-sm text-white/60">par mois, hors taxes</p>
            </div>
          )}
          {hasOneShot && (
            <div className="flex-1 rounded-2xl border border-white/20 bg-white/5 p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-white/60">Votre projet</p>
              <p className="mt-2 text-2xl font-black text-white md:text-3xl">
                {eurosRange(result.oneShotMin, result.oneShotMax)}
              </p>
              <p className="mt-1 text-sm text-white/60">en une fois, hors taxes</p>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-white/60">
          Estimation indicative, non contractuelle. Le devis final dépend d&apos;un échange avec
          votre interlocuteur Trinexta.
        </p>
        {result.widened && (
          <p className="mt-1 text-sm text-white/60">
            Fourchette élargie : sans description de votre contexte, nous restons prudents.
          </p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <h3 className="text-lg font-bold text-white">Le détail par service</h3>
        {result.services.map((service) => (
          <div key={service.serviceId} className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-bold text-white">{service.label}</p>
              {service.kind === "sur-devis" ? (
                <p className="font-black text-secondary">Sur devis</p>
              ) : (
                <p className="font-black text-secondary">
                  {eurosRange(service.min, service.max)}
                  {service.kind === "recurring" ? " /mois" : ""}
                </p>
              )}
            </div>
            <ul className="mt-3 space-y-1 text-sm text-white/60">
              {service.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            {service.note && <p className="mt-3 text-sm italic text-white/50">{service.note}</p>}
            {service.kind === "sur-devis" && (
              <div className="mt-4">
                {bookingsUrl ? (
                  <a
                    href={bookingsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-secondary underline transition-colors hover:text-white"
                  >
                    Parlons-en de vive voix
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="text-sm font-bold text-secondary underline transition-colors hover:text-white"
                  >
                    Parlons-en de vive voix
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-white/15 bg-white/5 p-6 md:p-8">
        <h3 className="text-xl font-black text-white">Recevez le détail par email</h3>
        <p className="mb-6 mt-1 text-sm text-white/60">
          Récapitulatif complet, décomposition par service et prochaines étapes.
        </p>
        <EmailCapture estimateId={estimateId} />
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        {bookingsUrl ? (
          <>
            <p className="text-white/70">Ou allez droit au but :</p>
            <Button asChild variant="secondary" size="lg">
              <a href={bookingsUrl} target="_blank" rel="noopener noreferrer">
                Prendre rendez-vous
              </a>
            </Button>
          </>
        ) : (
          <>
            <p className="text-white/70">Ou allez droit au but :</p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Prendre rendez-vous</Link>
            </Button>
          </>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="text-sm text-white/50 underline transition-colors hover:text-white"
        >
          Refaire une estimation
        </button>
      </div>
    </Entrance>
  );
}
