import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import path from "path";
// @ts-expect-error - xss-clean için resmi tip tanımı bulunmuyor
import xssClean from "xss-clean";

import { env } from "./config/env";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { generalLimiter } from "./middleware/rateLimiter";

export function createApp(): Application {
  const app = express();

  // ---- Güvenlik başlıkları ----
  app.use(helmet());

  // ---- CORS ----
  // Production ortamında frontend adresi açıkça izinli olmalı.
  // credentials: true ile birlikte '*' kullanılamaz.
  const clientUrl = env.isProd
    ? process.env.FRONTEND_URL ?? "https://fen-platformu1-lrho.vercel.app"
    : env.clientUrl;

  app.use(
    cors({
      origin: clientUrl,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  // ---- Gövde ayrıştırma ----
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cookieParser());

  // ---- XSS ve HTTP Parameter Pollution koruması ----
  app.use(xssClean());
  app.use(hpp());

  // ---- İstek loglama ----
  app.use(morgan(env.isProd ? "combined" : "dev"));

  // ---- Genel rate limiting ----
  app.use("/api", generalLimiter);

  // ---- Yüklenen dosyaları statik olarak sun ----
  app.use("/uploads", express.static(path.resolve(__dirname, "../../uploads")));

  // ---- Sağlık kontrolü ----
  app.get("/api/health", (_req, res) => {
    res.json({
      success: true,
      message: "Fen Platformu API çalışıyor.",
      time: new Date().toISOString(),
    });
  });

  // ---- Ana API rotaları ----
  app.use("/api", routes);

  // ---- 404 ve hata yönetimi ----
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
