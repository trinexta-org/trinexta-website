// scripts/update-reviews.js
const fs = require('fs');
const path = require('path');

// Chemins d'entrée et de sortie
const inputPath = path.join(__dirname, 'raw-reviews.json');
const outputPath = path.join(__dirname, '../src/data/reviews.ts');

try {
  // Vérifie si le fichier JSON existe
  if (!fs.existsSync(inputPath)) {
    console.error(" Erreur : Le fichier 'raw-reviews.json' est introuvable.");
    console.error(" Veuillez placer le fichier d'export Outscraper dans le dossier 'scripts/' sous le nom 'raw-reviews.json'.");
    process.exit(1);
  }

  const rawData = fs.readFileSync(inputPath, 'utf8');
  const jsonData = JSON.parse(rawData);

  // Filtrer et formater les avis
  const formattedReviews = jsonData
    .filter(review => review.review_text && review.review_text.trim() !== '') // Ignore les avis sans texte
    .map(review => ({
      id: review.review_id || Math.random().toString(36).substr(2, 9),
      authorName: review.author_title,
      rating: review.review_rating || review.rating,
      // Nettoie les balises HTML et les sauts de ligne
      text: review.review_text.replace(/<br\s*[\/]?>/gi, '. ').trim(),
      // Force la langue française dans l'URL Google
      url: review.review_link ? review.review_link.replace('hl=en-US', 'hl=fr') : ''
    }));

  const tsContent = `// Fichier généré automatiquement. Ne pas modifier manuellement.
// Pour mettre à jour les avis, suivez les instructions dans docs/UPDATE_REVIEWS.md
// Commande : node scripts/update-reviews.js

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  url: string;
}

export const reviews: Review[] = ${JSON.stringify(formattedReviews, null, 2)};
`;

  fs.writeFileSync(outputPath, tsContent, 'utf8');
  console.log(` Succès : ${formattedReviews.length} avis ont été formatés et sauvegardés dans src/data/reviews.ts`);

} catch (error) {
  console.error(" Erreur inattendue lors de la conversion :", error.message);
}