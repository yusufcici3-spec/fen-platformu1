import { Router } from "express";
import * as gameController from "../controllers/game.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createGameSchema, updateGameSchema, submitGameScoreSchema } from "../validators/game.validator";

const router = Router();

const staff = [requireAuth, requireRole("ADMIN", "TEACHER")];

router.get("/", gameController.listGames);
router.get("/yonetim", ...staff, gameController.listGamesForManagement);
router.get("/slug/:slug", gameController.getGameBySlug);
router.get("/skorlarim", requireAuth, gameController.listMyGameScores);
router.get("/:id", gameController.getGame);

router.post("/", ...staff, validate(createGameSchema), gameController.createGame);
router.put("/:id", ...staff, validate(updateGameSchema), gameController.updateGame);
router.delete("/:id", requireAuth, requireRole("ADMIN"), gameController.deleteGame);

router.post("/:id/skor", requireAuth, validate(submitGameScoreSchema), gameController.submitGameScore);

router.post("/:gameId/seviyeler", ...staff, gameController.createGameLevel);
router.delete("/:gameId/seviyeler/:levelId", ...staff, gameController.deleteGameLevel);

export default router;
