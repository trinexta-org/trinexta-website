"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import type { EstimationResult } from "@/lib/estimation/engine";
import { LeadCapture } from "./LeadCapture";

interface ResultScreenProps {
  result: EstimationResult;
  estimateId: string | null;
  bookingsUrl?: string;
  onRestart: () => void;
}

export function ResultScreen({
  result,
  estimateId,
  bookingsUrl,
  onRestart,
}: ResultScreenProps) {
  return (
    <Entrance direction="up">
      <div className="text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-strong">
          Votre estimation
        </p>

        <h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">
          Votre besoin est <em className="text-secondary-strong">qualifié</em>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Voici les services qui correspondent à vos réponses. Le prix dépend de
          votre parc et de vos options : il figure dans la proposition écrite
          que nous vous envoyons après un échange.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <h3 className="text-lg font-bold text-primary">
          Le détail par service
        </h3>

        {result.services.map((service) => (
          <div
            key={service.serviceId}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-bold text-primary">{service.label}</p>

              <p className="font-black text-secondary-strong">
                Sur proposition
              </p>
            </div>

            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {service.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            {service.note ? (
              <p className="mt-3 text-sm italic text-muted-foreground">
                {service.note}
              </p>
            ) : null}

            {service.kind === "sur-devis" ? (
              <div className="mt-4">
                {bookingsUrl ? (
                  <a
                    href={bookingsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-secondary-strong underline transition-colors hover:text-primary"
                  >
                    Parlons-en de vive voix
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="text-sm font-bold text-secondary-strong underline transition-colors hover:text-primary"
                  >
                    Parlons-en de vive voix
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-border bg-white p-6 md:p-8">
        <h3 className="text-xl font-black text-primary">
          Recevez une proposition adaptée à votre entreprise
        </h3>

        <p className="mb-6 mt-1 text-sm text-muted-foreground">
          Laissez vos coordonnées : nous vous recontactons pour préparer votre
          proposition.
        </p>

        <LeadCapture estimateId={estimateId} />
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        {bookingsUrl ? (
          <>
            <p className="text-muted-foreground">Ou allez droit au but :</p>

            <Button asChild variant="secondary" size="lg">
              <a
                href={bookingsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Prendre rendez-vous
              </a>
            </Button>
          </>
        ) : (
          <>
            <p className="text-muted-foreground">Ou allez droit au but :</p>

            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Prendre rendez-vous</Link>
            </Button>
          </>
        )}

        <button
          type="button"
          onClick={onRestart}
          className="text-sm text-muted-foreground underline transition-colors hover:text-primary"
        >
          Refaire une estimation
        </button>
      </div>
    </Entrance>
  );
}