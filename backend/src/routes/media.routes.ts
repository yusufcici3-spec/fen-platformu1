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
import { uploadBuffer } from "../config/cloudinary";
import { catchAsync } from "../utils/catchAsync";
import { ApiError } from "../utils/apiResponse";

const router = Router();
const staff = [requireAuth, requireRole("ADMIN", "TEACHER")];

router.post(
  "/gorseller/dosya-yukle",
  ...staff,
  uploadTopicImage.single("image"),
  catchAsync(async (req, res) => {
    if (!req.file) throw new ApiError(400, "Görsel dosyası seçilmedi.");
    const result = await uploadBuffer(req.file.buffer, "fen-platform/topics", "image");
    res.json({ success: true, message: "Görsel yüklendi.", data: { url: result.secure_url } });
  })
);

router.post("/gorseller", ...staff, validate(createTopicImageSchema), mediaController.createTopicImage);
router.delete("/gorseller/:id", ...staff, mediaController.deleteTopicImage);

router.post(
  "/videolar/dosya-yukle",
  ...staff,
  uploadTopicVideo.single("video"),
  catchAsync(async (req, res) => {
    if (!req.file) throw new ApiError(400, "Video dosyası seçilmedi.");
    const result = await uploadBuffer(req.file.buffer, "fen-platform/videos", "video");
    res.json({ success: true, message: "Video yüklendi.", data: { url: result.secure_url } });
  })
);

router.post("/videolar", ...staff, validate(createTopicVideoSchema), mediaController.createTopicVideo);
router.delete("/videolar/:id", ...staff, mediaController.deleteTopicVideo);

router.post(
  "/pdfler/dosya-yukle",
  ...staff,
  uploadTopicPdf.single("pdf"),
  catchAsync(async (req, res) => {
    if (!req.file) throw new ApiError(400, "PDF dosyası seçilmedi.");
    const result = await uploadBuffer(req.file.buffer, "fen-platform/pdfs", "raw");
    res.json({ success: true, message: "PDF yüklendi.", data: { url: result.secure_url } });
  })
);

router.post("/pdfler", ...staff, validate(createTopicPdfSchema), mediaController.createTopicPdf);
router.delete("/pdfler/:id", ...staff, mediaController.deleteTopicPdf);

export default router;
