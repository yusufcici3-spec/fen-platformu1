import { Router } from "express";
import * as controller from "../controllers/glossary.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createGlossaryTermSchema, updateGlossaryTermSchema } from "../validators/glossary.validator";

const router = Router();

router.get("/", controller.listGlossaryTerms);
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(createGlossaryTermSchema),
  controller.createGlossaryTerm
);
router.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(updateGlossaryTermSchema),
  controller.updateGlossaryTerm
);
router.delete("/:id", requireAuth, requireRole("ADMIN", "TEACHER"), controller.deleteGlossaryTerm);

export default router;
