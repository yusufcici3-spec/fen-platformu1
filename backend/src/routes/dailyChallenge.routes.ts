import { Router } from "express";
import * as dailyController from "../controllers/dailyChallenge.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/bugun", requireAuth, dailyController.getTodayChallenges);

export default router;
