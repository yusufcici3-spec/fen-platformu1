import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import * as authService from "../services/auth.service";
import { env } from "../config/env";

const accessCookieOptions = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: (env.isProd ? "none" : "lax") as "none" | "lax",
  maxAge: 60 * 60 * 1000,
  path: "/",
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: (env.isProd ? "none" : "lax") as "none" | "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: "/api/auth",
};

function setSessionCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie("accessToken", accessToken, accessCookieOptions);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
}

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);
  setSessionCookies(res, result.accessToken, result.refreshToken);
  return sendSuccess(res, { accessToken: result.accessToken, user: result.user }, "Kayıt başarılı. Hoş geldiniz!", 201);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  setSessionCookies(res, result.accessToken, result.refreshToken);
  return sendSuccess(res, { accessToken: result.accessToken, user: result.user }, "Giriş başarılı.");
});

export const refresh = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ success: false, message: "Yenileme oturumu bulunamadı." });

  const result = await authService.refreshUserSession(token);
  setSessionCookies(res, result.accessToken, result.refreshToken);
  return sendSuccess(res, { accessToken: result.accessToken, user: result.user }, "Oturum yenilendi.");
});

export const logout = catchAsync(async (_req: Request, res: Response) => {
  res.clearCookie("accessToken", { ...accessCookieOptions, maxAge: undefined });
  res.clearCookie("refreshToken", { ...refreshCookieOptions, maxAge: undefined });
  return sendSuccess(res, null, "Çıkış yapıldı.");
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.requestPasswordReset(req.body.email);
  return sendSuccess(res, null, "E-posta adresiniz sistemde kayıtlıysa şifre sıfırlama bağlantısı gönderildi.");
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.newPassword);
  res.clearCookie("accessToken", { ...accessCookieOptions, maxAge: undefined });
  res.clearCookie("refreshToken", { ...refreshCookieOptions, maxAge: undefined });
  return sendSuccess(res, null, "Şifreniz başarıyla güncellendi. Güvenlik için yeniden giriş yapın.");
});

export const me = catchAsync(async (req: Request, res: Response) => {
  return sendSuccess(res, req.user, "Aktif kullanıcı bilgisi.");
});
