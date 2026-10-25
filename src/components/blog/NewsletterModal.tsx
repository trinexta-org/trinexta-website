"use client";

import { useState, useEffect, useRef, useId } from "react";
import { FocusTrap } from "focus-trap-react";
import { ChampPiege } from "@/components/shared/ChampPiege";
import { CHAMP_PIEGE } from "@/data/anti-abus";
import Link from "next/link";
import { NEWSLETTER_LIEN_DONNEES, NEWSLETTER_MENTION } from "@/data/newsletter";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { usePresence } from "@/hooks/usePresence";

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const piegeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const titreId = useId();
  const emailId = useId();
  const { shouldRender, isVisible } = usePresence(isOpen, 300);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("trinexta_newsletter_seen");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("trinexta_newsletter_seen", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, [CHAMP_PIEGE]: piegeRef.current?.value ?? "" }),
      });

      if (!response.ok) {
        throw new Error("Erreur réseau");
      }

      setStatus("success");
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error(error);
      setStatus("idle");
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-primary/70 backdrop-blur-sm cursor-pointer transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />
      {/* Échap ferme la fenêtre ; à la désactivation, le focus revient à l'élément précédent */}
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          initialFocus: () => emailRef.current ?? undefined,
          fallbackFocus: () => document.getElementById(titreId) ?? document.body,
          allowOutsideClick: true,
          // Échap ferme via l'état (le piège se désactive avec active=false) : pas
          // d'onDeactivate, que le double montage de StrictMode déclencherait.
          escapeDeactivates: () => {
            handleClose()
            return false
          },
          returnFocusOnDeactivate: true,
        }}
      >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titreId}
        className={`relative w-full max-w-lg bg-surface-strong border border-secondary/20 rounded-3xl p-8 shadow-2xl overflow-hidden transition-all duration-300 ${isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-5"}`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 blur-[80px] rounded-full pointer-events-none" />

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2.5 text-primary/80 hover:text-primary hover:bg-secondary/10 rounded-full transition-colors z-10"
          aria-label="Fermer la fenêtre de newsletter"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="relative z-10 text-center mt-4">
          <h2 id={titreId} tabIndex={-1} className="text-2xl font-black text-primary mb-3">
            Prenez une longueur d&apos;avance
          </h2>
          <p className="text-primary/80 text-sm mb-8 leading-relaxed px-4">
            Recevez nos analyses exclusives sur l&apos;infogérance et la cybersécurité. Pas de spam, que de l&apos;expertise.
          </p>

          {status === "success" ? (
            <div role="status" className="animate-fade-in-up bg-green-500/10 border border-green-500/20 text-green-600 p-6 rounded-2xl flex flex-col items-center gap-3">
              <CheckCircle2 className="w-8 h-8" />
              <p className="font-medium">Vérifiez votre boîte de réception pour confirmer votre inscription.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <ChampPiege ref={piegeRef} />
              <label htmlFor={emailId} className="sr-only">
                Votre adresse e-mail professionnelle
              </label>
              <input
                ref={emailRef}
                id={emailId}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@entreprise.fr"
                required
                disabled={status === "loading"}
                className="w-full bg-white border border-secondary/30 text-primary placeholder:text-primary/40 rounded-xl px-5 py-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary text-left transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="w-full bg-secondary-strong text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-secondary-strong/90 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Je m&apos;abonne <Send className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-xs text-primary/80 leading-relaxed">
                {NEWSLETTER_MENTION}{" "}
                <Link href={NEWSLETTER_LIEN_DONNEES.href} className="underline hover:text-primary">
                  {NEWSLETTER_LIEN_DONNEES.label}
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
      </FocusTrap>
    </div>
  );
}