-- CreateTable
CREATE TABLE "AuditOrder" (
    "id" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "entreprise" TEXT NOT NULL,
    "tva" TEXT,
    "url" TEXT NOT NULL,
    "seoAuditId" TEXT,
    "stripeSessionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "amountEur" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "cgvAcceptedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),

    CONSTRAINT "AuditOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AuditOrder_email_idx" ON "AuditOrder"("email");

-- CreateIndex
CREATE INDEX "AuditOrder_status_idx" ON "AuditOrder"("status");

-- CreateIndex
CREATE INDEX "AuditOrder_createdAt_idx" ON "AuditOrder"("createdAt");
