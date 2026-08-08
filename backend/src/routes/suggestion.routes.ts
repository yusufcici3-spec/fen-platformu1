import { Router } from "express";
import * as suggestionController from "../controllers/suggestion.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, suggestionController.getSuggestions);

export default router;
