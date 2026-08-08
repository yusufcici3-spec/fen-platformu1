import { PrismaClient } from "../generated/prisma";
import { env } from "./env";

// Geliştirme ortamında hot-reload sırasında birden fazla PrismaClient
// örneği oluşmasını önlemek için global cache kullanıyoruz.
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  global.__prisma ??
  new PrismaClient({
    log: env.isProd ? ["error", "warn"] : ["query", "error", "warn"],
  });

if (!env.isProd) {
  global.__prisma = prisma;
}
