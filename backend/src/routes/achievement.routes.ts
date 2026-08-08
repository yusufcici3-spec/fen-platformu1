import { Router } from "express";
import * as achievementController from "../controllers/achievement.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.get("/", achievementController.listBadges);
router.get("/benim", requireAuth, achievementController.listMyAchievements);
router.get("/durumum", requireAuth, achievementController.listBadgesWithProgress);

router.post("/", requireAuth, requireRole("ADMIN", "TEACHER"), achievementController.createBadge);
router.delete("/:id", requireAuth, requireRole("ADMIN"), achievementController.deleteBadge);

export default router;
