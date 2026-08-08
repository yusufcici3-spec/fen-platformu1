import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function required(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Eksik ortam değişkeni: ${key}. .env dosyanızı kontrol edin.`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:3000",

  databaseUrl: required("DATABASE_URL"),

  jwt: {
    accessSecret: required("JWT_ACCESS_SECRET"),
    refreshSecret: required("JWT_REFRESH_SECRET"),
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? "7d",
  },

  resetPasswordTokenExpiresMin: Number(process.env.RESET_PASSWORD_TOKEN_EXPIRES_MIN ?? 30),

  rateLimit: {
    windowMin: Number(process.env.RATE_LIMIT_WINDOW_MIN ?? 15),
    maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 100),
  },

  isProd: process.env.NODE_ENV === "production",
};
