// Petits utilitaires d'extraction HTML pour les checks SEO. Analyse volontairement
// grossière (regex) : suffisante pour des signaux de présence/absence, jamais un
// rendu fidèle du DOM. Entrée = HTML brut, sortie = faits booléens/textuels.

/** Retourne les balises ouvrantes `<tag ...>` (contenu d'attributs inclus). */
export function extractTags(html: string, tagName: string): string[] {
  const regex = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  return html.match(regex) ?? [];
}

/** Extrait la valeur d'un attribut dans une balise (guillemets simples/doubles). */
export function getAttr(tag: string, attr: string): string | null {
  const regex = new RegExp(`\\b${attr}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i");
  const match = tag.match(regex);
  if (!match) return null;
  return match[2] ?? match[3] ?? match[4] ?? "";
}

/** Contenu de la balise `<title>`, trim, ou null si absente/vide. */
export function getTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return null;
  const text = match[1].trim();
  return text.length > 0 ? text : null;
}

/** Contenu d'une meta identifiée par name/property (ex. "description", "og:title"). */
export function getMetaContent(html: string, key: string): string | null {
  for (const tag of extractTags(html, "meta")) {
    const name = getAttr(tag, "name") ?? getAttr(tag, "property");
    if (name && name.toLowerCase() === key.toLowerCase()) {
      return getAttr(tag, "content") ?? "";
    }
  }
  return null;
}

/** Nombre de balises `<h1>` (ouvrantes). */
export function countH1(html: string): number {
  return (html.match(/<h1\b[^>]*>/gi) ?? []).length;
}

/** true si au moins une `<img>` n'a pas d'attribut alt (ou alt vide). */
export function hasImageWithoutAlt(html: string): boolean {
  for (const tag of extractTags(html, "img")) {
    const alt = getAttr(tag, "alt");
    if (alt === null || alt.trim() === "") return true;
  }
  return false;
}

/** true si un `<link rel="canonical">` est présent. */
export function hasCanonical(html: string): boolean {
  return extractTags(html, "link").some((tag) => {
    const rel = getAttr(tag, "rel");
    return rel !== null && rel.toLowerCase().split(/\s+/).includes("canonical");
  });
}

/** true si un bloc JSON-LD `<script type="application/ld+json">` est présent. */
export function hasStructuredData(html: string): boolean {
  return extractTags(html, "script").some((tag) => {
    const type = getAttr(tag, "type");
    return type !== null && type.toLowerCase() === "application/ld+json";
  });
}

/** Valeur de l'attribut `lang` sur `<html>`, ou null. */
export function getHtmlLang(html: string): string | null {
  const match = html.match(/<html\b[^>]*>/i);
  if (!match) return null;
  const lang = getAttr(match[0], "lang");
  return lang && lang.trim().length > 0 ? lang.trim() : null;
}

/** Texte visible de la page (scripts/styles/commentaires retirés), normalisé. */
export function extractVisibleText(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Nombre de mots du texte visible (scripts/styles retirés). */
export function countVisibleWords(html: string): number {
  const text = extractVisibleText(html);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

/** true si la meta robots demande noindex. */
export function hasNoindex(html: string): boolean {
  const robots = getMetaContent(html, "robots");
  if (!robots) return false;
  return /\bnoindex\b/i.test(robots);
}
