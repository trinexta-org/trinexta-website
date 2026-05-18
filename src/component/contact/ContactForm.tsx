"use client";
import { useState } from "react";
type Segment = "devis" | "support" | "candidature" | "autre";
interface CommonFields {
  prenom: string;
  nom: string;
  email: string;
}
interface DevisFields {
  entreprise: string;
  taille: string;
  secteur: string;
  message: string;
}

interface SupportFields {
  entreprise: string;
  urgence: "low" | "medium" | "high" | "critical" | "";
  description: string;
}

interface CandidatureFields {
  poste: string;
  message: string;
}

interface AutreFields {
  message: string;
}
const SEGMENTS: { id: Segment; label: string; description: string }[] = [
  {
    id: "devis",
    label: "Je suis prospect, je veux un devis",
    description: "Obtenez une offre personnalisée",
  },
  {
    id: "support",
    label: "Je suis client, j'ai besoin de support",
    description: "Assistance technique prioritaire",
  },
  {
    id: "candidature",
    label: "Je veux postuler",
    description: "Rejoindre l'équipe Trinexta",
  },
  { id: "autre", label: "Autre demande", description: "Toute autre question" },
];
const TAILLES = [
  "1-10 collaborateurs",
  "11-50 collaborateurs",
  "51-200 collaborateurs",
  "201-500 collaborateurs",
  "500+ collaborateurs",
];

const SECTEURS = [
  "Industrie & Manufacturing",
  "Services & Conseil",
  "Commerce & Distribution",
  "Santé & Médical",
  "Finance & Assurance",
  "Éducation & Formation",
  "Transport & Logistique",
  "Autre",
];

