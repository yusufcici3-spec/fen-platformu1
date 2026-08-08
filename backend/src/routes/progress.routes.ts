import { Router } from "express";
import * as progressController from "../controllers/progress.controller";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { upsertProgressSchema } from "../validators/progress.validator";

const router = Router();

router.use(requireAuth);

router.get("/", progressController.listMyProgress);
router.post("/", validate(upsertProgressSchema), progressController.upsertProgress);

export default router;
