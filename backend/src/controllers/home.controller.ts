import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

/** Ana sayfa için özet istatistikleri döner. */
export const getStats = catchAsync(async (_req: Request, res: Response) => {
  const [userCount, topicCount, questionCount, gameCount] = await Promise.all([
    prisma.user.count(),
    prisma.topic.count({ where: { isPublished: true } }),
    prisma.question.count(),
    prisma.game.count({ where: { isPublished: true } }),
  ]);

  return sendSuccess(
    res,
    { userCount, topicCount, questionCount, gameCount },
    "İstatistikler getirildi."
  );
});

/** Son eklenen yayınlanmış konular. */
export const getRecentTopics = catchAsync(async (_req: Request, res: Response) => {
  const topics = await prisma.topic.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: { unit: { include: { class: true } } },
  });
  return sendSuccess(res, topics, "Son eklenen konular.");
});