const URGENCES = [
  { value: "low", label: "Faible : sous 72h", color: "#22c55e" },
  { value: "medium", label: "Normal : sous 24h", color: "#f59e0b" },
  { value: "high", label: "Élevé : sous 4h", color: "#ef4444" },
  { value: "critical", label: "Critique : immédiat", color: "#7c3aed" },
] as const;
{
  /*Bonne question. Ça sert à stocker les valeurs de chaque segment séparément, comme ça quand
 l'utilisateur switche entre les segments ses données ne sont pas perdues.*/
}
export default function ContactForm() {
  const [activeSegment, setActiveSegment] = useState<Segment>("devis");
  const [common, setCommon] = useState<CommonFields>({
    prenom: "",
    nom: "",
    email: "",
  });
  const [devis, setDevis] = useState<DevisFields>({
    entreprise: "",
    taille: "",
    secteur: "",
    message: "",
  });
  const [support, setSupport] = useState<SupportFields>({
    entreprise: "",
    urgence: "",
    description: "",
  });
  const [candidature, setCandidature] = useState<CandidatureFields>({
    poste: "",
    message: "",
  });
  const [autre, setAutre] = useState<AutreFields>({ message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  function validate(): boolean {
    const next: Record<string, string> = {};

    if (!common.prenom.trim()) next.prenom = "Prénom requis";
    if (!common.nom.trim()) next.nom = "Nom requis";
    if (!common.email.trim()) next.email = "Email requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(common.email))
      next.email = "Email invalide";

    if (activeSegment === "devis") {
      if (!devis.entreprise.trim()) next.entreprise = "Entreprise requise";
      if (!devis.taille) next.taille = "Taille requise";
      if (!devis.secteur) next.secteur = "Secteur requis";
      if (!devis.message.trim()) next.message = "Message requis";
    }

    if (activeSegment === "support") {
      if (!support.entreprise.trim()) next.entreprise = "Entreprise requise";
      if (!support.urgence) next.urgence = "Urgence requise";
      if (!support.description.trim()) next.description = "Description requise";
    }

    if (activeSegment === "candidature") {
      if (!candidature.poste.trim()) next.poste = "Poste requis";
      if (!candidature.message.trim()) next.message = "Profil requis";
    }

    if (activeSegment === "autre") {
      if (!autre.message.trim()) next.message = "Message requis";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleCommonChange(key: keyof CommonFields, value: string) {
    setCommon((prev) => ({ ...prev, [key]: value }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeSegment,
          ...common,
          ...(activeSegment === "devis" && devis),
          ...(activeSegment === "support" && support),
          ...(activeSegment === "candidature" && candidature),
          ...(activeSegment === "autre" && autre),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#0a233e] mb-2">
            Message envoyé !
          </h3>
          <p className="text-sm text-[#6b7280] max-w-sm leading-relaxed">
            {activeSegment === "support"
              ? "Votre ticket a été créé. Notre équipe vous contactera selon le niveau d'urgence indiqué."
              : activeSegment === "candidature"
                ? "Votre candidature a bien été reçue. Un recruteur reviendra vers vous rapidement."
                : "Merci pour votre message. Nous vous répondrons dans les 24h ouvrées."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
      aria-label="Formulaire de contact"
    >
      {/* Sélection segment */}
      <fieldset className="border-0 p-0 m-0">
        <legend className="text-base font-semibold text-[#0a233e] mb-3">
          Quel est le motif de votre contact ?
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SEGMENTS.map(({ id, label, description }) => (
            <label
              key={id}
              className={`flex flex-col gap-0.5 rounded-xl border px-4 py-3.5 cursor-pointer transition-all duration-150 select-none
                ${
                  activeSegment === id
                    ? "border-[#0a233e] bg-[#0a233e] text-white"
                    : "border-[#d1dce8] bg-white text-[#374151] hover:border-[#5c92b8]"
                }`}
            >
              <input
                type="radio"
                name="segment"
                value={id}
                checked={activeSegment === id}
                onChange={() => setActiveSegment(id)}
                className="sr-only"
              />
              <span className="text-sm font-medium leading-snug">{label}</span>
              <span
                className={`text-xs ${activeSegment === id ? "text-[#93b8d4]" : "text-[#9ca3af]"}`}
              >
                {description}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Champs communs */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Prénom */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#0a233e]">
            Prénom <span className="text-[#5c92b8]">*</span>
          </label>
          <input
            type="text"
            autoComplete="given-name"
            placeholder="Jean"
            value={common.prenom}
            onChange={(e) => handleCommonChange("prenom", e.target.value)}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#0a233e] placeholder:text-[#9ca3af] outline-none focus:ring-2 transition-all
              ${errors.prenom ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-[#d1dce8] bg-white focus:border-[#5c92b8] focus:ring-[#5c92b8]/20"}`}
          />
          {errors.prenom && <p className="text-xs text-red-500">{errors.prenom}</p>}
        </div>

        {/* Nom */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#0a233e]">
            Nom <span className="text-[#5c92b8]">*</span>
          </label>
          <input
            type="text"
            autoComplete="family-name"
            placeholder="Dupont"
            value={common.nom}
            onChange={(e) => handleCommonChange("nom", e.target.value)}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#0a233e] placeholder:text-[#9ca3af] outline-none focus:ring-2 transition-all
              ${errors.nom ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-[#d1dce8] bg-white focus:border-[#5c92b8] focus:ring-[#5c92b8]/20"}`}
          />
          {errors.nom && <p className="text-xs text-red-500">{errors.nom}</p>}
        </div>
      </div>
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#0a233e]">
          Email <span className="text-[#5c92b8]">*</span>
        </label>
        <input
          type="email"
          autoComplete="email"
          placeholder="jean.dupont@entreprise.fr"
          value={common.email}
          onChange={(e) => handleCommonChange("email", e.target.value)}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm text-[#0a233e] placeholder:text-[#9ca3af] outline-none focus:ring-2 transition-all
      ${errors.email ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-[#d1dce8] bg-white focus:border-[#5c92b8] focus:ring-[#5c92b8]/20"}`}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      {/* devis */}
      {activeSegment === "devis" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0a233e]">
              Entreprise <span className="text-[#5c92b8]">*</span>
            </label>
            <input
              type="text"
              placeholder="Trinexta SAS"
              value={devis.entreprise}
              onChange={(e) =>
                setDevis((prev) => ({ ...prev, entreprise: e.target.value }))
              }
              className="w-full rounded-lg border border-[#d1dce8] bg-white px-4 py-2.5 text-sm text-[#0a233e] placeholder:text-[#9ca3af] outline-none focus:border-[#5c92b8] focus:ring-2 focus:ring-[#5c92b8]/20"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#0a233e]">
                Taille <span className="text-[#5c92b8]">*</span>
              </label>
              <select
                value={devis.taille}
                onChange={(e) =>
                  setDevis((prev) => ({ ...prev, taille: e.target.value }))
                }
                className="w-full rounded-lg border border-[#d1dce8] bg-white px-4 py-2.5 text-sm text-[#0a233e] outline-none focus:border-[#5c92b8] focus:ring-2 focus:ring-[#5c92b8]/20"
              >
                <option value="">Sélectionner…</option>
                {TAILLES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#0a233e]">
                Secteur <span className="text-[#5c92b8]">*</span>
              </label>
              <select
                value={devis.secteur}
                onChange={(e) =>
                  setDevis((prev) => ({ ...prev, secteur: e.target.value }))
                }
                className="w-full rounded-lg border border-[#d1dce8] bg-white px-4 py-2.5 text-sm text-[#0a233e] outline-none focus:border-[#5c92b8] focus:ring-2 focus:ring-[#5c92b8]/20"
              >
                <option value="">Sélectionner…</option>
                {SECTEURS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0a233e]">
              Votre besoin <span className="text-[#5c92b8]">*</span>
            </label>
            <textarea
              placeholder="Décrivez votre projet…"
              value={devis.message}
              onChange={(e) =>
                setDevis((prev) => ({ ...prev, message: e.target.value }))
              }
              rows={4}
              className="w-full rounded-lg border border-[#d1dce8] bg-white px-4 py-2.5 text-sm text-[#0a233e] placeholder:text-[#9ca3af] outline-none focus:border-[#5c92b8] focus:ring-2 focus:ring-[#5c92b8]/20 resize-none"
            />
          </div>
        </div>
      )}
      {/* support */}
      {activeSegment === "support" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0a233e]">
              Entreprise <span className="text-[#5c92b8]">*</span>
            </label>
            <input
              type="text"
              placeholder="Nom de votre société"
              value={support.entreprise}
              onChange={(e) =>
                setSupport((prev) => ({ ...prev, entreprise: e.target.value }))
              }
              className="w-full rounded-lg border border-[#d1dce8] bg-white px-4 py-2.5 text-sm text-[#0a233e] placeholder:text-[#9ca3af] outline-none focus:border-[#5c92b8] focus:ring-2 focus:ring-[#5c92b8]/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0a233e]">
              Niveau d'urgence <span className="text-[#5c92b8]">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {URGENCES.map(({ value, label, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setSupport((prev) => ({ ...prev, urgence: value }))
                  }
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm text-left transition-all duration-150
              ${
                support.urgence === value
                  ? "border-[#0a233e] bg-[#0a233e] text-white"
                  : "border-[#d1dce8] bg-white text-[#374151] hover:border-[#5c92b8]"
              }`}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor:
                        support.urgence === value ? "white" : color,
                    }}
                  />
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0a233e]">
              Description <span className="text-[#5c92b8]">*</span>
            </label>
            <textarea
              placeholder="Décrivez le problème, depuis quand, les systèmes impactés…"
              value={support.description}
              onChange={(e) =>
                setSupport((prev) => ({ ...prev, description: e.target.value }))
              }
              rows={4}
              className="w-full rounded-lg border border-[#d1dce8] bg-white px-4 py-2.5 text-sm text-[#0a233e] placeholder:text-[#9ca3af] outline-none focus:border-[#5c92b8] focus:ring-2 focus:ring-[#5c92b8]/20 resize-none"
            />
          </div>
        </div>
      )}
      {/* candidature */}
      {activeSegment === "candidature" && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0a233e]">
              Poste visé <span className="text-[#5c92b8]">*</span>
            </label>
            <input
              type="text"
              placeholder="Technicien helpdesk N2"
              value={candidature.poste}
              onChange={(e) =>
                setCandidature((prev) => ({ ...prev, poste: e.target.value }))
              }
              className="w-full rounded-lg border border-[#d1dce8] bg-white px-4 py-2.5 text-sm text-[#0a233e] placeholder:text-[#9ca3af] outline-none focus:border-[#5c92b8] focus:ring-2 focus:ring-[#5c92b8]/20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0a233e]">
              Votre profil & motivation{" "}
              <span className="text-[#5c92b8]">*</span>
            </label>
            <textarea
              placeholder="Décrivez votre parcours, vos compétences… Vous pouvez inclure un lien LinkedIn ou portfolio."
              value={candidature.message}
              onChange={(e) =>
                setCandidature((prev) => ({ ...prev, message: e.target.value }))
              }
              rows={5}
              className="w-full rounded-lg border border-[#d1dce8] bg-white px-4 py-2.5 text-sm text-[#0a233e] placeholder:text-[#9ca3af] outline-none focus:border-[#5c92b8] focus:ring-2 focus:ring-[#5c92b8]/20 resize-none"
            />
          </div>
          <p className="text-xs text-[#9ca3af]">
            Pas d'upload de CV — décrivez votre profil ou partagez un lien. Un
            recruteur vous contactera.
          </p>
        </div>
      )}

      {activeSegment === "autre" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#0a233e]">
            Votre message <span className="text-[#5c92b8]">*</span>
          </label>
          <textarea
            placeholder="Décrivez votre demande…"
            value={autre.message}
            onChange={(e) =>
              setAutre((prev) => ({ ...prev, message: e.target.value }))
            }
            rows={5}
            className="w-full rounded-lg border border-[#d1dce8] bg-white px-4 py-2.5 text-sm text-[#0a233e] placeholder:text-[#9ca3af] outline-none focus:border-[#5c92b8] focus:ring-2 focus:ring-[#5c92b8]/20 resize-none"
          />
        </div>
      )}
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 border border-red-100 px-4 py-3">
          <svg
            className="mt-0.5 flex-shrink-0 text-red-500"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div>
            <p className="text-sm font-medium text-red-700">
              Erreur lors de l'envoi
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              Réessayez ou appelez-nous au{" "}
              <a href="tel:+33978250746" className="underline">
                09 78 25 07 46
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={`w-full sm:w-auto px-8 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2
    ${
      status === "loading"
        ? "bg-[#5c92b8] text-white cursor-not-allowed opacity-70"
        : "bg-[#0a233e] text-white hover:bg-[#0d2d52] active:scale-[0.98]"
    }`}
      >
        {status === "loading" ? (
          "Envoi en cours…"
        ) : (
          <>
            {activeSegment === "devis" && "Demander mon devis"}
            {activeSegment === "support" && "Ouvrir un ticket support"}
            {activeSegment === "candidature" && "Envoyer ma candidature"}
            {activeSegment === "autre" && "Envoyer mon message"}
          </>
        )}
      </button>
    </form>
  );
}
