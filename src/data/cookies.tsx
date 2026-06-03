import type { LegalData } from "./mentions-legales"

export const cookiesData: LegalData = {
    hero: {
        title: "Gestion des cookies",
        imageSrc: "/images/legal/hero-cookies.jpg",
    },
    sections: [
        {
            title: "Qu'est-ce qu'un cookie ?",
            paragraphs: [
                "Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site internet. Il permet au site de mémoriser vos actions et préférences (nom d'utilisateur, langue, taille de police, etc.) pendant un temps donné."
            ]
        },
        {
            title: "Les cookies que nous utilisons",
            paragraphs: [
                "Notre site utilise les catégories de cookies suivantes :",
                "• Cookies strictement nécessaires : Indispensables au bon fonctionnement du site, ils ne peuvent pas être désactivés. Ils ne stockent aucune donnée personnelle.",
                "• Cookies de performance et d'analyse : Ils nous permettent de compter les visites et les sources de trafic afin de mesurer et d'améliorer les performances de notre site.",
                "• Cookies de sécurité : Utilisés pour prévenir les attaques et garantir la sécurité de vos données (ex: Google reCAPTCHA)."
            ]
        },
        {
            title: "Gestion de votre consentement",
            paragraphs: [
                "Lors de votre première visite sur trinexta.com, un bandeau vous informe de la présence de cookies et vous invite à indiquer votre choix. Les cookies non essentiels ne sont déposés que si vous les acceptez.",
                "Vous pouvez à tout moment modifier vos préférences ou retirer votre consentement en cliquant sur le lien « Gestion des cookies » présent en bas de chaque page du site."
            ]
        },
        {
            title: "Paramétrage de votre navigateur",
            paragraphs: [
                "Vous pouvez également configurer votre navigateur pour qu'il refuse systématiquement les cookies ou vous alerte avant leur dépôt. Toutefois, le refus des cookies nécessaires peut altérer votre expérience de navigation sur le Site."
            ]
        }
    ]
}
