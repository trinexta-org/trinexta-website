import React from "react"
import type { LegalData } from "./mentions-legales"

export const planReponseIncidentsData: LegalData = {
  hero: {
    title: "Plan de réponse aux incidents",
    imageSrc: "/images/legal/hero-mentions.jpg",
  },
  sections: [
    {
      title: "Présentation",
      paragraphs: [
        "TRINEXTA applique une méthodologie structurée permettant d'identifier, contenir, traiter et résoudre les incidents de sécurité affectant les systèmes d'information de ses clients. L'objectif est de réduire les impacts opérationnels, financiers et techniques, tout en assurant une reprise rapide des activités.",
        "L'ensemble des opérations de réponse à incident et de remédiation est assuré par l'équipe interne de TRINEXTA, sans sous-traitance.",
      ],
    },
    {
      title: "Signaler un incident",
      content: (
        <div className="space-y-2 text-sm text-white/70">
          <p><span className="text-white font-semibold">Téléphone :</span> <a href="tel:0978250746" className="text-secondary hover:underline transition-colors">09 78 25 07 46</a></p>
          <p><span className="text-white font-semibold">Support :</span> <a href="mailto:support@trinexta.fr" className="text-secondary hover:underline transition-colors">support@trinexta.fr</a></p>
          <p><span className="text-white font-semibold">Contact :</span> <a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></p>
        </div>
      ),
    },
    {
      title: "Étape 1 - Détection de l'incident",
      paragraphs: [
        "Un incident peut être détecté par un utilisateur, un antivirus, un pare-feu, une solution EDR/XDR, un système de supervision, un prestataire externe ou une alerte Microsoft 365.",
        "Exemples : compte compromis, virus, ransomware, fuite de données, intrusion réseau, site internet piraté.",
      ],
    },
    {
      title: "Étape 2 - Qualification",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-white/70">Les équipes TRINEXTA évaluent la nature de l&apos;incident, les systèmes concernés, les données concernées, les risques métier et le niveau de criticité.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[360px]">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-6 text-white font-bold text-xs uppercase tracking-wider">Criticité</th>
                  <th className="text-left py-2 text-white font-bold text-xs uppercase tracking-wider">Caractérisation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["Faible", "Incident isolé, aucun impact majeur."],
                  ["Moyenne", "Plusieurs utilisateurs impactés."],
                  ["Élevée", "Service métier dégradé."],
                  ["Critique", "Arrêt de production, ransomware, fuite de données, compromission généralisée."],
                ].map(([crit, desc]) => (
                  <tr key={crit}>
                    <td className="py-3 pr-6 align-top">
                      <span className="text-secondary font-bold text-xs">{crit}</span>
                    </td>
                    <td className="py-3 text-white/70 text-sm align-top">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      title: "Étape 3 - Contention",
      paragraphs: [
        "Objectif : empêcher la propagation. Actions possibles : isolation des postes, blocage des comptes compromis, déconnexion des serveurs, blocage des accès externes et suspension temporaire des services.",
      ],
    },
    {
      title: "Étape 4 - Préservation de la preuve",
      content: (
        <div className="space-y-3 text-sm text-white/70">
          <p>Avant toute manipulation d&apos;un disque ou d&apos;une machine virtuelle, TRINEXTA garantit l&apos;intégrité et la recevabilité des preuves :</p>
          <ul className="space-y-2">
            {[
              "Aucune action directe sur le système d'origine : nous réalisons d'abord une copie bit à bit (image forensique) du disque, ou un snapshot pour les environnements virtualisés.",
              "Toute l'analyse est ensuite menée sur la copie, jamais sur le support original.",
              "L'intégrité est vérifiée par le calcul et le contrôle d'empreintes cryptographiques (hash SHA-256) avant et après copie.",
              "Pour les supports physiques, utilisation d'un bloqueur d'écriture (write-blocker) afin d'empêcher toute modification.",
              "Chaque opération est horodatée et journalisée, et une chaîne de conservation (chain of custody) est documentée pour assurer la recevabilité des éléments.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-secondary shrink-0 mt-0.5">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Étape 5 - Investigation",
      paragraphs: [
        "Analyse technique de l'origine de l'attaque, de la méthode utilisée, de l'étendue de la compromission, des données concernées et des journaux systèmes.",
      ],
    },
    {
      title: "Étape 6 - Éradication",
      paragraphs: [
        "Suppression de la menace : nettoyage, réinstallation, application des correctifs de sécurité, réinitialisation des mots de passe et renforcement des protections.",
      ],
    },
    {
      title: "Étape 7 - Restauration",
      paragraphs: [
        "Retour progressif à la normale : vérification des sauvegardes, restauration des données, validation des services et contrôles de sécurité.",
      ],
    },
    {
      title: "Étape 8 - Retour d'expérience",
      paragraphs: [
        "TRINEXTA recommande une analyse des causes, la mise à jour des procédures, le renforcement des mesures de sécurité et la sensibilisation des utilisateurs.",
      ],
    },
    {
      title: "Obligations réglementaires",
      content: (
        <div className="space-y-4 text-sm text-white/70">
          <div>
            <p className="text-white font-semibold mb-1">Déclarer l&apos;incident à la CNIL</p>
            <p className="mb-1">En cas de violation de données personnelles (sous 72 heures lorsque cela s&apos;applique).</p>
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">cnil.fr</a>
          </div>
          <div>
            <p className="text-white font-semibold mb-1">Consulter l&apos;ANSSI</p>
            <p className="mb-1">Recommandations et guides de sécurité.</p>
            <a href="https://www.ssi.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">ssi.gouv.fr</a>
          </div>
          <div>
            <p className="text-white font-semibold mb-1">Consulter le CERT-FR</p>
            <p className="mb-1">Veille, alertes et réponse aux attaques.</p>
            <a href="https://www.cert.ssi.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">cert.ssi.gouv.fr</a>
          </div>
          <div>
            <p className="text-white font-semibold mb-1">Signaler via PHAROS</p>
            <p className="mb-1">Signalement des contenus frauduleux ou illicites.</p>
            <a href="https://www.internet-signalement.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">internet-signalement.gouv.fr</a>
          </div>
          <div>
            <p className="text-white font-semibold mb-1">Cybermalveillance.gouv.fr</p>
            <p className="mb-1">Assistance nationale aux victimes.</p>
            <a href="https://www.cybermalveillance.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">cybermalveillance.gouv.fr</a>
          </div>
        </div>
      ),
    },
    {
      title: "Services proposés par TRINEXTA",
      content: (
        <ul className="space-y-2">
          {[
            "Assistance en cas de cyberattaque",
            "Audit de sécurité",
            "Sécurisation Microsoft 365",
            "Mise en place du MFA",
            "Sauvegardes",
            "Protection anti-ransomware",
            "Supervision",
            "Infogérance",
            "Réponse aux incidents",
            "Sensibilisation cybersécurité",
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
      title: "Zone d'intervention",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-white/70">TRINEXTA accompagne les organisations situées en Île-de-France :</p>
          <ul className="space-y-1.5">
            {["Essonne (91)", "Paris (75)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)", "Yvelines (78)", "Val-d'Oise (95)", "Seine-et-Marne (77)"].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-secondary shrink-0 mt-0.5">-</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-white/70">Interventions sur site et à distance selon le niveau d&apos;urgence.</p>
        </div>
      ),
    },
  ],
}
