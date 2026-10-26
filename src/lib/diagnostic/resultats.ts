import { STATUTS, VERIFICATIONS } from "@/data/diagnostic";
import type { ResultatVerification } from "./types";

const ID_VALIDES = new Set<string>(VERIFICATIONS.map((v) => v.id));
const STATUTS_VALIDES = new Set<string>(STATUTS);

/** Relit les résultats stockés en ne gardant que des entrées bien formées. */
export function lireResultats(valeur: unknown): ResultatVerification[] {
  if (!Array.isArray(valeur)) return [];
  return valeur.filter((r): r is ResultatVerification => {
    if (!r || typeof r !== "object") return false;
    const o = r as Record<string, unknown>;
    return (
      typeof o.id === "string" &&
      ID_VALIDES.has(o.id) &&
      typeof o.statut === "string" &&
      STATUTS_VALIDES.has(o.statut) &&
      ["titre", "constat", "risque", "action"].every((k) => typeof o[k] === "string")
    );
  });
}
