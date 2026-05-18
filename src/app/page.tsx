"use client";
import { Inter } from "next/font/google";
import React, { useState, useEffect, useRef } from "react";
import ChatbotFloat from "./ChatbotFloat";

const inter = Inter({ subsets: ["latin"] });

// Hook compteur animé
function useCounter(
  target: number,
  duration: number = 2000,
  start: boolean = false,
) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [kpiVisible, setKpiVisible] = useState(false);
  const kpiRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: "01",
      title: "Audit gratuit",
      desc: "Analyse complète de votre parc et de vos besoins spécifiques en 1h.",
      img: "/im1.jpg",
    },
    {
      num: "02",
      title: "Conception",
      desc: "Réception d'une offre sur mesure et transparente sous 24h ouvrées.",
      img: "/im2.jpg",
    },
    {
      num: "03",
      title: "Déploiement",
      desc: "Mise en place de nos outils et prise en main de votre infrastructure par notre équipe.",
      img: "/im3.jpg",
    },
    {
      num: "04",
      title: "Suivi continu",
      desc: "Monitoring, maintenance proactive et support illimité au quotidien.",
      img: "/im4.jpg",
    },
  ];

  const tickerItems = [
    "Cybermalveillance.gouv.fr — <strong>partenaire officiel</strong>",
    "CLUSIF — <strong>membre certifié</strong>",
    "ExpertCyber — <strong>label national</strong>",
    "France Cybersecurity — <strong>certifié 2025</strong>",
    "<strong>320 postes</strong> infogérés en IDF",
    "Réponse garantie <strong>sous 4h</strong> sur site",
    "<strong>12 ans</strong> d'expertise en infogérance",
    "<strong>Sans engagement</strong> — résiliable à tout moment",
  ];

  const cibles = [
    {
      num: "1",
      title: "Indépendants",
      desc: "Consultants, freelances et professions libérales. Nous devenons votre département informatique personnel pour vous laisser vous concentrer sur votre métier.",
      img: "/probabilite-2.jpg",
      align: "right",
    },
    {
      num: "2",
      title: "Cabinets professionnels",
      desc: "Avocats, notaires et experts-comptables. Nous garantissons une confidentialité absolue et une haute disponibilité pour vos dossiers critiques.",
      img: "/femme-avocate.jpg",
      align: "left",
    },
    {
      num: "3",
      title: "PME en croissance",
      desc: "Entreprises de 10 à 100 postes. Un accompagnement évolutif qui s'adapte à votre expansion sans jamais freiner votre sécurité.",
      img: "/empreinte-digitale.jpg",
      align: "right",
    },
  ];

  // FIX: engagements déplacé ici, dans le scope de Home (était dans EngagementsSection imbriquée)
  const engagements = [
    {
      title: "Équipe experte",
      desc: "Nos ingénieurs sont certifiés Microsoft, Sophos et OVHcloud. Vous bénéficiez d'une expertise de haut niveau sans recruter.",
      icon: (
        <svg
          className="w-6 h-6 text-[#5c92b8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      ),
    },
    {
      title: "Solutions sur mesure",
      desc: "Pas de copier-coller. Chaque client reçoit une architecture adaptée à son secteur, sa taille et ses contraintes réelles.",
      icon: (
        <svg
          className="w-6 h-6 text-[#5c92b8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
          />
        </svg>
      ),
    },
    {
      title: "Interlocuteur unique",
      desc: "Un gestionnaire de compte dédié connaît votre infrastructure par cœur. Fini les tickets perdus et les explications répétées.",
      icon: (
        <svg
          className="w-6 h-6 text-[#5c92b8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Transparence totale",
      desc: "Rapport mensuel d'activité détaillé, facturation claire, aucun coût caché. Vous savez exactement ce que vous payez.",
      icon: (
        <svg
          className="w-6 h-6 text-[#5c92b8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zm4 0v-11a2 2 0 012-2h2a2 2 0 012 2v11a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setKpiVisible(true);
      },
      { threshold: 0.3 },
    );
    if (kpiRef.current) observer.observe(kpiRef.current);
    return () => observer.disconnect();
  }, []);

  const kpi1 = useCounter(320, 2000, kpiVisible);
  const kpi2 = useCounter(12, 1500, kpiVisible);
  const kpi3 = useCounter(87, 1800, kpiVisible);

  const reviews = [
    {
      name: "Marc Antoine",
      role: "Cabinet d'Avocats",
      text: "Depuis que Trinexta gère notre parc, nous n'avons plus aucune interruption. La sécurité est enfin au rendez-vous.",
      img: "/entr1.jpg",
    },
    {
      name: "Sophie Laurent",
      role: "Retail Luxe",
      text: "Le déploiement du Wi-Fi invité et la maintenance des caisses sont parfaits. Réactifs et très pro.",
      img: "/entr2.jpg",
    },
    {
      name: "Jean-Pierre",
      role: "Expert-Comptable",
      text: "Un audit gratuit qui a révélé des failles critiques. Merci pour votre transparence et votre efficacité.",
      img: "/entr3.jpg",
    },
    {
      name: "Elena R.",
      role: "Professions Libérales",
      text: "Support technique disponible même tard le soir. C'est le partenaire informatique que je cherchais depuis longtemps.",
      img: "/entr5.jpg",
    },
    {
      name: "Thomas D.",
      role: "Startup Tech",
      text: "L'onboarding de nos nouveaux collaborateurs se fait en 5 minutes. Une agilité indispensable pour notre croissance.",
      img: "/entr6.jpg",
    },
    {
      name: "Camille B.",
      role: "Agence de Com",
      text: "Monitoring efficace et maintenance proactive. On ne se rend même plus compte qu'on a un parc informatique !",
      img: "/entr7.jpg",
    },
  ];

  const blogPosts = [
    {
      date: "12 Mai 2026",
      title: "Cyberattaques : les 5 erreurs que font encore les PME en 2026",
      excerpt:
        "Phishing, mots de passe faibles, sauvegardes absentes… Voici les failles les plus exploitées et comment les corriger rapidement.",
      img: "/blog1.jpg",
    },
    {
      date: "28 Avril 2026",
      title:
        "Microsoft 365 Copilot : ce que ça change concrètement pour votre équipe",
      excerpt:
        "L'IA intégrée à votre suite bureautique peut économiser jusqu'à 2h par jour par collaborateur. On vous explique comment.",
      img: "/blog2.jpg",
    },
    {
      date: "10 Avril 2026",
      title: "Infogérance vs DSI interne : quel modèle pour votre entreprise ?",
      excerpt:
        "Coûts, réactivité, expertise… Comparatif objectif pour vous aider à faire le bon choix selon votre taille et secteur.",
      img: "/blog3.jpg",
    },
  ];

  return (
    <div className={inter.className} style={{ backgroundColor: "#f0f7ff" }}>
      <style>{`
        @keyframes scrollTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker-infinite {
          animation: scrollTicker 30s linear infinite;
        }
      `}</style>

      {/* ── TOP BAR ── */}
      <div
        className="w-full py-2 px-8 flex justify-between items-center text-xs"
        style={{ backgroundColor: "#0a233e", color: "rgba(255,255,255,0.75)" }}
      >
        <div className="flex items-center gap-6">
          <a
            href="tel:+33978250746"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <span>📞</span> 09 78 25 07 46
          </a>
          <a
            href="mailto:contact@trinexta.fr"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <span>✉</span> contact@trinexta.fr
          </a>
        </div>
        <div className="flex items-center gap-6">
          
          <a
            href="#"
            className="hover:text-[#5c92b8] transition-colors font-semibold"
            style={{ color: "#5c92b8" }}
          >
            Rejoignez-nous →
          </a>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-8 left-1/2 z-50 px-8 py-4 flex justify-between items-center"
        style={{
          transform: "translateX(-50%)",
          width: "90%",
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          borderRadius: "50px",
          boxShadow: "0 4px 30px rgba(10,35,62,0.08)",
        }}
      >
        <div
          className="font-bold text-xl tracking-widest"
          style={{ color: "#0a233e" }}
        >
          TRINEXTA
        </div>
        <div
          className="flex gap-8 text-sm font-medium"
          style={{ color: "#1e4a72" }}
        >
          <a href="#" className="hover:text-[#5c92b8] transition-colors">
            Accueil
          </a>
          <a href="#" className="hover:text-[#5c92b8] transition-colors">
            Nos offres
          </a>
          <a href="#" className="hover:text-[#5c92b8] transition-colors">
            Nos services
          </a>
          <a href="#" className="hover:text-[#5c92b8] transition-colors">
            Cas clients
          </a>
          <a href="#" className="hover:text-[#5c92b8] transition-colors">
            À propos
          </a>
          <a href="#" className="hover:text-[#5c92b8] transition-colors">
            Contact
          </a>
        </div>
        <a
          href="#"
          className="px-6 py-2 rounded-full text-sm font-medium text-white transition-all"
          style={{ backgroundColor: "#1a5c96" }}
        >
          Espace client
        </a>
      </nav>

     <section className="relative w-full h-screen p-4">
        <video autoPlay muted loop playsInline className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover" style={{ borderRadius: "24px" }}>
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-4" style={{ backgroundColor: "rgba(5,15,35,0.50)", borderRadius: "24px" }} />
        <div className="relative z-10 flex items-end h-full px-16 pb-16">
          <div className="flex w-full gap-12 items-end">
            <div className="flex-1 flex flex-col gap-6">
              <h1 className="text-6xl font-semibold text-white leading-tight tracking-tight">
                Votre informatique,<br />simplifiée.<br />
                <span style={{ color: "#a8d4f0" }}>Votre activité, sereine.</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                Support illimité, maintenance proactive et cybersécurité incluse pour les TPE et PME d'Île-de-France.
              </p>
              <div className="flex gap-4">
                <a href="#" className="px-7 py-3 rounded-full font-semibold text-white text-sm transition-all hover:opacity-90" style={{ backgroundColor: "#5c92b8" }}>Découvrir l'offre Sérénité</a>
                <a href="#" className="px-7 py-3 rounded-full font-medium text-white text-sm border border-white/40 hover:bg-white/10 transition-all">Être rappelé</a>
              </div>
            </div>
            <div className="flex flex-col gap-6 w-72 relative">
              <div className="absolute left-3 top-4 bottom-4 w-0.5" style={{ backgroundColor: "#5c92b8" }} />
              {[
                { icon: "∞", title: "Sans engagement", sub: "Résiliable à tout moment" },
                { icon: "⏱", title: "Réponse sous 24h", sub: "Jours ouvrés garantis" },
                { icon: "📍", title: "Intervention IDF", sub: "Sur toute l'Île-de-France" },
              ].map((badge, i) => (
                <div key={i} className="relative flex items-start gap-4 pl-10">
                  <div className="absolute left-0 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(92,146,184,0.2)", border: "2px solid #5c92b8" }}>
                    <span className="text-xs" style={{ color: "#5c92b8" }}>{badge.icon}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base">{badge.title}</p>
                    <p className="text-white/80 text-sm">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NOS SERVICES ── */}
      <section className="w-full py-20" style={{ backgroundColor: "#f0f7ff" }}>
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <p
              className="text-sm font-medium mb-2 tracking-widest"
              style={{ color: "#5c92b8" }}
            >
              CE QUE NOUS FAISONS
            </p>
            <h2 className="text-4xl font-bold" style={{ color: "#0a233e" }}>
              Nos services
            </h2>
          </div>
          <div className="relative flex flex-col gap-20">
            {[
              {
                img: "/surface-IMAGE1.jpg",
                title: "Support utilisateurs",
                desc: "Assistance illimitée par téléphone, email et prise en main à distance. Réponse garantie sous 4h.",
              },
              {
                img: "/IMAGE2-SURFACE.jpg",
                title: "Cybersécurité",
                desc: "Antivirus, pare-feu, sensibilisation des équipes et audit de sécurité inclus.",
              },
              {
                img: "/IMAGE3-unsplash.jpg",
                title: "Maintenance préventive",
                desc: "Mises à jour, sauvegardes automatiques et supervision proactive de vos équipements.",
              },
              {
                img: "/IMAGE4unsplash.jpg",
                title: "Cloud & mobilité",
                desc: "Migration et gestion de vos outils cloud : Microsoft 365, Google Workspace, stockage sécurisé.",
              },
            ].map((slide, i) => (
              <div
                key={i}
                className="sticky w-full h-150 rounded-[40px] overflow-hidden shadow-2xl"
                style={{
                  top: `${100 + i * 20}px`,
                  zIndex: i + 1,
                  marginTop: `${i * 20}px`,
                }}
              >
                <img
                  src={slide.img}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={slide.title}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 z-10 p-12 md:p-20 flex flex-col justify-end items-start">
                  <span className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs mb-4 border border-white/20">
                    Service 0{i + 1}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {slide.title}
                  </h3>
                  <p className="text-white/80 max-w-xl text-lg md:text-xl leading-relaxed mb-8">
                    {slide.desc}
                  </p>
                  <button
                    className="px-8 py-3 rounded-full font-bold text-white hover:scale-105 transition-transform"
                    style={{ backgroundColor: "#5c92b8" }}
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER BARRE FIXE ── */}
      <section className="fixed bottom-0 left-0 right-0 z-[100] w-full bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1400px] mx-auto flex items-center gap-6 px-6">
          <div className="shrink-0 flex items-center gap-3 border-r border-slate-200 pr-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Certifié & Reconnu
            </span>
          </div>
          <div className="flex-1 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white/95 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/95 to-transparent z-10" />
            <div className="flex w-max animate-ticker-infinite hover:[animation-play-state:paused]">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-10 text-sm whitespace-nowrap text-slate-600"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span
                    className="[&>strong]:font-bold [&>strong]:text-slate-900"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-3 bg-slate-900 text-white rounded-full px-5 py-2 transition-transform hover:scale-105 cursor-default">
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  className="w-3.5 h-3.5 fill-amber-400"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="flex items-center gap-2 border-l border-white/20 pl-3">
              <span className="text-xs font-bold">4.9/5</span>
              <span className="text-[10px] text-slate-400 font-medium">
                127 avis
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── POUR QUI ── */}
      <section className="w-full py-24 px-8 bg-[#f8fbfe]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-[11px] font-black tracking-[0.4em] mb-3 uppercase text-[#5c92b8]">
              Expertise métier
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a233e]">
              Pour qui ?
            </h2>
          </div>
          <div className="relative">
            {cibles.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-16 mb-32 last:mb-0 ${item.align === "left" ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1 flex justify-center relative group">
                  <div className="absolute inset-0 bg-blue-200/30 rounded-full blur-3xl group-hover:bg-blue-300/40 transition-colors duration-500 scale-75 -z-10" />
                  <div className="w-56 h-56 md:w-72 md:h-72 bg-white rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-center border border-white transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2 overflow-hidden p-10">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute -top-4 left-1/2 md:left-auto md:-right-4 -translate-x-1/2 md:translate-x-0 w-14 h-14 bg-[#5c92b8] text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg rotate-3">
                    {item.num}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-4xl font-bold text-[#0a233e] mb-5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl text-[#3a6a96]/80 leading-relaxed mb-8">
                    {item.desc}
                  </p>
                  <button className="inline-flex items-center gap-3 font-bold text-[#5c92b8] border-b-2 border-transparent hover:border-[#5c92b8] pb-1 transition-all group">
                    Découvrir nos offres
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </button>
                </div>
              </div>
            ))}
            <div className="hidden md:block absolute top-40 left-1/2 -bottom-20 w-px border-l-2 border-dashed border-slate-200 -z-20" />
          </div>
        </div>
      </section>

      {/* ── PROCESSUS 4 ÉTAPES ── */}
      <section
        className="w-full py-24 px-8 relative overflow-hidden"
        style={{ backgroundColor: "#f0f7ff" }}
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm font-black mb-3 tracking-[0.4em] text-[#5c92b8] uppercase">
              Notre approche
            </p>
            <h2
              className="text-5xl font-bold tracking-tight"
              style={{ color: "#0a233e" }}
            >
              Démarrer en 4 étapes
            </h2>
          </div>
          <div className="relative h-[480px] flex items-center justify-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col md:flex-row items-center gap-12 transition-all duration-1000 ease-in-out ${
                  index === currentStep
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 translate-x-20 scale-95 pointer-events-none"
                }`}
              >
                <div className="w-full md:w-1/2 aspect-square relative">
                  <div className="absolute inset-0 bg-[#5c92b8]/10 blur-[60px] rounded-full"></div>
                  <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-[#c8dff0] shadow-xl">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <span
                    className="text-7xl font-black block mb-4"
                    style={{ color: "#d0e4f0" }}
                  >
                    {step.num}
                  </span>
                  <h3
                    className="text-4xl font-bold mb-6 tracking-tight"
                    style={{ color: "#0a233e" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-xl leading-relaxed mb-8"
                    style={{ color: "#3a6a96" }}
                  >
                    {step.desc}
                  </p>
                  <div className="flex gap-2">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        onClick={() => setCurrentStep(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                          i === currentStep
                            ? "w-12 bg-[#5c92b8]"
                            : "w-4 bg-[#c8dff0] hover:bg-[#5c92b8]/50"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KPI ANIMÉS ── */}
      <section
        ref={kpiRef}
        className="w-full py-20"
        style={{ backgroundColor: "#0a233e" }}
      >
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                value: kpi1,
                suffix: "",
                label: "postes infogérés",
                sub: "en Île-de-France",
              },
              {
                value: kpi2,
                suffix: "",
                label: "années d'existence",
                sub: "d'expertise terrain",
              },
              {
                value: kpi3,
                suffix: "",
                label: "clients actifs",
                sub: "TPE & PME",
              },
              {
                value: 99,
                suffix: "%",
                label: "taux de satisfaction",
                sub: "vérifié Google",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-6 rounded-[24px]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(92,146,184,0.2)",
                }}
              >
                <span className="text-5xl font-black text-white">
                  {i === 3 ? item.value : kpiVisible ? item.value : 0}
                  {item.suffix}
                </span>
                <span
                  className="font-semibold text-sm"
                  style={{ color: "#5c92b8" }}
                >
                  {item.label}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full min-h-screen relative flex items-center justify-center py-24 px-4 md:px-8 overflow-hidden bg-[#f0f7ff]">
        {/* Image d'arrière-plan claire et visible */}
        <div className="absolute inset-0 z-0">
          <img
            src="/photo-groupe.jpg" // Ton image d'équipe finale
            alt="Équipe Trinexta"
            className="w-full h-full object-cover object-center"
          />

          {/* Voile bleu très clair et doux pour lier l'image au design du site sans l'assombrir */}
          <div className="absolute inset-0 bg-[#f0f7ff]/40 mix-blend-overlay" />

          {/* Dégradé blanc/bleu très léger pour adoucir le haut et le bas de la photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff]/90 via-transparent to-[#f0f7ff]/95" />
        </div>

        {/* Contenu de la section */}
        <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col justify-between h-full">
          {/* En-tête de section (Texte sombre pour contraster sur le fond clair) */}
          <div className="text-center mb-20 lg:mb-24">
            <p className="text-xs font-bold tracking-[0.3em] mb-3 uppercase text-[#5c92b8]">
              Nos engagements
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0a233e] tracking-tight sm:max-w-2xl mx-auto leading-tight">
              Pourquoi faire confiance à Trinexta ?
            </h2>
            <div className="w-16 h-1 bg-[#5c92b8] mx-auto mt-6 rounded-full" />
          </div>

          {/* Grille des engagements (Cartes blanches semi-transparentes pour laisser passer la photo) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
            {engagements.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-between p-8 rounded-2xl border border-[#d0e4f0]/60 
            bg-white/85 backdrop-blur-md transition-all duration-500 ease-out group 
            hover:border-[#5c92b8]/60 hover:bg-white/95 hover:-translate-y-2 
            shadow-[0_20px_40px_rgba(10,35,62,0.05)]"
              >
                <div>
                  {/* Numérotation épurée */}
                  <div className="text-xs font-mono font-bold tracking-widest text-[#5c92b8] mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    // 0{i + 1}
                  </div>

                  {/* Titre (Bleu foncé Trinexta) */}
                  <h3 className="font-bold text-xl mb-3 text-[#0a233e] tracking-tight transition-colors duration-300 group-hover:text-[#5c92b8]">
                    {item.title}
                  </h3>

                  {/* Description (Bleu de texte lisible) */}
                  <p className="text-[14px] leading-relaxed text-[#3a6a96] font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Ligne d'animation de focus au survol */}
                <div className="w-0 h-0.5 bg-[#5c92b8] mt-6 rounded-full transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── NOS OFFRES ── */}
      <section
        className="w-full py-24 px-8 relative overflow-hidden"
        style={{
          backgroundColor: "#e8f3fc",
          backgroundImage: `url('/Simple Squares.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#e8f3fc]/75 z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm font-bold mb-3 tracking-[0.3em] text-[#5c92b8] uppercase">
              Nos Formules
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{ color: "#0a233e" }}
            >
              Choisissez votre offre
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "#3a6a96" }}>
              Des formules adaptées à la taille et aux besoins de votre
              entreprise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Essentiel */}
            <div className="flex flex-col p-10 rounded-[40px] bg-white/70 backdrop-blur-md border border-[#c8dff0] hover:bg-white/90 transition-all duration-500">
              <div className="mb-8">
                <p className="text-[#5c92b8] font-bold text-xs tracking-widest mb-2 uppercase">
                  Essentiel
                </p>
                <div className="flex items-baseline gap-1">
                  <h3
                    className="text-4xl font-bold"
                    style={{ color: "#0a233e" }}
                  >
                    490€
                  </h3>
                  <span className="text-sm" style={{ color: "#5c92b8" }}>
                    /mois
                  </span>
                </div>
                <p className="text-sm mt-2" style={{ color: "#3a6a96" }}>
                  Pour les TPE jusqu'à 5 postes
                </p>
              </div>
              <ul
                className="flex flex-col gap-4 mb-10 grow text-sm"
                style={{ color: "#3a6a96" }}
              >
                {[
                  "Support illimité (8h-18h)",
                  "Maintenance préventive mensuelle",
                  "Antivirus et pare-feu inclus",
                  "Sauvegardes automatiques",
                  "1 intervention sur site/mois",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#5c92b8] font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full font-bold text-sm border border-[#5c92b8] text-[#1a5c96] hover:bg-[#5c92b8] hover:text-white transition-all">
                Demander un devis
              </button>
            </div>
            {/* Sérénité */}
            <div className="flex flex-col p-10 rounded-[40px] bg-white backdrop-blur-xl border-2 border-[#5c92b8] shadow-[0_0_40px_rgba(92,146,184,0.15)] relative transform md:scale-105 z-20">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#5c92b8] text-white text-[10px] font-black px-6 py-2 rounded-full tracking-widest uppercase">
                Le plus populaire
              </div>
              <div className="mb-8 mt-4">
                <p className="text-[#5c92b8] font-bold text-xs tracking-widest mb-2 uppercase">
                  Sérénité
                </p>
                <div className="flex items-baseline gap-1">
                  <h3
                    className="text-4xl font-bold"
                    style={{ color: "#0a233e" }}
                  >
                    890€
                  </h3>
                  <span className="text-sm" style={{ color: "#5c92b8" }}>
                    /mois
                  </span>
                </div>
                <p className="text-sm mt-2" style={{ color: "#3a6a96" }}>
                  Pour les PME jusqu'à 20 postes
                </p>
              </div>
              <ul
                className="flex flex-col gap-4 mb-10 grow text-sm"
                style={{ color: "#1e4a72" }}
              >
                {[
                  "Support illimité (7h-20h)",
                  "Maintenance préventive hebdomadaire",
                  "Cybersécurité avancée",
                  "Sauvegardes temps réel",
                  "Interventions sur site illimitées",
                  "Gestionnaire de compte dédié",
                  "Rapport mensuel d'activité",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#5c92b8] font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full font-bold text-sm bg-[#5c92b8] text-white hover:shadow-[0_0_20px_rgba(92,146,184,0.4)] transition-all">
                Découvrir l'offre
              </button>
            </div>
            {/* Enterprise */}
            <div className="flex flex-col p-10 rounded-[40px] bg-white/70 backdrop-blur-md border border-[#c8dff0] hover:bg-white/90 transition-all duration-500">
              <div className="mb-8">
                <p className="text-[#5c92b8] font-bold text-xs tracking-widest mb-2 uppercase">
                  Enterprise
                </p>
                <h3 className="text-4xl font-bold" style={{ color: "#0a233e" }}>
                  Sur mesure
                </h3>
                <p className="text-sm mt-2" style={{ color: "#3a6a96" }}>
                  Pour les entreprises 20+ postes
                </p>
              </div>
              <ul
                className="flex flex-col gap-4 mb-10 grow text-sm"
                style={{ color: "#3a6a96" }}
              >
                {[
                  "Support 24/7 dédié",
                  "Maintenance proactive quotidienne",
                  "SOC et cybersécurité enterprise",
                  "Infrastructure cloud sur mesure",
                  "Interventions illimitées prioritaires",
                  "DSI externalisé",
                  "SLA personnalisé",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#5c92b8] font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-full font-bold text-sm border border-[#5c92b8] text-[#1a5c96] hover:bg-[#5c92b8] hover:text-white transition-all">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAS CLIENTS ── */}
      <section
        className="w-full py-24 px-8"
        style={{ backgroundColor: "#f0f7ff" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-[#5c92b8] font-black tracking-[0.3em] text-xs uppercase mb-4">
                Résultats concrets
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight"
                style={{ color: "#0a233e" }}
              >
                Nos études de cas
              </h2>
            </div>
            <a
              href="#"
              className="px-8 py-3 rounded-full border border-[#5c92b8] text-sm font-semibold hover:bg-[#5c92b8] hover:text-white transition-all"
              style={{ color: "#1a5c96" }}
            >
              Voir tous nos cas clients →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                client: "Cabinet JurisParis",
                sector: "Juridique",
                result: "Zéro interruption de service depuis 24 mois.",
                img: "/entr1.jpg",
              },
              {
                client: "Luxe Distribution",
                sector: "Retail",
                result: "-40% de temps de résolution des incidents.",
                img: "/entr2.jpg",
              },
              {
                client: "TechGrow Startup",
                sector: "Technologie",
                result: "Onboarding collaborateur réduit à 15 minutes.",
                img: "/entr3.jpg",
              },
            ].map((study, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative h-64 rounded-[32px] overflow-hidden mb-6">
                  <img
                    src={study.img}
                    alt={study.client}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 px-4 py-1 bg-[#5c92b8] text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {study.sector}
                  </div>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#0a233e" }}
                >
                  {study.client}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#3a6a96" }}
                >
                  {study.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section
        className="w-full py-24 px-8 relative overflow-hidden"
        style={{ backgroundColor: "#f8fbff" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#5c92b8 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#5c92b8]/10 border border-[#5c92b8]/20 mb-8">
              <span className="flex gap-1 text-yellow-500 text-sm">★★★★★</span>
              <span className="text-[#5c92b8] text-[10px] font-black uppercase tracking-[0.2em]">
                Score Google : 4,9/5 · 127 avis
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "#0a233e" }}
            >
              Ils nous confient leur{" "}
              <span className="text-[#5c92b8]">sérénité</span>
            </h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="break-inside-avoid p-8 rounded-[32px] bg-white border border-[#d0e4f0] transition-all duration-500 hover:border-[#5c92b8]/50 group hover:-translate-y-2 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#d0e4f0] group-hover:border-[#5c92b8]/50 transition-all">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                  <div>
                    <h4
                      className="font-bold text-base"
                      style={{ color: "#0a233e" }}
                    >
                      {review.name}
                    </h4>
                    <p className="text-[#5c92b8] text-xs font-medium uppercase tracking-wider">
                      {review.role}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <span className="text-4xl text-[#5c92b8]/20 absolute -top-4 -left-2 font-serif">
                    "
                  </span>
                  <p
                    className="text-sm leading-relaxed italic relative z-10"
                    style={{ color: "#3a6a96" }}
                  >
                    {review.text}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-[#e8f3fc] flex justify-between items-center">
                  <span
                    className="text-[9px] uppercase tracking-[0.2em] font-bold"
                    style={{ color: "#8ab8d4" }}
                  >
                    Vérifié par Google
                  </span>
                  <div className="flex text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CIBLES MÉTIER ── */}
      <section
        className="w-full py-24 px-8 overflow-hidden"
        style={{ backgroundColor: "#e8f3fc" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3 flex flex-col justify-between py-10">
              <div>
                <p className="text-[#5c92b8] font-black tracking-[0.5em] text-xs uppercase mb-8">
                  Expertise de pointe
                </p>
                <h2
                  className="text-5xl font-bold leading-tight mb-10"
                  style={{ color: "#0a233e" }}
                >
                  À chaque métier sa{" "}
                  <span style={{ color: "#5c92b8" }} className="italic">
                    sécurité.
                  </span>
                </h2>
                <p
                  className="text-lg leading-relaxed mb-12"
                  style={{ color: "#3a6a96" }}
                >
                  Nous avons développé des protocoles spécifiques pour les
                  secteurs les plus exigeants d'Île-de-France.
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-px h-32 bg-[#c8dff0] relative">
                  <div className="absolute top-0 left-0 w-px h-12 bg-[#5c92b8]"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 gap-6">
              {[
                {
                  title: "Droit & Chiffre",
                  target: "Avocats, Notaires, Experts-Comptables",
                  desc: "Protection absolue du secret professionnel. Nous sécurisons vos échanges et données sensibles contre toute intrusion.",
                  image:
                    "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800",
                  tag: "Confidentialité",
                },
                {
                  title: "Commerce de Luxe & Retail",
                  target: "Boutiques, Showrooms, Galeries",
                  desc: "Une connectivité invisible et performante. Wi-Fi client premium et systèmes de vente synchronisés en temps réel.",
                  image:
                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
                  tag: "Disponibilité",
                },
                {
                  title: "PME & Startups Tech",
                  target: "Agences, Éditeurs, Services",
                  desc: "Une infrastructure qui suit votre croissance. Onboarding ultra-rapide et outils collaboratifs de dernière génération.",
                  image:
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
                  tag: "Scalabilité",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group relative w-full h-64 rounded-[40px] overflow-hidden border border-[#c8dff0] hover:border-[#5c92b8]/50 transition-all duration-700"
                >
                  <img
                    src={item.image}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#e8f3fc] via-[#e8f3fc]/80 to-transparent"></div>
                  <div className="relative h-full flex flex-col justify-center p-10 lg:w-2/3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#5c92b8]/15 text-[#1a5c96] text-[10px] font-bold uppercase tracking-widest mb-3">
                      {item.tag}
                    </span>
                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{ color: "#0a233e" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[#5c92b8] font-semibold text-sm mb-3">
                      {item.target}
                    </p>
                    <p
                      className="text-sm leading-relaxed max-w-md"
                      style={{ color: "#3a6a96" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-6 group-hover:translate-x-0">
                    <div className="w-14 h-14 rounded-full border border-[#5c92b8] flex items-center justify-center text-[#5c92b8] text-xl hover:bg-[#5c92b8] hover:text-white transition-colors cursor-pointer">
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ZONE D'INTERVENTION ── */}
      <section
        className="w-full py-24 relative overflow-hidden"
        style={{ backgroundColor: "#e8f3fc" }}
      >
        <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative z-10">
            <p className="text-[#5c92b8] font-black tracking-[0.3em] text-xs uppercase mb-6">
              Zone d'intervention
            </p>
            <h2
              className="text-5xl font-bold mb-8 leading-tight"
              style={{ color: "#0a233e" }}
            >
              Votre partenaire de proximité en{" "}
              <span className="text-[#5c92b8]">Île-de-France</span>
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                "Paris (75)",
                "Essonne (91)",
                "Seine-et-Marne (77)",
                "Val-de-Marne (94)",
                "Hauts-de-Seine (92)",
                "Seine-Saint-Denis (93)",
                "Val-d'Oise (95)",
                "Yvelines (78)",
              ].map((dept, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5c92b8]" />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#1e4a72" }}
                  >
                    {dept}
                  </span>
                </div>
              ))}
            </div>
            <div className="pl-6 border-l-2 border-[#5c92b8]/30 mb-6">
              <p
                className="italic text-sm leading-relaxed"
                style={{ color: "#3a6a96" }}
              >
                "Nous intervenons sur site sous 4h pour les urgences critiques
                dans toute la région parisienne."
              </p>
            </div>
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #c8dff0",
              }}
            >
              <span style={{ color: "#5c92b8" }}>🌍</span>
              <span
                className="text-sm font-semibold"
                style={{ color: "#1e4a72" }}
              >
                Interventions nationales sur demande
              </span>
            </div>
          </div>
          <div className="lg:w-1/2 relative h-[460px] w-full rounded-[40px] bg-white border border-[#c8dff0] overflow-hidden group shadow-lg">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-5 h-5 bg-[#5c92b8] rounded-full shadow-[0_0_20px_rgba(92,146,184,0.6)]">
                <div className="absolute inset-0 rounded-full bg-[#5c92b8] animate-ping opacity-40" />
              </div>
              {[
                { top: "28%", left: "38%" },
                { top: "62%", left: "33%" },
                { top: "44%", left: "67%" },
                { top: "24%", left: "62%" },
                { top: "72%", left: "58%" },
                { top: "50%", left: "28%" },
                { top: "35%", left: "55%" },
                { top: "65%", left: "48%" },
              ].map((pos, i) => (
                <React.Fragment key={i}>
                  <div
                    className="absolute h-px origin-left opacity-10"
                    style={{
                      top: "50%",
                      left: "50%",
                      width: "160px",
                      transform: `rotate(${i * 45}deg)`,
                      background:
                        "linear-gradient(to right, #5c92b8, transparent)",
                    }}
                  />
                  <div
                    className="absolute w-2.5 h-2.5 bg-[#5c92b8] rounded-full opacity-25 group-hover:opacity-70 transition-all duration-700"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transitionDelay: `${i * 80}ms`,
                    }}
                  />
                </React.Fragment>
              ))}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <p className="text-xs font-bold" style={{ color: "#5c92b8" }}>
                  Île-de-France
                </p>
                <p className="text-[10px]" style={{ color: "#8ab8d4" }}>
                  8 départements couverts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── PARTENAIRES (100% Fiable sans CDN) ── */}
      <section className="w-full py-20 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#8ab8d4]">
              Technologies maîtrisées & partenaires
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            {[
              {
                name: "Microsoft",
                svg: (
                  <path d="M0 0h11.4v11.4H0V0zm12.6 0H24v11.4h-11.4V0zM0 12.6h11.4V24H0v-11.4zm12.6 0H24V24h-11.4v-11.4z" />
                ),
              },
              {
                name: "Apple",
                svg: (
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94 1.07.08 2.16-.52 2.82-1.33z" />
                ),
              },
              {
                name: "M365",
                svg: (
                  <path d="M12.16 0h11.84v24H12.16V0zM0 4.25l10.56-1.92v19.34L0 19.75V4.25z" />
                ),
              },
              {
                name: "Google",
                svg: (
                  <path d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.42h6.44c-.28 1.48-1.12 2.74-2.38 3.58v2.98h3.84c2.24-2.06 3.59-5.1 3.59-8.64z" />
                ),
              },
              {
                name: "Sophos",
                svg: (
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4z" />
                ),
              },
              {
                name: "OVHcloud",
                svg: (
                  <path d="M12 1A11 11 0 1 0 23 12 A11 11 0 0 0 12 1 m0 3a8 8 0 1 1-8 8 a8 8 0 0 1 8-8" />
                ),
              },
              {
                name: "Bitdefender",
                svg: <path d="M2 2h20v4H2V2zm0 8h20v4H2v-4zm0 8h20v4H2v-4z" />,
              },
              {
                name: "Cisco",
                svg: (
                  <path d="M2.4 9.6h1.2v4.8H2.4V9.6zm3.6-2.4h1.2v9.6H6V7.2zm3.6 2.4h1.2v4.8H9.6V9.6zm3.6-4.8h1.2v14.4h-1.2V4.8zm3.6 4.8h1.2v4.8h-1.2V9.6zm3.6-2.4h1.2v9.6h-1.2V7.2zm3.6 2.4h1.2v4.8h-1.2V9.6z" />
                ),
              },
            ].map((partner, i) => (
              <div
                key={i}
                className="group flex flex-col items-center gap-3 transition-all duration-500"
              >
                <div className="h-8 w-8 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-full w-full object-contain fill-[#5c92b8] opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  >
                    {partner.svg}
                  </svg>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#aac8e0] group-hover:text-[#5c92b8] transition-colors">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── CTA FINAL ── */}
      <section
        className="w-full py-36 px-8 relative overflow-hidden"
        style={{ backgroundColor: "#0a233e" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5c92b8]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-[#5c92b8] font-black tracking-[0.3em] text-xs uppercase mb-6">
            Passez à l'action
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Prêt à ne plus subir
            <br />
            votre informatique ?
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
            Premier audit offert, sans engagement. Un expert vous rappelle sous
            24h.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button className="px-12 py-5 rounded-full bg-[#5c92b8] text-white font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-lg shadow-[#5c92b8]/30">
              Prendre RDV gratuit
            </button>
            <button className="px-12 py-5 rounded-full border border-white/25 text-white font-black uppercase text-sm tracking-widest hover:bg-white/8 transition-all">
              Nous contacter
            </button>
          </div>
          <p
            className="mt-8 text-sm"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Sans engagement · Réponse sous 24h · 100% confidentiel
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          backgroundColor: "#050d1a",
          borderTop: "1px solid rgba(92,146,184,0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="font-bold text-2xl tracking-widest text-white mb-4">
                TRINEXTA
              </div>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Partenaire informatique des TPE et PME d'Île-de-France.
                Infogérance, cybersécurité et cloud depuis 2012.
              </p>
              <div className="flex gap-3">
                {["in", "tw", "fb"].map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:bg-[#5c92b8]"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">
                Services
              </h4>
              <ul
                className="flex flex-col gap-3 text-sm"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {[
                  "Infogérance",
                  "Support utilisateurs",
                  "Cybersécurité",
                  "Cloud & mobilité",
                  "Microsoft 365",
                  "Solutions métier",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-[#5c92b8] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">
                Entreprise
              </h4>
              <ul
                className="flex flex-col gap-3 text-sm"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {[
                  "À propos",
                  "Notre équipe",
                  "Cas clients",
                  "Blog & Actualités",
                  "Rejoignez-nous",
                  "Contact",
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-[#5c92b8] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white">
                Contact
              </h4>
              <ul
                className="flex flex-col gap-4 text-sm"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <li className="flex items-start gap-3">
                  <span style={{ color: "#5c92b8" }}></span>
                  <a
                    href="tel:+33978250746"
                    className="hover:text-[#5c92b8] transition-colors"
                  >
                    09 78 25 07 46
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "#5c92b8" }}></span>
                  <a
                    href="mailto:contact@trinexta.fr"
                    className="hover:text-[#5c92b8] transition-colors"
                  >
                    contact@trinexta.fr
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "#5c92b8" }}></span>
                  <span>Paris, Île-de-France</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: "#5c92b8" }}></span>
                  <span>Lun–Ven : 8h–20h</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="py-8 border-t border-b flex flex-wrap justify-center items-center gap-8"
            style={{ borderColor: "rgba(92,146,184,0.1)" }}
          >
            {[
              {
                name: "Microsoft",
                logo: "https://cdn.simpleicons.org/microsoft/5c92b8",
              },
              {
                name: "Apple",
                logo: "https://cdn.simpleicons.org/apple/5c92b8",
              },
              {
                name: "Google",
                logo: "https://cdn.simpleicons.org/googleworkspace/5c92b8",
              },
              {
                name: "Sophos",
                logo: "https://cdn.simpleicons.org/sophos/5c92b8",
              },
              {
                name: "OVHcloud",
                logo: "https://cdn.simpleicons.org/ovh/5c92b8",
              },
            ].map((p, i) => (
              <img
                key={i}
                src={p.logo}
                alt={p.name}
                className="h-5 w-auto opacity-20 hover:opacity-60 transition-opacity"
              />
            ))}
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                backgroundColor: "rgba(92,146,184,0.1)",
                border: "1px solid rgba(92,146,184,0.2)",
              }}
            >
              <span className="text-yellow-500 text-xs">★★★★★</span>
              <span className="text-xs font-bold text-white">4,9/5</span>
              <span className="text-xs" style={{ color: "#5c92b8" }}>
                Google
              </span>
            </div>
          </div>
          <div
            className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            <span>© 2026 Trinexta. Tous droits réservés.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#5c92b8] transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-[#5c92b8] transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-[#5c92b8] transition-colors">
                CGV
              </a>
            </div>
          </div>
        </div>
      </footer>
      <ChatbotFloat />
    </div>
  );
}
