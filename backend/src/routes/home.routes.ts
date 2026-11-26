import { Router } from "express";
import * as homeController from "../controllers/home.controller";

const router = Router();

router.get("/istatistikler", homeController.getStats);
router.get("/son-eklenenler", homeController.getRecentTopics);
router.get("/populer-konular", homeController.getPopularTopics);

export default router;
