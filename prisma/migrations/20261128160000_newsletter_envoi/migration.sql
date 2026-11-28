-- CreateTable
CREATE TABLE "NewsletterEnvoi" (
    "slug" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "destinataires" INTEGER NOT NULL DEFAULT 0,
    "envoyeLe" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterEnvoi_pkey" PRIMARY KEY ("slug")
);

-- Articles publiés avant le rétablissement du webhook (28/11/2026) : considérés
-- comme déjà annoncés, pour qu'une correction de l'un d'eux ne déclenche pas
-- d'envoi aux abonnés.
INSERT INTO "NewsletterEnvoi" ("slug", "titre") VALUES
('cybersecurite-tpe-pme-barometre-france-num-2026', 'Publié avant le 28/11/2026'),
('cyberattaques-2026-pme-maillon-faible', 'Publié avant le 28/11/2026'),
('pilotage-it-nanterre-pme', 'Publié avant le 28/11/2026'),
('securiser-linformatique-de-votre-entreprise-a-creteil-solutions-simples-et-efficaces', 'Publié avant le 28/11/2026'),
('support-informatique-a-distance-pour-tpe-de-massy-assistance-reactive-et-illimitee', 'Publié avant le 28/11/2026'),
('reduire-les-pannes-informatiques-a-la-defense-les-cles-dun-parc-bien-maintenu', 'Publié avant le 28/11/2026'),
('maintenance-informatique-pour-petites-entreprises-a-evry-courcouronnes-vos-outils-toujours-operationnels', 'Publié avant le 28/11/2026'),
('pourquoi-un-helpdesk-local-change-tout-pour-vos-equipes', 'Publié avant le 28/11/2026'),
('cybersecurite-7-habitudes-strategiques-pour-proteger-votre-pme', 'Publié avant le 28/11/2026'),
('externaliser-son-informatique-le-calcul-gagnant-pour-la-rentabilite-de-votre-pme', 'Publié avant le 28/11/2026'),
('cybersecurite-pour-pme-les-5-menaces-les-plus-frequentes-en-2025', 'Publié avant le 28/11/2026'),
('renouvellement-parc-informatique-pme-ile-de-france', 'Publié avant le 28/11/2026');
