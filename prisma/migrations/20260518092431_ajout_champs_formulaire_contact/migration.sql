/*
  Warnings:

  - Added the required column `nom` to the `ContactForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenom` to the `ContactForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactForm" ADD COLUMN     "entreprise" TEXT,
ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "prenom" TEXT NOT NULL,
ADD COLUMN     "secteur" TEXT,
ADD COLUMN     "taille" TEXT,
ADD COLUMN     "telephone" TEXT,
ADD COLUMN     "urgence" TEXT;
