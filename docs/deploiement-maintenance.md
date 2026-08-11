# Déploiement de la page de maintenance

## Fonctionnement

Quand un process PM2 (`trinexta-staging` ou `trinexta-prod`) est arrêté, Nginx sert `maintenance.html` à la place d'une erreur 502/503/504 par défaut.

## Placement sur le VPS

Copier `maintenance/maintenance.html` du repo vers :

- Staging : `/var/www/trinexta-website/maintenance/maintenance.html`
- Prod : `/var/www/trinexta-prod/maintenance/maintenance.html`

## Snippet Nginx (à ajouter manuellement par l'admin VPS)

Dans le `server {}` block de chaque environnement :

```nginx
error_page 502 503 504 /maintenance.html;

location = /maintenance.html {
    root /var/www/trinexta-prod/maintenance;
    internal;
}
```

Adapter `root` en `/var/www/trinexta-website/maintenance` pour le server block staging.

## Recharger Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Vérification

```bash
pm2 stop trinexta-prod
# vérifier que la page de maintenance stylée s'affiche à la place du 502
pm2 start trinexta-prod
# vérifier que le site normal revient
```

Répéter avec `trinexta-staging` pour l'environnement staging.