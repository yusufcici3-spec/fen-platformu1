import { Router } from "express";
import * as announcementController from "../controllers/announcement.controller";
import { requireAuth, attachUserIfPresent } from "../middleware/auth";
import { requireRole } from "../middleware/role";

const router = Router();

router.get("/", attachUserIfPresent, announcementController.listAnnouncements);
router.post("/", requireAuth, requireRole("ADMIN", "TEACHER"), announcementController.createAnnouncement);
router.put("/:id", requireAuth, requireRole("ADMIN", "TEACHER"), announcementController.updateAnnouncement);
router.delete("/:id", requireAuth, requireRole("ADMIN"), announcementController.deleteAnnouncement);

export default router;
