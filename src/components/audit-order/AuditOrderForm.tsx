"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Typography";
import { auditOrderRequestSchema } from "@/lib/validations/audit-order";

type Phase = "form" | "loading";

const fieldClass =
    "h-12 w-full rounded-lg border-white/20 bg-black/20 text-white placeholder:text-white/40 focus:border-secondary focus:ring-secondary";
const labelClass = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-white";

export function AuditOrderForm() {
    const [phase, setPhase] = useState<Phase>("form");
    const [error, setError] = useState<string | null>(null);

    const [url, setUrl] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [entreprise, setEntreprise] = useState("");
    const [tva, setTva] = useState("");
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
            tva: tva.trim(),
            consent,
        };

        const parsed = auditOrderRequestSchema.safeParse(payload);
        if (!parsed.success) {
            const first = parsed.error.issues[0];
            setError(first?.message ?? "Vérifiez les champs du formulaire.");
            return;
        }

        setPhase("loading");
        try {
            const res = await fetch("/api/audit-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed.data),
            });
            if (!res.ok) {
                const json = await res.json().catch(() => null);
                throw new Error(json?.error ?? "La demande a échoué.");
            }
            const { id } = await res.json();

            const checkoutRes = await fetch(`/api/audit-order/${id}/checkout`, {
                method: "POST",
            });
            if (!checkoutRes.ok) {
                const json = await checkoutRes.json().catch(() => null);
                throw new Error(json?.error ?? "La redirection vers le paiement a échoué.");
            }
            const { url } = await checkoutRes.json();
            window.location.href = url;
        } catch (err) {
            setError(
                err instanceof Error && err.message !== "Failed to fetch"
                    ? err.message
                    : "La demande a échoué. Réessayez dans un instant."
            );
            setPhase("form");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="order-url" className={labelClass}>
                    URL du site à auditer
                </label>
                <Input
                    id="order-url"
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
                    <label htmlFor="order-prenom" className={labelClass}>
                        Prénom
                    </label>
                    <Input
                        id="order-prenom"
                        type="text"
                        required
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        placeholder="Jean"
                        className={fieldClass}
                    />
                </div>
                <div>
                    <label htmlFor="order-nom" className={labelClass}>
                        Nom
                    </label>
                    <Input
                        id="order-nom"
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
                <label htmlFor="order-email" className={labelClass}>
                    Email professionnel
                </label>
                <Input
                    id="order-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="j.dupont@entreprise.fr"
                    className={fieldClass}
                />
            </div>

            <div>
                <label htmlFor="order-entreprise" className={labelClass}>
                    Entreprise
                </label>
                <Input
                    id="order-entreprise"
                    type="text"
                    required
                    value={entreprise}
                    onChange={(e) => setEntreprise(e.target.value)}
                    placeholder="Nom de votre entreprise"
                    className={fieldClass}
                />
            </div>

            <div>
                <label htmlFor="order-tva" className={labelClass}>
                    N° TVA intracommunautaire <span className="font-normal text-white/40">(optionnel)</span>
                </label>
                <Input
                    id="order-tva"
                    type="text"
                    value={tva}
                    onChange={(e) => setTva(e.target.value)}
                    placeholder="FR12345678900"
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
                    J&apos;accepte les{" "}
                    <a href="/cgv-audit-expert" className="underline hover:text-white" target="_blank">
                        conditions générales de vente
                    </a>
                    .
                </span>
            </label>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
                type="submit"
                variant="secondary"
                size="lg"
                disabled={!consent || phase === "loading"}
                className="w-full sm:w-auto"
            >
                {phase === "loading" ? "Envoi en cours..." : "Commander mon audit expert"}
            </Button>
        </form>
    );
}