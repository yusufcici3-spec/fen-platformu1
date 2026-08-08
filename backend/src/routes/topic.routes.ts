import { Router } from "express";
import * as topicController from "../controllers/topic.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createTopicSchema, updateTopicSchema } from "../validators/topic.validator";
import { reorderSchema } from "../validators/unit.validator";

const router = Router();

router.get("/", topicController.listTopics);

// NOT: /yonetim/:id yolu, öğretmen/yönetici panelinin taslak (yayınlanmamış)
// konuları da görebilmesi için slug tabanlı genel okumadan önce tanımlanır.
router.get(
  "/yonetim/:id",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  topicController.getTopicById
);

router.post(
  "/siralama/kaydet",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(reorderSchema),
  topicController.reorderTopics
);

router.get("/:slug", topicController.getTopicBySlug);

router.post(
  "/",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(createTopicSchema),
  topicController.createTopic
);
router.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  validate(updateTopicSchema),
  topicController.updateTopic
);
router.delete("/:id", requireAuth, requireRole("ADMIN"), topicController.deleteTopic);

export default router;
