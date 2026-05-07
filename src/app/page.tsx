import Navbar from "@/components/Navbar";
import AssistantChat from "@/components/AssistantChat";

/* ── Shared style helpers ─────────────────────────────────── */
const section = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "0 32px",
} as const;

/* ── Service data ─────────────────────────────────────────── */
const SERVICES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Infogérance Proactive",
    desc: "Supervision 24/7 de votre parc. Interventions préventives avant que les pannes ne surviennent.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Cybersécurité",
    desc: "Protection endpoint, détection des menaces, audits et réponse aux incidents en temps réel.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </svg>
    ),
    title: "Microsoft 365",
    desc: "Administration complète de votre tenant M365 : licences, sécurité, conformité et formations.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    title: "Cloud & Infrastructure",
    desc: "Migration cloud, hébergement sécurisé, gestion de vos serveurs et réseaux d'entreprise.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    title: "Support Helpdesk",
    desc: "Assistance utilisateurs réactive par téléphone, email ou ticket. SLA garanti sous 4 heures.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: "Backup & Continuité",
    desc: "Sauvegardes automatisées, plans de reprise d'activité et restauration garantie de vos données.",
  },
];

/* ── Process data ─────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Audit",
    desc: "Analyse complète de votre infrastructure, identification des risques et cartographie de votre parc.",
  },
  {
    num: "02",
    title: "Sécurisation",
    desc: "Mise en place des protections, durcissement des systèmes et correction des vulnérabilités détectées.",
  },
  {
    num: "03",
    title: "Déploiement",
    desc: "Intégration de nos outils de supervision, migration des services et formation de vos équipes.",
  },
  {
    num: "04",
    title: "Suivi Continu",
    desc: "Monitoring permanent, rapports mensuels, évolutions proactives et support réactif inclus.",
  },
];

/* ── Testimonial data ─────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      "TRINEXTA a transformé notre gestion IT. Depuis 2 ans, zéro incident majeur. Nos équipes peuvent se concentrer sur leur cœur de métier.",
    name: "Sophie Marchetti",
    role: "Directrice, Marchetti & Associés",
    city: "Évry-Courcouronnes",
    initials: "SM",
    color: "#5c92b8",
  },
  {
    quote:
      "La réactivité de leur support est impressionnante. Nos tickets sont résolus en moins de 8 minutes en moyenne. Un vrai partenaire.",
    name: "Karim Benali",
    role: "DSI, BK Logistics",
    city: "Courcouronnes",
    initials: "KB",
    color: "#89b4d6",
  },
  {
    quote:
      "Ils ont sécurisé toute notre infrastructure en trois semaines. Le rapport d'audit était d'une précision remarquable. Je recommande.",
    name: "Élise Fontaine",
    role: "Associée, Fontaine Architectes",
    city: "Massy",
    initials: "EF",
    color: "#5c92b8",
  },
];

/* ── Partner logos (text SVGs) ────────────────────────────── */
function PartnerLogo({ name }: { name: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "6px 16px",
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        background: "white",
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#94a3b8",
          letterSpacing: "-0.01em",
        }}
      >
        {name}
      </span>
    </div>
  );
}

