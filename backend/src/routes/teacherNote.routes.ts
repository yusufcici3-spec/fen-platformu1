import { Router } from "express";
import * as teacherNoteController from "../controllers/teacherNote.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createTeacherNoteSchema } from "../validators/teacherNote.validator";

const router = Router();

router.use(requireAuth, requireRole("ADMIN", "TEACHER"));

router.post("/", validate(createTeacherNoteSchema), teacherNoteController.createTeacherNote);
router.get("/ogrenci/:studentId", teacherNoteController.listNotesForStudent);

export default router;
