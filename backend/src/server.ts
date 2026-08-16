import { createApp } from "./app";
import { prisma } from "./config/db";

const app = createApp();

export default app;

// Yerel geliştirmede normal Express sunucusu olarak çalıştır.
// Vercel production ortamında app'i sadece export eder.
if (process.env.NODE_ENV !== "production") {
  const { env } = require("./config/env");

  async function start() {
    try {
      await prisma.$connect();
      console.log("✅ Veritabanına bağlanıldı.");

      app.listen(env.port, () => {
        console.log(
          `🚀 Fen Platformu API http://localhost:${env.port} adresinde çalışıyor (${env.nodeEnv})`
        );
      });
    } catch (error) {
      console.error("❌ Sunucu başlatılamadı:", error);
      process.exit(1);
    }
  }

  start();
}

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
