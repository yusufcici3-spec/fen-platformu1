import { Router } from "express";
import * as studyPlanController from "../controllers/studyPlan.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);

router.get("/gunluk", studyPlanController.getTodayPlan);
router.post("/gunluk/:itemId/tamamla", studyPlanController.completeItem);
router.get("/haftalik", studyPlanController.getWeeklyGoal);

export default router;