/* ── Trust badge ──────────────────────────────────────────── */
function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          background: "linear-gradient(135deg, #f0f8ff, #d8ecff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5c92b8",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 500 }}>{text}</span>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div style={{ background: "#f6fbff", minHeight: "100vh" }}>
      <Navbar />

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: 128,
          paddingBottom: 100,
        }}
      >
        {/* Blob background */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />

        <div style={{ ...section, position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 28,
              }}
            >
              {/* Badge */}
              <div
                className="animate-fade-up"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  width: "fit-content",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: 24,
                  padding: "6px 14px 6px 8px",
                  boxShadow: "0 1px 4px rgba(10,35,62,0.06)",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #5c92b8, #89b4d6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />
                </div>
                <span style={{ fontSize: 12.5, fontWeight: 500, color: "#0a233e" }}>
                  Infogérance & Cybersécurité — Île-de-France
                </span>
              </div>

              {/* Headline */}
              <div
                className="animate-fade-up"
                style={{ animationDelay: "0.08s" }}
              >
                <h1
                  style={{
                    margin: 0,
                    fontSize: "clamp(36px, 4.5vw, 54px)",
                    fontWeight: 800,
                    color: "#0a233e",
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Votre infrastructure IT,
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #5c92b8 0%, #0a233e 80%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    sous contrôle.
                  </span>
                </h1>
              </div>

              {/* Subheadline */}
              <p
                className="animate-fade-up"
                style={{
                  animationDelay: "0.14s",
                  margin: 0,
                  fontSize: 17,
                  color: "#475569",
                  lineHeight: 1.7,
                  maxWidth: 480,
                }}
              >
                TRINEXTA gère votre parc informatique, sécurise vos données et garantit votre continuité
                d&apos;activité — pour que vous puissiez vous concentrer sur votre métier.
              </p>

              {/* CTAs */}
              <div
                className="animate-fade-up"
                style={{
                  animationDelay: "0.2s",
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "white",
                    background: "#0a233e",
                    borderRadius: 9,
                    padding: "13px 22px",
                    textDecoration: "none",
                    boxShadow: "0 2px 12px rgba(10,35,62,0.18)",
                  }}
                >
                  Demander un audit gratuit
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a
                  href="#services"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#0a233e",
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: 9,
                    padding: "13px 22px",
                    textDecoration: "none",
                  }}
                >
                  Voir nos services
                </a>
              </div>

              {/* Trust badges */}
              <div
                className="animate-fade-up"
                style={{
                  animationDelay: "0.26s",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <TrustBadge
                  icon={
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  }
                  text="Réponse en moins de 4 heures"
                />
                <TrustBadge
                  icon={
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  }
                  text="99.9 % de disponibilité garantie"
                />
                <TrustBadge
                  icon={
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  }
                  text="Partenaire certifié Microsoft"
                />
              </div>

              {/* Partner logos */}
              <div
                className="animate-fade-up"
                style={{ animationDelay: "0.32s" }}
              >
                <p style={{ margin: "0 0 12px", fontSize: 11.5, color: "#94a3b8", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Technologies partenaires
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <PartnerLogo name="Microsoft" />
                  <PartnerLogo name="SentinelOne" />
                  <PartnerLogo name="Veeam" />
                </div>
              </div>
            </div>

            {/* Right — Chat */}
            <div
              className="animate-fade-up"
              style={{
                animationDelay: "0.18s",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <AssistantChat />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ──────────────────────────────────────────── */}
      <section
        id="services"
        style={{
          padding: "96px 0",
          background: "white",
          borderTop: "1px solid #f1f5f9",
        }}
      >
        <div style={section}>
          {/* Header */}
          <div style={{ marginBottom: 56, maxWidth: 560 }}>
            <p
              style={{
                margin: "0 0 14px",
                fontSize: 12,
                fontWeight: 600,
                color: "#5c92b8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Nos services
            </p>
            <h2
              style={{
                margin: "0 0 16px",
                fontSize: "clamp(28px, 3vw, 38px)",
                fontWeight: 700,
                color: "#0a233e",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Tout ce dont votre IT a besoin,
              <br />en un seul contrat.
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: "#64748b", lineHeight: 1.7 }}>
              Des services complets et intégrés pour couvrir chaque aspect de votre infrastructure informatique.
            </p>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {SERVICES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="service-card"
                style={{
                  background: "#fafcff",
                  border: "1px solid #e8f0f8",
                  borderRadius: 16,
                  padding: "28px 26px",
                  boxShadow: "0 1px 4px rgba(10,35,62,0.04)",
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #f0f8ff, #d8ecff)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#5c92b8",
                    marginBottom: 18,
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    margin: "0 0 9px",
                    fontSize: 15.5,
                    fontWeight: 600,
                    color: "#0a233e",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13.5,
                    color: "#64748b",
                    lineHeight: 1.65,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESSUS ─────────────────────────────────────────── */}
      <section
        id="processus"
        style={{
          padding: "96px 0",
          background: "#f6fbff",
        }}
      >
        <div style={section}>
          <div style={{ marginBottom: 64, textAlign: "center" }}>
            <p
              style={{
                margin: "0 0 14px",
                fontSize: 12,
                fontWeight: 600,
                color: "#5c92b8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Notre méthode
            </p>
            <h2
              style={{
                margin: "0 0 16px",
                fontSize: "clamp(28px, 3vw, 38px)",
                fontWeight: 700,
                color: "#0a233e",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Un processus structuré,
              <br />des résultats prévisibles.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
            }}
          >
            {STEPS.map(({ num, title, desc }, i) => (
              <div
                key={num}
                style={{
                  position: "relative",
                  padding: "0 28px 0 0",
                }}
              >
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 22,
                      left: "calc(50% + 20px)",
                      right: -4,
                      height: 1,
                      background: "linear-gradient(to right, #e2e8f0 70%, transparent)",
                    }}
                  />
                )}

                {/* Step number */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "white",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#5c92b8",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {num}
                  </span>
                </div>

                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#0a233e",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13.5,
                    color: "#64748b",
                    lineHeight: 1.7,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ───────────────────────────────────────── */}
      <section
        id="temoignages"
        style={{
          padding: "96px 0",
          background: "white",
          borderTop: "1px solid #f1f5f9",
        }}
      >
        <div style={section}>
          <div style={{ marginBottom: 56, maxWidth: 520 }}>
            <p
              style={{
                margin: "0 0 14px",
                fontSize: 12,
                fontWeight: 600,
                color: "#5c92b8",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Témoignages
            </p>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(28px, 3vw, 38px)",
                fontWeight: 700,
                color: "#0a233e",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              Des PME qui nous font confiance
              <br />au quotidien.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {TESTIMONIALS.map(({ quote, name, role, city, initials, color }) => (
              <div
                key={name}
                style={{
                  background: "#fafcff",
                  border: "1px solid #e8f0f8",
                  borderRadius: 16,
                  padding: "28px 26px",
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p
                  style={{
                    margin: "0 0 22px",
                    fontSize: 14,
                    color: "#334155",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${color}30, ${color}18)`,
                      border: `1px solid ${color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color,
                      flexShrink: 0,
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: "#0a233e" }}>{name}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
                      {role} — {city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─────────────────────────────────────────── */}
      <section
        id="contact"
        style={{
          padding: "112px 0",
          background: "#081726",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dark section blobs */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(92,146,184,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
            top: -120,
            right: -80,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(137,180,214,0.08) 0%, transparent 70%)",
            filter: "blur(64px)",
            bottom: -80,
            left: -60,
            pointerEvents: "none",
          }}
        />

        <div style={{ ...section, position: "relative", zIndex: 1, textAlign: "center" }}>
          <p
            style={{
              margin: "0 0 18px",
              fontSize: 12,
              fontWeight: 600,
              color: "#5c92b8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Prêt à passer à l&apos;étape suivante ?
          </p>
          <h2
            style={{
              margin: "0 0 20px",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Votre IT entre de bonnes mains.
            <br />
            <span style={{ color: "#5c92b8" }}>Commençons ensemble.</span>
          </h2>
          <p
            style={{
              margin: "0 auto 40px",
              fontSize: 17,
              color: "#89b4d6",
              lineHeight: 1.7,
              maxWidth: 520,
            }}
          >
            Audit gratuit de votre infrastructure. Résultats sous 48 heures.
            Sans engagement, sans frais cachés.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:contact@trinexta.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 15,
                fontWeight: 600,
                color: "#0a233e",
                background: "white",
                borderRadius: 10,
                padding: "14px 26px",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Demander un audit gratuit
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="tel:+33123456789"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 15,
                fontWeight: 500,
                color: "#d8ecff",
                background: "transparent",
                border: "1px solid rgba(216,236,255,0.2)",
                borderRadius: 10,
                padding: "14px 26px",
                textDecoration: "none",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Nous appeler
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────── */}
      <footer
        style={{
          background: "#050f1a",
          padding: "48px 0 32px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={section}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 48,
              marginBottom: 48,
            }}
          >
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "linear-gradient(135deg, #0a233e 0%, #5c92b8 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8L8 2L14 8L8 14L2 8Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="8" cy="8" r="2" fill="white" />
                  </svg>
                </div>
                <span style={{ fontSize: 16, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>
                  TRINEXTA
                </span>
              </div>
              <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "#64748b", lineHeight: 1.7, maxWidth: 260 }}>
                Votre partenaire IT en Île-de-France. Infogérance, cybersécurité et support pour les PME.
              </p>
              <p style={{ margin: 0, fontSize: 12.5, color: "#475569" }}>
                Île-de-France · Essonne · Évry
              </p>
            </div>

            {/* Column */}
            {[
              {
                title: "Services",
                links: ["Infogérance", "Cybersécurité", "Microsoft 365", "Cloud", "Helpdesk", "Backup"],
              },
              {
                title: "Entreprise",
                links: ["À propos", "Nos valeurs", "Équipe", "Partenaires", "Carrières"],
              },
              {
                title: "Contact",
                links: ["Prendre RDV", "Support", "Urgences IT", "Mentions légales", "CGV"],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <p
                  style={{
                    margin: "0 0 16px",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {title}
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer-link">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ margin: 0, fontSize: 12.5, color: "#334155" }}>
              © 2026 TRINEXTA. Tous droits réservés.
            </p>
            <p style={{ margin: 0, fontSize: 12.5, color: "#1e293b" }}>
              Hébergé en France · RGPD conforme
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
