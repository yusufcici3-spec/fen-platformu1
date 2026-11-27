import { prisma } from "../config/db";
import { ApiError } from "../utils/apiResponse";
import { comparePassword, generateResetToken, hashPassword, hashToken } from "../utils/password";
import { signAccessToken, signRefreshToken, decodeRefreshToken, verifyRefreshToken } from "../utils/jwt";
import { env } from "../config/env";
import { RoleName } from "../generated/prisma";

interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "STUDENT" | "TEACHER" | "PARENT";
  classLevel?: number;
}

export async function registerUser(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new ApiError(409, "Bu e-posta adresi zaten kayıtlı.");

  const role = await prisma.role.findUnique({ where: { name: input.role as RoleName } });
  if (!role) throw new ApiError(500, "Rol tanımı bulunamadı. Lütfen sistem yöneticisiyle iletişime geçin.");

  const passwordHash = await hashPassword(input.password);
  const user = await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      passwordHash,
      roleId: role.id,
      classLevel: input.role === "STUDENT" ? input.classLevel ?? null : null,
    },
    include: { role: true },
  });

  return buildAuthResponse(user.id, user.role.name, user);
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
  if (!user || !user.isActive) throw new ApiError(401, "E-posta veya şifre hatalı.");

  const isValid = await comparePassword(password, user.passwordHash);
  if (!isValid) throw new ApiError(401, "E-posta veya şifre hatalı.");

  return buildAuthResponse(user.id, user.role.name, user);
}

export async function refreshUserSession(token: string) {
  let decoded: ReturnType<typeof decodeRefreshToken>;
  try {
    decoded = decodeRefreshToken(token);
  } catch {
    throw new ApiError(401, "Oturum süresi doldu. Lütfen yeniden giriş yapın.");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    include: { role: true },
  });

  if (!user || !user.isActive) {
    throw new ApiError(401, "Kullanıcı bulunamadı veya hesap pasif.");
  }

  try {
    verifyRefreshToken(token, user.passwordHash);
  } catch {
    throw new ApiError(401, "Oturum süresi doldu veya geçersiz. Lütfen yeniden giriş yapın.");
  }

  return buildAuthResponse(user.id, user.role.name, user);
}

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;

  const rawToken = generateResetToken();
  const tokenHash = hashToken(rawToken);
  const expires = new Date(Date.now() + env.resetPasswordTokenExpiresMin * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: { resetPasswordToken: tokenHash, resetPasswordExpires: expires },
  });

  if (!env.isProd) console.log(`🔑 Şifre sıfırlama token'ı (${email}): ${rawToken}`);
  return rawToken;
}

export async function resetPassword(token: string, newPassword: string) {
  const tokenHash = hashToken(token);
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { gt: new Date() },
    },
  });

  if (!user) throw new ApiError(400, "Sıfırlama bağlantısının süresi dolmuş veya geçersiz.");

  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
}

function buildAuthResponse(
  userId: string,
  role: RoleName,
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    classLevel: number | null;
    points: number;
    currentStreak: number;
  }
) {
  const payload = { userId, role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload, user.passwordHash);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role,
      classLevel: user.classLevel,
      points: user.points,
      currentStreak: user.currentStreak,
    },
  };
}
