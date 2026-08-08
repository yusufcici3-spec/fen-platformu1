import { prisma } from "../config/db";
import { StudyPlanItemType } from "../generated/prisma";

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function startOfWeek(date: Date): Date {
  const d = startOfDay(date);
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - (day - 1));
  return d;
}

/**
 * Öğrencinin bugünkü çalışma planını döner; yoksa performansına göre
 * (zayıf konular, tekrar edilmesi gereken yanlış sorular, tamamlanmamış
 * denemeler) otomatik oluşturur. Çalışma süresi önerisi, öğrencinin genel
 * başarı oranına göre ayarlanır: başarı düşükse daha kısa/sık tekrar
 * blokları, başarı yüksekse daha uzun/ileri seviye blokları önerilir.
 */
export async function getOrCreateTodayPlan(userId: string) {
  const today = startOfDay(new Date());

  const existing = await prisma.studyPlanItem.findMany({
    where: { userId, date: today },
    orderBy: { order: "asc" },
    include: { topic: { select: { title: true, slug: true, unitId: true, unit: { select: { slug: true, class: { select: { level: true } } } } } } },
  });
  if (existing.length > 0) return existing;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return [];

  // Genel başarı oranını hesapla → çalışma süresi/zorluk ayarı için kullanılır
  const answers = await prisma.studentAnswer.findMany({ where: { result: { userId } } });
  const total = answers.length;
  const correct = answers.filter((a) => a.isCorrect === true).length;
  const successRate = total > 0 ? correct / total : 0.5;

  // Performansa göre süre ayarı: düşük başarı → daha kısa, sık odaklı bloklar
  const baseMinutes = successRate < 0.5 ? 10 : successRate < 0.75 ? 15 : 20;

  // Zayıf konuları belirle (en az 2 soru çözülmüş, başarı %60 altı)
  const topicStats = new Map<string, { title: string; correct: number; total: number }>();
  const answersWithTopic = await prisma.studentAnswer.findMany({
    where: { result: { userId } },
    include: { question: { select: { topicId: true, topic: { select: { title: true } } } } },
  });
  answersWithTopic.forEach((a) => {
    const entry = topicStats.get(a.question.topicId) ?? { title: a.question.topic.title, correct: 0, total: 0 };
    entry.total += 1;
    if (a.isCorrect) entry.correct += 1;
    topicStats.set(a.question.topicId, entry);
  });
  const weakTopicIds = Array.from(topicStats.entries())
    .filter(([, s]) => s.total >= 2 && s.correct / s.total < 0.6)
    .map(([id]) => id)
    .slice(0, 2);

  const items: { type: StudyPlanItemType; title: string; description: string; estimatedMinutes: number; topicId?: string; order: number }[] = [];

  // 1) Zayıf konu tekrarı (varsa)
  if (weakTopicIds.length > 0) {
    const topic = await prisma.topic.findUnique({ where: { id: weakTopicIds[0] } });
    if (topic) {
      items.push({
        type: "TOPIC_REVIEW",
        title: `"${topic.title}" konusunu tekrar et`,
        description: "Bu konuda geçmiş performansın ortalamanın altında; kısa bir tekrar faydalı olacaktır.",
        estimatedMinutes: baseMinutes,
        topicId: topic.id,
        order: 0,
      });
    }
  }

  // 2) Soru pratiği (yanlış yapılan sorular varsa onlara odaklan)
  const wrongCount = await prisma.wrongQuestion.count({ where: { userId, resolved: false } });
  items.push({
    type: "QUESTION_PRACTICE",
    title: wrongCount > 0 ? `${Math.min(10, wrongCount)} yanlış sorunu tekrar çöz` : "10 yeni soru çöz",
    description:
      wrongCount > 0
        ? "Daha önce yanlış yaptığın sorulara odaklanmak, eksiklerini hızla kapatmanı sağlar."
        : "Genel tekrar için sınıfına uygun 10 soru çöz.",
    estimatedMinutes: baseMinutes,
    order: 1,
  });

  // 3) Sanal deney (haftada birkaç kez öner)
  const dayOfWeek = today.getUTCDay();
  if (dayOfWeek % 2 === 0) {
    items.push({
      type: "EXPERIMENT",
      title: "Sanal laboratuvarda bir deney yap",
      description: "Öğrendiklerini pekiştirmek için bir sanal deney tamamla.",
      estimatedMinutes: 10,
      order: 2,
    });
  }

  // 4) Eğitsel oyun
  items.push({
    type: "GAME",
    title: "Bir eğitsel oyun oyna",
    description: "Kısa bir oyunla eğlenerek tekrar yap ve günlük hedefine katkı sağla.",
    estimatedMinutes: 10,
    order: 3,
  });

  await prisma.studyPlanItem.createMany({
    data: items.map((item) => ({ ...item, userId, date: today })),
  });

  return prisma.studyPlanItem.findMany({
    where: { userId, date: today },
    orderBy: { order: "asc" },
    include: { topic: { select: { title: true, slug: true, unitId: true, unit: { select: { slug: true, class: { select: { level: true } } } } } } },
  });
}

