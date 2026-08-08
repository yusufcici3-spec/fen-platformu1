import { Router } from "express";
import * as weeklyController from "../controllers/weeklyChallenge.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.get("/guncel", requireAuth, weeklyController.getCurrentWeeklyChallenge);
router.post("/:challengeId/sonuclandir", requireAuth, requireRole("ADMIN"), weeklyController.finalizeWeeklyChallenge);

export default router;
