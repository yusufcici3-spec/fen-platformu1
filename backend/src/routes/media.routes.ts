import { Router } from "express";
import * as mediaController from "../controllers/media.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import {
  createTopicImageSchema,
  createTopicVideoSchema,
  createTopicPdfSchema,
} from "../validators/media.validator";
import { uploadTopicImage, uploadTopicVideo, uploadTopicPdf } from "../config/upload";

const router = Router();

const staff = [requireAuth, requireRole("ADMIN", "TEACHER")];

// ---- Görseller ----
// 1) Dosyayı yükler ve /uploads/topics/... yolunu döner
router.post("/gorseller/dosya-yukle", ...staff, uploadTopicImage.single("image"), (req, res) => {
  res.json({ success: true, message: "Görsel yüklendi.", data: { url: `/uploads/topics/${req.file?.filename}` } });
});
// 2) Yüklenen (veya harici) URL'i konuya kayıt olarak ekler
router.post("/gorseller", ...staff, validate(createTopicImageSchema), mediaController.createTopicImage);
router.delete("/gorseller/:id", ...staff, mediaController.deleteTopicImage);

// ---- Videolar ----
router.post("/videolar/dosya-yukle", ...staff, uploadTopicVideo.single("video"), (req, res) => {
  res.json({ success: true, message: "Video yüklendi.", data: { url: `/uploads/videos/${req.file?.filename}` } });
});
router.post("/videolar", ...staff, validate(createTopicVideoSchema), mediaController.createTopicVideo);
router.delete("/videolar/:id", ...staff, mediaController.deleteTopicVideo);

// ---- PDF'ler ----
router.post("/pdfler/dosya-yukle", ...staff, uploadTopicPdf.single("pdf"), (req, res) => {
  res.json({ success: true, message: "PDF yüklendi.", data: { url: `/uploads/pdfs/${req.file?.filename}` } });
});
router.post("/pdfler", ...staff, validate(createTopicPdfSchema), mediaController.createTopicPdf);
router.delete("/pdfler/:id", ...staff, mediaController.deleteTopicPdf);

export default router;
