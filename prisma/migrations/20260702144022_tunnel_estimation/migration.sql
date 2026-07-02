-- AlterTable
ALTER TABLE "Subscriber" ALTER COLUMN "token" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Estimate" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "services" TEXT[],
    "monthlyMin" INTEGER,
    "monthlyMax" INTEGER,
    "oneShotMin" INTEGER,
    "oneShotMax" INTEGER,
    "breakdown" JSONB NOT NULL,
    "aiModifiers" JSONB,
    "aiAnalyzed" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT,
    "consentAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'complete',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Estimate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimateEvent" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "step" TEXT NOT NULL,
    "estimateId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EstimateEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Estimate_sessionId_idx" ON "Estimate"("sessionId");

-- CreateIndex
CREATE INDEX "Estimate_createdAt_idx" ON "Estimate"("createdAt");

-- CreateIndex
CREATE INDEX "EstimateEvent_sessionId_idx" ON "EstimateEvent"("sessionId");

-- CreateIndex
CREATE INDEX "EstimateEvent_createdAt_idx" ON "EstimateEvent"("createdAt");

-- AddForeignKey
ALTER TABLE "EstimateEvent" ADD CONSTRAINT "EstimateEvent_estimateId_fkey" FOREIGN KEY ("estimateId") REFERENCES "Estimate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
