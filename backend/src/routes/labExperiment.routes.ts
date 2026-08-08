import { Router } from "express";
import * as labController from "../controllers/labExperiment.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createLabExperimentSchema, updateLabExperimentSchema } from "../validators/labExperiment.validator";

const router = Router();
const staff = [requireAuth, requireRole("ADMIN", "TEACHER")];

router.get("/", labController.listLabExperiments);
router.get("/gecmisim", requireAuth, labController.listMyLabHistory);
router.get("/:slug", labController.getLabExperimentBySlug);

router.post("/", ...staff, validate(createLabExperimentSchema), labController.createLabExperiment);
router.put("/:id", ...staff, validate(updateLabExperimentSchema), labController.updateLabExperiment);
router.delete("/:id", requireAuth, requireRole("ADMIN"), labController.deleteLabExperiment);

router.post("/:id/tamamla", requireAuth, labController.completeLabExperiment);

export default router;
