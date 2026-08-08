import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createCategorySchema } from "../validators/tag.validator";

const router = Router();

router.get("/", categoryController.listCategories);
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(createCategorySchema),
  categoryController.createCategory
);
router.delete("/:id", requireAuth, requireRole("ADMIN"), categoryController.deleteCategory);

export default router;
