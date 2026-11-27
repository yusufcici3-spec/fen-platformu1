import rateLimit from "express-rate-limit";
import { env } from "../config/env";

/** Genel API istekleri için rate limit. */
export const generalLimiter = rateLimit({
  windowMs: env.rateLimit.windowMin * 60 * 1000,
  max: env.rateLimit.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  // Test cevapları soru başına istek attığı için kendi sınırını kullanır.
  skip: (req) => req.path === "/analiz/test-sonucu",
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

/** Test cevabı kaydı: aynı okul ağındaki öğrenciler tek IP paylaşabilir. */
export const attemptLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1500,
  standardHeaders: true,
  legacyHeaders: false,
});
