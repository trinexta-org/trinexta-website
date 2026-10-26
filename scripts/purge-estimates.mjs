// Purge RGPD du tunnel d'estimation : supprime les estimations anonymes
// (sans email) de plus de 12 mois et leurs événements (cascade FK), ainsi que
// les événements orphelins (parcours abandonnés) de plus de 12 mois.
// Purge aussi les diagnostics sécurité (/diagnostic-securite) :
// - e-mail (et jeton de rappel) effacés 30 jours après l'envoi du rapport sans demande de rappel ;
// - diagnostic supprimé 12 mois après l'analyse sans demande de rappel ;
// - avec demande de rappel (consentAt) : supprimé 3 ans après ce dernier contact.
//
// Usage : npm run purge:estimates
// Cron VPS : voir README, section "Purge des estimations".

import { readFileSync } from "node:fs";
import pg from "pg";

function resolveDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  // Fallback : lecture de .env.local puis .env (le cron ne charge pas l'env Next).
  for (const file of [".env.local", ".env"]) {
    try {
      const match = readFileSync(file, "utf8").match(/^DATABASE_URL=["']?([^"'\n]+?)["']?\s*$/m);
      if (match) return match[1].trim();
    } catch {
      // fichier absent, on continue
    }
  }
  throw new Error("DATABASE_URL introuvable (env, .env.local, .env)");
}

const client = new pg.Client({ connectionString: resolveDatabaseUrl() });

try {
  await client.connect();

  const orphanEvents = await client.query(
    `DELETE FROM "EstimateEvent"
     WHERE "estimateId" IS NULL
       AND "createdAt" < NOW() - INTERVAL '12 months'`
  );

  const estimates = await client.query(
    `DELETE FROM "Estimate"
     WHERE "email" IS NULL
       AND "createdAt" < NOW() - INTERVAL '12 months'`
  );

  const emailsEffaces = await client.query(
    `UPDATE "DiagnosticSecurite"
     SET "email" = NULL, "jetonRappelHash" = NULL
     WHERE "consentAt" IS NULL
       AND "email" IS NOT NULL
       AND "rapportEnvoyeAt" < NOW() - INTERVAL '30 days'`
  );

  const diagnostics = await client.query(
    `DELETE FROM "DiagnosticSecurite"
     WHERE ("consentAt" IS NULL AND "createdAt" < NOW() - INTERVAL '12 months')
        OR ("consentAt" IS NOT NULL AND "consentAt" < NOW() - INTERVAL '3 years')`
  );

  console.log(
    `[purge-estimates] ${new Date().toISOString()} : ` +
      `${estimates.rowCount} estimation(s) anonyme(s) supprimée(s) (événements liés en cascade), ` +
      `${orphanEvents.rowCount} événement(s) orphelin(s) supprimé(s), ` +
      `${diagnostics.rowCount} diagnostic(s) sécurité supprimé(s), ` +
      `${emailsEffaces.rowCount} e-mail(s) de rapport effacé(s).`
  );
} finally {
  await client.end();
}
