-- CreateTable
CREATE TABLE "DiagnosticSecurite" (
    "id" TEXT NOT NULL,
    "domaine" TEXT NOT NULL,
    "resultats" JSONB NOT NULL,
    "ipHash" TEXT,
    "email" TEXT,
    "consentAt" TIMESTAMP(3),
    "rapportEnvoyeAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiagnosticSecurite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DiagnosticSecurite_createdAt_idx" ON "DiagnosticSecurite"("createdAt");

-- CreateIndex
CREATE INDEX "DiagnosticSecurite_domaine_createdAt_idx" ON "DiagnosticSecurite"("domaine", "createdAt");
