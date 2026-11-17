import { GARANTIE_LEGALE_BIENS } from "@/data/garantie-legale-biens"

// Article 23 des CGV : vente en ligne à un consommateur (boutique de matériel, décision de Valoux du 17/11/2026 :
// boutique ouverte à tous). Structure reprise des CGV des grands sites français de matériel informatique (CGV
// consommateurs de LDLC, relues le 17/11/2026) et alignée sur les textes de la boutique (espace client :
// conditions d'achat cgv-professionnels-v3, information retractation-boutique-v2).
// À RELIRE PAR UN JURISTE avant la première vente à un particulier.
// Sources : code de la consommation L216-1, L216-4, L216-6 (livraison, risques), L221-5, L221-18 à L221-28
// (rétractation), L217-1 et suivants et annexe à D211-2 (garanties), L612-1 et L616-1 (médiation) ; code civil 1641.

/**
 * Médiateur de la consommation (L612-1, obligatoire avant la première vente à un particulier).
 * Non désigné à ce jour : la clause n'est pas publiée tant que cette valeur est null. À renseigner à l'adhésion :
 * nom, adresse postale et site de saisine, en une phrase (par exemple « NOM, adresse, https://… »).
 */
export const MEDIATEUR_CONSOMMATION: string | null = null

const BOUTIQUE = "https://boutique.trinexta.fr"

