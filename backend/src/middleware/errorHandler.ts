import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import multer from "multer";
import { ApiError } from "../utils/apiResponse";
import { env } from "../config/env";

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, `Rota bulunamadı: ${req.originalUrl}`));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Zod doğrulama hataları
  if (err instanceof ZodError) {
    return res.status(422).json({
      success: false,
      message: "Girdiğiniz bilgilerde hata var.",
      details: err.flatten(),
    });
  }

  // Dosya yükleme (multer) hataları
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: `Dosya yükleme hatası: ${err.message}`,
    });
  }

  // Bilinçli olarak fırlatılan API hataları
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
    });
  }

  // Prisma benzersizlik / kısıt hataları
  if (typeof err === "object" && err !== null && "code" in err && (err as { code: string }).code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "Bu kayıt zaten mevcut (benzersizlik ihlali).",
    });
  }

  console.error("🔥 Beklenmeyen hata:", err);

  return res.status(500).json({
    success: false,
    message: "Sunucuda beklenmeyen bir hata oluştu.",
    details: env.isProd ? undefined : String(err),
  });
}
