import fs from 'fs';
import { createClient } from '@sanity/client';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';
import { JSDOM } from 'jsdom';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
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

const processHtmlImages = async (html) => {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const images = Array.from(document.querySelectorAll('img'));
  
  for (const img of images) {
    const src = img.getAttribute('src');
    if (src) {
      const uploaded = await uploadImage(src);
      if (uploaded && uploaded.asset) {
        img.setAttribute('data-sanity-ref', uploaded.asset._ref);
      }
    }
  }
  return document.body.innerHTML;
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
  const limitArg = process.argv.find(arg => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 0;

  let rawData;
  try {
    rawData = fs.readFileSync('./scripts/data/export-wp.json', 'utf8');
  } catch (error) {
    process.exit(1);
  }

  let articles = JSON.parse(rawData);
  if (limit > 0) articles = articles.slice(0, limit);

  for (const wpPost of articles) {
    try {
      const rawTitle = wpPost.title?.rendered || 'Titre inconnu';
      const title = decodeText(rawTitle);
      console.log(`Traitement : ${title}`);

      const imageUrl = wpPost.yoast_head_json?.og_image?.[0]?.url || null;
      const mainImage = await uploadImage(imageUrl);

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
      
      const rawHtml = wpPost.content?.rendered || '';
      const processedHtml = await processHtmlImages(rawHtml);

      const portableTextBody = htmlToBlocks(processedHtml, blockContentType, {
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
        categorie: mapCategory(title, rawHtml),
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
      console.log(`Succes : ID ${result._id} | Categorie : ${sanityArticle.categorie}`);
    } catch (error) {
      console.error(`Echec : ${error.message}`);
    }
  }
};

runImport();