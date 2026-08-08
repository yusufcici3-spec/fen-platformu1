import { Router } from "express";
import * as uploadController from "../controllers/upload.controller";
import { uploadAvatar, uploadTopicImage } from "../config/upload";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.post("/avatar", requireAuth, uploadAvatar.single("avatar"), uploadController.uploadUserAvatar);
router.post(
  "/konu-gorseli",
  requireAuth,
  requireRole("ADMIN", "TEACHER"),
  uploadTopicImage.single("image"),
  uploadController.uploadTopicCover
);

export default router;
