import { createApp } from "./app";
import { prisma } from "./config/db";

const app = createApp();

// Vercel Serverless ortamında CORS kilidini kökten çözen middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  // Tarayıcının gönderdiği ilk kontrol (OPTIONS) isteğine doğrudan 200 OK yanıtı dönüyoruz
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

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
