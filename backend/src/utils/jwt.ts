import jwt from "jsonwebtoken";
import { createHmac } from "crypto";
import { env } from "../config/env";
import { RoleName } from "../generated/prisma";

export interface JwtPayload {
  userId: string;
  role: RoleName;
}

function refreshSecret(passwordHash: string): string {
  // Şifre değiştiğinde eski refresh token'ların imzası otomatik olarak geçersizleşir.
  return createHmac("sha256", env.jwt.refreshSecret).update(passwordHash).digest("hex");
}

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpiresIn,
  } as jwt.SignOptions);
}

export function signRefreshToken(payload: JwtPayload, passwordHash: string): string {
  return jwt.sign(payload, refreshSecret(passwordHash), {
    expiresIn: env.jwt.refreshExpiresIn,
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwt.accessSecret) as JwtPayload;
}

export function decodeRefreshToken(token: string): JwtPayload {
  const payload = jwt.decode(token);
  if (!payload || typeof payload === "string" || typeof payload.userId !== "string") {
    throw new Error("Geçersiz refresh token.");
  }
  return payload as JwtPayload;
}

export function verifyRefreshToken(token: string, passwordHash: string): JwtPayload {
  return jwt.verify(token, refreshSecret(passwordHash)) as JwtPayload;
}
