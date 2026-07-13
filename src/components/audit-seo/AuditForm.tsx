"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { auditSeoRequestSchema } from "@/lib/validations/audit-seo";
import type { TeaserResponse } from "@/lib/audit-seo/types";
import { AuditTeaser } from "./AuditTeaser";

type Phase = "form" | "loading" | "result";

const fieldClass =
  "h-12 w-full rounded-lg border-white/20 bg-black/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary";
const labelClass = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-white";

export function AuditForm() {
  const [phase, setPhase] = useState<Phase>("form");
  const [teaser, setTeaser] = useState<TeaserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [url, setUrl] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [telephone, setTelephone] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload = {
      url: url.trim(),
      prenom: prenom.trim(),
      nom: nom.trim(),
      email: email.trim(),
      entreprise: entreprise.trim(),
      telephone: telephone.trim(),
      consent,
    };

    const parsed = auditSeoRequestSchema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setError(first?.message ?? "Vérifiez les champs du formulaire.");
      return;
    }

    setPhase("loading");
    try {
      const res = await fetch("/api/audit-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.error ?? "L'analyse a échoué.");
      }
      setTeaser(json as TeaserResponse);
      setPhase("result");
    } catch (err) {
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "L'analyse a échoué. Réessayez dans un instant."
      );
      setPhase("form");
    }
  };

  if (phase === "loading") {
    return (
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-black/20 p-10 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-secondary" />
        <div>
          <p className="font-bold text-white">Analyse en cours</p>
          <p className="mt-1 text-sm text-white/60">
            On inspecte votre page, ça prend quelques secondes.
          </p>
        </div>
      </div>
    );
  }

  if (phase === "result" && teaser) {
    return <AuditTeaser teaser={teaser} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="audit-url" className={labelClass}>
          URL de la page à analyser
        </label>
        <Input
          id="audit-url"
          type="url"
          inputMode="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://mon-site.fr"
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="audit-prenom" className={labelClass}>
            Prénom
          </label>
          <Input
            id="audit-prenom"
            type="text"
            required
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Jean"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="audit-nom" className={labelClass}>
            Nom
          </label>
          <Input
            id="audit-nom"
            type="text"
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Dupont"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="audit-email" className={labelClass}>
          Email professionnel
        </label>
        <Input
          id="audit-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="j.dupont@entreprise.fr"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="audit-entreprise" className={labelClass}>
          Entreprise
        </label>
        <Input
          id="audit-entreprise"
          type="text"
          required
          value={entreprise}
          onChange={(e) => setEntreprise(e.target.value)}
          placeholder="Nom de votre entreprise"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="audit-telephone" className={labelClass}>
          Téléphone <span className="font-normal text-white/40">(optionnel)</span>
        </label>
        <Input
          id="audit-telephone"
          type="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="06 12 34 56 78"
          className={fieldClass}
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
          J&apos;accepte que Trinexta utilise mes coordonnées pour m&apos;envoyer ce rapport et me
          recontacter à son sujet. Détails dans la{" "}
          <a href="/confidentialite" className="underline hover:text-white" target="_blank">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button type="submit" variant="secondary" size="lg" disabled={!consent} className="w-full sm:w-auto">
        Analyser ma page
      </Button>
    </form>
  );
}
