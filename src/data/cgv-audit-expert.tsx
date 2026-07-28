import React from "react"
import type { LegalData } from "./mentions-legales"
import { AUDIT_ORDER_PRICE_EUR, AUDIT_ORDER_DELAY_LABEL } from "./audit-seo/offer"

/**
 * Version des CGV vente en ligne affichée au moment de l'achat, référencée
 * dans AuditOrder.cgvVersion. À incrémenter (nouvelle date) à chaque
 * modification substantielle du texte ci-dessous.
 */
export const CGV_VENTE_EN_LIGNE_VERSION = "2026-07-28"

/**
 * Libellé de la case à cocher du formulaire de commande. Il vaut à la fois
 * acceptation des CGV et demande expresse d'exécution immédiate au sens de
 * l'article L221-28 du Code de la consommation : c'est la preuve de la
 * renonciation au droit de rétractation décrite à l'article 6 ci-dessous.
 *
 * Il vit ici, et pas dans le composant, pour être versionné avec les CGV :
 * toute modification de ce texte impose de bumper CGV_VENTE_EN_LIGNE_VERSION,
 * faute de quoi AuditOrder.cgvVersion ne permet plus de savoir ce que le
 * Client a réellement accepté.
 */
export const AUDIT_ORDER_CONSENT_LABEL = {
    cgvBefore: "J'accepte les ",
    cgvLink: "conditions générales de vente",
    cgvAfter: ".",
    immediateExecution:
        "Je demande le démarrage immédiat de mon audit et je reconnais ne plus pouvoir me rétracter une fois celui-ci livré.",
} as const

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
            paragraphs: [
                "Conformément à l'article L221-3 du Code de la consommation, un droit de rétractation de quatorze jours peut s'appliquer aux contrats conclus entre professionnels, sous réserve que le contrat soit conclu hors établissement, que l'objet du contrat n'entre pas dans le champ de l'activité principale du Client, et que le Client emploie cinq salariés ou moins.",
                "Conformément à l'article L221-28 du même code, ce droit ne peut être exercé lorsque la prestation a été intégralement exécutée avant la fin du délai de quatorze jours, dès lors que le Client a expressément demandé l'exécution immédiate de la prestation et reconnu perdre son droit de rétractation une fois celle-ci pleinement exécutée.",
                "Cette demande expresse et cette reconnaissance sont recueillies sur le formulaire de commande /audit-seo/expert au moyen de la case à cocher dont la validation conditionne la commande. Le libellé de cette case mentionne expressément le démarrage immédiat de la prestation et la perte du droit de rétractation une fois l'audit livré. La date de cette acceptation ainsi que la version des présentes CGV alors en vigueur sont enregistrées par TRINEXTA.",
                "Tant que l'audit n'a pas été livré, le Client éligible au droit de rétractation peut l'exercer par simple demande écrite adressée à TRINEXTA (article 9). Conformément à l'article L221-25 du Code de la consommation, le Client ayant demandé l'exécution immédiate reste redevable du montant correspondant à la prestation déjà fournie à la date de sa demande. Le remboursement du solde intervient dans un délai de quatorze jours à compter de la réception de celle-ci.",
                "Le Client qui souhaite conserver son droit de rétractation pendant toute la durée du délai de quatorze jours ne peut pas commander selon les modalités de l'article 5. Il est invité à contacter TRINEXTA (article 9) afin de convenir d'un délai d'exécution compatible.",
            ],
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