import { Router } from "express";
import * as assignmentController from "../controllers/assignment.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createAssignmentSchema, completeSubmissionSchema } from "../validators/assignment.validator";

const router = Router();

router.use(requireAuth);

router.get("/benim", requireRole("ADMIN", "TEACHER"), assignmentController.listMyAssignments);
router.get("/sinifim", assignmentController.listMyClassAssignments);
router.get("/:id/teslimler", requireRole("ADMIN", "TEACHER"), assignmentController.getAssignmentSubmissions);

router.post("/", requireRole("ADMIN", "TEACHER"), validate(createAssignmentSchema), assignmentController.createAssignment);
router.post("/:id/tamamla", validate(completeSubmissionSchema), assignmentController.completeAssignment);

export default router;
