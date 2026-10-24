-- Formulaire de contact du 24/10/2026 : situation du visiteur, taille du parc,
-- suite souhaitée (rappel, rendez-vous, message) et créneau éventuel.
ALTER TABLE "ContactForm" ADD COLUMN "profil" TEXT;
ALTER TABLE "ContactForm" ADD COLUMN "postes" TEXT;
ALTER TABLE "ContactForm" ADD COLUMN "suite" TEXT;
ALTER TABLE "ContactForm" ADD COLUMN "moment" TEXT;
ALTER TABLE "ContactForm" ADD COLUMN "rdvDate" DATE;
ALTER TABLE "ContactForm" ADD COLUMN "rdvFormat" TEXT;
