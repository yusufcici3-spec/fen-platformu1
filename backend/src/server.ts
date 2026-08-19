import { createApp } from "./app";
import { prisma } from "./config/db";
import cors from "cors";

const app = createApp();

// Frontend'den gelen isteklerin engellenmesini önleyen CORS ayarı
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Vercel serverless ortamında Prisma bağlantısının hazır olduğundan emin olmak için middleware
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

// Yerel geliştirmede (localhost) çalıştırma
if (process.env.NODE_ENV !== "production") {
  const { env } = require("./config/env");

  app.listen(env.port, () => {
    console.log(
      `🚀 Fen Platformu API http://localhost:${env.port} adresinde çalışıyor (${env.nodeEnv})`
    );
  });
}
