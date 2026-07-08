#  Mise à jour des avis clients (Google Maps)

Le carrousel d'avis sur le site utilise des données extraites de Google Maps. 
Pour conserver d'excellentes performances (pas d'appels API lourds côté client), les avis sont stockés en dur dans le fichier `src/data/reviews.ts`.

Voici la procédure complète pour mettre à jour les avis.

## 1. Exporter les nouveaux avis avec Outscraper

1. Allez sur [Outscraper - Google Maps Reviews](https://app.outscraper.cloud/googleReviews).
2. Dans le champ de recherche, collez l'URL directe de la fiche Google Maps de Trinexta (ex: `https://www.google.com/maps/place/Trinexta/...`).
3. Dans l'option **Tri**, sélectionnez **"Le plus récent"** ou **"Le plus pertinent"**.
4. Descendez pour choisir le **Format d'exportation** et sélectionnez **`JSON`**.
5. Cliquez sur **Export Reviews**.
6. Une fois la tâche terminée, téléchargez le fichier généré.

## 2. Formater et intégrer les données

1. Renommez le fichier téléchargé en **`raw-reviews.json`**.
2. Placez ce fichier dans le dossier **`scripts/`** à la racine du projet.
   *(Chemin final : `scripts/raw-reviews.json`)*
3. Ouvrez votre terminal à la racine du projet et exécutez la commande suivante :

```bash
node scripts/update-reviews.js