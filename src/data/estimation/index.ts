import type { EstimationServiceId, ServiceGrid } from "./types";
import { infogeranceGrid } from "./grids/infogerance";
import { cybersecuriteGrid } from "./grids/cybersecurite";
import { cloudSauvegardeGrid } from "./grids/cloud-sauvegarde";
import { microsoft365Grid } from "./grids/microsoft-365";
import { supportGrid } from "./grids/support";
import { regieGrid } from "./grids/regie";
import { solutionsMetierGrid } from "./grids/solutions-metier";
import { trinextaStudioGrid } from "./grids/trinexta-studio";

export * from "./types";
export { ESTIMATION_QUESTIONS, ESTIMATION_QUESTIONS_BY_ID, MAX_QUESTIONS } from "./questions";

export const ESTIMATION_GRIDS: Record<EstimationServiceId, ServiceGrid> = {
  infogerance: infogeranceGrid,
  cybersecurite: cybersecuriteGrid,
  "cloud-sauvegarde": cloudSauvegardeGrid,
  "microsoft-365": microsoft365Grid,
  support: supportGrid,
  regie: regieGrid,
  "solutions-metier": solutionsMetierGrid,
  "trinexta-studio": trinextaStudioGrid,
};
