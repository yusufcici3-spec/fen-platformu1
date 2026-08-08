import rateLimit from "express-rate-limit";
import { env } from "../config/env";

/** Genel API istekleri için rate limit. */
export const generalLimiter = rateLimit({
  windowMs: env.rateLimit.windowMin * 60 * 1000,
  max: env.rateLimit.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.",
  },
});

/** Giriş / kayıt gibi hassas uç noktalar için daha sıkı rate limit (brute-force koruması). */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Çok fazla deneme yaptınız. 15 dakika sonra tekrar deneyin.",
  },
});
