import { Router } from "express";
import * as tagController from "../controllers/tag.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createTagSchema } from "../validators/tag.validator";

const router = Router();

router.get("/", tagController.listTags);
router.post("/", requireAuth, requireRole("ADMIN", "TEACHER"), validate(createTagSchema), tagController.createTag);
router.delete("/:id", requireAuth, requireRole("ADMIN"), tagController.deleteTag);

export default router;
