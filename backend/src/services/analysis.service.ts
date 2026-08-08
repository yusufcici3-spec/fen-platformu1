import { prisma } from "../config/db";

/**
 * Öğrencinin çözdüğü sorular, deneme sonuçları, oyun performansı ve
 * tamamladığı konulardan ayrıntılı bir başarı profili çıkarır. Bu, gerçek
 * bir ML modeli değil, açık ve denetlenebilir kural tabanlı bir analiz
 * motorudur — ileride bir ML/istatistik modeliyle değiştirilebilecek
 * şekilde modüler tutulmuştur (bkz. README "Aşama 5" notları).
 */
export async function buildAnalysisReport(userId: string) {
  const [answers, examResults, gameScores, completedTopics, studyLogs, outcomes] = await Promise.all([
    prisma.studentAnswer.findMany({
      where: { result: { userId } },
      include: { question: { include: { topic: { include: { unit: true } }, learningOutcome: true } } },
    }),
    prisma.studentExamResult.findMany({
      where: { userId, finishedAt: { not: null } },
      include: { exam: { select: { title: true, type: true, classLevel: true } } },
      orderBy: { finishedAt: "desc" },
    }),
    prisma.gameScore.findMany({ where: { userId }, include: { game: { select: { title: true, type: true } } } }),
    prisma.progress.count({ where: { userId, completion: 100 } }),
    prisma.studyTimeLog.findMany({ where: { userId } }),
    prisma.learningOutcome.findMany({ include: { topic: { select: { id: true, title: true } } } }),
  ]);

  // ---- Genel doğru/yanlış/başarı ----
  const totalAnswered = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect === true).length;
  const wrongCount = answers.filter((a) => a.isCorrect === false).length;
  const successPercent = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 1000) / 10 : 0;

  // ---- Günlük / haftalık / aylık grafik ----
  const dailyChart = buildDailyChart(answers.map((a) => a.answeredAt));
  const weeklyChart = buildWeeklyChart(answers.map((a) => a.answeredAt), 8);
  const monthlyChart = buildMonthlyChart(answers.map((a) => a.answeredAt), 6);

  // ---- Konu bazlı güçlü/zayıf analiz ----
  const topicStats = new Map<string, { title: string; correct: number; total: number }>();
  answers.forEach((a) => {
    const topic = a.question.topic;
    const entry = topicStats.get(topic.id) ?? { title: topic.title, correct: 0, total: 0 };
    entry.total += 1;
    if (a.isCorrect) entry.correct += 1;
    topicStats.set(topic.id, entry);
  });
  const topicList = Array.from(topicStats.entries()).map(([topicId, s]) => ({
    topicId,
    title: s.title,
    successRate: s.total > 0 ? Math.round((s.correct / s.total) * 1000) / 10 : 0,
    total: s.total,
  }));
  const strongestTopics = [...topicList].sort((a, b) => b.successRate - a.successRate).slice(0, 5);
  const weakestTopics = [...topicList].sort((a, b) => a.successRate - b.successRate).slice(0, 5);

  // ---- Kazanım bazlı başarı oranları ----
  const outcomeStats = new Map<string, { description: string; correct: number; total: number }>();
  answers.forEach((a) => {
    const outcome = a.question.learningOutcome;
    if (!outcome) return;
    const entry = outcomeStats.get(outcome.id) ?? { description: outcome.description, correct: 0, total: 0 };
    entry.total += 1;
    if (a.isCorrect) entry.correct += 1;
    outcomeStats.set(outcome.id, entry);
  });
  const outcomeRates = Array.from(outcomeStats.entries()).map(([id, s]) => ({
    learningOutcomeId: id,
    description: s.description,
    successRate: s.total > 0 ? Math.round((s.correct / s.total) * 1000) / 10 : 0,
    total: s.total,
  }));

  // ---- Ortalama soru çözme süresi ----
  const questionMinutes = studyLogs.filter((l) => l.source === "question").reduce((sum, l) => sum + l.minutes, 0);
  const avgSecondsPerQuestion = totalAnswered > 0 ? Math.round((questionMinutes * 60) / totalAnswered) : 0;

  // ---- Deneme performansı ----
  const examPerformance = {
    totalExams: examResults.length,
    averageSuccess:
      examResults.length > 0
        ? Math.round((examResults.reduce((sum, r) => sum + r.successPercent, 0) / examResults.length) * 10) / 10
        : 0,
    recentResults: examResults.slice(0, 5).map((r) => ({
      examTitle: r.exam.title,
      examType: r.exam.type,
      successPercent: r.successPercent,
      finishedAt: r.finishedAt,
    })),
  };

  // ---- Oyun performansı ----
  const gamePerformance = {
    totalGamesPlayed: gameScores.length,
    averageScore:
      gameScores.length > 0 ? Math.round(gameScores.reduce((sum, g) => sum + g.score, 0) / gameScores.length) : 0,
    bestGame: gameScores.length > 0 ? gameScores.reduce((a, b) => (a.score > b.score ? a : b)) : null,
  };

  // ---- Toplam çalışma süresi ----
  const totalStudyMinutes = studyLogs.reduce((sum, l) => sum + l.minutes, 0);

  // ---- Genel gelişim puanı (0-100 arası bileşik puan) ----
  // Ağırlıklar: başarı oranı %40, deneme ortalaması %25, düzenlilik (seri) %20, aktivite hacmi %15
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { currentStreak: true } });
  const streakScore = Math.min(100, (user?.currentStreak ?? 0) * 5);
  const volumeScore = Math.min(100, totalAnswered * 2);
  const developmentScore = Math.round(
    successPercent * 0.4 + examPerformance.averageSuccess * 0.25 + streakScore * 0.2 + volumeScore * 0.15
  );

  return {
    totalAnswered,
    correctCount,
    wrongCount,
    successPercent,
    completedTopicsCount: completedTopics,
    totalStudyMinutes,
    avgSecondsPerQuestion,
    developmentScore,
    dailyChart,
    weeklyChart,
    monthlyChart,
    strongestTopics,
    weakestTopics,
    outcomeRates,
    examPerformance,
    gamePerformance,
    outcomesTrackedCount: outcomes.length,
  };
}

function buildDailyChart(dates: Date[], days = 7) {
  const map = new Map<string, number>();
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    map.set(d.toISOString().slice(0, 10), 0);
  }
  dates.forEach((d) => {
    const key = d.toISOString().slice(0, 10);
    if (map.has(key)) map.set(key, (map.get(key) ?? 0) + 1);
  });
  return Array.from(map.entries()).map(([date, count]) => ({ date, count }));
}

function buildWeeklyChart(dates: Date[], weeks = 8) {
  const map = new Map<string, number>();
  const today = new Date();
  for (let i = weeks - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i * 7);
    map.set(weekKey(d), 0);
  }
  dates.forEach((d) => {
    const key = weekKey(d);
    if (map.has(key)) map.set(key, (map.get(key) ?? 0) + 1);
  });
  return Array.from(map.entries()).map(([week, count]) => ({ week, count }));
}

function buildMonthlyChart(dates: Date[], months = 6) {
  const map = new Map<string, number>();
  const today = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    map.set(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, 0);
  }
  dates.forEach((d) => {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (map.has(key)) map.set(key, (map.get(key) ?? 0) + 1);
  });
  return Array.from(map.entries()).map(([month, count]) => ({ month, count }));
}

function weekKey(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}
