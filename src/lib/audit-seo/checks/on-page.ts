import { THRESHOLDS } from "@/data/audit-seo/catalog";
import type { CheckOutcome } from "../score";
import {
  countH1,
  countVisibleWords,
  getMetaContent,
  getTitle,
  hasCanonical,
  hasImageWithoutAlt,
  hasStructuredData,
} from "./html";

// Checks de l'axe Référencement on-page. Pure : HTML brut -> résultats de checks.
// Un check de longueur passe quand l'élément est absent (le check "manquant"
// couvre déjà ce cas, on ne pénalise pas deux fois).
export function runOnPageChecks(html: string): CheckOutcome[] {
  const title = getTitle(html);
  const description = getMetaContent(html, "description");
  const h1Count = countH1(html);
  const words = countVisibleWords(html);
  const ogTitle = getMetaContent(html, "og:title");
  const ogImage = getMetaContent(html, "og:image");

  const titleOk = title !== null;
  const descriptionOk = description !== null && description.trim().length > 0;

  return [
    { id: "title-missing", passed: titleOk },
    {
      id: "title-length",
      passed:
        !titleOk ||
        (title!.length >= THRESHOLDS.titleMinLength && title!.length <= THRESHOLDS.titleMaxLength),
    },
    { id: "meta-description-missing", passed: descriptionOk },
    {
      id: "meta-description-length",
      passed:
        !descriptionOk ||
        (description!.trim().length >= THRESHOLDS.metaDescriptionMinLength &&
          description!.trim().length <= THRESHOLDS.metaDescriptionMaxLength),
    },
    { id: "h1-missing", passed: h1Count >= 1 },
    { id: "h1-multiple", passed: h1Count <= 1 },
    { id: "img-alt-missing", passed: !hasImageWithoutAlt(html) },
    { id: "canonical-missing", passed: hasCanonical(html) },
    { id: "open-graph-missing", passed: ogTitle !== null && ogImage !== null },
    { id: "structured-data-missing", passed: hasStructuredData(html) },
    { id: "content-thin", passed: words >= THRESHOLDS.contentMinWords },
  ];
}
