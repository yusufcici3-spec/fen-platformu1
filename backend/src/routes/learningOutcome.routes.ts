import { Router } from "express";
import * as controller from "../controllers/learningOutcome.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createLearningOutcomeSchema, updateLearningOutcomeSchema } from "../validators/learningOutcome.validator";

const router = Router();

router.get("/", controller.listLearningOutcomes);
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(createLearningOutcomeSchema),
  controller.createLearningOutcome
);
router.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(updateLearningOutcomeSchema),
  controller.updateLearningOutcome
);
router.delete("/:id", requireAuth, requireRole("ADMIN", "TEACHER"), controller.deleteLearningOutcome);

export default router;
