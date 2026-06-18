-- AlterTable: ajout du token de désabonnement unique par abonné
ALTER TABLE "Subscriber" ADD COLUMN "token" TEXT NOT NULL DEFAULT gen_random_uuid()::text;

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_token_key" ON "Subscriber"("token");
