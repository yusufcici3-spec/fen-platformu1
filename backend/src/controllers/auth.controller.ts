import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import * as authService from "../services/auth.service";
import { env } from "../config/env";

const cookieOptions = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: "lax" as const,
};

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);
  res.cookie("accessToken", result.accessToken, cookieOptions);
  return sendSuccess(res, result, "Kayıt başarılı. Hoş geldiniz!", 201);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  res.cookie("accessToken", result.accessToken, cookieOptions);
  return sendSuccess(res, result, "Giriş başarılı.");
});

export const logout = catchAsync(async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  return sendSuccess(res, null, "Çıkış yapıldı.");
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.requestPasswordReset(req.body.email);
  return sendSuccess(
    res,
    null,
    "E-posta adresiniz sistemde kayıtlıysa şifre sıfırlama bağlantısı gönderildi."
  );
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body.token, req.body.newPassword);
  return sendSuccess(res, null, "Şifreniz başarıyla güncellendi.");
});

export const me = catchAsync(async (req: Request, res: Response) => {
  return sendSuccess(res, req.user, "Aktif kullanıcı bilgisi.");
});
