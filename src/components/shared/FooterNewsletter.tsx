"use client";

import { useState } from "react";
import { ArrowRight, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FooterNewsletterProps = {
  compact?: boolean;
  className?: string;
};

export function FooterNewsletter({ compact = false, className }: FooterNewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Inscription confirmée !");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setMessage("Impossible de joindre le serveur.");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("border-t border-white/5 pt-4", className)}>
        <div className="flex items-center gap-2 text-secondary">
          <CheckCircle2 className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
          <span className={cn("font-bold", compact ? "text-[10px]" : "text-xs")}>
            {message}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("border-t border-white/5 pt-4", className)}>
      <div className="flex items-center gap-2 text-secondary">
        <Mail className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
        <span className={cn("font-bold uppercase", compact ? "text-[8px] tracking-widest" : "text-[9px] tracking-[0.18em]")}>
          Newsletter
        </span>
      </div>

      <p className={cn("mt-2 leading-snug text-white/55", compact ? "text-[10px]" : "text-xs")}>
        Conseils IT utiles, sans bruit.
      </p>

      <form onSubmit={handleSubmit} className="mt-2.5 flex min-w-0 gap-2">
        <label htmlFor={compact ? "footer-newsletter-mobile" : "footer-newsletter"} className="sr-only">
          Adresse e-mail
        </label>
        <input
          id={compact ? "footer-newsletter-mobile" : "footer-newsletter"}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={cn(
            "min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/30 outline-none transition-colors focus:border-secondary",
            compact ? "h-9 px-3 text-[11px]" : "h-10 px-3 text-xs"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="S'inscrire à la newsletter"
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:opacity-60",
            compact ? "h-9 w-9" : "h-10 w-10"
          )}
        >
          {status === "loading"
            ? <Loader2 className={cn("animate-spin", compact ? "h-3.5 w-3.5" : "h-4 w-4")} aria-hidden="true" />
            : <ArrowRight className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
          }
        </button>
      </form>

      {status === "error" && (
        <p className={cn("mt-1.5 text-red-400", compact ? "text-[10px]" : "text-xs")}>
          {message}
        </p>
      )}
    </div>
  );
}
