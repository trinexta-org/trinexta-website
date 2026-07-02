"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface EmailCaptureProps {
  estimateId: string | null;
}

export function EmailCapture({ estimateId }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError("Cochez la case de consentement pour recevoir votre estimation.");
      return;
    }
    if (!estimateId) {
      setError(
        "Votre estimation n'a pas pu être enregistrée, l'envoi par email est indisponible. Votre fourchette reste affichée ci-dessus."
      );
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/estimation/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estimateId, email: email.trim(), consent }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error ?? "L'envoi a échoué.");
      }
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "L'envoi a échoué. Votre estimation reste affichée ci-dessus, vous pouvez réessayer."
      );
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-secondary/40 bg-secondary/10 p-6 text-center">
        <p className="font-bold text-white">C&apos;est envoyé.</p>
        <p className="mt-1 text-sm text-white/70">
          Le détail de votre estimation arrive dans votre boîte mail d&apos;ici quelques minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="estimation-email" className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-white">
          Email professionnel
        </label>
        <Input
          id="estimation-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="j.dupont@entreprise.fr"
          className="h-12 w-full rounded-lg border-white/20 bg-black/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-white/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-secondary"
        />
        <span>
          J&apos;accepte que Trinexta utilise mon email pour m&apos;envoyer cette estimation et me
          recontacter à son sujet. Détails dans la{" "}
          <a href="/confidentialite" className="underline hover:text-white" target="_blank">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" variant="secondary" size="lg" disabled={sending || !consent} className="w-full sm:w-auto">
        {sending ? "Envoi en cours..." : "Recevoir l'estimation détaillée"}
      </Button>
    </form>
  );
}
