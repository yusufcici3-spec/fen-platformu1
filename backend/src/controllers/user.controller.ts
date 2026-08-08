import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

/** [Yönetici] Tüm kullanıcıları listeler (sayfalanmış, şifre hariç). */
export const listUsers = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 20);

  const [items, total] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        classLevel: true,
        isActive: true,
        createdAt: true,
        role: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.user.count(),
  ]);

  return sendSuccess(res, { items, total, page, pageSize }, "Kullanıcılar listelendi.");
});

/** [Yönetici] Kullanıcıyı aktif/pasif yapar. */
export const toggleUserActive = catchAsync(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) return sendSuccess(res, null, "Kullanıcı bulunamadı.", 404);

  const updated = await prisma.user.update({
    where: { id: req.params.id },
    data: { isActive: !user.isActive },
  });
  return sendSuccess(res, { id: updated.id, isActive: updated.isActive }, "Kullanıcı durumu güncellendi.");
});

/**
 * [Yönetici/Öğretmen] Aşama 5: Bir sınıf seviyesindeki öğrencileri, temel
 * oyunlaştırma bilgileriyle (puan/seri) birlikte listeler — öğretmenin
 * "Öğrenci Gelişim Raporları" ekranı için kullanılır.
 */
export const listStudentsByClass = catchAsync(async (req: Request, res: Response) => {
  const classLevel = Number(req.query.classLevel);
  const students = await prisma.user.findMany({
    where: { classLevel, role: { name: "STUDENT" } },
    select: { id: true, firstName: true, lastName: true, email: true, points: true, currentStreak: true },
    orderBy: { firstName: "asc" },
  });
  return sendSuccess(res, students, "Öğrenciler listelendi.");
});
