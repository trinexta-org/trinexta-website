"use client";
import React, { useState, useRef, useEffect } from "react";

interface Message {
  from: "bot" | "user";
  text: string;
}

interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
}

const faqs: FAQ[] = [
  {
    question: "Quels sont vos tarifs ?",
    answer: "Nous proposons 3 formules : Essentiel à 490 €/mois (jusqu'à 5 postes), Sérénité à 890 €/mois (jusqu'à 20 postes) et Enterprise sur mesure pour 20+ postes. Toutes sans engagement.",
    keywords: ["tarif", "prix", "coût", "combien", "formule", "offre", "abonnement", "forfait"],
  },
  {
    question: "Quelle est votre zone d'intervention ?",
    answer: "Nous intervenons sur toute l'Île-de-France (Paris + 8 départements) avec une garantie d'intervention sur site sous 4h pour les urgences. Des interventions nationales sont possibles sur demande.",
    keywords: ["zone", "intervention", "ile-de-france", "paris", "département", "région", "déplacement", "site", "localisation"],
  },
  {
    question: "Proposez-vous un audit gratuit ?",
    answer: "Oui ! Nous proposons un audit informatique complet et gratuit de votre parc en 1h, sans engagement. Un expert analyse vos besoins et vous remet une offre sous 24h ouvrées.",
    keywords: ["audit", "gratuit", "diagnostic", "analyse", "bilan", "évaluation", "offert"],
  },
  {
    question: "Quel est votre délai de réponse au support ?",
    answer: "Réponse garantie sous 4h sur site pour les urgences. Support disponible de 8h–18h (Essentiel), 7h–20h (Sérénité) et 24/7 (Enterprise).",
    keywords: ["support", "délai", "réponse", "urgence", "assistance", "hotline", "disponible", "horaire"],
  },
  {
    question: "La formule est-elle sans engagement ?",
    answer: "Oui, toutes nos formules sont sans engagement et résiliables à tout moment.",
    keywords: ["engagement", "résiliation", "contrat", "sans", "quitter", "arrêter", "annuler"],
  },
  {
    question: "Gérez-vous la cybersécurité ?",
    answer: "Absolument. La cybersécurité est incluse dans toutes nos formules : antivirus, pare-feu, sensibilisation des équipes et audit de sécurité. La formule Enterprise inclut un SOC dédié.",
    keywords: ["cyber", "sécurité", "cybersécurité", "antivirus", "pare-feu", "firewall", "hacker", "piratage", "protection"],
  },
  {
    question: "Prenez-vous en charge le cloud et Microsoft 365 ?",
    answer: "Oui, nous gérons la migration et l'administration de Microsoft 365, Google Workspace et stockage sécurisé. Nos ingénieurs sont certifiés Microsoft.",
    keywords: ["cloud", "microsoft", "365", "google", "workspace", "office", "teams", "onedrive", "migration"],
  },
  {
    question: "Comment démarrer avec Trinexta ?",
    answer: "En 4 étapes : 1) Audit gratuit (1h), 2) Offre sur mesure sous 24h, 3) Déploiement, 4) Suivi continu. Appelez le 09 78 25 07 46 ou écrivez à contact@trinexta.fr.",
    keywords: ["démarrer", "commencer", "débuter", "processus", "étape", "rejoindre", "contact"],
  },
];

function findAnswer(input: string): string {
  const normalized = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const scores = faqs.map((faq) => {
    const hits = faq.keywords.filter((kw) =>
      normalized.includes(kw.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    );
    return { faq, score: hits.length };
  });
  scores.sort((a, b) => b.score - a.score);
  if (scores[0].score > 0) return scores[0].faq.answer;
  return "Je n'ai pas trouvé de réponse précise à votre question. Contactez-nous au **09 78 25 07 46** ou à **contact@trinexta.fr** — un expert vous répond sous 24h !";
}

function ChatMessage({ msg }: { msg: Message }) {
  const isBot = msg.from === "bot";
  return (
    <div className={`flex gap-2 ${isBot ? "" : "flex-row-reverse"}`}>
      {isBot && (
        <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold bg-gradient-to-br from-[#1a5c96] to-[#5c92b8]">
          T
        </div>
      )}
      <div
        className={`max-w-[85%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed ${
          isBot
            ? "rounded-tl-sm bg-white border border-[#d0e4f0] text-[#1e4a72]"
            : "rounded-tr-sm bg-gradient-to-br from-[#1a5c96] to-[#5c92b8] text-white"
        }`}
        dangerouslySetInnerHTML={{
          __html: msg.text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
        }}
      />
    </div>
  );
}

export default function ChatbotFloat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Bonjour 👋 Je suis l'assistant Trinexta. Posez-moi une question sur nos services, tarifs ou interventions !" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: findAnswer(msg) }]);
      setTyping(false);
    }, 800 + Math.random() * 400);
  };

  const quickReplies = ["Tarifs", "Audit gratuit", "Zone d'intervention", "Cybersécurité", "Démarrer"];

  return (
    <>
      {/* ── Bulle flottante ── */}
      <div className="fixed bottom-20 right-6 z-[200] flex flex-col items-end gap-2">
        {/* Tooltip */}
        {!open && (
          <div className="bg-white border border-[#d0e4f0] text-[#1e4a72] text-xs font-semibold px-4 py-2 rounded-full shadow-md whitespace-nowrap">
            Une question ?
          </div>
        )}

        {/* Bouton */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all"
          style={{
            background: "linear-gradient(135deg, #0a233e, #1a5c96)",
            boxShadow: "0 8px 32px rgba(26,92,150,0.4)",
          }}
          aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>

        {/* Badge non-lu */}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white text-[8px] flex items-center justify-center text-white font-bold">
            1
          </span>
        )}
      </div>

      {/* ── Panel chat ── */}
      {open && (
        <div
          className="fixed bottom-40 right-6 z-[199] w-[340px] flex flex-col rounded-[24px] overflow-hidden"
          style={{ maxHeight: "480px", boxShadow: "0 24px 80px rgba(10,35,62,0.25)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0 bg-gradient-to-r from-[#0a233e] to-[#1a5c96]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-sm">
                T
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">Assistant Trinexta</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/60 text-[10px]">Répond en quelques secondes</span>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f8fbff]"
            style={{ maxHeight: "280px" }}
          >
            {messages.map((m, i) => <ChatMessage key={i} msg={m} />)}
            {typing && (
              <div className="flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold bg-gradient-to-br from-[#1a5c96] to-[#5c92b8]">T</div>
                <div className="px-3 py-2.5 bg-white border border-[#d0e4f0] rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#5c92b8] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 flex gap-1.5 overflow-x-auto shrink-0 bg-[#f0f7ff] border-t border-[#d0e4f0]">
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold border border-[#c8dff0] bg-white text-[#1a5c96] hover:bg-[#5c92b8] hover:text-white hover:border-[#5c92b8] transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-[#d0e4f0] flex gap-2 items-center shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Votre question…"
              className="flex-1 text-xs px-3 py-2 rounded-full border border-[#c8dff0] text-[#1e4a72] bg-[#f8fbff] outline-none focus:border-[#5c92b8] transition-colors"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-[#1a5c96] to-[#5c92b8] hover:scale-105 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>

          {/* Branding */}
          <div className="bg-white text-center py-1.5 border-t border-[#f0f7ff] shrink-0">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#b0c8e0]">
              Propulsé par Trinexta
            </span>
          </div>
        </div>
      )}
    </>
  );
}
