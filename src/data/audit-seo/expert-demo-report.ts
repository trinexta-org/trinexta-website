export type PilierId = "performance" | "contenu" | "technique" | "local";

export interface PilierScore {
    id: PilierId;
    label: string;
    score: number;
}

export interface ConstatMajeur {
    titre: string;
    probleme: string;
    pourquoiCestGrave: string;
    analogie: string;
    commentOnLeVoit: string;
}

export interface ConstatSecondaire {
    texte: string;
}

export type PalierRecommandation = "quick-wins" | "moyen-terme" | "strategique";

export interface Recommandation {
    palier: PalierRecommandation;
    label: string;
    items: string[];
}

export interface RapportDemoData {
    couverture: {
        titreRapport: string;
        client: string;
        url: string;
        date: string;
        realisePar: string;
    };
    syntheseExecutive: {
        scoreGlobal: number;
        constatsCritiques: string[];
    };
    scoresParPilier: PilierScore[];
    constatsMajeurs: ConstatMajeur[];
    constatsSecondaires: ConstatSecondaire[];
    recommandations: Recommandation[];
}

export const expertReportDemoData: RapportDemoData = {
    couverture: {
        titreRapport: "Audit SEO Expert",
        client: "Agence Démo",
        url: "site-demo.fr",
        date: "12 juillet 2026",
        realisePar: "Trinexta",
    },
    syntheseExecutive: {
        scoreGlobal: 47,
        constatsCritiques: [
            "Le site n'est pas indexable sur plusieurs pages clés",
            "Les balises meta sont absentes sur la majorité des pages",
            "Le temps de chargement mobile pénalise fortement l'expérience utilisateur",
        ],
    },
    scoresParPilier: [
        { id: "performance", label: "Performance", score: 38 },
        { id: "contenu", label: "Contenu", score: 52 },
        { id: "technique", label: "Technique", score: 41 },
        { id: "local", label: "Local", score: 67 },
    ],
    constatsMajeurs: [
        {
            titre: "Absence de balises meta description sur 80% des pages",
            probleme:
                "La majorité des pages du site n'ont pas de meta description, ou une description générique dupliquée sur plusieurs pages.",
            pourquoiCestGrave:
                "Google génère alors un extrait automatique, souvent peu engageant, ce qui réduit le taux de clic depuis les résultats de recherche même quand le site est bien positionné.",
            analogie:
                "C'est comme une vitrine de magasin sans étiquette : le client voit qu'il y a quelque chose à l'intérieur, mais rien ne lui donne envie d'entrer plutôt que la boutique d'à côté.",
            commentOnLeVoit:
                "Vérification systématique des balises meta description sur l'ensemble des pages indexables du site.",
        },
        {
            titre: "Temps de chargement mobile supérieur à 5 secondes",
            probleme:
                "Les pages principales mettent plus de 5 secondes à s'afficher sur connexion mobile standard, principalement à cause d'images non optimisées.",
            pourquoiCestGrave:
                "Au-delà de 3 secondes, une part significative des visiteurs quitte la page avant même qu'elle ne s'affiche complètement, ce qui augmente le taux de rebond et pénalise le référencement.",
            analogie:
                "C'est comme faire la queue devant un magasin fermé à clé : la plupart des clients repartent avant même que la porte s'ouvre.",
            commentOnLeVoit:
                "Mesure du temps de chargement mobile sur les pages principales via les outils de performance standards.",
        },
        {
            titre: "Structure de titres (H1/H2) incohérente",
            probleme:
                "Plusieurs pages ont soit aucun H1, soit plusieurs H1 concurrents, et une hiérarchie de sous-titres qui ne reflète pas la structure réelle du contenu.",
            pourquoiCestGrave:
                "Les moteurs de recherche s'appuient sur cette hiérarchie pour comprendre le sujet principal de la page. Une structure confuse dilue la pertinence perçue de la page sur ses mots-clés cibles.",
            analogie:
                "C'est comme un livre sans table des matières claire : le lecteur, comme le moteur de recherche, a du mal à savoir de quoi parle vraiment chaque chapitre.",
            commentOnLeVoit:
                "Analyse de la hiérarchie de titres (H1 à H4) sur l'ensemble des pages du site.",
        },
    ],
    constatsSecondaires: [
        { texte: "Images sans attribut alt sur plusieurs pages produits" },
        { texte: "Absence de données structurées (Schema.org) sur les pages clés" },
        { texte: "URLs peu lisibles avec paramètres techniques exposés" },
        { texte: "Maillage interne pauvre entre les pages de contenu" },
        { texte: "Certificat HTTPS présent mais ressources mixtes non sécurisées" },
        { texte: "Sitemap XML non déclaré dans le fichier robots.txt" },
        { texte: "Fiche Google Business Profile incomplète" },
    ],
    recommandations: [
        {
            palier: "quick-wins",
            label: "Actions rapides",
            items: [
                "Rédiger les meta descriptions manquantes sur les pages prioritaires",
                "Corriger la structure H1/H2 des pages principales",
                "Ajouter les attributs alt manquants sur les images produits",
            ],
        },
        {
            palier: "moyen-terme",
            label: "Chantier moyen terme",
            items: [
                "Optimiser et compresser les images du site",
                "Mettre en place les données structurées sur les pages clés",
                "Retravailler le maillage interne entre les contenus",
            ],
        },
        {
            palier: "strategique",
            label: "Chantier stratégique",
            items: [
                "Refonte technique pour fiabiliser les temps de chargement mobile",
                "Stratégie de contenu ciblée sur les mots-clés à fort potentiel local",
            ],
        },
    ],
};
