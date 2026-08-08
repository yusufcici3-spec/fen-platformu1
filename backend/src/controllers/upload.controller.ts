import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { ApiError } from "../utils/apiResponse";
import { prisma } from "../config/db";

/** [Giriş yapmış kullanıcı] Profil fotoğrafı yükler ve kullanıcıya bağlar. */
export const uploadUserAvatar = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(400, "Yüklenecek bir dosya seçin.");

  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  await prisma.user.update({ where: { id: req.user!.id }, data: { avatarUrl } });

  return sendSuccess(res, { avatarUrl }, "Profil fotoğrafı güncellendi.");
});

/** [Yönetici/Öğretmen] Konu kapak görseli yükler, dosya yolunu döner. */
export const uploadTopicCover = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(400, "Yüklenecek bir dosya seçin.");

  const coverImage = `/uploads/topics/${req.file.filename}`;
  return sendSuccess(res, { coverImage }, "Görsel yüklendi.");
});
