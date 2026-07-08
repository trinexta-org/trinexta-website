import type { EstimationServiceId, ServiceGrid } from "./types";
import { infogeranceGrid } from "./grids/infogerance";
import { cybersecuriteGrid } from "./grids/cybersecurite";
import { sauvegardeManageeGrid } from "./grids/sauvegarde-managee";
import { cloudPraGrid } from "./grids/cloud-pra";
import { microsoft365GestionGrid } from "./grids/microsoft-365-gestion";
import { microsoft365MiseEnPlaceGrid } from "./grids/microsoft-365-mise-en-place";
import { supportGrid } from "./grids/support";
import { regieSupportInfraGrid } from "./grids/regie-support-infra";
import { regieDeveloppementGrid } from "./grids/regie-developpement";
import { regieCybersecuriteGrid } from "./grids/regie-cybersecurite";
import { regiePilotageGrid } from "./grids/regie-pilotage";
import { solutionsMetierGrid } from "./grids/solutions-metier";
import { trinextaStudioGrid } from "./grids/trinexta-studio";

export * from "./types";
export {
  ESTIMATION_QUESTIONS,
  ESTIMATION_QUESTIONS_BY_ID,
  MAX_QUESTIONS,
  RENFORT_MODE_B_PROFILS,
} from "./questions";

export const ESTIMATION_GRIDS: Record<EstimationServiceId, ServiceGrid> = {
  infogerance: infogeranceGrid,
  cybersecurite: cybersecuriteGrid,
  "sauvegarde-managee": sauvegardeManageeGrid,
  "cloud-pra": cloudPraGrid,
  "microsoft-365-gestion": microsoft365GestionGrid,
  "microsoft-365-mise-en-place": microsoft365MiseEnPlaceGrid,
  support: supportGrid,
  "regie-support-infra": regieSupportInfraGrid,
  "regie-developpement": regieDeveloppementGrid,
  "regie-cybersecurite": regieCybersecuriteGrid,
  "regie-pilotage": regiePilotageGrid,
  "solutions-metier": solutionsMetierGrid,
  "trinexta-studio": trinextaStudioGrid,
};
