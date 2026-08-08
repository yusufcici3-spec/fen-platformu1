import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

/** Rozet kataloğunu listeler. */
export const listBadges = catchAsync(async (_req: Request, res: Response) => {
  const badges = await prisma.badge.findMany({ orderBy: { title: "asc" } });
  return sendSuccess(res, badges, "Rozetler listelendi.");
});

/** [Yönetici/Öğretmen] Yeni rozet tanımlar. */
export const createBadge = catchAsync(async (req: Request, res: Response) => {
  const badge = await prisma.badge.create({ data: req.body });
  return sendSuccess(res, badge, "Rozet oluşturuldu.", 201);
});

export const deleteBadge = catchAsync(async (req: Request, res: Response) => {
  await prisma.badge.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Rozet silindi.");
});

/** Giriş yapmış kullanıcının kazandığı rozetleri listeler. */
export const listMyAchievements = catchAsync(async (req: Request, res: Response) => {
  const achievements = await prisma.gameAchievement.findMany({
    where: { userId: req.user!.id },
    include: { badge: true, game: { select: { title: true, slug: true } } },
    orderBy: { earnedAt: "desc" },
  });
  return sendSuccess(res, achievements, "Kazanılan rozetler listelendi.");
});

/**
 * Rozet kataloğunu, kullanıcının kazanıp kazanmadığı bilgisiyle birlikte
 * döner ("Rozet Avı" oyunu ve öğrenci panelindeki rozet vitrini için).
 */
export const listBadgesWithProgress = catchAsync(async (req: Request, res: Response) => {
  const [badges, mine] = await Promise.all([
    prisma.badge.findMany({ orderBy: { title: "asc" } }),
    prisma.gameAchievement.findMany({ where: { userId: req.user!.id } }),
  ]);

  const earnedIds = new Set(mine.map((m) => m.badgeId));
  const result = badges.map((b) => ({ ...b, earned: earnedIds.has(b.id) }));

  return sendSuccess(res, result, "Rozet durumu listelendi.");
});
