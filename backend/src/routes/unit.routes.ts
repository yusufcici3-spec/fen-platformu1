import { Router } from "express";
import * as unitController from "../controllers/unit.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createUnitSchema, updateUnitSchema, reorderSchema } from "../validators/unit.validator";

const router = Router();

// Herkese açık okuma
router.get("/", unitController.listUnitsByClass);
router.get("/:id", unitController.getUnit);

// Yönetici/Öğretmen işlemleri
router.post("/", requireAuth, requireRole("ADMIN", "TEACHER"), validate(createUnitSchema), unitController.createUnit);
router.put("/:id", requireAuth, requireRole("ADMIN", "TEACHER"), validate(updateUnitSchema), unitController.updateUnit);
router.delete("/:id", requireAuth, requireRole("ADMIN"), unitController.deleteUnit);
router.post(
  "/siralama/kaydet",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(reorderSchema),
  unitController.reorderUnits
);

export default router;
