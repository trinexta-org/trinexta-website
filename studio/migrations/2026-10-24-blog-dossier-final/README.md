# Réécriture du blog (dossier final, 24/10/2026)

Contenu des articles réécrits d'après `90_DOSSIER_FINAL/blog` (fiches B01 à B12).
Les dates de publication et de programmation ne changent pas.

## Ce que fait le script

| Opération | Articles |
|---|---|
| Réécriture complète (titre, extrait, SEO, catégorie, temps de lecture, corps, images) | B01 Massy, B02 Évry, B03 Créteil, B04 France Num, B05 Renouvellement, B06 La Défense, B07 Externaliser, B09 Cyberattaques, B10 5 menaces, B11 7 habitudes, B12 Helpdesk |
| Image principale remplacée | B01, B02, B03, B06, B11 (image cassée), B12 (illustrations hors charte) |
| Corrections ciblées | Nanterre (programmé au 01/11) : ligne « ingénieur systèmes » retirée (recrutement en cours), « audit » remplacé par « état des lieux », liens absolus rendus relatifs |
| Dépublication (copie gardée en brouillon) | Chevilly-Larue et Villejuif (déjà redirigés), B08 « Pourquoi externaliser votre support IT » (fusionné dans B07) |

Garde-fous : `datePublication`, `slug` et `auteur` ne sont jamais touchés ; un article modifié
dans le Studio depuis la préparation, ou qui a un brouillon en cours, est ignoré et signalé.

## Lancer

Depuis `studio/`, avec un compte Sanity ayant les droits d'édition :

```bash
npx sanity login   # si besoin
npx sanity exec migrations/2026-10-24-blog-dossier-final/appliquer.mjs --with-user-token -- --dry-run
npx sanity exec migrations/2026-10-24-blog-dossier-final/appliquer.mjs --with-user-token
```

Le dataset est partagé : le contenu change aussitôt sur staging et sur trinexta.fr
(après revalidation des pages). La redirection de B08 vers B07 arrive avec le déploiement
de cette PR : lancer le script juste après la mise en production pour éviter une 404 transitoire.

## Retour arrière

Chaque document garde son historique dans le Studio (menu Historique). Une sauvegarde JSON
des 15 articles avant modification est aussi dans le stockage local du navigateur de Valoux
(clé `trinexta_backup_articles_2026-10-24`, origine sanity.io).
