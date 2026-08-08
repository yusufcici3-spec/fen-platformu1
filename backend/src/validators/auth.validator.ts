import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(2, "Ad en az 2 karakter olmalı.").max(50),
    lastName: z.string().trim().min(2, "Soyad en az 2 karakter olmalı.").max(50),
    email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalı.")
      .regex(/[A-Z]/, "Şifre en az bir büyük harf içermeli.")
      .regex(/[a-z]/, "Şifre en az bir küçük harf içermeli.")
      .regex(/[0-9]/, "Şifre en az bir rakam içermeli."),
    role: z.enum(["STUDENT", "TEACHER", "PARENT"]).default("STUDENT"),
    classLevel: z.number().int().min(5).max(8).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
    password: z.string().min(1, "Şifre gerekli."),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Geçerli bir e-posta adresi girin."),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(10, "Geçersiz sıfırlama bağlantısı."),
    newPassword: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalı.")
      .regex(/[A-Z]/, "Şifre en az bir büyük harf içermeli.")
      .regex(/[a-z]/, "Şifre en az bir küçük harf içermeli.")
      .regex(/[0-9]/, "Şifre en az bir rakam içermeli."),
  }),
});
