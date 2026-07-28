import type { FaqItem } from "@/components/shared/FaqSection";
import { AUDIT_ORDER_PRICE_EUR } from "./offer";

export const expertAuditFaqs: FaqItem[] = [
    {
        question: "Que se passe-t-il après mon paiement ?",
        answer: "Votre commande est confirmée immédiatement par email. Un expert Trinexta prend en charge l'analyse manuelle de votre site, puis vous transmet le livrable complet accompagné d'un créneau pour la restitution en visio.",
    },
    {
        question: "Sous combien de temps je reçois l'audit ?",
        answer: "Livrable sous 72h ouvrées. Vous recevez le livrable détaillé par email, puis vous échangez avec l'expert lors de la restitution en visio au créneau réservé.",
    },
    {
        question: "Et si le délai n'est pas tenu ?",
        answer: "Nous nous engageons sur ce délai. S'il n'est pas respecté, vous êtes intégralement remboursé.",
    },
    {
        question: "Vais-je recevoir une facture ?",
        answer: "Oui, une facture est émise et transmise par email dès la confirmation du paiement.",
    },
    {
        question: "Comment l'audit se déduit-il de la refonte ?",
        answer: `Si vous nous confiez la refonte de votre site, le montant de ${AUDIT_ORDER_PRICE_EUR}€ TTC payé pour l'audit est intégralement déduit du montant de la refonte.`,
    },
    {
        question: "Puis-je vous joindre avant de commander ?",
        answer: "Oui, contactez-nous via la page Contact avant de valider votre commande, nous répondons à vos questions.",
    },
];