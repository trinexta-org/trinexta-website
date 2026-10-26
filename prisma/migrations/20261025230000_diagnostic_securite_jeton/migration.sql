-- AlterTable
ALTER TABLE "DiagnosticSecurite" ADD COLUMN     "jetonHash" TEXT,
ADD COLUMN     "jetonRappelHash" TEXT,
ADD COLUMN     "statut" TEXT NOT NULL DEFAULT 'termine';

-- CreateIndex
CREATE UNIQUE INDEX "DiagnosticSecurite_jetonRappelHash_key" ON "DiagnosticSecurite"("jetonRappelHash");

