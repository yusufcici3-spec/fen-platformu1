import { Router } from "express";
import * as controller from "../controllers/topicContent.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createTopicContentSchema, updateTopicContentSchema } from "../validators/topicContent.validator";

const router = Router();

router.get("/", controller.listTopicContents);
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(createTopicContentSchema),
  controller.createTopicContent
);
router.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(updateTopicContentSchema),
  controller.updateTopicContent
);
router.delete("/:id", requireAuth, requireRole("ADMIN", "TEACHER"), controller.deleteTopicContent);

export default router;
