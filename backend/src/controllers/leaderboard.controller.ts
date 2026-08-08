import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { cacheOrCompute } from "../utils/cache";

function getCurrentWeekRange(): { start: Date; end: Date } {
  const now = new Date();
  const day = now.getUTCDay() || 7;
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - (day - 1));
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  return { start, end };
}

/**
 * Liderlik tablosunu döner.
 * GET /liderlik?scope=ALL_TIME|WEEKLY&classLevel=6
 *
 * ALL_TIME: kullanıcının toplam puanına (User.points — oyun/görev/rozet
 * birikimi) göre sıralanır. WEEKLY: bu haftaki oyun skorları toplamına göre.
 */
export const getLeaderboard = catchAsync(async (req: Request, res: Response) => {
  const scope = (req.query.scope as string) === "WEEKLY" ? "WEEKLY" : "ALL_TIME";
  const classLevel = req.query.classLevel ? Number(req.query.classLevel) : undefined;

  if (scope === "WEEKLY") {
    const { start, end } = getCurrentWeekRange();
    const scores = await prisma.gameScore.groupBy({
      by: ["userId"],
      where: {
        playedAt: { gte: start, lte: end },
        ...(classLevel ? { user: { classLevel } } : {}),
      },
      _sum: { score: true },
      orderBy: { _sum: { score: "desc" } },
      take: 20,
    });

    const users = await prisma.user.findMany({
      where: { id: { in: scores.map((s) => s.userId) } },
      select: { id: true, firstName: true, lastName: true, classLevel: true, avatarUrl: true },
    });
    const userMap = new Map<
      string,
      { id: string; firstName: string; lastName: string; classLevel: number | null; avatarUrl: string | null }
    >(users.map((u) => [u.id, u]));

    const leaderboard = scores.map((s, index) => ({
      rank: index + 1,
      user: userMap.get(s.userId),
      totalScore: s._sum.score ?? 0,
    }));

    return sendSuccess(res, { scope, weekStart: start, weekEnd: end, leaderboard }, "Haftalık liderlik tablosu.");
  }

  // ALL_TIME sıralaması sık istenip nadiren değiştiği için 30 saniye önbelleğe alınır
  // (performans optimizasyonu — bkz. utils/cache.ts).
  const leaderboard = await cacheOrCompute(`liderlik:all_time:${classLevel ?? "hepsi"}`, 30, async () => {
    const users = await prisma.user.findMany({
      where: {
        role: { name: "STUDENT" },
        ...(classLevel ? { classLevel } : {}),
      },
      select: { id: true, firstName: true, lastName: true, classLevel: true, avatarUrl: true, points: true },
      orderBy: { points: "desc" },
      take: 20,
    });

    return users.map((u, index) => ({
      rank: index + 1,
      user: { id: u.id, firstName: u.firstName, lastName: u.lastName, classLevel: u.classLevel, avatarUrl: u.avatarUrl },
      totalScore: u.points,
    }));
  });

  return sendSuccess(res, { scope, leaderboard }, "Genel liderlik tablosu.");
});
