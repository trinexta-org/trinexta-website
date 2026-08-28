"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Heading } from "@/components/ui/Typography"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

const structuralServices = [
    {
        title: "Migration de messagerie vers Microsoft 365",
        desc: "Vous utilisez encore une messagerie hébergée chez OVH, Orange, Free ou un autre prestataire ? Nous prenons en charge votre migration vers Microsoft 365 pour vous faire gagner en fiabilité, en confort d'usage et en professionnalisme. Une migration bien préparée, sans coupure de service ni perte de données, pour repartir sur des bases saines et professionnelles.",
        meta: "Sur devis - Généralement réalisé en 1 journée",
        image: "/images/services-annexes/migration-messagerie-365.webp",
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
        desc: "Vous souhaitez structurer votre entreprise avec des outils professionnels comme Outlook, Teams, OneDrive ou SharePoint ? Nous créons et configurons votre environnement Microsoft 365 de A à Z. Un socle solide et évolutif, pensé pour accompagner la croissance de votre activité sans repartir de zéro plus tard.",
        meta: "Sur devis - Partenaire Microsoft certifié",
        image: "/images/services-annexes/environnement-365.webp",
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
        desc: "Besoin d'un nouvel ordinateur, d'un écran ou d'une imprimante ? Nous vous accompagnons pour choisir un équipement réellement adapté à votre activité, sans surdimensionnement inutile. Vous investissez juste, ni trop ni trop peu, dans du matériel qui tiendra dans la durée.",
        meta: "Sur devis - On optimise avant de remplacer",
        image: "/images/services-annexes/conseil-materiel.webp",
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
        desc: "Votre ordinateur fonctionne sous Windows Family ? Pour un usage professionnel, certaines fonctions importantes peuvent vous manquer. Nous réalisons la mise à niveau vers Windows Professionnel, en toute simplicité et sans interrompre votre activité.",
        meta: "Sur devis - Intervention en 2 à 3 heures",
        image: "/images/services-annexes/windows-pro.webp",
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
        desc: "Votre ordinateur est lent ? Avant d'envisager un achat neuf, nous pouvons souvent améliorer sensiblement ses performances pour un budget bien plus raisonnable. Un diagnostic précis avant toute intervention, pour ne payer que ce qui est réellement utile.",
        meta: "Sur devis - Souvent plus économique qu'un neuf",
        image: "/images/services-annexes/optimisation-poste.webp",
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
        desc: "Vous avez besoin d'un WiFi plus fiable, d'un partage de fichiers entre vos postes ou d'un accès à distance sécurisé ? Nous concevons et configurons un réseau adapté à la taille et aux usages réels de votre entreprise, sans complexité superflue.",
        meta: "Sur devis - Adapté à la taille de votre entreprise",
        image: "/images/services-annexes/reseau-entreprise.webp",
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
        desc: "L'arrivée ou le départ d'un salarié demande une gestion informatique rigoureuse. Nous prenons en charge ces étapes pour que tout soit prêt, sécurisé et bien organisé, sans risque d'oubli ni de faille de sécurité au moment du changement.",
        meta: "Sur devis - Pour que rien ne se perde",
        image: "/images/services-annexes/arrivee-depart.webp",
        points: [
            "Arrivée : création du compte, configuration du poste, accès messagerie, logiciels",
            "Départ : sauvegarde des données, transfert des e-mails, suppression sécurisée du compte",
            "Gestion des licences Microsoft 365",
            "Transfert d'une boîte mail vers un autre collaborateur si besoin",
        ],
    },
    {
        title: "Mise en place de sauvegarde professionnelle",
        desc: "Vos données ne doivent pas dépendre du hasard. Une panne, un vol ou une erreur peuvent avoir des conséquences lourdes. Nous mettons en place une stratégie de sauvegarde fiable, automatisée et régulièrement vérifiée pour votre tranquillité d'esprit.",
        meta: "Sur devis - Parce que vos données sont essentielles",
        image: "/images/services-annexes/sauvegarde-pro.webp",
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
        desc: "La messagerie reste l'une des principales portes d'entrée des cyberattaques. Nous renforçons la sécurité de vos comptes e-mail pour réduire drastiquement le risque de phishing, d'usurpation et de fuite de données.",
        meta: "Sur devis - La sécurité commence par les e-mails",
        image: "/images/services-annexes/securisation-messagerie.webp",
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
        desc: "Des outils bien choisis ne suffisent pas toujours. Nous proposons des formations simples, concrètes et accessibles, pour que vos équipes gagnent en autonomie et en efficacité au quotidien sur leurs outils de travail.",
        meta: "Sur devis - Adapté au niveau de chaque équipe",
        image: "/images/services-annexes/formation-utilisateurs.webp",
        points: [
            "Prise en main de Microsoft 365 : Outlook, Teams, OneDrive, SharePoint",
            "Bonnes pratiques de sécurité : mots de passe, phishing, sauvegardes",
            "Utilisation plus efficace du poste de travail au quotidien",
        ],
    },
]

