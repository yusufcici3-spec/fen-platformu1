import { Router } from "express";
import * as statsController from "../controllers/stats.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/benim", requireAuth, statsController.getMyStats);

export default router;
