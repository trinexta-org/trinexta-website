# Stratégie de migration SEO — WordPress → Next.js
*Trinexta · Refonte 2026*

---

## Phase 1 — Audit de l'existant (Semaine 1)

### 1.1 Extraire toutes les URLs indexées

Deux sources à croiser :

**Google Search Console** (prioritaire)
- Couverture → exporter toutes les URLs indexées
- Résultats de recherche → exporter positions + clics par URL
- Liens → exporter les backlinks entrants

**Crawler Screaming Frog** (gratuit ≤ 500 URLs)
```bash
# Alternative CLI gratuite
wget --spider -r -nd -nv https://trinexta.com 2>&1 | grep '^--' | awk '{print $3}' > urls.txt
```

### 1.2 Classifier les URLs par priorité

```
Priorité 1  URLs avec trafic organique (GSC > 0 clics)
Priorité 2  URLs avec backlinks entrants
Priorité 3  Toutes les autres pages publiques
Ignorer     /wp-admin/*, /feed/, /?p=123, /tag/*, /author/*, /xmlrpc.php
```

### 1.3 Snapshot des signaux on-page

Pour chaque URL P1 et P2, noter :
- `<title>` exact
- `meta description` exacte
- `H1` exact
- Volume de contenu approximatif (nb de mots)

---

## Phase 2 — Mapping des redirections (Semaine 1-2)

### 2.1 Construire le fichier de mapping

Fichier CSV à faire valider par la direction avant de coder :

```csv
ancienne_url,nouvelle_url,statut,priorité
/infogerance-informatique/,/services/infogerance,301,P1
/support-informatique/,/services/support,301,P1
/cybersecurite/,/services/cybersecurite,301,P1
/cloud-sauvegarde/,/services/cloud,301,P1
/microsoft-365/,/services/microsoft-365,301,P1
/offre-serenite/,/offres/serenite,301,P1
/offre-impulsion/,/offres/impulsion,301,P1
/blog/,/blog,301,P2
/blog/titre-article/,/blog/titre-article,301,P2
/contact-us/,/contact,301,P1
/a-propos/,/a-propos,301,P2
/?p=42,/,301,P3
/wp-login.php,,404,—
/feed/,,410,—
/xmlrpc.php,,410,—
```

### 2.2 Règle de décision sur les slugs

```
Slug existant propre en français  →  conserver identique, zéro redirect nécessaire
Slug en anglais ou mal formaté    →  changer + redirection 301
URLs WordPress dynamiques (?p=)   →  rediriger vers la home
Pages admin/techniques            →  410 Gone (mieux que 404 pour le SEO)
```

---

## Phase 3 — Conservation des signaux on-page

Pour chaque page migrée, reprendre **exactement** :

| Élément | Action |
|---|---|
| `<title>` | Copier mot pour mot si la page performe |
| `meta description` | Copier mot pour mot |
| `H1` | Conserver le texte exact |
| URL slug | Conserver si possible |
| Volume de contenu | Minimum 80% du texte existant |

Dans Next.js, via les métadonnées de page :

```ts
// app/(marketing)/services/infogerance/page.tsx
export const metadata: Metadata = {
  title: "Infogérance informatique Évry – Trinexta",
  description: "Externalisez votre informatique avec Trinexta...",
  alternates: {
    canonical: "https://trinexta.com/services/infogerance"
  }
}
```

---

## Phase 4 — Intégration des redirections (Sprint 4-5)

### Configuration Nginx sur OVH

Fichier dédié pour ne pas polluer la config principale :

```nginx
# /etc/nginx/includes/redirections-301.conf

# Pages services
rewrite ^/infogerance-informatique/?$     /services/infogerance     permanent;
rewrite ^/support-informatique/?$         /services/support          permanent;
rewrite ^/cybersecurite/?$                /services/cybersecurite    permanent;

# Pages offres
rewrite ^/offre-serenite/?$               /offres/serenite           permanent;
rewrite ^/offre-impulsion/?$              /offres/impulsion          permanent;

# URLs WordPress dynamiques
rewrite ^/\?p=\d+$                        /                          permanent;
rewrite ^/\?page_id=\d+$                  /                          permanent;

# URLs techniques → 410 Gone
location ~ ^/(feed|xmlrpc\.php|wp-login\.php|wp-admin) {
    return 410;
}
```

