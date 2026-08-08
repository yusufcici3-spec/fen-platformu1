import { Router } from "express";
import * as assistantController from "../controllers/assistant.controller";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { askAssistantSchema } from "../validators/assistant.validator";

const router = Router();

router.use(requireAuth);

router.get("/gecmis", assistantController.getAssistantHistory);
router.post("/sor", validate(askAssistantSchema), assistantController.askAssistant);

export default router;
