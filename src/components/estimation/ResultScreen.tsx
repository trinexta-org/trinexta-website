"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Entrance } from "@/components/ui/Entrance";
import type { EstimationResult } from "@/lib/estimation/engine";
import { LeadCapture } from "./LeadCapture";
import { PaymentOrbit } from "@/components/studio/StudioPaymentPlan";

interface ResultScreenProps {
  result: EstimationResult;
  estimateId: string | null;
  bookingsUrl?: string;
  onRestart: () => void;
}

function euros(value: number) {
  return `${value.toLocaleString("fr-FR")} €`;
}

function eurosRange(min: number, max: number) {
  return min === max ? euros(min) : `${euros(min)} à ${euros(max)}`;
}

export function ResultScreen({
  result,
  estimateId,
  bookingsUrl,
  onRestart,
}: ResultScreenProps) {
  const hasMonthly = result.monthlyMax > 0;
  const hasOneShot = result.oneShotMax > 0;

  return (
    <Entrance direction="up">
      <div className="text-center">
        <Image
          src="/images/nexi/nexi3-avatar.png"
          alt="Nexi, la mascotte Trinexta, pouces leves"
          width={80}
          height={80}
          className="mx-auto mb-4 h-16 w-16 rounded-full border-2 border-secondary/40 object-cover md:h-20 md:w-20"
        />

        <p className="text-[11px] font-bold uppercase tracking-widest text-secondary-strong">
          Votre estimation
        </p>

        <h2 className="mt-2 text-3xl font-black text-primary md:text-4xl">
          Voici votre <em className="text-secondary-strong">fourchette</em>
        </h2>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row sm:justify-center">
          {hasMonthly && (
            <div className="flex-1 rounded-2xl border border-secondary/40 bg-secondary/10 p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Au mois
              </p>

              <p className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">
                {eurosRange(result.monthlyMin, result.monthlyMax)}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                par mois, hors taxes
              </p>
            </div>
          )}

          {hasOneShot && (
            <div className="flex-1 rounded-2xl border border-border bg-white p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Votre projet
              </p>

              <p className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">
                {eurosRange(result.oneShotMin, result.oneShotMax)}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                en une fois, hors taxes
              </p>
            </div>
          )}
        </div>

        {hasOneShot && (
          <div className="mx-auto mt-6 max-w-2xl overflow-hidden rounded-2xl bg-surface-strong p-6 text-primary">
            <div className="mb-6 text-center">
              <p className="text-lg font-bold text-primary">
                Le financement en mouvement
              </p>

              <p className="mt-1 text-sm text-primary/70">
                Echelonnable sur 12 mois sans frais. Le taux d&apos;interet de
                2,5 % est integralement pris en charge par Trinexta.
              </p>
            </div>

            <PaymentOrbit />
          </div>
        )}

        <p className="mt-4 text-sm text-muted-foreground">
          Estimation indicative, non contractuelle. Le devis final depend
          d&apos;un echange avec votre interlocuteur Trinexta.
        </p>

        {result.widened && (
          <p className="mt-1 text-sm text-muted-foreground">
            Fourchette elargie : sans description de votre contexte, nous
            restons prudents.
          </p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <h3 className="text-lg font-bold text-primary">
          Le detail par service
        </h3>

        {result.services.map((service) => (
          <div
            key={service.serviceId}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-bold text-primary">{service.label}</p>

              {service.kind === "sur-devis" ? (
                <p className="font-black text-secondary-strong">
                  Sur devis
                </p>
              ) : (
                <p className="font-black text-secondary-strong">
                  {eurosRange(service.min, service.max)}
                  {service.kind === "recurring" ? " /mois" : ""}
                </p>
              )}
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
          Un expert vous recontacte pour affiner ce chiffrage
        </h3>

        <p className="mb-6 mt-1 text-sm text-muted-foreground">
          Vous recevez aussi le detail complet par email, avec la decomposition
          par service.
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