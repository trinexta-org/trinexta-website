import React from "react"
import type { LegalData } from "./mentions-legales"
import { CONSENT_COOKIE } from "./mesure-audience"

interface TraceurSite {
  nom: string
  categorie: "Nécessaire" | "Mesure d'audience" | "Publicité"
  emetteur: string
  finalite: string
  duree: string
}

/** Traceurs réellement déposés ou lus par trinexta.fr. À tenir à jour à chaque nouveau service. */
const TRACEURS_SITE: TraceurSite[] = [
  {
    nom: CONSENT_COOKIE,
    categorie: "Nécessaire",
    emetteur: "TRINEXTA",
    finalite: "Mémoriser vos choix sur les cookies",
    duree: "6 mois",
  },
  {
    nom: "Chat du site (stockage de session)",
    categorie: "Nécessaire",
    emetteur: "LeadSynch, notre outil de gestion de la relation client",
    finalite: "Garder la conversation ouverte pendant votre visite ; aucun cookie",
    duree: "Fermeture de l'onglet",
  },
  {
    nom: "trinexta_newsletter_seen (stockage local)",
    categorie: "Nécessaire",
    emetteur: "TRINEXTA",
    finalite: "Ne pas réafficher la fenêtre d'inscription à la newsletter une fois fermée",
    duree: "Jusqu'à effacement des données du navigateur",
  },
  {
    nom: "_ga, _ga_*",
    categorie: "Mesure d'audience",
    emetteur: "Google Analytics (Google Ireland Ltd)",
    finalite: "Distinguer les visiteurs et mesurer la fréquentation des pages",
    duree: "13 mois au plus",
  },
  {
    nom: "_gcl_au",
    categorie: "Publicité",
    emetteur: "Google Ads (Google Ireland Ltd)",
    finalite: "Rattacher une demande de contact à l'annonce cliquée (mesure des conversions)",
    duree: "13 mois au plus",
  },
]

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
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary-strong hover:underline transition-colors">contact@trinexta.fr</a></span>,
        "Téléphone : 09 78 25 07 46",
      ],
    },
    {
      title: "Article 2 - Définition d'un cookie",
      paragraphs: [
        "Un cookie est un petit fichier texte enregistré sur votre appareil (ordinateur, smartphone, tablette) lors de la consultation d'un site internet. La présente politique couvre aussi les technologies similaires, comme le stockage local ou de session du navigateur.",
      ],
    },
    {
      title: "Article 3 - Catégories de cookies utilisés",
      content: (
        <div className="space-y-5 text-sm text-primary/70">
          {[
            {
              cat: "3.1 Cookies nécessaires",
              desc: "Ils mémorisent votre choix sur les cookies et font fonctionner le chat et les fenêtres du site. Ils ne demandent pas votre accord.",
            },
            {
              cat: "3.2 Mesure d'audience",
              desc: "Google Analytics nous indique quelles pages sont lues et comment le site est parcouru, pour l'améliorer. Ces cookies ne sont déposés qu'avec votre accord.",
            },
            {
              cat: "3.3 Publicité",
              desc: "Google Ads mesure quelles annonces amènent des demandes de contact. Ces cookies ne sont déposés qu'avec votre accord.",
            },
          ].map(({ cat, desc }) => (
            <div key={cat}>
              <p className="text-primary font-semibold mb-1">{cat}</p>
              <p>{desc}</p>
            </div>
          ))}
          <p>Le site n&apos;utilise aucun autre outil de mesure, de publicité, de vidéo intégrée ou de réseau social déposant des cookies.</p>
        </div>
      ),
    },
    {
      title: "Article 4 - Liste des cookies et traceurs",
      content: (
        <div className="space-y-3">
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Tableau : Liste des cookies et traceurs">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm text-primary/80">
              <thead>
                <tr className="border-b border-primary text-xs uppercase tracking-wider text-primary">
                  <th scope="col" className="py-2 pr-4">Nom</th>
                  <th scope="col" className="py-2 pr-4">Catégorie</th>
                  <th scope="col" className="py-2 pr-4">Émetteur</th>
                  <th scope="col" className="py-2 pr-4">Finalité</th>
                  <th scope="col" className="py-2">Durée</th>
                </tr>
              </thead>
              <tbody>
                {TRACEURS_SITE.map((t) => (
                  <tr key={t.nom} className="border-b border-primary/15 align-top">
                    <td className="py-2 pr-4 font-bold text-primary">{t.nom}</td>
                    <td className="py-2 pr-4">{t.categorie}</td>
                    <td className="py-2 pr-4">{t.emetteur}</td>
                    <td className="py-2 pr-4">{t.finalite}</td>
                    <td className="py-2">{t.duree}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-primary/70">
            Lorsqu&apos;il est utilisé, le gestionnaire de balises Google Tag Manager
            ne se charge lui aussi qu&apos;après votre accord.
          </p>
        </div>
      ),
    },
    {
      title: "Article 5 - Mode consentement Google et mesure des conversions",
      content: (
        <div className="space-y-3 text-sm text-primary/70">
          <p>
            Le site applique le mode consentement de Google (Consent Mode v2) dans
            sa version de base : par défaut, la mesure d&apos;audience et la
            publicité sont refusées, et aucune balise Google n&apos;est chargée.
          </p>
          <p>
            <span className="text-primary font-semibold">Si vous acceptez</span>{" "}
            la mesure d&apos;audience, Google Analytics est chargé ; ses cookies
            sont limités à 13 mois, les signaux Google et la personnalisation
            publicitaire sont désactivés. Si vous acceptez la publicité, un cookie
            Google Ads permet de rattacher votre éventuelle demande de contact à
            l&apos;annonce sur laquelle vous avez cliqué, pour évaluer
            l&apos;efficacité de nos campagnes.
          </p>
          <p>
            <span className="text-primary font-semibold">Si vous refusez</span>{" "}
            ou tant que vous n&apos;avez pas fait de choix : aucun script Google
            n&apos;est chargé, aucun cookie Google n&apos;est déposé, et Google ne
            lit ni ne reçoit aucune information depuis votre terminal.
          </p>
          <p>
            <span className="text-primary font-semibold">Conversions
            améliorées</span> : lorsque cette fonctionnalité est activée et que
            vous avez consenti, l&apos;adresse e-mail et le numéro de téléphone que
            vous avez saisis dans un formulaire sont transformés dans votre
            navigateur en une empreinte irréversible (SHA-256) avant transmission
            à Google. Google ne reçoit jamais ces données en clair.
          </p>
          <p>
            Ces traitements impliquent un transfert de données vers Google LLC
            aux États-Unis, encadré par la décision d&apos;adéquation du 10 juillet
            2023 relative au cadre de protection des données UE - États-Unis
            (Data Privacy Framework).
          </p>
        </div>
      ),
    },
    {
      title: "Article 6 - Consentement et durée de conservation de votre choix",
      paragraphs: [
        "Lors de votre première visite, un bandeau vous permet d'accepter tous les cookies, de les refuser tous ou de choisir service par service. Refuser est aussi simple qu'accepter.",
        "Votre choix est conservé 6 mois, puis vous est de nouveau demandé. Vous pouvez le modifier à tout moment depuis l'icône de gestion des cookies affichée en bas à gauche de chaque page. Les cookies Google Analytics durent 13 mois au plus.",
      ],
    },
    {
      title: "Article 7 - Paramétrer votre navigateur",
      content: (
        <div className="space-y-3 text-sm text-primary/70">
          <p>Vous pouvez à tout moment supprimer les cookies, bloquer certains cookies ou modifier vos préférences. Ces paramètres peuvent être configurés directement depuis votre navigateur :</p>
          <ul className="space-y-1.5">
            {[
              ["Google Chrome", "https://support.google.com/chrome", "support.google.com/chrome"],
              ["Microsoft Edge", "https://support.microsoft.com", "support.microsoft.com"],
              ["Mozilla Firefox", "https://support.mozilla.org", "support.mozilla.org"],
              ["Safari", "https://support.apple.com", "support.apple.com"],
            ].map(([browser, href, label]) => (
              <li key={browser} className="flex items-start gap-2">
                <span className="text-secondary-strong shrink-0">-</span>
                <span>{browser} : <a href={href} target="_blank" rel="noopener noreferrer" className="text-secondary-strong hover:underline transition-colors">{label}</a></span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Article 8 - Cookies de tiers",
      paragraphs: [
        "Les cookies Google listés à l'article 4 sont déposés par Google Ireland Ltd, qui en détermine aussi l'usage pour ses propres services. Nous vous invitons à consulter la politique de confidentialité de Google : policies.google.com/privacy.",
      ],
    },
    {
      title: "Article 9 - Protection des données personnelles",
      paragraphs: [
        <span key="rgpd">Certaines données collectées via les cookies peuvent constituer des données personnelles. Leur traitement est réalisé conformément à notre <a href="/confidentialite" className="text-secondary-strong hover:underline transition-colors">Politique de Confidentialité</a>.</span>,
      ],
    },
    {
      title: "Article 10 - Modification de la politique",
      paragraphs: [
        "TRINEXTA peut modifier la présente Politique de Cookies à tout moment afin de tenir compte des évolutions légales, des recommandations de la CNIL, des évolutions techniques ou des nouveaux services proposés. Toute nouvelle version sera publiée sur le site.",
      ],
    },
    {
      title: "Article 11 - Contact",
      paragraphs: [
        "Téléphone : 09 78 25 07 46",
        <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary-strong hover:underline transition-colors">contact@trinexta.fr</a></span>,
      ],
    },
  ],
}
