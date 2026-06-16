"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Erreur réseau");

      setStatus("success");
      setMessage("Merci ! Vous êtes maintenant inscrit.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02] overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none opacity-50" />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Ne manquez aucune <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">Actualité</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Rejoignez les experts IT et recevez nos meilleures analyses sur la cybersécurité, l'infogérance et le cloud directement dans votre boîte mail.
            </p>
          </div>

          <div className="w-full lg:w-1/2 max-w-md lg:max-w-none lg:flex-1">
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="votre.email@entreprise.fr"
                  required
                  disabled={status === "loading" || status === "success"}
                  className="w-full bg-[#0B1120] border border-white/10 text-white placeholder:text-white/40 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all disabled:opacity-50 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success" || !email}
                  className="absolute right-2 top-2 bottom-2 aspect-square bg-secondary text-white rounded-xl flex items-center justify-center hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:hover:bg-secondary"
                  aria-label="S'inscrire"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 ml-1" />
                  )}
                </button>
              </div>

              {/* Messages de retour */}
              {status === "success" && (
                <div className="flex items-center justify-center lg:justify-start gap-2 text-green-400 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <p>{message}</p>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center justify-center lg:justify-start gap-2 text-red-400 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                  <AlertCircle className="w-4 h-4" />
                  <p>{message}</p>
                </div>
              )}
            </form>
            <p className="text-white/40 text-[11px] mt-4 text-center lg:text-left leading-relaxed">
              En renseignant votre adresse e-mail, vous acceptez de recevoir nos communications. Vous pourrez vous désabonner à tout moment.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}