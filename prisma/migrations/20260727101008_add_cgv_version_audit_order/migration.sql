/*
  Warnings:

  - Added the required column `cgvVersion` to the `AuditOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditOrder" ADD COLUMN     "cgvVersion" TEXT NOT NULL;
