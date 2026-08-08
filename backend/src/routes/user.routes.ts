import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.use(requireAuth);

// Aşama 5: öğretmen kendi sınıfındaki öğrencileri görebilir
router.get("/ogrenciler", requireRole("ADMIN", "TEACHER"), userController.listStudentsByClass);

router.get("/", requireRole("ADMIN"), userController.listUsers);
router.patch("/:id/durum", requireRole("ADMIN"), userController.toggleUserActive);

export default router;
