-- CreateTable
CREATE TABLE "SeoAudit" (
    "id" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "entreprise" TEXT NOT NULL,
    "telephone" TEXT,
    "consentAt" TIMESTAMP(3),
    "url" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "scoreGlobal" INTEGER,
    "sousScores" JSONB,
    "findings" JSONB,
    "pagespeed" JSONB,
    "aiSummary" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "ipHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SeoAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SeoAudit_email_idx" ON "SeoAudit"("email");

-- CreateIndex
CREATE INDEX "SeoAudit_domain_idx" ON "SeoAudit"("domain");

-- CreateIndex
CREATE INDEX "SeoAudit_createdAt_idx" ON "SeoAudit"("createdAt");
