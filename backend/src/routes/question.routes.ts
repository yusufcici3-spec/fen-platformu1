import { Router } from "express";
import * as questionController from "../controllers/question.controller";
import * as bulkImportController from "../controllers/bulkImport.controller";
import { requireAuth, attachUserIfPresent } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createQuestionSchema, updateQuestionSchema } from "../validators/question.validator";
import { uploadQuestionImportFile } from "../config/upload";

const router = Router();

const staff = [requireAuth, requireRole("ADMIN", "TEACHER")];

// ---- Herkese açık / kullanıcı bağlamlı okuma (öğrenciye cevap gizlenir) ----
router.get("/", attachUserIfPresent, questionController.listQuestions);
router.get("/rastgele", attachUserIfPresent, questionController.getRandomQuestion);

// ---- Giriş yapmış kullanıcıya özel listeler (sabit yollar, :id'den önce) ----
router.get("/favorilerim", requireAuth, questionController.listFavorites);
router.get("/yanlislarim", requireAuth, questionController.listWrongQuestions);

// ---- Yönetici/Öğretmen: toplu içe aktarma ----
router.post(
  "/toplu-yukle",
  ...staff,
  uploadQuestionImportFile.single("file"),
  bulkImportController.bulkImportQuestions
);

// ---- Tekil soru ----
router.get("/:id", attachUserIfPresent, questionController.getQuestion);
router.post("/:id/pratik-cevap", attachUserIfPresent, questionController.checkPracticeAnswer);
router.post("/:id/favori", requireAuth, questionController.toggleFavorite);

router.post("/", ...staff, validate(createQuestionSchema), questionController.createQuestion);
router.put("/:id", ...staff, validate(updateQuestionSchema), questionController.updateQuestion);
router.delete("/:id", requireAuth, requireRole("ADMIN","TEACHER"), questionController.deleteQuestion);

export default router;
