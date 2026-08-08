import { Router } from "express";
import * as classController from "../controllers/class.controller";

const router = Router();

router.get("/", classController.listClasses);
router.get("/:slug", classController.getClassBySlug);

export default router;
