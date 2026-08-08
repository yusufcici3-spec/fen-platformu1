import { Router } from "express";
import * as analysisController from "../controllers/analysis.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.get("/benim", requireAuth, analysisController.getMyAnalysisReport);
router.get(
  "/ogrenci/:studentId",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  analysisController.getStudentAnalysisReport
);
router.get(
  "/sinif/:classLevel",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  analysisController.getClassAnalysisReport
);

export default router;
