import { Router } from "express";
import * as attemptController from "../controllers/examAttempt.controller";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { startExamSchema } from "../validators/examAttempt.validator";
import { submitAnswerSchema } from "../validators/question.validator";

const router = Router();

router.use(requireAuth);

router.get("/gecmisim", attemptController.listMyExamResults);
router.post("/baslat", validate(startExamSchema), attemptController.startExam);
router.post("/cevapla", validate(submitAnswerSchema), attemptController.submitAnswer);
router.post("/:resultId/bitir", attemptController.finishExam);
router.get("/:resultId", attemptController.getExamResult);

export default router;
