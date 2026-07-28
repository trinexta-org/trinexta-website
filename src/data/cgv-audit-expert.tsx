import React from "react"
import type { LegalData } from "./mentions-legales"
import { AUDIT_ORDER_PRICE_EUR, AUDIT_ORDER_DELAY_LABEL } from "./audit-seo/offer"

/**
 * Version des CGV vente en ligne affichée au moment de l'achat, référencée
 * dans AuditOrder.cgvVersion. À incrémenter (nouvelle date) à chaque
 * modification substantielle du texte ci-dessous.
 */
export const CGV_VENTE_EN_LIGNE_VERSION = "2026-07-28"

export const cgvAuditExpertData: LegalData = {
    hero: {
        title: "CGV — Vente en ligne (Audit SEO Expert)",
        imageSrc: "/images/legal/hero-utilisation.jpg",
    },
    sections: [
        {
            title: "Préambule",
            paragraphs: [
                "Les présentes Conditions Générales de Vente régissent exclusivement l'achat en ligne de la prestation \"Audit SEO Expert\" commercialisée par TRINEXTA sur le site trinexta.fr. Elles sont distinctes des Conditions Générales de Vente applicables aux prestations de refonte, d'infogérance et autres services Trinexta, disponibles séparément.",
                "Toute commande passée via le formulaire /audit-seo/expert implique l'acceptation pleine et entière des présentes CGV.",
            ],
        },
        {
            title: "Article 1 - Identification du prestataire",
            paragraphs: [
                "TRUSTECH IT SUPPORT, exploitant la marque commerciale TRINEXTA.",
                "SASU au capital social de 15 000 €",
                "Immatriculée au Registre du Commerce et des Sociétés d'Évry sous le numéro 942 020 082",
                "Siège social : 74 B Boulevard Henri Dunant, 91100 Corbeil-Essonnes",
                "Téléphone : 09 78 25 07 46",
                <span key="email"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
            ],
        },
        {
            title: "Article 2 - Nature de la prestation",
            paragraphs: [
                "L'Audit SEO Expert est une analyse manuelle réalisée par un expert Trinexta, portant sur la page ou le site indiqué par le Client au moment de la commande. Elle donne lieu à un livrable détaillé au format Word ou PDF ainsi qu'à une restitution en visioconférence de 30 à 45 minutes.",
                "Cette prestation constitue une obligation de moyens. TRINEXTA ne garantit aucun résultat en matière de positionnement, de trafic ou de chiffre d'affaires découlant de la mise en œuvre des recommandations de l'audit.",
            ],
        },
        {
            title: "Article 3 - Prix",
            paragraphs: [
                `Le prix de la prestation est de ${AUDIT_ORDER_PRICE_EUR}€ TTC, montant fixe et intégralement affiché avant paiement. Ce montant est identique au montant débité lors du paiement en ligne : aucun frais supplémentaire n'est appliqué au moment du règlement.`,
                "Ce montant est entièrement déduit du coût d'une refonte de site si le Client confie ultérieurement ce projet à TRINEXTA.",
            ],
        },
        {
            title: "Article 4 - Modalités de paiement",
            paragraphs: [
                "Le règlement s'effectue exclusivement en ligne, par carte bancaire, via la plateforme sécurisée Stripe. La commande est confirmée dès réception du paiement. TRINEXTA ne conserve aucune donnée bancaire du Client, celles-ci étant traitées directement par Stripe.",
                "Une facture est émise et transmise au Client par voie électronique après paiement.",
            ],
        },
        {
            title: "Article 5 - Délai de livraison et garantie",
            paragraphs: [
                `${AUDIT_ORDER_DELAY_LABEL}, à compter de la confirmation du paiement.`,
                `Si ce délai n'est pas respecté, TRINEXTA rembourse intégralement le Client. Cette garantie porte exclusivement sur le respect du délai de livraison du livrable ; elle ne constitue pas un droit de rétractation ou de satisfait-ou-remboursé sur le contenu de la prestation elle-même.`,
            ],
        },
        {
            title: "Article 6 - Droit de rétractation",
            content: (
                <div className="space-y-3">
                    <p className="text-sm md:text-base text-white/70 leading-relaxed">
                        Conformément à l&apos;article L221-3 du Code de la consommation, un droit de rétractation de 14 jours peut s&apos;appliquer aux contrats conclus entre professionnels, sous réserve que le contrat soit conclu hors établissement, que l&apos;objet du contrat n&apos;entre pas dans le champ de l&apos;activité principale du Client, et que le Client emploie cinq salariés ou moins.
                    </p>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed">
                        Les modalités précises d&apos;application de ce droit à la prestation Audit SEO Expert, ainsi que les conditions d&apos;exercice éventuelles de ce droit compte tenu du délai de livraison de 72h ouvrées, sont en cours de validation par TRINEXTA et seront précisées dans une version ultérieure des présentes CGV.
                    </p>
                </div>
            ),
        },
        {
            title: "Article 7 - Responsabilité",
            paragraphs: [
                "La responsabilité de TRINEXTA au titre de la présente prestation est strictement limitée au montant effectivement payé par le Client. TRINEXTA ne pourra être tenue responsable des pertes d'exploitation, pertes de chiffre d'affaires ou dommages indirects résultant de l'utilisation ou de la non-utilisation des recommandations formulées dans l'audit.",
            ],
        },
        {
            title: "Article 8 - Droit applicable et juridiction",
            paragraphs: [
                "Les présentes CGV sont soumises au droit français. Tout litige sera soumis à la compétence exclusive des tribunaux du ressort de la Cour d'Appel de Paris, sauf disposition légale impérative contraire.",
            ],
        },
        {
            title: "Article 9 - Contact",
            paragraphs: [
                "Téléphone : 09 78 25 07 46",
                <span key="email-c"><a href="mailto:contact@trinexta.fr" className="text-secondary hover:underline transition-colors">contact@trinexta.fr</a></span>,
            ],
        },
    ],
}