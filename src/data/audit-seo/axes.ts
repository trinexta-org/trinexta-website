import type { AxisId } from "@/lib/audit-seo/types";
import type { AxisConfig } from "./types";

// Config des 4 Axes. Le Score global est la moyenne des sous-scores des axes
// MESURÉS, pondérée par globalWeight (dégradation propre : un axe non mesuré
// est simplement exclu du calcul, jamais compté 0).
export const AXES: Record<AxisId, AxisConfig> = {
  "on-page": { id: "on-page", label: "Référencement on-page", globalWeight: 30 },
  performance: { id: "performance", label: "Performance", globalWeight: 30 },
  technique: { id: "technique", label: "Technique et crawlabilité", globalWeight: 25 },
  "contenu-local": { id: "contenu-local", label: "Contenu et SEO local", globalWeight: 15 },
};

export const AXIS_ORDER: AxisId[] = ["on-page", "performance", "technique", "contenu-local"];
