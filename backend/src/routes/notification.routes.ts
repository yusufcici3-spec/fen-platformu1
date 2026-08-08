import { Router } from "express";
import * as notificationController from "../controllers/notification.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);

router.get("/", notificationController.listMyNotifications);
router.post("/:id/okundu", notificationController.markAsRead);
router.post("/tumunu-okundu-yap", notificationController.markAllAsRead);

export default router;
