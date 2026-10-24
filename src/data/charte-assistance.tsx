import React from "react"
import Link from "next/link"
import type { LegalData } from "./mentions-legales"

// Page /charte-assistance (« Ordinateur ou compte piraté : que faire ? ») :
// textes de la fiche 17 du dossier final (23/10/2026).
// Règles : horaires 8 h 30-19 h ; aucune promesse d'astreinte ; support@ réservé
// aux clients, jamais affiché ; objectif de prise en charge, jamais de résolution.

const lien = "text-secondary-strong hover:underline transition-colors"

function Externe({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={lien}>
      {children}
    </a>
  )
}

function Interne({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={lien}>
      {children}
    </Link>
  )
}

function Puces({ titre, items }: { titre?: string; items: React.ReactNode[] }) {
  return (
    <div>
      {titre && <p className="text-primary font-semibold text-sm mb-2">{titre}</p>}
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-primary/70">
            <span className="text-secondary-strong shrink-0 mt-0.5">-</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Etapes({ titre, items }: { titre?: string; items: React.ReactNode[] }) {
  return (
    <div>
      {titre && <p className="text-primary font-semibold text-sm mb-2">{titre}</p>}
      <ol className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-primary/70">
            <span className="text-secondary-strong font-bold shrink-0 w-5">{i + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Bloc({ children }: { children: React.ReactNode }) {
  return <div className="space-y-4 text-sm text-primary/70">{children}</div>
}

const CYBERMALVEILLANCE = "https://www.cybermalveillance.gouv.fr"

export const charteAssistanceData: LegalData = {
  hero: {
    title: "Ordinateur ou compte piraté : que faire ?",
    imageSrc: "/images/legal/hero-mentions.jpg",
  },

  sections: [
    {
      title: "Les premières minutes comptent",
      content: (
        <Bloc>
          <p>
            Un poste qui se comporte bizarrement, un compte qui envoie des e-mails tout seul, des fichiers devenus
            illisibles : voici les gestes à faire selon votre situation, et comment nous joindre.
          </p>
          <div className="space-y-2 rounded-xl border border-secondary/30 bg-secondary/10 p-4">
            <p>
              <span className="text-primary font-semibold">Téléphone :</span>{" "}
              <a href="tel:+33978250746" className={`${lien} font-bold`}>
                09 78 25 07 46
              </a>
              , du lundi au vendredi, de 8 h 30 à 19 h
            </p>
            <p>
              <span className="text-primary font-semibold">E-mail :</span>{" "}
              <a href="mailto:contact@trinexta.fr" className={lien}>
                contact@trinexta.fr
              </a>{" "}
              (clients : canaux de support prévus à votre contrat)
            </p>
            <p>
              <Interne href="/contact#formulaire">Être rappelé</Interne>
            </p>
          </div>
          <Puces
            titre="En bref"
            items={[
              "Ne pas paniquer, ne rien supprimer, et ne pas éteindre brutalement un équipement critique sans avis.",
              "Un poste suspect se déconnecte du réseau (Wi-Fi et câble). Un mot de passe se change depuis un appareil sain.",
              "TRINEXTA répond du lundi au vendredi, de 8 h 30 à 19 h. En dehors de ces horaires, suivez les consignes officielles de cybermalveillance.gouv.fr.",
              "Ne payez pas de rançon sans avis spécialisé.",
            ]}
          />
        </Bloc>
      ),
    },

    {
      title: "En dehors de nos horaires",
      content: (
        <Bloc>
          <p>
            Suivez les consignes officielles adaptées à votre situation sur{" "}
            <Externe href={CYBERMALVEILLANCE}>cybermalveillance.gouv.fr</Externe>. Selon le cas, il peut s&apos;agir
            d&apos;isoler un poste du réseau, de changer un mot de passe depuis un appareil sain ou de ne rien
            modifier avant analyse. Pour un équipement critique (serveur, NAS, caisse, machine de production), ne
            coupez rien sans avis.
          </p>
          <p>
            Contactez-nous dès l&apos;ouverture du support : votre demande est prise en charge selon sa priorité et
            les conditions de votre contrat. Les délais visés figurent dans nos{" "}
            <Interne href="/niveau-de-service">niveaux de service</Interne>.
          </p>
        </Bloc>
      ),
    },

    {
      title: "Mon ordinateur a été piraté",
      content: (
        <Bloc>
          <Puces
            titre="Les signes"
            items={[
              "Lenteur inhabituelle, programmes inconnus, fenêtres ou messages étranges.",
              "Antivirus ou protection désactivés sans votre action.",
              "Souris qui bouge seule, activité réseau anormale.",
            ]}
          />
          <Etapes
            titre="Les gestes"
            items={[
              "Déconnectez l'ordinateur du réseau : coupez le Wi-Fi et débranchez le câble réseau.",
              "Arrêtez de l'utiliser, mais ne l'éteignez pas brutalement et ne supprimez aucun fichier : ces traces servent à comprendre ce qui s'est passé.",
              "Notez ce que vous avez constaté et l'heure.",
              "Depuis un autre appareil sain, changez les mots de passe utilisés sur ce poste (messagerie en priorité).",
              "Appelez-nous, ou votre responsable informatique.",
            ]}
          />
        </Bloc>
      ),
    },

    {
      title: "Mon compte Microsoft 365 a été piraté",
      content: (
        <Bloc>
          <Puces
            titre="Les signes"
            items={[
              "E-mails envoyés depuis votre adresse sans que vous les ayez écrits.",
              "Alertes de connexion inhabituelles, connexions depuis l'étranger.",
              "Règles de transfert ou de suppression automatique que vous n'avez pas créées.",
            ]}
          />
          <Etapes
            titre="Les gestes"
            items={[
              "Depuis un appareil sain, changez le mot de passe du compte.",
              "Activez la double authentification si elle ne l'est pas.",
              "Faites déconnecter toutes les sessions ouvertes : c'est l'administrateur Microsoft 365 de l'entreprise qui le fait (ou nous, si nous gérons votre environnement).",
              "Vérifiez et supprimez les règles de messagerie suspectes (transferts automatiques notamment).",
              "Vérifiez les applications autorisées à accéder au compte.",
              "Prévenez vos contacts si des e-mails frauduleux sont partis de votre adresse.",
            ]}
          />
          <p>
            Ressource éditeur : le portail de sécurité Microsoft (security.microsoft.com), accessible à
            l&apos;administrateur.
          </p>
        </Bloc>
      ),
    },

    {
      title: "Mes fichiers sont chiffrés : rançongiciel",
      content: (
        <Bloc>
          <Puces
            titre="Les signes"
            items={[
              "Fichiers impossibles à ouvrir, extensions modifiées.",
              "Message demandant une rançon pour récupérer vos données.",
            ]}
          />
          <Etapes
            titre="Les gestes"
            items={[
              "Isolez les postes touchés du réseau (Wi-Fi et câble).",
              "Ne coupez pas un serveur ou un NAS sans avis : selon le cas, il faut le déconnecter du réseau ou le laisser en l'état pour analyse.",
              "Ne supprimez pas les fichiers chiffrés et ne tentez pas de les « réparer ».",
              "Repérez vos sauvegardes et ne les branchez pas sur un équipement touché.",
              "Ne payez pas la rançon sans avis spécialisé : le paiement n'assure pas la récupération des données.",
              <>
                Appelez-nous. Vous pouvez aussi porter plainte et suivre les consignes de{" "}
                <Externe href={CYBERMALVEILLANCE}>cybermalveillance.gouv.fr</Externe>.
              </>,
            ]}
          />
        </Bloc>
      ),
    },

    {
      title: "J'ai reçu un e-mail suspect (hameçonnage)",
      content: (
        <Bloc>
          <Puces
            titre="Avant de cliquer"
            items={[
              "Vérifiez l'adresse réelle de l'expéditeur, pas seulement le nom affiché.",
              "Survolez les liens sans cliquer pour voir leur destination.",
              "Méfiez-vous des demandes urgentes, inhabituelles ou qui touchent à l'argent (changement de RIB, virement).",
              "Ne communiquez jamais vos identifiants par e-mail.",
            ]}
          />
          <Etapes
            titre="Si vous avez cliqué ou saisi un mot de passe"
            items={[
              "Changez immédiatement ce mot de passe depuis un appareil sain, et partout où vous l'utilisiez.",
              "Si une pièce jointe a été ouverte, appliquez les gestes « Mon ordinateur a été piraté ».",
              "Prévenez-nous, ou votre responsable informatique.",
            ]}
          />
          <p>
            Signaler : les e-mails indésirables sur <Externe href="https://www.signal-spam.fr">signal-spam.fr</Externe>{" "}
            ; les SMS frauduleux en les transférant au 33700.
          </p>
        </Bloc>
      ),
    },

    {
      title: "Des données personnelles ont fuité",
      content: (
        <Etapes
          items={[
            "Identifiez les données concernées (clients, salariés, données sensibles).",
            "Limitez immédiatement l'accès à ces données.",
            "Documentez l'incident : quoi, quand, combien de personnes.",
            <>
              Vérifiez vos obligations auprès de la <Externe href="https://www.cnil.fr">CNIL</Externe> : en cas de
              violation de données personnelles, la notification doit intervenir dans les 72 heures lorsqu&apos;elle
              s&apos;applique.
            </>,
          ]}
        />
      ),
    },

    {
      title: "Ce que TRINEXTA fait quand vous appelez",
      content: (
        <Bloc>
          <Etapes
            items={[
              "Nous qualifions la situation et sa priorité.",
              "Nous vous indiquons les gestes à faire tout de suite.",
              <>
                Nous intervenons à distance, ou sur site si nécessaire, selon notre{" "}
                <Interne href="/plan-reponse-incidents-securite">plan de réponse aux incidents</Interne>.
              </>,
            ]}
          />
          <p>
            Pour un incident critique signalé pendant les heures d&apos;ouverture, notre objectif est une prise en
            charge sous 30 minutes. Il s&apos;agit du début du traitement, pas d&apos;un délai de résolution. Les
            modalités figurent dans nos <Interne href="/niveau-de-service">niveaux de service</Interne>.
          </p>
          <p>
            Pour nos clients Sérénité Complète, la réponse à incident cyber est comprise dans le contrat. Avec
            Sérénité Essentiel, elle n&apos;est pas incluse : l&apos;intervention fait l&apos;objet d&apos;un devis.
            Voir les <Interne href="/serenite">formules Sérénité</Interne>.
          </p>
          <p>
            Interventions sur site dans toute l&apos;Île-de-France. Pas de frais de déplacement pour les interventions
            programmées dans un rayon de 15 km autour d&apos;Évry ; au-delà, le déplacement est facturé selon le
            devis. Le temps passé sur site reste facturé selon le contrat.
          </p>
          <p>
            <Interne href="/cas-clients/piratage-sites-wordpress-ecommerce">
              Voir un exemple de réponse à incident
            </Interne>
          </p>
        </Bloc>
      ),
    },

    {
      title: "Les bons réflexes au quotidien",
      content: (
        <Bloc>
          <Puces
            items={[
              "Double authentification sur tous les comptes, en priorité la messagerie.",
              "Sauvegardes régulières, dont une copie hors ligne, et restaurations testées.",
              "Mises à jour automatiques des systèmes et logiciels.",
              "Protection EDR sur les postes : elle analyse les comportements suspects et peut bloquer ou isoler un poste selon sa configuration ; elle complète les autres mesures.",
              "Comptes administrateurs réservés à l'administration.",
              "Sensibilisation des collaborateurs à l'hameçonnage.",
            ]}
          />
          <p>
            En savoir plus : <Interne href="/cybersecurite">Cybersécurité</Interne> ·{" "}
            <Interne href="/cloud-sauvegarde">Sauvegarde</Interne> ·{" "}
            <Interne href="/microsoft-365">Microsoft 365</Interne>
          </p>
        </Bloc>
      ),
    },

    {
      title: "Ressources officielles",
      content: (
        <Puces
          items={[
            <>
              <Externe href={CYBERMALVEILLANCE}>cybermalveillance.gouv.fr</Externe> : assistance et consignes pour les
              victimes
            </>,
            <>
              <Externe href="https://cyber.gouv.fr">ANSSI</Externe> : guides et recommandations
            </>,
            <>
              <Externe href="https://www.cert.ssi.gouv.fr">CERT-FR</Externe> : alertes et avis de sécurité
            </>,
            <>
              <Externe href="https://www.cnil.fr">CNIL</Externe> : données personnelles, notification de violation
            </>,
            <>
              <Externe href="https://www.signal-spam.fr">Signal Spam</Externe> : signalement des courriels indésirables
            </>,
            <>
              <Externe href="https://www.internet-signalement.gouv.fr">PHAROS</Externe> : signalement des contenus
              illicites
            </>,
          ]}
        />
      ),
    },
  ],
}

/** Questions fréquentes de la page, reprises en JSON-LD FAQPage. */
export const FAQ_CHARTE_ASSISTANCE = [
  {
    question: "Faut-il éteindre un ordinateur piraté ?",
    answer:
      "Pour un poste de travail, déconnectez-le d'abord du réseau, puis arrêtez de l'utiliser sans l'éteindre brutalement : certaines traces disparaissent à l'extinction. Pour un serveur ou un NAS, ne coupez rien sans avis.",
  },
  {
    question: "Mon compte Microsoft 365 envoie des e-mails tout seul, que faire en premier ?",
    answer:
      "Changer le mot de passe depuis un appareil sain, puis faire déconnecter toutes les sessions et supprimer les règles de transfert suspectes. Activez la double authentification.",
  },
  {
    question: "Faut-il payer la rançon ?",
    answer:
      "Pas sans avis spécialisé. Le paiement n'assure ni la récupération des données ni la fin de l'attaque. Isolez, conservez les traces, cherchez vos sauvegardes et appelez-nous.",
  },
  {
    question: "Que faire en dehors de vos horaires ?",
    answer:
      "Suivez les consignes officielles de cybermalveillance.gouv.fr adaptées à votre situation, puis appelez-nous dès 8 h 30. Nos techniciens répondent du lundi au vendredi, de 8 h 30 à 19 h.",
  },
]
