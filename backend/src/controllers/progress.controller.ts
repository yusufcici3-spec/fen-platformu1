import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import {
  touchUserStreak,
  incrementDailyChallenge,
  addUserPoints,
  checkAndAwardMilestoneBadges,
  logStudyTime,
} from "../utils/gamification";

/** [Giriş yapmış kullanıcı] Kendi konu ilerlemelerini listeler. */
export const listMyProgress = catchAsync(async (req: Request, res: Response) => {
  const progress = await prisma.progress.findMany({
    where: { userId: req.user!.id },
    include: { topic: { select: { id: true, slug: true, title: true, unitId: true } } },
  });
  return sendSuccess(res, progress, "İlerleme durumu listelendi.");
});

/**
 * [Giriş yapmış kullanıcı] Bir konudaki ilerlemeyi günceller/oluşturur.
 * Öğrenci bir konuyu tamamladığında completion=100 gönderilir.
 */
export const upsertProgress = catchAsync(async (req: Request, res: Response) => {
  const { topicId, completion, score } = req.body;
  const userId = req.user!.id;

  const existing = await prisma.progress.findUnique({ where: { userId_topicId: { userId, topicId } } });
  const wasAlreadyComplete = existing?.completion === 100;

  const progress = await prisma.progress.upsert({
    where: { userId_topicId: { userId, topicId } },
    update: { completion, score: score ?? undefined, lastActivity: new Date() },
    create: { userId, topicId, completion, score: score ?? 0 },
  });

  // ---- Aşama 4: oyunlaştırma - konu ilk kez %100 tamamlandığında tetiklenir ----
  if (completion >= 100 && !wasAlreadyComplete) {
    await touchUserStreak(userId);
    await addUserPoints(userId, 15);
    await incrementDailyChallenge(userId, "COMPLETE_TOPIC");
    await checkAndAwardMilestoneBadges(userId);
    // ---- Aşama 5: çalışma süresi kaydı (konu tamamlama için tahmini süre) ----
    await logStudyTime(userId, 20, "topic");
  }

  return sendSuccess(res, progress, "İlerleme güncellendi.");
});
