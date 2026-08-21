import { createApp } from "./app";
import { prisma } from "./config/db";

const app = createApp();

const allowedOrigin =
  process.env.FRONTEND_URL ?? "https://fen-platformu1-lrho.vercel.app";

// Frontend kayıt/giriş istekleri için CORS ayarları.
// credentials: true kullanıldığı için Access-Control-Allow-Origin '*' olamaz.
app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;

  if (requestOrigin === allowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  );

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  next();
});

// Vercel serverless ortamında Prisma bağlantısının hazır olduğundan emin ol.
app.use(async (req, res, next) => {
  try {
    await prisma.$connect();
    next();
  } catch (error) {
    console.error("Veritabanı bağlantı hatası:", error);
    res.status(500).json({ error: "Veritabanına bağlanılamadı." });
  }
});

export default app;

// Yerel geliştirmede localhost üzerinde çalıştır.
if (process.env.NODE_ENV !== "production") {
  const { env } = require("./config/env");

  app.listen(env.port, () => {
    console.log(
      `🚀 Fen Platformu API http://localhost:${env.port} adresinde çalışıyor (${env.nodeEnv})`,
    );
  });
}
