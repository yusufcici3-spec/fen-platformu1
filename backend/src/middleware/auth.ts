import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import { ApiError } from "../utils/apiResponse";
import { catchAsync } from "../utils/catchAsync";
import { verifyAccessToken } from "../utils/jwt";
import { RoleName } from "../generated/prisma";

export interface AuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleName;
  classLevel: number | null;
  // Aşama 4: oyunlaştırma alanları (öğrenci panelinde anlık gösterim için)
  points: number;
  currentStreak: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

/** İstek başlığındaki Bearer token'ı doğrular, kullanıcıyı req.user'a ekler. */
export const requireAuth = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Bu işlem için giriş yapmanız gerekiyor.");
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new ApiError(401, "Oturum süresi doldu veya geçersiz token.");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: { role: true },
  });

  if (!user || !user.isActive) {
    throw new ApiError(401, "Kullanıcı bulunamadı veya hesap pasif.");
  }

  req.user = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role.name,
    classLevel: user.classLevel,
    points: user.points,
    currentStreak: user.currentStreak,
  };

  next();
});

/** req.user varsa doldurur, yoksa isteği reddetmeden devam eder. */
export const attachUserIfPresent = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : req.cookies?.accessToken;

  if (!token) return next();

  try {
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.userId }, include: { role: true } });
    if (user && user.isActive) {
      req.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
        classLevel: user.classLevel,
        points: user.points,
        currentStreak: user.currentStreak,
      };
    }
  } catch {
    // sessizce yok say - misafir kullanıcı gibi devam et
  }
  next();
});