```nginx
# /etc/nginx/sites-available/trinexta.com — inclure le fichier
server {
    include /etc/nginx/includes/redirections-301.conf;
    ...
}
```

---

## Phase 5 — Sitemap XML et SEO technique

Généré automatiquement par Next.js à chaque build :

```ts
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getBlogPosts()

  return [
    { url: 'https://trinexta.com', lastModified: new Date(), priority: 1.0 },
    { url: 'https://trinexta.com/services/infogerance', priority: 0.9 },
    { url: 'https://trinexta.com/services/support', priority: 0.9 },
    { url: 'https://trinexta.com/offres/serenite', priority: 0.9 },
    // ...
    ...articles.map(a => ({
      url: `https://trinexta.com/blog/${a.slug}`,
      lastModified: a.updatedAt,
      priority: 0.7,
    }))
  ]
}
```

**Schema.org JSON-LD** à implémenter sur les pages clés :
- `LocalBusiness` sur la home
- `Service` sur chaque page service
- `Article` sur chaque article de blog
- `FAQPage` sur la FAQ
- `BreadcrumbList` sur toutes les pages

---

## Phase 6 — Tests avant bascule (Semaine 13)

Script à exécuter sur `staging.trinexta.com` avant tout changement DNS :

```bash
#!/bin/bash
# test-redirections.sh

BASE="https://staging.trinexta.com"

URLS=(
  "/infogerance-informatique/"
  "/support-informatique/"
  "/cybersecurite/"
  "/contact-us/"
  "/?p=42"
  "/wp-login.php"
  "/feed/"
)

echo "Test des redirections sur $BASE"
echo "---"

for url in "${URLS[@]}"; do
  result=$(curl -o /dev/null -s -w "%{http_code} → %{redirect_url}" "$BASE$url")
  echo "$url : $result"
done
```

Résultat attendu :
```
/infogerance-informatique/ : 301 → https://trinexta.com/services/infogerance
/contact-us/               : 301 → https://trinexta.com/contact
/?p=42                     : 301 → https://trinexta.com/
/wp-login.php              : 410 →
/feed/                     : 410 →
```

Vérifications complémentaires avant bascule :
- [ ] Aucun lien cassé (Screaming Frog sur staging)
- [ ] Toutes les balises title/meta présentes (Screaming Frog → Page Titles)
- [ ] Sitemap XML accessible sur staging.trinexta.com/sitemap.xml
- [ ] robots.txt correct (pas de `Disallow: /` oublié)

---

## Phase 7 — Protocole de bascule DNS (Semaine 14)

```
J-7   Baisser le TTL DNS à 300s (5 min) pour propagation rapide le jour J

J     10h00  Déployer le build final sur VPS OVH
      10h30  Vérifier les redirections avec le script de test
      11h00  Changer les enregistrements A/CNAME → OVH
      11h30  Vérifier HTTPS actif + headers de sécurité
      12h00  Soumettre le nouveau sitemap dans Google Search Console
             GSC → Sitemaps → https://trinexta.com/sitemap.xml

J+1   Vérifier dans GSC : pas d'erreurs 404 inattendues

J+7   Remonter le TTL DNS à 3600s
      Vérifier les positions : pas de chute > 20% sur mots-clés cibles

J+30  Si positions stables → archiver WordPress
      Si chute détectée → investiguer les redirections manquantes
```

---

## Phase 8 — Monitoring post-bascule (30 jours)

**Google Search Console — surveiller hebdomadairement :**

| Rapport | Ce qu'on surveille |
|---|---|
| Couverture | Pas de spike d'erreurs 404 |
| Résultats de recherche | Clics/impressions stables |
| Sitemaps | Nouveau sitemap bien indexé |
| Liens | Backlinks toujours résolus |

**Mots-clés prioritaires à surveiller :**
- "infogérance Évry"
- "prestataire informatique Essonne"
- "support PME Grand Paris Sud"
- "infogérance TPE Île-de-France"

---

## Responsabilités

| Action | Responsable |
|---|---|
| Audit GSC + crawler | Tech lead |
| Mapping URLs (CSV) | Tech lead |
| Validation slugs | Tech lead + direction |
| Intégration Nginx | Tech lead |
| Tests redirections staging | Stagiaire C + tech lead |
| Bascule DNS | Tech lead |
| Monitoring GSC 30 jours | Tech lead |
