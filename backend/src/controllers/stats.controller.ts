import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

/**
 * Öğrenci panelinde gösterilecek kapsamlı istatistikleri hesaplar:
 * toplam çözülen/doğru/yanlış/boş soru sayısı, başarı yüzdesi, günlük ve
 * haftalık çözüm grafiği, en başarılı ve en çok zorlanılan konular.
 */
export const getMyStats = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  // Tüm deneme cevapları (pratik modundaki cevaplar StudentAnswer'a değil
  // WrongQuestion'a yazıldığı için, "çözülen soru" ölçütü StudentAnswer +
  // WrongQuestion birleşiminden hesaplanır)
  const [examAnswers, wrongQuestions, favoriteCount] = await Promise.all([
    prisma.studentAnswer.findMany({
      where: { result: { userId } },
      include: { question: { include: { topic: { include: { unit: true } } } } },
    }),
    prisma.wrongQuestion.findMany({ where: { userId } }),
    prisma.favoriteQuestion.count({ where: { userId } }),
  ]);

  const totalAnswered = examAnswers.length;
  const correctCount = examAnswers.filter((a) => a.isCorrect === true).length;
  const wrongCount = examAnswers.filter((a) => a.isCorrect === false).length;
  const blankCount = 0; // deneme bazlı boşlar StudentExamResult.blankCount içinde ayrıca tutulur
  const successPercent = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 1000) / 10 : 0;

  // Günlük çözüm grafiği (son 7 gün)
  const dailyMap = new Map<string, number>();
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dailyMap.set(d.toISOString().slice(0, 10), 0);
  }
  examAnswers.forEach((a) => {
    const key = a.answeredAt.toISOString().slice(0, 10);
    if (dailyMap.has(key)) dailyMap.set(key, (dailyMap.get(key) ?? 0) + 1);
  });
  const dailyChart = Array.from(dailyMap.entries()).map(([date, count]) => ({ date, count }));

  // Haftalık çözüm grafiği (son 8 hafta)
  const weeklyMap = new Map<string, number>();
  for (let i = 7; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i * 7);
    const weekKey = `${d.getFullYear()}-W${String(getWeekNumber(d)).padStart(2, "0")}`;
    weeklyMap.set(weekKey, 0);
  }
  examAnswers.forEach((a) => {
    const weekKey = `${a.answeredAt.getFullYear()}-W${String(getWeekNumber(a.answeredAt)).padStart(2, "0")}`;
    if (weeklyMap.has(weekKey)) weeklyMap.set(weekKey, (weeklyMap.get(weekKey) ?? 0) + 1);
  });
  const weeklyChart = Array.from(weeklyMap.entries()).map(([week, count]) => ({ week, count }));

  // Konu bazlı başarı analizi
  const topicStatsMap = new Map<string, { title: string; correct: number; total: number }>();
  examAnswers.forEach((a) => {
    const topic = a.question.topic;
    const entry = topicStatsMap.get(topic.id) ?? { title: topic.title, correct: 0, total: 0 };
    entry.total += 1;
    if (a.isCorrect) entry.correct += 1;
    topicStatsMap.set(topic.id, entry);
  });

  const topicStats = Array.from(topicStatsMap.entries()).map(([topicId, s]) => ({
    topicId,
    title: s.title,
    successRate: s.total > 0 ? Math.round((s.correct / s.total) * 1000) / 10 : 0,
    total: s.total,
  }));

  const bestTopics = [...topicStats].sort((a, b) => b.successRate - a.successRate).slice(0, 5);
  const weakestTopics = [...topicStats].sort((a, b) => a.successRate - b.successRate).slice(0, 5);

  return sendSuccess(
    res,
    {
      totalAnswered,
      correctCount,
      wrongCount,
      blankCount,
      successPercent,
      favoriteCount,
      wrongQuestionCount: wrongQuestions.filter((w) => !w.resolved).length,
      dailyChart,
      weeklyChart,
      bestTopics,
      weakestTopics,
    },
    "İstatistikler hesaplandı."
  );
});

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