export const CGV_CONSOMMATEURS = {
  rubriques: [
    {
      titre: "23.1 Champ d'application",
      paragraphes: [
        "La boutique en ligne de TRINEXTA (catalogue sur trinexta.fr/boutique, commande et paiement sur boutique.trinexta.fr) est destinée aux professionnels et ouverte aux particuliers. Le présent article s'applique à l'acheteur qui agit à des fins qui n'entrent pas dans le cadre de son activité commerciale, industrielle, artisanale, libérale ou agricole (le « consommateur »).",
        "Il complète les autres articles des présentes CGV et prévaut sur eux en cas de contradiction. Les clauses des présentes qui seraient contraires aux dispositions impératives du Code de la consommation, notamment celles des articles 6, 7, 18 et 21, ne sont pas opposables au consommateur.",
      ],
      lien: { avant: "Le déroulement de la commande sur la boutique est décrit dans les", libelle: "conditions d'achat de la boutique", href: `${BOUTIQUE}/commande/conditions` },
    },
    {
      titre: "23.2 Prix, commande et paiement",
      paragraphes: [
        "Les prix sont indiqués en euros, toutes taxes comprises, éco-participation comprise. Les frais de livraison et, le cas échéant, le prix de l'installation sont indiqués avant la validation de la commande.",
        "Le consommateur vérifie le détail de sa commande et son prix total et peut corriger ses erreurs avant de la valider. La validation de la commande implique l'obligation de payer le prix. Le paiement se fait par carte bancaire à la commande, par l'intermédiaire du prestataire Stripe ; la commande est confirmée par e-mail après réception du paiement, avec les présentes conditions.",
      ],
    },
    {
      titre: "23.3 Livraison et transfert des risques",
      paragraphes: [
        "La date ou le délai de livraison est indiqué avant la validation de la commande. À défaut d'indication, TRINEXTA livre le bien sans retard injustifié et au plus tard trente jours après la conclusion du contrat. En cas de manquement à cette obligation, le consommateur peut résoudre le contrat dans les conditions de l'article L216-6 du Code de la consommation.",
        "Tout risque de perte ou d'endommagement du bien est transféré au consommateur au moment où lui-même, ou un tiers désigné par lui autre que le transporteur proposé par TRINEXTA, en prend physiquement possession. Il est recommandé de vérifier le colis à la livraison et d'indiquer sur le bon de livraison des réserves précises en cas de dommage.",
      ],
    },
    {
      titre: "23.4 Droit de rétractation",
      paragraphes: [
        "Le consommateur dispose d'un délai de quatorze jours pour se rétracter, sans avoir à motiver sa décision. Ce délai court à compter du jour où le consommateur, ou un tiers désigné par lui autre que le transporteur, prend physiquement possession du bien. Pour une commande de plusieurs biens livrés séparément, il court à compter de la réception du dernier bien.",
        "Pour exercer ce droit, le consommateur informe TRINEXTA de sa décision avant l'expiration du délai : en ligne, avec le bouton « Renoncer au contrat ici » présent sur chaque page de la boutique, disponible pendant tout le délai, TRINEXTA lui envoyant aussitôt un accusé de réception par e-mail ; ou par toute déclaration dénuée d'ambiguïté, par exemple au moyen du formulaire type, adressée par e-mail à contact@trinexta.fr ou par courrier à TRUSTECH IT SUPPORT (TRINEXTA), 74 B boulevard Henri Dunant, 91100 Corbeil-Essonnes.",
        "Le consommateur renvoie le bien sans retard excessif et au plus tard quatorze jours après avoir communiqué sa décision, à l'adresse que TRINEXTA lui indique. Les frais directs de renvoi sont à sa charge. Sa responsabilité ne peut être engagée qu'en cas de dépréciation du bien résultant de manipulations autres que celles nécessaires pour établir sa nature, ses caractéristiques et son bon fonctionnement.",
        "TRINEXTA rembourse la totalité des sommes versées, y compris les frais de livraison initiaux (à l'exception du supplément d'un mode de livraison plus coûteux que le mode standard proposé), au plus tard quatorze jours après avoir été informée de la décision du consommateur, avec le même moyen de paiement, sans frais pour lui. TRINEXTA peut différer le remboursement jusqu'à la récupération du bien ou jusqu'à ce que le consommateur ait fourni une preuve de son expédition, la date retenue étant celle du premier de ces faits.",
        "Lorsqu'une installation par TRINEXTA a été commandée, son prix est remboursé si elle n'a pas été réalisée. Si elle a commencé à la demande expresse du consommateur avant la fin du délai de rétractation, il reste dû un montant proportionnel au service fourni jusqu'à la communication de sa décision (article L221-25 du Code de la consommation).",
        "Le droit de rétractation ne peut être exercé dans les cas prévus à l'article L221-28 du Code de la consommation, notamment pour les logiciels fournis sous emballage scellé et descellés après la livraison.",
      ],
      lien: { avant: "Information sur le droit de rétractation, formulaire type et rétractation en ligne :", libelle: "droit de rétractation", href: `${BOUTIQUE}/retractation` },
    },
    {
      titre: "23.5 Garanties",
      paragraphes: [
        "TRINEXTA, vendeur, est tenue des défauts de conformité du bien et de ses vices cachés dans les conditions des articles L217-1 et suivants du Code de la consommation et 1641 et suivants du Code civil. Les garanties commerciales des constructeurs ou éditeurs (article 14) s'appliquent en plus et ne remplacent pas ces garanties légales. Pour les mettre en œuvre, le consommateur contacte TRINEXTA à contact@trinexta.fr ou au 09 78 25 07 46, en précisant sa commande.",
      ],
      encadre: GARANTIE_LEGALE_BIENS,
    },
    {
      titre: "23.6 Réclamations, médiation et litiges",
      paragraphes: [
        "Toute réclamation est adressée à TRINEXTA à contact@trinexta.fr ou par courrier au siège social, en précisant les références de la commande.",
        ...(MEDIATEUR_CONSOMMATION
          ? [
              `Après une réclamation écrite préalable restée sans solution, le consommateur peut recourir gratuitement au médiateur de la consommation dont TRINEXTA relève : ${MEDIATEUR_CONSOMMATION}. Le recours à la médiation n'empêche pas de saisir le juge.`,
            ]
          : []),
        "Le contrat est soumis au droit français, sans priver le consommateur de la protection des dispositions impératives qui lui seraient applicables. Le consommateur peut saisir, à son choix, l'une des juridictions territorialement compétentes en vertu du Code de procédure civile ou celle du lieu où il demeurait au moment de la conclusion du contrat ou de la survenance du fait dommageable.",
      ],
    },
  ],
}
