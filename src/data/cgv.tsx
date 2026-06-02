import React from "react"
import type { LegalData } from "./mentions-legales"

export const cgvData: LegalData = {
    hero: {
        title: "Conditions d'utilisation",
        imageSrc: "/images/legal/hero-utilisation.jpg",
    },
    sections: [
        {
            title: "Préambule",
            paragraphs: [
                "Les présentes Conditions Générales d’Utilisation (ci-après “CGU”) régissent l’accès et l’utilisation du site internet accessible à l’adresse trinexta.com (ci-après “le Site”), édité par la société TRUSTECH IT SUPPORT, agissant sous la marque commerciale Trinexta."
            ]
        },
        {
            title: "1 : Objet et Acceptation",
            paragraphs: [
                "Les présentes CGU ont pour objet de définir les conditions dans lesquelles les utilisateurs peuvent accéder au Site et utiliser les informations qui y sont présentées. L’accès et l’utilisation du Site impliquent l’acceptation pleine et entière, sans réserve, des présentes CGU par l’Utilisateur."
            ]
        },
        {
            title: "2 : Définitions",
            paragraphs: [
                <span key="def-site"><strong className="text-white">Le Site :</strong> désigne le site internet trinexta.com et l’ensemble de ses contenus.</span>,
                <span key="def-editeur"><strong className="text-white">L’Éditeur :</strong> désigne la société TRUSTECH IT SUPPORT, propriétaire et exploitante du Site sous la marque Trinexta.</span>,
                <span key="def-utilisateur"><strong className="text-white">L’Utilisateur :</strong> désigne toute personne physique ou morale qui visite et utilise le Site.</span>,
                <span key="def-services"><strong className="text-white">Les Services :</strong> désigne l’ensemble des prestations présentées sur le Site, telles que décrites à la section 3.</span>,
            ]
        },
        {
            title: "3 : Description des Services",
            paragraphs: [
                "Le Site a pour vocation de présenter l’ensemble des services proposés par Trinexta, qui se déclinent en deux catégories principales :",
                <span key="serv-1"><strong className="text-white">3.1. Les Services Managés (Offres Essentielle & Sérénité) :</strong> Cette catégorie regroupe les prestations de services informatiques packagées, incluant notamment des services de support proactif (Helpdesk), de maintenance préventive et de gestion d’infrastructure (infogérance). Ces services font l’objet de contrats commerciaux spécifiques définissant leurs périmètres et modalités.</span>,
                <span key="serv-2"><strong className="text-white">3.2. Le Service de Délégation de Personnel (Offre Impulsion) :</strong> Cette prestation consiste en la mise à disposition de compétences et de personnel technique qualifié (techniciens support, etc.) pour des missions de durée variable (courte ou longue durée) au sein des entreprises clientes. Ce service vise à fournir un renfort humain et une expertise à la demande.</span>,
                "Les modalités contractuelles, tarifications et engagements spécifiques à chaque Service sont détaillés dans les devis et contrats commerciaux correspondants. Les présentes CGU ne régissent que l’utilisation du Site en tant que plateforme d’information et de contact."
            ]
        },
        {
            title: "4 : Accès et Utilisation du Site",
            paragraphs: [
                "L’accès au Site est libre et gratuit pour tout Utilisateur disposant d’un accès à Internet. L’Utilisateur est seul responsable du bon fonctionnement de son équipement informatique. L’Utilisateur s’engage à utiliser le Site de manière loyale, dans le respect des lois en vigueur et des présentes CGU. Il est responsable de l’exactitude des informations qu’il fournit via les formulaires de contact."
            ]
        },
        {
            title: "5 : Propriété Intellectuelle",
            paragraphs: [
                "L’ensemble des éléments constituant le Site (textes, images, logos, vidéos, charte graphique, etc.) sont la propriété exclusive de l’Éditeur ou font l’objet d’une autorisation d’utilisation. Toute reproduction, représentation, modification ou diffusion, totale ou partielle, de l’un de ces éléments sans l’autorisation écrite et préalable de l’Éditeur est strictement interdite et susceptible de constituer une contrefaçon."
            ]
        },
        {
            title: "6 : Données Personnelles",
            paragraphs: [
                <span key="dp">L’Éditeur s’engage à protéger les données personnelles des Utilisateurs. La collecte et le traitement de ces données, effectués lors de l’utilisation du Site, sont régis par notre <a href="/confidentialite" className="text-secondary hover:underline transition-colors">Politique de Confidentialité</a>.</span>
            ]
        },
        {
            title: "7 : Responsabilité",
            paragraphs: [
                "L'Éditeur décline toute responsabilité en cas :",
                "• De toute interruption de service, bug ou erreur de fonctionnement.",
                "• De l’éventuelle présence de virus ou d’autres éléments nuisibles sur le Site.",
                "• De tout dommage direct ou indirect résultant de l’utilisation du Site ou de l’impossibilité d’y accéder."
            ]
        },
        {
            title: "8 : Liens Hypertextes",
            paragraphs: [
                "Le Site peut contenir des liens hypertextes vers d’autres sites internet. L’Éditeur n’exerce aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant à leur contenu ou à l’utilisation qui pourrait en être faite."
            ]
        },
        {
            title: "9 : Modifications des CGU",
            paragraphs: [
                "L’Éditeur se réserve le droit de modifier les présentes CGU à tout moment et sans préavis. Les modifications entrent en vigueur dès leur publication sur le Site. Il est conseillé à l’Utilisateur de consulter régulièrement cette page pour prendre connaissance des éventuelles mises à jour."
            ]
        },
        {
            title: "10 : Droit Applicable et Juridiction Compétente",
            paragraphs: [
                "Les présentes CGU sont soumises au droit français. En cas de litige relatif à leur interprétation ou à leur exécution, les parties s’efforceront de trouver une solution amiable. À défaut d’accord amiable, le litige sera soumis aux tribunaux compétents du ressort du siège social de l’Éditeur."
            ]
        }
    ]
}