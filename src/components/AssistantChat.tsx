"use client";

import { useEffect, useRef, useState } from "react";

type MessageType = "system" | "user" | "assistant";

interface Message {
  id: string;
  type: MessageType;
  content: string;
}

const SCRIPTED: Record<string, string> = {
  "Statut backups":
    "Tous les backups sont nominaux. Dernier run ce matin à 03h14 — 47 postes couverts. Aucune erreur détectée. Prochain run planifié à 23h00.",
  "Alertes actives":
    "1 alerte en cours de traitement : tentative de connexion inhabituelle sur le poste de M. Dupont (Paris 15e). Isolement automatique effectué à 09h47. Nos équipes analysent l'incident.",
  "Mon M365":
    "Votre tenant Microsoft 365 est synchronisé. 0 licence inactive. Score Secure Score : 78/100. Dernière vérification il y a 12 minutes. Aucune anomalie.",
  "Derniers tickets":
    "3 tickets résolus aujourd'hui. Temps moyen de résolution : 6 min. 0 ticket en attente. SLA 100 % respecté sur les 30 derniers jours.",
};

const DEFAULT_RESPONSE =
  "Demande bien reçue. Un technicien TRINEXTA vous répond dans les 4 heures, conformément à votre contrat de service. Un email de confirmation vous a été envoyé.";

const INIT_EVENTS = [
  "Backup complété — 47 postes",
  "Alerte de sécurité résolue",
  "Mise à jour M365 déployée",
];

const CHIPS = ["Statut backups", "Alertes actives", "Mon M365", "Derniers tickets"];

export default function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    INIT_EVENTS.forEach((content, i) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: `sys-${i}`, type: "system", content },
        ]);
      }, 500 + i * 850);
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const content = text.trim();
    if (!content || typing) return;

    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, type: "user", content },
    ]);
    setInput("");
    setTyping(true);

    setTimeout(
      () => {
        const reply = SCRIPTED[content] ?? DEFAULT_RESPONSE;
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, type: "assistant", content: reply },
        ]);
      },
      1300 + Math.random() * 700
    );
  }

  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        border: "1px solid #e2e8f0",
        boxShadow: "0 8px 48px rgba(10,35,62,0.11), 0 2px 8px rgba(10,35,62,0.05)",
        display: "flex",
        flexDirection: "column",
        height: 468,
        width: "100%",
        maxWidth: 480,
        overflow: "hidden",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid #f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "linear-gradient(135deg, #0a233e 0%, #5c92b8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8L8 2L14 8L8 14L2 8Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0a233e", lineHeight: 1.2 }}>
              Assistant TRINEXTA
            </p>
            <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", lineHeight: 1.4 }}>
              Support & Monitoring
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 0 3px rgba(34,197,94,0.18)",
            }}
          />
          <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>En ligne</span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="chat-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {messages.length === 0 && (
          <p style={{ margin: "auto", fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
            Initialisation du système…
          </p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className="msg-in"
            style={{
              display: "flex",
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.type === "system" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  background: "#f8fafc",
                  border: "1px solid #f1f5f9",
                  borderRadius: 8,
                  padding: "6px 11px",
                  fontSize: 12,
                  color: "#64748b",
                  maxWidth: "92%",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {msg.content}
                <span style={{ marginLeft: "auto", paddingLeft: 8, fontSize: 10, color: "#cbd5e1" }}>sys</span>
              </div>
            )}

            {msg.type === "user" && (
              <div
                style={{
                  background: "#0a233e",
                  color: "white",
                  borderRadius: "14px 14px 3px 14px",
                  padding: "10px 14px",
                  fontSize: 13,
                  maxWidth: "82%",
                  lineHeight: 1.55,
                }}
              >
                {msg.content}
              </div>
            )}

            {msg.type === "assistant" && (
              <div
                style={{
                  background: "#f0f8ff",
                  border: "1px solid #d8ecff",
                  color: "#0a233e",
                  borderRadius: "3px 14px 14px 14px",
                  padding: "10px 14px",
                  fontSize: 13,
                  maxWidth: "88%",
                  lineHeight: 1.65,
                }}
              >
                <p
                  style={{
                    margin: "0 0 5px",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#5c92b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  TRINEXTA
                </p>
                {msg.content}
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                background: "#f0f8ff",
                border: "1px solid #d8ecff",
                borderRadius: "3px 14px 14px 14px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
      </div>

      {/* Suggestion chips */}
      <div
        style={{
          padding: "8px 16px 0",
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          flexShrink: 0,
        }}
      >
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => send(chip)}
            disabled={typing}
            style={{
              background: "transparent",
              border: "1px solid #e2e8f0",
              borderRadius: 20,
              padding: "4px 11px",
              fontSize: 11.5,
              color: "#5c92b8",
              cursor: typing ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              opacity: typing ? 0.5 : 1,
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseOver={(e) => {
              if (!typing) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#5c92b8";
                (e.currentTarget as HTMLButtonElement).style.background = "#f0f8ff";
              }
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "10px 14px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
          borderTop: "1px solid #f1f5f9",
          marginTop: 8,
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Posez une question…"
          disabled={typing}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: 13,
            color: "#1e293b",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || typing}
          style={{
            width: 34,
            height: 34,
            background: input.trim() && !typing ? "#0a233e" : "#e2e8f0",
            border: "none",
            borderRadius: 9,
            cursor: input.trim() && !typing ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: input.trim() && !typing ? "white" : "#94a3b8",
            transition: "background 0.15s",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
