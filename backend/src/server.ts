import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/db";

const app = createApp();

async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Veritabanına bağlanıldı.");

    app.listen(env.port, () => {
      console.log(`🚀 Fen Platformu API http://localhost:${env.port} adresinde çalışıyor (${env.nodeEnv})`);
    });
  } catch (error) {
    console.error("❌ Sunucu başlatılamadı:", error);
    process.exit(1);
  }
}

start();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
