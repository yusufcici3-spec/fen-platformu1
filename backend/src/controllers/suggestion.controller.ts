import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { Difficulty } from "../generated/prisma";

/**
 * Öğrencinin performansına göre akıllı öneriler üretir:
 * - Başarı oranı en düşük konuları ("eksik konular") belirler
 * - O konulardan, öğrencinin henüz çözmediği sorulardan öneriler sunar
 * - Genel başarı oranına göre önerilen zorluk seviyesini otomatik ayarlar
 * - Basit bir günlük soru hedefi önerir (sabit 10, ileride kişiselleştirilebilir)
 *
 * Not: Bu, kural tabanlı (rule-based) bir öneri motorudur; makine öğrenmesi
 * kullanmaz ancak öğrencinin geçmiş performansına dayanan gerçek bir analiz
 * sağlar ve ileride bir ML modeliyle değiştirilebilecek şekilde modülerdir.
 */
export const getSuggestions = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const classLevel = req.user!.classLevel ?? 5;

  const answers = await prisma.studentAnswer.findMany({
    where: { result: { userId } },
    include: { question: { include: { topic: true } } },
  });

  // Konu bazlı başarı oranını hesapla
  const topicSuccess = new Map<string, { correct: number; total: number }>();
  answers.forEach((a) => {
    const entry = topicSuccess.get(a.question.topicId) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (a.isCorrect) entry.correct += 1;
    topicSuccess.set(a.question.topicId, entry);
  });

  const weakTopicIds = Array.from(topicSuccess.entries())
    .filter(([, s]) => s.total >= 2 && s.correct / s.total < 0.6)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .map(([topicId]) => topicId)
    .slice(0, 5);

  const weakTopics = weakTopicIds.length
    ? await prisma.topic.findMany({ where: { id: { in: weakTopicIds } }, select: { id: true, title: true, slug: true, unitId: true } })
    : [];

  // Genel başarı oranına göre önerilen zorluk seviyesi
  const overallCorrect = answers.filter((a) => a.isCorrect === true).length;
  const overallTotal = answers.length;
  const overallRate = overallTotal > 0 ? overallCorrect / overallTotal : 0.5;

  let recommendedDifficulty: Difficulty = Difficulty.MEDIUM;
  if (overallRate >= 0.8) recommendedDifficulty = Difficulty.HARD;
  else if (overallRate < 0.5) recommendedDifficulty = Difficulty.EASY;

  // Önerilen sorular: zayıf konulardan, henüz cevaplanmamış, önerilen zorlukta
  const answeredQuestionIds = answers.map((a) => a.questionId);
  const suggestedQuestions = await prisma.question.findMany({
    where: {
      isActive: true,
      id: { notIn: answeredQuestionIds },
      difficulty: recommendedDifficulty,
      ...(weakTopicIds.length > 0
        ? { topicId: { in: weakTopicIds } }
        : { topic: { unit: { class: { level: classLevel } } } }),
    },
    include: { topic: true },
    take: 10,
  });

  // Günlük hedef: sabit bir başlangıç değeri (ileride kullanıcı bazlı özelleştirilebilir)
  const DAILY_GOAL = 10;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const solvedToday = await prisma.studentAnswer.count({
    where: { result: { userId }, answeredAt: { gte: todayStart } },
  });

  return sendSuccess(
    res,
    {
      weakTopics,
      recommendedDifficulty,
      suggestedQuestions,
      dailyGoal: { target: DAILY_GOAL, completed: Math.min(solvedToday, DAILY_GOAL), remaining: Math.max(0, DAILY_GOAL - solvedToday) },
    },
    "Öneriler hazırlandı."
  );
});
