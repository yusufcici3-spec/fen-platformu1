import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import { awardBadgeByTitle, addUserPoints } from "../utils/gamification";

function getCurrentWeekRange(): { start: Date; end: Date } {
  const now = new Date();
  const day = now.getUTCDay() || 7; // Pazartesi=1 ... Pazar=7
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - (day - 1));
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  return { start, end };
}

/**
 * Bir sınıf seviyesi için bu haftanın etkinliğini (yoksa oluşturarak) ve
 * o haftaki canlı liderlik sıralamasını (GameScore toplamına göre) döner.
 */
export const getCurrentWeeklyChallenge = catchAsync(async (req: Request, res: Response) => {
  const classLevel = Number(req.query.classLevel ?? req.user?.classLevel ?? 5);
  const { start, end } = getCurrentWeekRange();

  let challenge = await prisma.weeklyChallenge.findUnique({
    where: { weekStart_classLevel: { weekStart: start, classLevel } },
  });

  if (!challenge) {
    challenge = await prisma.weeklyChallenge.create({
      data: {
        weekStart: start,
        weekEnd: end,
        classLevel,
        title: "Haftanın Bilim İnsanı Yarışması",
        description: "Bu hafta en çok puan toplayan öğrenci 'Haftanın Birincisi' rozetini kazanır!",
      },
    });
  }

  const scores = await prisma.gameScore.groupBy({
    by: ["userId"],
    where: { playedAt: { gte: start, lte: end }, user: { classLevel } },
    _sum: { score: true },
    orderBy: { _sum: { score: "desc" } },
    take: 10,
  });

  const users = await prisma.user.findMany({
    where: { id: { in: scores.map((s) => s.userId) } },
    select: { id: true, firstName: true, lastName: true },
  });
  const userMap = new Map<string, { id: string; firstName: string; lastName: string }>(
    users.map((u) => [u.id, u])
  );

  const leaderboard = scores.map((s, index) => ({
    rank: index + 1,
    userId: s.userId,
    name: userMap.get(s.userId) ? `${userMap.get(s.userId)!.firstName} ${userMap.get(s.userId)!.lastName}` : "Bilinmeyen",
    totalScore: s._sum.score ?? 0,
  }));

  return sendSuccess(res, { challenge, leaderboard }, "Haftalık etkinlik getirildi.");
});

/**
 * [Yönetici] Haftayı sonlandırır: en yüksek puanlı öğrenciyi "kazanan" olarak
 * işaretler ve "Haftanın Birincisi" rozetini verir. Gerçek bir dağıtımda bu,
 * her hafta sonu çalışan bir zamanlanmış görev (cron) tarafından tetiklenir.
 */
export const finalizeWeeklyChallenge = catchAsync(async (req: Request, res: Response) => {
  const { challengeId } = req.params;
  const challenge = await prisma.weeklyChallenge.findUnique({ where: { id: challengeId } });
  if (!challenge) throw new ApiError(404, "Haftalık etkinlik bulunamadı.");
  if (challenge.isFinalized) return sendSuccess(res, challenge, "Bu etkinlik zaten sonuçlandırılmış.");

  const topScore = await prisma.gameScore.groupBy({
    by: ["userId"],
    where: {
      playedAt: { gte: challenge.weekStart, lte: challenge.weekEnd },
      user: { classLevel: challenge.classLevel },
    },
    _sum: { score: true },
    orderBy: { _sum: { score: "desc" } },
    take: 1,
  });

  let winnerUserId: string | undefined;
  let winnerScore: number | undefined;

  if (topScore.length > 0) {
    winnerUserId = topScore[0].userId;
    winnerScore = topScore[0]._sum.score ?? 0;
    await awardBadgeByTitle(winnerUserId, "Haftanın Birincisi", "weekly_challenge");
    await addUserPoints(winnerUserId, 50);

    await prisma.leaderboardEntry.upsert({
      where: {
        scope_classLevel_periodKey_userId: {
          scope: "WEEKLY",
          classLevel: challenge.classLevel,
          periodKey: challenge.weekStart.toISOString().slice(0, 10),
          userId: winnerUserId,
        },
      },
      update: { totalScore: winnerScore, rank: 1 },
      create: {
        scope: "WEEKLY",
        classLevel: challenge.classLevel,
        periodKey: challenge.weekStart.toISOString().slice(0, 10),
        userId: winnerUserId,
        totalScore: winnerScore,
        rank: 1,
      },
    });
  }

  const updated = await prisma.weeklyChallenge.update({
    where: { id: challengeId },
    data: { isFinalized: true, winnerUserId, winnerScore },
  });

  return sendSuccess(res, updated, "Haftalık etkinlik sonuçlandırıldı.");
});