export function ServicesGrid() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const goToSlide = (index: number) => {
        if (!scrollContainerRef.current) return
        const newIndex = (index + structuralServices.length) % structuralServices.length
        setCurrentIndex(newIndex)

        const slideWidth = scrollContainerRef.current.clientWidth
        scrollContainerRef.current.scrollTo({
            left: newIndex * slideWidth,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        if (isPaused) return

        intervalRef.current = setInterval(() => {
            goToSlide(currentIndex + 1)
        }, 6000)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [currentIndex, isPaused])

    const handleManualNav = (direction: "prev" | "next") => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        goToSlide(direction === "prev" ? currentIndex - 1 : currentIndex + 1)
    }

    const togglePause = () => {
        setIsPaused((prev) => !prev)
    }

    return (
        <div className="relative px-0 md:px-20">
            <div
                ref={scrollContainerRef}
                className="relative overflow-x-scroll overflow-y-hidden snap-x snap-mandatory scroll-smooth flex no-scrollbar"
                style={{
                    scrollSnapType: "x mandatory",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {structuralServices.map((service, index) => {
                    const imageFirst = index % 2 === 0

                    return (
                        <div
                            key={index}
                            className="w-full flex-shrink-0 snap-start pt-20 md:pt-28"
                            style={{ scrollSnapAlign: "start" }}
                        >
                            <div
                                className={`relative bg-surface-strong rounded-[48px] flex flex-col ${imageFirst ? "md:flex-row" : "md:flex-row-reverse"} items-center md:items-start gap-6 md:gap-12 p-6 md:p-10 pt-24 md:pt-32 md:min-h-[720px]`}
                            >
                                <div className="relative z-20 w-full md:w-[50%] -mt-32 md:-mt-48 flex-shrink-0 flex flex-col">
                                    <div className="relative w-full h-[280px] md:h-[480px] rounded-[32px] overflow-hidden">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            sizes="(min-width: 768px) 50vw, 90vw"
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-secondary/20 text-xs font-bold text-secondary-strong uppercase tracking-wider">
                                        {service.meta}
                                    </div>
                                </div>

                                <div className="relative z-10 w-full p-2 md:p-4 self-stretch flex flex-col">
                                    <span className="text-secondary-strong text-xs md:text-sm font-bold tracking-widest uppercase mb-3 block">
                                        {String(index + 1).padStart(2, "0")} / {String(structuralServices.length).padStart(2, "0")}
                                    </span>

                                    <Heading
                                        as="h3"
                                        className="text-2xl md:text-3xl xl:text-4xl text-foreground mb-4 tracking-tight font-extrabold"
                                    >
                                        {service.title}
                                    </Heading>

                                    <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
                                        {service.desc}
                                    </p>

                                    <ul className="space-y-2.5 pt-4 border-t border-secondary/20">
                                        {service.points.map((pt, k) => (
                                            <li key={k} className="text-sm text-foreground/80 flex items-start gap-2">
                                                <span className="text-secondary-strong shrink-0 mt-0.5">✓</span>
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Flèches mobile : sous la carte, jamais collées */}
            <div className="flex md:hidden justify-center items-center gap-4 mt-8">
                <button
                    onClick={() => handleManualNav("prev")}
                    aria-label="Service précédent"
                    className="w-12 h-12 rounded-full bg-background flex items-center justify-center hover:bg-secondary transition-all duration-300 group"
                >
                    <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                </button>
                <button
                    onClick={togglePause}
                    aria-label={isPaused ? "Reprendre le défilement" : "Mettre en pause le défilement"}
                    className="w-12 h-12 rounded-full bg-background flex items-center justify-center hover:bg-secondary transition-all duration-300 group"
                >
                    {isPaused ? (
                        <Play className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                    ) : (
                        <Pause className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                    )}
                </button>
                <button
                    onClick={() => handleManualNav("next")}
                    aria-label="Service suivant"
                    className="w-12 h-12 rounded-full bg-background flex items-center justify-center hover:bg-secondary transition-all duration-300 group"
                >
                    <ChevronRight className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
                </button>
            </div>

            {/* Flèches desktop : à l'extérieur de la carte, avec marge dédiée */}
            <button
                onClick={() => handleManualNav("prev")}
                aria-label="Service précédent"
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-14 h-14 rounded-full bg-background items-center justify-center hover:bg-secondary hover:scale-105 transition-all duration-300 group"
            >
                <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-white transition-colors" />
            </button>

            <button
                onClick={() => handleManualNav("next")}
                aria-label="Service suivant"
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 w-14 h-14 rounded-full bg-background items-center justify-center hover:bg-secondary hover:scale-105 transition-all duration-300 group"
            >
                <ChevronRight className="w-6 h-6 text-foreground group-hover:text-white transition-colors" />
            </button>

            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    )
}