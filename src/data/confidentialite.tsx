import React from "react"
import type { LegalData } from "./mentions-legales"

export const confidentialiteData: LegalData = {
    hero: {
        title: "Politique de confidentialité",
        imageSrc: "/images/legal/hero-confidentialite.jpg",
    },
    sections: [
        {
            title: "Introduction",
            paragraphs: [
                "Chez TRUSTECH IT SUPPORT (“nous”, “notre”), la protection de votre vie privée et la sécurité de vos informations personnelles sont une priorité. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos données lorsque vous utilisez notre site trinexta.com (ci-après “le Site”)."
            ]
        },
        {
            title: "1. Les informations que nous collectons",
            paragraphs: [
                <span key="c1"><strong className="text-white">1.1. Informations que vous nous fournissez directement :</strong> Lorsque vous nous contactez via un formulaire, par email ou par téléphone, nous pouvons collecter votre nom, prénom, adresse e-mail et numéro de téléphone, ainsi que toute information relative à vos projets ou à vos demandes (secteur d’activité, besoins spécifiques, etc.).</span>,
                <span key="c2"><strong className="text-white">1.2. Informations que nous collectons automatiquement :</strong> Nous collectons automatiquement des données liées à votre navigation sur le Site grâce à des cookies et autres technologies similaires (votre adresse IP, le type et la version de votre navigateur, votre système d’exploitation, les pages que vous visitez, la durée de votre visite et les actions que vous réalisez sur le Site).</span>
            ]
        },
        {
            title: "2. Comment nous utilisons vos données",
            paragraphs: [
                "Nous utilisons vos informations pour des finalités précises, basées sur des fondements juridiques clairs :",
                <span key="u1"><strong className="text-white">2.1 Pour répondre à vos demandes :</strong> Traiter vos questions, vous fournir des devis personnalisés et assurer le suivi de nos échanges. (Base légale : exécution de mesures précontractuelles ou d’un contrat).</span>,
                <span key="u2"><strong className="text-white">2.2 Pour améliorer notre Site et nos services :</strong> Analyser les données de navigation afin de comprendre comment nos visiteurs utilisent le Site, optimiser l’ergonomie et la pertinence de nos contenus. (Base légale : notre intérêt légitime à améliorer nos services).</span>,
                <span key="u3"><strong className="text-white">2.3 Pour nos communications marketing :</strong> Vous envoyer des informations, actualités ou offres relatives à nos services. (Base légale : votre consentement. Vous pouvez le retirer à tout moment en cliquant sur le lien de désinscription).</span>
            ]
        },
        {
            title: "3. Partage et transfert de vos données",
            paragraphs: [
                "Nous ne vendons jamais vos données personnelles. Nous pouvons cependant les partager dans les cas suivants :",
                <span key="p1"><strong className="text-white">3.1 Avec nos partenaires de confiance et sous-traitants :</strong> Nous pouvons faire appel à des prestataires pour des services spécifiques (hébergement, maintenance, analyse d’audience, etc.). Ils n’ont accès qu’aux données nécessaires à l’exécution de leur mission et sont soumis à une obligation de confidentialité.</span>,
                <span key="p2"><strong className="text-white">3.2 Pour des obligations légales :</strong> Nous pourrions divulguer vos données si la loi nous y oblige ou pour protéger nos droits en justice.</span>,
                <span key="p3"><strong className="text-white">3.3 Transferts hors de l’Union Européenne :</strong> Certains partenaires (comme Google pour reCAPTCHA) sont basés hors UE. Ces transferts sont encadrés par des garanties appropriées (Clauses Contractuelles Types) pour assurer une protection conforme au RGPD.</span>
            ]
        },
        {
            title: "4. Sécurité de vos données",
            paragraphs: [
                "Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles (telles que le protocole SSL) pour protéger vos informations contre tout accès non autorisé, toute altération ou perte. Toutefois, aucune transmission de données sur Internet n’est sécurisée à 100%, et nous ne pouvons garantir une sécurité absolue."
            ]
        },
        {
            title: "5. Durée de conservation de vos données",
            paragraphs: [
                "Vos informations personnelles sont conservées pour une durée qui n’excède pas celle nécessaire aux finalités pour lesquelles elles ont été collectées :",
                "• Pour les demandes de contact et prospects : 3 ans à compter de notre dernier contact avec vous.",
                "• Pour clients : Pendant la durée de la relation contractuelle, puis archivées conformément aux obligations légales de conservation.",
                "• Les données de navigation (cookies) : Pour une durée maximale de 13 mois."
            ]
        },
        {
            title: "6. Vos droits sur vos données",
            paragraphs: [
                "Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données :",
                <span key="droit61"><strong className="text-white">6.1 Droit d’accès :</strong> Le droit de savoir quelles données nous détenons sur vous et d’en obtenir une copie.</span>,
                <span key="droit62"><strong className="text-white">6.2 Droit de rectification :</strong> Le droit de demander la correction de vos données si elles sont inexactes ou incomplètes.</span>,
                <span key="droit63"><strong className="text-white">6.3 Droit à l’effacement (“droit à l’oubli”) :</strong> Le droit de demander la suppression de vos données, sous certaines conditions.</span>,
                <span key="droit64"><strong className="text-white">6.4 Droit d’opposition :</strong> Le droit de vous opposer à certains traitements de vos données, notamment à des fins de marketing direct.</span>,
                <span key="droit65"><strong className="text-white">6.5 Droit à la limitation du traitement :</strong> Le droit de demander le “gel” de l’utilisation de vos données dans certains cas.</span>,
                <span key="droit66"><strong className="text-white">6.6 Droit à la portabilité :</strong> Le droit de récupérer les données que vous nous avez fournies dans un format structuré et de les transmettre à un autre responsable de traitement.</span>,
                <span key="droit1">Pour exercer ces droits, vous pouvez nous contacter par email à : <a href="mailto:contact@trinexta.com" className="text-secondary hover:underline transition-colors">contact@trinexta.com</a>.</span>,
                <span key="droit2">Vous disposez également du droit d’introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">www.cnil.fr</a>).</span>
            ]
        },
        {
            title: "7. Politique en matière de cookies",
            paragraphs: [
                <span key="cookies">Notre Site utilise des cookies. Lors de votre première visite, un bandeau vous permet de donner votre consentement au dépôt des cookies non essentiels. Pour plus de détails, consultez notre <a href="/cookies" className="text-secondary hover:underline transition-colors">Politique de Cookies</a>.</span>
            ]
        },
        {
            title: "8. Modifications de cette politique",
            paragraphs: [
                "Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment. Toute mise à jour sera publiée sur cette page."
            ]
        },
        {
            title: "9. Contact",
            paragraphs: [
                <span key="contact">Pour toute question concernant cette Politique, vous pouvez nous contacter à l’adresse <a href="mailto:contact@trinexta.com" className="text-secondary hover:underline transition-colors">contact@trinexta.com</a>.</span>
            ]
        }
    ]
}