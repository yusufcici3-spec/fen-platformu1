import { Router } from "express";
import * as analysisController from "../controllers/analysis.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import * as attemptController from "../controllers/attempt.controller";
import { validate } from "../middleware/validate";
import { attemptLimiter } from "../middleware/rateLimiter";
import { staticAttemptSchema } from "../validators/attempt.validator";

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

router.post("/test-sonucu", attemptLimiter, requireAuth, validate(staticAttemptSchema), attemptController.saveStaticAttempts);
router.get(
  "/ogrenci/:studentId/sorular",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  attemptController.getStudentQuestionDetail
);

export default router;
