import { Router } from "express";
import * as examController from "../controllers/exam.controller";
import { requireAuth, attachUserIfPresent } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createExamSchema, updateExamSchema } from "../validators/exam.validator";

const router = Router();

const staff = [requireAuth, requireRole("ADMIN", "TEACHER")];

router.get("/yonetim", ...staff, examController.listExamsForManagement);

router.get("/", examController.listExams);
router.get("/:id", attachUserIfPresent, examController.getExam);

router.post("/", ...staff, validate(createExamSchema), examController.createExam);
router.put("/:id", ...staff, validate(updateExamSchema), examController.updateExam);
router.delete("/:id", requireAuth, requireRole("ADMIN"), examController.deleteExam);

export default router;
