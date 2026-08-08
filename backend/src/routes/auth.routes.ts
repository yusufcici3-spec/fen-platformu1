import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/auth.validator";
import { authLimiter } from "../middleware/rateLimiter";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/kayit", authLimiter, validate(registerSchema), authController.register);
router.post("/giris", authLimiter, validate(loginSchema), authController.login);
router.post("/cikis", authController.logout);
router.post(
  "/sifremi-unuttum",
  authLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
);
router.post(
  "/sifre-sifirla",
  authLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword
);
router.get("/ben", requireAuth, authController.me);

export default router;
