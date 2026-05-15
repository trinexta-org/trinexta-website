import fs from 'fs';
import { createClient } from '@sanity/client';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.trim(),
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN.trim(),
  useCdn: false,
});

const defaultSchema = Schema.compile({
  name: 'default',
  types: [{
    type: 'object',
    name: 'articleTmp',
    fields: [{ 
      name: 'body', 
      type: 'array', 
      of: [
        { type: 'block' }, 
        { type: 'image' }
      ] 
    }]
  }]
});

const blockContentType = defaultSchema.get('articleTmp').fields.find(f => f.name === 'body').type;

const decodeText = (html) => {
  if (!html) return '';
  const dom = new JSDOM(html);
  let text = dom.window.document.body.textContent;
  return text.replace(/\[\.\.\.\]/g, '...').trim();
};

const uploadImage = async (imageUrl) => {
  if (!imageUrl) return null;
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: imageUrl.split('/').pop().split('?')[0] || 'image.png'
    });
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id }
    };
  } catch (error) {
    return null;
  }
};

const processHtmlContent = async (html, articleTitle) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // 1. Supprimer le titre s'il est répété au tout début
  const firstTag = document.body.firstElementChild;
  if (firstTag && (firstTag.tagName === 'H1' || firstTag.tagName === 'H2')) {
    if (decodeText(firstTag.innerHTML).includes(articleTitle.substring(0, 20))) {
      firstTag.remove();
    }
  }

  // 2. Nettoyer les paragraphes vides (fantômes)
  const paragraphs = Array.from(document.querySelectorAll('p'));
  for (const p of paragraphs) {
    // Si le paragraphe n'a pas de texte et ne contient pas d'image
    if (!p.textContent.trim() && !p.querySelector('img')) {
      p.remove();
    }
  }

  // 3. Traiter les images et récupérer la première image trouvée
  const images = Array.from(document.querySelectorAll('img'));
  let firstInlineImage = null;
  
  for (const img of images) {
    const src = img.getAttribute('src');
    if (src) {
      const uploaded = await uploadImage(src);
      if (uploaded && uploaded.asset) {
        img.setAttribute('data-sanity-ref', uploaded.asset._ref);
        if (!firstInlineImage) firstInlineImage = uploaded;
      }
    }
  }
  
  return { cleanHtml: document.body.innerHTML, firstInlineImage };
};

const mapCategory = (title, content) => {
  const text = (title + ' ' + content).toLowerCase();
  
  if (text.includes('cyber')) return 'cybersecurite';
  if (text.includes('infogérance') || text.includes('it support') || text.includes('parc informatique')) return 'infogerance';
  if (text.includes('cloud') || text.includes('azure') || text.includes('serveur')) return 'cloud';
  if (text.includes('productivité') || text.includes('microsoft 365') || text.includes('m365')) return 'productivite';
  
  return 'actualites';
};

const runImport = async () => {
  console.log("Démarrage de la synchronisation...");

  try {
    
    const WP_URL = "https://trinexta.com/wp-json/wp/v2/posts?per_page=10";
    const response = await fetch(WP_URL);
    
    if (!response.ok) {
      throw new Error(`Erreur API WordPress: ${response.statusText}`);
    }

    const articles = await response.json();

    for (const wpPost of articles) {
      const slug = wpPost.slug;

      const existing = await client.fetch(
        `*[_type == "article" && slug.current == $slug][0]`, 
        { slug }
      );

      if (existing) {
        console.log(` Ignoré : "${wpPost.title?.rendered || slug}" (Déjà présent dans Sanity)`);
        continue; 
      }

      try {
        const rawTitle = wpPost.title?.rendered || 'Titre inconnu';
        const title = decodeText(rawTitle);
        console.log(`Traitement : ${title}`);

        const rawHtml = wpPost.content?.rendered || '';
        const { cleanHtml, firstInlineImage } = await processHtmlContent(rawHtml, title);

        let imageUrl = wpPost.yoast_head_json?.og_image?.[0]?.url || null;
        let mainImage = null;
        
        if (imageUrl && !imageUrl.toLowerCase().includes('logo') && !imageUrl.toLowerCase().includes('trinextra-1')) {
          mainImage = await uploadImage(imageUrl);
        } else {
          mainImage = firstInlineImage;
        }

        const authorName = wpPost.yoast_head_json?.author || 'Equipe Trinexta';

        const rawExcerpt = wpPost.excerpt?.rendered || '';
        let cleanExcerpt = decodeText(rawExcerpt);
        
        if (cleanExcerpt.startsWith(title)) {
          cleanExcerpt = cleanExcerpt.substring(title.length).trim();
          if (cleanExcerpt.startsWith(':')) {
            cleanExcerpt = cleanExcerpt.substring(1).trim();
          }
        }

        const readingTimeStr = wpPost.yoast_head_json?.twitter_misc?.["Durée de lecture estimée"] || "";
        const readingTime = parseInt(readingTimeStr.split(' ')[0]) || 0;
        
        const datePub = wpPost.date ? wpPost.date.split('T')[0] : new Date().toISOString().split('T')[0];

        const portableTextBody = htmlToBlocks(cleanHtml, blockContentType, {
          parseHtml: html => new JSDOM(html).window.document,
          rules: [
            {
              deserialize(el, next, block) {
                if (el.tagName && el.tagName.toLowerCase() === 'img') {
                  const ref = el.getAttribute('data-sanity-ref');
                  if (ref) {
                    return block({
                      _type: 'image',
                      asset: { _type: 'reference', _ref: ref },
                      alt: el.getAttribute('alt') || ''
                    });
                  }
                }
                return undefined;
              }
            }
          ]
        });

        const rawSeoTitle = wpPost.yoast_head_json?.title || rawTitle;
        const rawSeoDesc = wpPost.yoast_head_json?.description || rawExcerpt;

        const sanityArticle = {
          _type: 'article',
          titre: title,
          slug: { _type: 'slug', current: wpPost.slug },
          categorie: mapCategory(title, cleanHtml),
          datePublication: datePub,
          auteur: authorName,
          extrait: cleanExcerpt,
          tempsLecture: readingTime,
          contenu: portableTextBody,
          seoTitre: decodeText(rawSeoTitle),
          seoDescription: decodeText(rawSeoDesc)
        };

        if (mainImage) {
          sanityArticle.imageUne = mainImage;
        }

        const result = await client.create(sanityArticle);
        console.log(` Succès : ID ${result._id} | Catégorie : ${sanityArticle.categorie}`);

      } catch (err) {
        console.error(` Échec sur l'article ${slug} : ${err.message}`);
      }
    }
  } catch (globalError) {
    console.error(`Erreur globale : ${globalError.message}`);
  }
};

runImport();