/** Bir çalışma planı öğesini tamamlandı olarak işaretler. */
export async function completeStudyPlanItem(userId: string, itemId: string) {
  const item = await prisma.studyPlanItem.findFirst({ where: { id: itemId, userId } });
  if (!item) return null;
  return prisma.studyPlanItem.update({
    where: { id: itemId },
    data: { isCompleted: true, completedAt: new Date() },
  });
}

/**
 * Bu haftanın hedefini döner; yoksa öğrencinin geçmiş performansına göre
 * (son 4 haftanın ortalaması + %10 artış hedefi) oluşturur.
 */
export async function getOrCreateWeeklyGoal(userId: string) {
  const weekStart = startOfWeek(new Date());

  const existing = await prisma.weeklyGoal.findUnique({ where: { userId_weekStart: { userId, weekStart } } });
  if (existing) return refreshWeeklyGoalProgress(existing.id);

  const fourWeeksAgo = new Date(weekStart);
  fourWeeksAgo.setUTCDate(fourWeeksAgo.getUTCDate() - 28);

  const recentAnswers = await prisma.studentAnswer.count({
    where: { result: { userId }, answeredAt: { gte: fourWeeksAgo } },
  });
  const recentTopics = await prisma.progress.count({
    where: { userId, completion: 100, lastActivity: { gte: fourWeeksAgo } },
  });
  const recentMinutes = await prisma.studyTimeLog.aggregate({
    where: { userId, date: { gte: fourWeeksAgo } },
    _sum: { minutes: true },
  });

  const targetQuestions = Math.max(20, Math.round(((recentAnswers / 4) * 1.1) / 5) * 5);
  const targetTopics = Math.max(1, Math.round((recentTopics / 4) * 1.1));
  const targetMinutes = Math.max(60, Math.round(((recentMinutes._sum.minutes ?? 0) / 4) * 1.1));

  const created = await prisma.weeklyGoal.create({
    data: { userId, weekStart, targetQuestions, targetTopics, targetMinutes },
  });

  return refreshWeeklyGoalProgress(created.id);
}

/** Haftalık hedefin gerçekleşen değerlerini günceller (o haftaki gerçek veriye göre). */
export async function refreshWeeklyGoalProgress(weeklyGoalId: string) {
  const goal = await prisma.weeklyGoal.findUnique({ where: { id: weeklyGoalId } });
  if (!goal) return null;

  const weekEnd = new Date(goal.weekStart);
  weekEnd.setUTCDate(weekEnd.getUTCDate() + 7);

  const [achievedQuestions, achievedTopics, achievedMinutesAgg] = await Promise.all([
    prisma.studentAnswer.count({
      where: { result: { userId: goal.userId }, answeredAt: { gte: goal.weekStart, lt: weekEnd } },
    }),
    prisma.progress.count({
      where: { userId: goal.userId, completion: 100, lastActivity: { gte: goal.weekStart, lt: weekEnd } },
    }),
    prisma.studyTimeLog.aggregate({
      where: { userId: goal.userId, date: { gte: goal.weekStart, lt: weekEnd } },
      _sum: { minutes: true },
    }),
  ]);

  return prisma.weeklyGoal.update({
    where: { id: goal.id },
    data: {
      achievedQuestions,
      achievedTopics,
      achievedMinutes: achievedMinutesAgg._sum.minutes ?? 0,
    },
  });
}
