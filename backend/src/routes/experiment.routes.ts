import { Router } from "express";
import * as controller from "../controllers/experiment.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createExperimentSchema, updateExperimentSchema } from "../validators/experiment.validator";

const router = Router();

router.get("/", controller.listExperiments);
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(createExperimentSchema),
  controller.createExperiment
);
router.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(updateExperimentSchema),
  controller.updateExperiment
);
router.delete("/:id", requireAuth, requireRole("ADMIN", "TEACHER"), controller.deleteExperiment);

export default router;
