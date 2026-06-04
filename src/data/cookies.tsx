import React from "react"
import type { LegalData } from "./mentions-legales"

export const cookiesData: LegalData = {
  hero: {
    title: "Politique de cookies",
    imageSrc: "/images/legal/hero-cookies.jpg",
  },
  sections: [
    {
      title: "Introduction",
      paragraphs: [
        "La présente politique explique comment TRINEXTA utilise des cookies et technologies similaires lors de votre navigation sur le site trinexta.fr, conformément au Règlement Général sur la Protection des Données (RGPD), à la Directive ePrivacy et aux recommandations de la CNIL.",
      ],
    },
    {
      title: "Article 1 - Responsable du traitement",
      paragraphs: [
        "TRUSTECH IT SUPPORT - marque commerciale TRINEXTA",
        "SASU au capital de 15 000 €",
        "SIREN : 942 020 082",
        "Adresse : 74 B Boulevard Henri Dunant, 91100 Corbeil-Essonnes",
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
        "Téléphone : 09 78 25 07 46",
      ],
    },
    {
      title: "Article 2 - Définition d'un cookie",
      paragraphs: [
        "Un cookie est un petit fichier texte enregistré sur votre appareil (ordinateur, smartphone, tablette) lors de votre consultation d'un site internet. Les cookies permettent notamment d'assurer le fonctionnement du site, de mémoriser certaines informations, d'améliorer l'expérience utilisateur, de mesurer l'audience, de renforcer la sécurité et de personnaliser certains contenus.",
      ],
    },
    {
      title: "Article 3 - Catégories de cookies utilisés",
      content: (
        <div className="space-y-5 text-sm text-white/70">
          {[
            {
              cat: "3.1 Cookies strictement nécessaires",
              desc: "Indispensables au fonctionnement du site, ils permettent notamment l'accès sécurisé aux espaces protégés, la gestion des sessions utilisateurs, la protection contre les attaques informatiques, la gestion des formulaires et l'équilibrage de charge des serveurs. Ces cookies ne nécessitent pas de consentement préalable.",
            },
            {
              cat: "3.2 Cookies de sécurité",
              desc: "Ils permettent la détection des comportements frauduleux, la protection contre les robots, la prévention des attaques et le fonctionnement de Google reCAPTCHA. Leur utilisation repose sur l'intérêt légitime de sécurité.",
            },
            {
              cat: "3.3 Cookies de mesure d'audience",
              desc: "Ils permettent d'analyser le nombre de visiteurs, les pages consultées, le temps passé sur le site, les parcours utilisateurs et les performances techniques. Les outils utilisés peuvent inclure Google Analytics, Google Search Console, Microsoft Clarity, Matomo ou des outils statistiques équivalents. Ces cookies nécessitent votre consentement lorsqu'ils ne sont pas strictement anonymisés.",
            },
            {
              cat: "3.4 Cookies de personnalisation",
              desc: "Ils permettent de mémoriser vos préférences, d'adapter l'affichage et d'améliorer votre expérience utilisateur. Ils peuvent être déposés uniquement avec votre accord lorsque cela est requis par la réglementation.",
            },
            {
              cat: "3.5 Cookies marketing",
              desc: "Ils permettent la diffusion de publicités, le suivi des campagnes marketing, la mesure des conversions et le remarketing. Les partenaires concernés peuvent notamment inclure Google Ads, Microsoft Advertising, LinkedIn Ads, Meta Ads ou d'autres plateformes publicitaires. Aucun cookie marketing n'est déposé sans votre consentement préalable.",
            },
          ].map(({ cat, desc }) => (
            <div key={cat}>
              <p className="text-white font-semibold mb-1">{cat}</p>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Article 4 - Durée de conservation",
      paragraphs: [
        "Les cookies sont conservés pour une durée maximale de treize (13) mois, conformément aux recommandations de la CNIL. À l'expiration de cette période, votre consentement sera de nouveau sollicité.",
      ],
    },
    {
      title: "Article 5 - Consentement",
      paragraphs: [
        "Lors de votre première visite, un bandeau de gestion des cookies vous permet d'accepter tous les cookies, de refuser les cookies non essentiels ou de personnaliser vos préférences. Votre choix est conservé pendant la durée légale autorisée et peut être modifié à tout moment.",
      ],
    },
    {
      title: "Article 6 - Gestion des cookies",
      content: (
        <div className="space-y-3 text-sm text-white/70">
          <p>Vous pouvez à tout moment supprimer les cookies, bloquer certains cookies ou modifier vos préférences. Ces paramètres peuvent être configurés directement depuis votre navigateur :</p>
          <ul className="space-y-1.5">
            {[
              ["Google Chrome", "https://support.google.com/chrome", "support.google.com/chrome"],
              ["Microsoft Edge", "https://support.microsoft.com", "support.microsoft.com"],
              ["Mozilla Firefox", "https://support.mozilla.org", "support.mozilla.org"],
              ["Safari", "https://support.apple.com", "support.apple.com"],
            ].map(([browser, href, label]) => (
              <li key={browser} className="flex items-start gap-2">
                <span className="text-secondary shrink-0">-</span>
                <span>{browser} : <a href={href} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">{label}</a></span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Article 7 - Cookies de tiers",
      paragraphs: [
        "Le site peut intégrer des services fournis par des tiers, notamment Google, Microsoft, LinkedIn, YouTube, Vimeo, Calendly, Stripe et divers partenaires techniques. Ces services peuvent déposer leurs propres cookies. TRINEXTA ne contrôle pas directement les cookies déposés par ces tiers ; nous vous invitons à consulter leurs politiques respectives.",
      ],
    },
    {
      title: "Article 8 - Protection des données personnelles",
      paragraphs: [
        <span key="rgpd">Certaines données collectées via les cookies peuvent constituer des données personnelles. Leur traitement est réalisé conformément à notre <a href="/confidentialite" className="text-secondary hover:underline transition-colors">Politique de Confidentialité</a>.</span>,
      ],
    },
    {
      title: "Article 9 - Modification de la politique",
      paragraphs: [
        "TRINEXTA se réserve le droit de modifier la présente Politique de Cookies à tout moment afin de tenir compte des évolutions légales, des recommandations de la CNIL, des évolutions techniques ou des nouveaux services proposés. Toute nouvelle version sera publiée sur le site.",
      ],
    },
    {
      title: "Article 10 - Contact",
      paragraphs: [
        "Téléphone : 09 78 25 07 46",
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
      ],
    },
  ],
}
