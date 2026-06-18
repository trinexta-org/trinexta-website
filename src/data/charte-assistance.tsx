import React from "react"
import type { LegalData } from "./mentions-legales"

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-white font-semibold text-sm mb-2">{title}</p>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white/70">
            <span className="text-secondary shrink-0 mt-0.5">-</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const charteAssistanceData: LegalData = {
  hero: {
    title: "Assistance cybersécurité",
    imageSrc: "/images/legal/hero-mentions.jpg",
  },
  sections: [
    {
      title: "Présentation",
      paragraphs: [
        "TRINEXTA accompagne les entreprises, TPE, PME, professions libérales, associations et collectivités dans la prévention, la détection et la gestion des incidents de cybersécurité. Une réaction rapide permet souvent de limiter les impacts financiers, opérationnels et techniques d'une cyberattaque.",
      ],
    },
    {
      title: "Contact d'urgence",
      content: (
        <div className="space-y-2 text-sm text-white/70">
          <p><span className="text-white font-semibold">Téléphone :</span> <a href="tel:0978250746" className="text-secondary hover:underline transition-colors">09 78 25 07 46</a></p>
          <p><span className="text-white font-semibold">Support :</span> <a href="mailto:support@trinexta.fr" className="text-secondary hover:underline transition-colors">support@trinexta.fr</a></p>
          <p><span className="text-white font-semibold">Contact :</span> <a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></p>
          <p><span className="text-white font-semibold">Bureau :</span> 7 rue Montespan, 91000 Évry-Courcouronnes</p>
          <p><span className="text-white font-semibold">Horaires :</span> du lundi au vendredi, 08h00 - 19h00</p>
        </div>
      ),
    },
    {
      title: "Mon ordinateur a été piraté",
      content: (
        <div className="space-y-5">
          <ListSection
            title="Symptômes fréquents"
            items={[
              "Ordinateur anormalement lent",
              "Programmes inconnus installés",
              "Antivirus désactivé",
              "Messages ou fenêtres suspects",
              "Activité réseau inhabituelle",
            ]}
          />
          <ListSection
            title="À faire immédiatement"
            items={[
              "Déconnectez l'ordinateur d'Internet.",
              "Désactivez le Wi-Fi.",
              "Débranchez le câble réseau.",
              "N'utilisez plus l'équipement concerné.",
              "Contactez rapidement un professionnel.",
            ]}
          />
        </div>
      ),
    },
    {
      title: "Mon compte Microsoft 365 a été compromis",
      content: (
        <div className="space-y-5">
          <ListSection
            title="Signes d'alerte"
            items={[
              "Envoi d'e-mails que vous n'avez pas rédigés",
              "Alertes de connexion inhabituelles",
              "Création de règles de transfert automatiques",
              "Connexions depuis un pays étranger",
            ]}
          />
          <div>
            <p className="text-white font-semibold text-sm mb-2">À faire immédiatement</p>
            <ul className="space-y-1.5">
              {[
                "Modifier le mot de passe.",
                "Activer l'authentification multifacteur (MFA).",
                "Révoquer toutes les sessions actives.",
                "Vérifier les règles de messagerie.",
                "Contrôler les applications autorisées.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-secondary shrink-0 mt-0.5">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-white/70 mt-3">
              Centre de sécurité Microsoft :{" "}
              <a href="https://security.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">
                security.microsoft.com
              </a>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Je suis victime d'un ransomware",
      content: (
        <div className="space-y-5">
          <ListSection
            title="À faire"
            items={[
              "Isoler immédiatement les équipements.",
              "Déconnecter les serveurs concernés.",
              "Conserver les preuves : ne rien supprimer, ne pas éteindre brutalement les machines, et laisser un professionnel réaliser une copie forensique avant toute intervention.",
              "Identifier les sauvegardes disponibles.",
            ]}
          />
          <ListSection
            title="À ne pas faire"
            items={[
              "Ne supprimez pas les fichiers chiffrés.",
              "Ne payez jamais de rançon sans avis spécialisé.",
            ]}
          />
        </div>
      ),
    },
    {
      title: "J'ai reçu un e-mail suspect",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-white/70">Avant de cliquer :</p>
          <ul className="space-y-1.5">
            {[
              "Vérifiez l'adresse réelle de l'expéditeur.",
              "Contrôlez les liens (sans cliquer) en survolant le texte.",
              "Repérez les fautes d'orthographe et de mise en forme.",
              "Méfiez-vous des demandes urgentes ou inhabituelles.",
              "Ne communiquez jamais vos identifiants.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-secondary shrink-0 mt-0.5">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-white/70">En cas de doute, contactez TRINEXTA avant toute action.</p>
        </div>
      ),
    },
    {
      title: "Fuite de données personnelles",
      content: (
        <ul className="space-y-2">
          {[
            "Identifiez les données concernées.",
            "Limitez immédiatement l'accès aux données.",
            "Évaluez les risques pour les personnes concernées.",
            "Documentez l'incident.",
            "Contactez votre responsable informatique.",
            "Vérifiez vos obligations de notification auprès de la CNIL (sous 72 heures lorsqu'elles s'appliquent).",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-secondary shrink-0 mt-0.5">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Bonnes pratiques de cybersécurité",
      content: (
        <ul className="space-y-2">
          {[
            "Activation de l'authentification multifacteur (MFA)",
            "Sauvegardes régulières et testées",
            "Mises à jour automatiques",
            "Antivirus professionnel (EDR)",
            "Formation des utilisateurs",
            "Contrôle des accès administrateurs",
            "Surveillance des connexions",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/70">
              <span className="text-secondary shrink-0 mt-0.5">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Ressources officielles",
      content: (
        <div className="space-y-4 text-sm text-white/70">
          {[
            {
              name: "Cybermalveillance.gouv.fr",
              desc: "Plateforme nationale d'assistance aux victimes de cybermalveillance.",
              href: "https://www.cybermalveillance.gouv.fr",
              label: "cybermalveillance.gouv.fr",
            },
            {
              name: "ANSSI",
              desc: "Agence Nationale de la Sécurité des Systèmes d'Information : guides, alertes et recommandations.",
              href: "https://www.ssi.gouv.fr",
              label: "ssi.gouv.fr",
            },
            {
              name: "CERT-FR",
              desc: "Veille, alerte et réponse aux attaques informatiques.",
              href: "https://www.cert.ssi.gouv.fr",
              label: "cert.ssi.gouv.fr",
            },
            {
              name: "CNIL",
              desc: "Protection des données personnelles et RGPD.",
              href: "https://www.cnil.fr",
              label: "cnil.fr",
            },
            {
              name: "Signal Spam",
              desc: "Signalement des spams et campagnes de phishing.",
              href: "https://www.signal-spam.fr",
              label: "signal-spam.fr",
            },
            {
              name: "PHAROS",
              desc: "Signalement des contenus illicites sur Internet.",
              href: "https://www.internet-signalement.gouv.fr",
              label: "internet-signalement.gouv.fr",
            },
          ].map(({ name, desc, href, label }) => (
            <div key={name}>
              <p className="text-white font-semibold">{name}</p>
              <p className="mb-1">{desc}</p>
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">
                {label}
              </a>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Zone d'intervention",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-white/70">TRINEXTA intervient auprès des entreprises situées en Île-de-France :</p>
          <ul className="space-y-1.5">
            {[
              "Essonne (91)",
              "Paris (75)",
              "Hauts-de-Seine (92)",
              "Seine-Saint-Denis (93)",
              "Val-de-Marne (94)",
              "Yvelines (78)",
              "Val-d'Oise (95)",
              "Seine-et-Marne (77)",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-secondary shrink-0 mt-0.5">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-white/70">Interventions sur site et assistance à distance.</p>
        </div>
      ),
    },
  ],
}
