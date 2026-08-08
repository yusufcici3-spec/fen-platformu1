import { Router } from "express";
import * as parentController from "../controllers/parent.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { linkChildSchema } from "../validators/parent.validator";

const router = Router();

router.use(requireAuth, requireRole("PARENT"));

router.get("/cocuklarim", parentController.listMyChildren);
router.post("/cocuk-bagla", validate(linkChildSchema), parentController.linkChild);
router.get("/cocuk/:childId/rapor", parentController.getChildReport);

export default router;
