// scripts/update-reviews.js
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'raw-reviews.json');
const outputPath = path.join(__dirname, '../src/data/reviews.ts');

try {
  if (!fs.existsSync(inputPath)) {
    console.error(" Erreur : Le fichier 'raw-reviews.json' est introuvable.");
    process.exit(1);
  }

  const rawData = fs.readFileSync(inputPath, 'utf8');
  const jsonData = JSON.parse(rawData);

  const formattedReviews = jsonData
    .filter(review => review.review_text && review.review_text.trim() !== '')
    .map((review, index) => {
      
      // 1. Nettoyage HTML robuste (empêche les balises résiduelles)
      let cleanText = review.review_text;
      cleanText = cleanText.replace(/<br\s*[\/]?>/gi, '. '); // Transforme les sauts de ligne en points
      cleanText = cleanText.replace(/<[^>]*>?/gm, ''); // Supprime toutes les autres balises HTML
      cleanText = cleanText.trim();

      return {
        // 2. ID stable en fallback (index au lieu de Math.random)
        id: review.review_id || `fallback-id-${index}`,
        authorName: review.author_title,
        rating: review.review_rating || review.rating,
        text: cleanText,
        url: review.review_link ? review.review_link.replace('hl=en-US', 'hl=fr') : ''
      };
    });

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
  console.log(` Succès : ${formattedReviews.length} avis ont été formatés et sauvegardés.`);

} catch (error) {
  console.error(" Erreur inattendue :", error.message);
}