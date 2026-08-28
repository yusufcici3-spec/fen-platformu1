import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { ApiError } from "../utils/apiResponse";
import { prisma } from "../config/db";
import { uploadBuffer } from "../config/cloudinary";

/** [Giriş yapmış kullanıcı] Profil fotoğrafı yükler ve kullanıcıya bağlar. */
export const uploadUserAvatar = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(400, "Yüklenecek bir dosya seçin.");

  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  await prisma.user.update({ where: { id: req.user!.id }, data: { avatarUrl } });

  return sendSuccess(res, { avatarUrl }, "Profil fotoğrafı güncellendi.");
});

/** [Yönetici/Öğretmen] Konu kapak görselini Cloudinary’ye yükler. */
export const uploadTopicCover = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(400, "Yüklenecek bir dosya seçin.");

  const result = await uploadBuffer(req.file.buffer, "fen-platform/topics", "image");
  return sendSuccess(res, { coverImage: result.secure_url }, "Görsel yüklendi.");
});
