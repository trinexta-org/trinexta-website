"use client"

import { Heading } from "@/components/ui/Typography"
import { Card } from "@/components/ui/Card"

const structuralServices = [
    {
        title: "Migration de messagerie vers Microsoft 365",
        desc: "Vous utilisez encore une messagerie hébergée chez OVH, Orange, Free ou un autre prestataire ? Nous prenons en charge votre migration vers Microsoft 365 pour vous faire gagner en fiabilité, en confort d'usage et en professionnalisme.",
        meta: "Sur devis — Généralement réalisé en 1 journée",
        points: [
            "Création de votre environnement Microsoft 365",
            "Transfert de vos e-mails, contacts et calendriers",
            "Configuration sur vos ordinateurs, téléphones et tablettes",
            "Mise en place de la double authentification (MFA)",
            "Vérification des enregistrements DNS et paramétrage anti-spam",
            "Création de boîtes mail partagées",
            "Accompagnement de vos équipes pour la prise en main d'Outlook",
        ],
    },
    {
        title: "Création et configuration d'un environnement Microsoft 365",
        desc: "Vous souhaitez structurer votre entreprise avec des outils professionnels comme Outlook, Teams, OneDrive ou SharePoint ? Nous créons et configurons votre environnement Microsoft 365 de A à Z.",
        meta: "Sur devis — Partenaire Microsoft certifié",
        points: [
            "Création du tenant Microsoft 365 au nom de votre entreprise",
            "Création des comptes utilisateurs et attribution des licences",
            "Configuration de votre messagerie professionnelle",
            "Mise en place de OneDrive et SharePoint pour le partage des fichiers",
            "Activation de Teams pour la communication interne",
            "Sécurisation de l'ensemble avec MFA et règles de sécurité adaptées",
        ],
    },
    {
        title: "Conseil et accompagnement à l'achat de matériel",
        desc: "Besoin d'un nouvel ordinateur, d'un écran ou d'une imprimante ? Nous vous accompagnons pour choisir un équipement réellement adapté à votre activité, sans surdimensionnement inutile.",
        meta: "Sur devis — On optimise avant de remplacer",
        points: [
            "Audit de votre matériel actuel",
            "Recommandation sur mesure selon vos usages et votre budget",
            "Commande et livraison via nos partenaires (Dell, Lenovo, Microsoft)",
            "Préparation complète du poste avant livraison",
            "Installation et configuration dans votre environnement",
        ],
    },
    {
        title: "Mise à niveau Windows Famille vers Windows Professionnel",
        desc: "Votre ordinateur fonctionne sous Windows Family ? Pour un usage professionnel, certaines fonctions importantes peuvent vous manquer. Nous réalisons la mise à niveau vers Windows Professionnel.",
        meta: "Sur devis — Intervention en 2 à 3 heures",
        points: [
            "Licence officielle Windows 11 Professionnel",
            "Mise à niveau sur place sans perte de données",
            "Activation des fonctions utiles en entreprise",
            "Optimisation et sécurisation du poste",
            "Connexion à votre environnement Microsoft 365",
        ],
    },
    {
        title: "Optimisation et remise à niveau de poste existant",
        desc: "Votre ordinateur est lent ? Avant d'envisager un achat neuf, nous pouvons souvent améliorer sensiblement ses performances pour un budget bien plus raisonnable.",
        meta: "Sur devis — Souvent plus économique qu'un neuf",
        points: [
            "Diagnostic complet du poste",
            "Ajout de mémoire RAM si nécessaire",
            "Remplacement du disque dur par un SSD",
            "Réinstallation propre de Windows si besoin",
            "Nettoyage logiciel et suppression des programmes inutiles",
            "Vérification de la sécurité et mise à jour complète",
        ],
    },
    {
        title: "Installation et configuration réseau",
        desc: "Vous avez besoin d'un WiFi plus fiable, d'un partage de fichiers entre vos postes ou d'un accès à distance sécurisé ? Nous concevons et configurons un réseau adapté.",
        meta: "Sur devis — Adapté à la taille de votre entreprise",
        points: [
            "Installation et configuration de votre box ou routeur professionnel",
            "Mise en place d'un WiFi sécurisé (séparation Invités / Entreprise)",
            "Partage de fichiers et d'imprimantes entre les postes",
            "Configuration d'un NAS pour le stockage local",
            "Mise en place d'un VPN pour l'accès à distance sécurisé",
        ],
    },
    {
        title: "Arrivée ou départ d'un collaborateur",
        desc: "L'arrivée ou le départ d'un salarié demande une gestion informatique rigoureuse. Nous prenons en charge ces étapes pour que tout soit prêt, sécurisé et bien organisé.",
        meta: "Sur devis — Pour que rien ne se perde",
        points: [
            "Arrivée : création du compte, configuration du poste, accès messagerie, logiciels",
            "Départ : sauvegarde des données, transfert des e-mails, suppression sécurisée du compte",
            "Gestion des licences Microsoft 365",
            "Transfert d'une boîte mail vers un autre collaborateur si besoin",
        ],
    },
    {
        title: "Mise en place de sauvegarde professionnelle",
        desc: "Vos données ne doivent pas dépendre du hasard. Une panne, un vol ou une erreur peuvent avoir des conséquences lourdes.",
        meta: "Sur devis — Parce que vos données sont essentielles",
        points: [
            "Sauvegarde automatique dans le cloud",
            "Sauvegarde locale sur NAS ou disque externe",
            "Planification quotidienne ou hebdomadaire",
            "Vérification régulière de l'intégrité des sauvegardes",
            "Plan de restauration en cas d'incident (PRA)",
        ],
    },
    {
        title: "Sécurisation de la messagerie professionnelle",
        desc: "La messagerie reste l'une des principales portes d'entrée des cyberattaques. Nous renforçons la sécurité de vos comptes e-mail.",
        meta: "Sur devis — La sécurité commence par les e-mails",
        points: [
            "Activation de la double authentification sur tous les comptes",
            "Configuration anti-spam et anti-phishing avancée",
            "Mise en place des protections DNS : SPF, DKIM, DMARC",
            "Sensibilisation de vos équipes aux bons réflexes",
            "Audit de sécurité de votre messagerie existante",
        ],
    },
    {
        title: "Formation et accompagnement utilisateurs",
        desc: "Des outils bien choisis ne suffisent pas toujours. Nous proposons des formations simples, concrètes et accessibles.",
        meta: "Sur devis — Adapté au niveau de chaque équipe",
        points: [
            "Prise en main de Microsoft 365 : Outlook, Teams, OneDrive, SharePoint",
            "Bonnes pratiques de sécurité : mots de passe, phishing, sauvegardes",
            "Utilisation plus efficace du poste de travail au quotidien",
        ],
    },
];

export function ServicesGrid() {
    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {structuralServices.map((service, index) => (
                    <Card key={index} className="p-5 bg-white/[0.01] border-white/5 flex flex-col justify-between hover:border-secondary/20 transition-all space-y-4 rounded-xl">
                        <div className="space-y-2.5">
                            <h4 className="text-base font-bold text-white leading-snug">{service.title}</h4>
                            <p className="text-xs text-white/50 leading-relaxed">{service.desc}</p>
                            <ul className="space-y-1.5 pt-2 border-t border-white/5">
                                {service.points.map((pt, k) => (
                                    <li key={k} className="text-xs text-white/80 flex items-start gap-2">
                                        <span className="text-secondary shrink-0 mt-0.5">✓</span>
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-[10px] font-bold text-secondary uppercase tracking-wider border-t border-white/5 pt-3">
                            {service.meta}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}