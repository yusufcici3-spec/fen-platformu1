import { prisma } from "../config/db";
import { DailyChallengeType } from "../generated/prisma";
import { createNotification, notifyParentsOfStudent } from "./notification";

/**
 * Kullanıcının günlük "aktif gün serisini" (streak) günceller. Bir kullanıcı
 * bugün ilk kez bir aktivite (soru çözme, oyun bitirme, deney tamamlama vb.)
 * gerçekleştirdiğinde çağrılır. Dünden bugüne kesintisiz devam ediyorsa seri
 * bir artar; bir gün atlanmışsa seri sıfırlanıp yeniden 1'den başlar.
 */
export async function touchUserStreak(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const today = startOfDay(new Date());
  const lastActive = user.lastActiveDate ? startOfDay(user.lastActiveDate) : null;

  if (lastActive && lastActive.getTime() === today.getTime()) {
    return; // bugün zaten güncellendi
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isConsecutive = lastActive && lastActive.getTime() === yesterday.getTime();
  const nextStreak = isConsecutive ? user.currentStreak + 1 : 1;

  await prisma.user.update({
    where: { id: userId },
    data: {
      currentStreak: nextStreak,
      longestStreak: Math.max(nextStreak, user.longestStreak),
      lastActiveDate: today,
    },
  });

  // "100 Günlük Seri" rozetini kontrol et
  if (nextStreak >= 100) {
    await awardBadgeByTitle(userId, "100 Günlük Seri", "streak");
  }
}

/** Kullanıcının toplam puanına ekleme yapar (oyun/görev/rozet kaynaklı). */
export async function addUserPoints(userId: string, amount: number): Promise<void> {
  if (amount === 0) return;
  await prisma.user.update({ where: { id: userId }, data: { points: { increment: amount } } });
}

/**
 * Bir aktivitenin tahmini süresini (dakika) günlük çalışma süresi kaydına
 * ekler. "Ortalama soru çözme süresi" ve genel çalışma süresi analizleri
 * bu kayıtlar üzerinden hesaplanır (bkz. analysis.service.ts).
 */
export async function logStudyTime(userId: string, minutes: number, source: string): Promise<void> {
  if (minutes <= 0) return;
  const today = startOfDay(new Date());

  const existing = await prisma.studyTimeLog.findFirst({ where: { userId, date: today, source } });
  if (existing) {
    await prisma.studyTimeLog.update({ where: { id: existing.id }, data: { minutes: { increment: minutes } } });
  } else {
    await prisma.studyTimeLog.create({ data: { userId, date: today, minutes, source } });
  }
}

const CHALLENGE_DEFAULTS: Record<DailyChallengeType, { targetCount: number; rewardPoints: number }> = {
  SOLVE_QUESTIONS: { targetCount: 10, rewardPoints: 20 },
  COMPLETE_TOPIC: { targetCount: 1, rewardPoints: 15 },
  DO_EXPERIMENT: { targetCount: 1, rewardPoints: 15 },
  FINISH_GAME: { targetCount: 1, rewardPoints: 10 },
};

/** Kullanıcının bugünkü 4 görevini döner; yoksa otomatik oluşturur. */
export async function getOrCreateTodayChallenges(userId: string) {
  const today = startOfDay(new Date());

  const existing = await prisma.dailyChallenge.findMany({ where: { userId, date: today } });
  if (existing.length === Object.keys(CHALLENGE_DEFAULTS).length) return existing;

  const existingTypes = new Set(existing.map((c) => c.type));
  const missing = (Object.keys(CHALLENGE_DEFAULTS) as DailyChallengeType[]).filter((t) => !existingTypes.has(t));

  await prisma.$transaction(
    missing.map((type) =>
      prisma.dailyChallenge.create({
        data: {
          userId,
          date: today,
          type,
          targetCount: CHALLENGE_DEFAULTS[type].targetCount,
          rewardPoints: CHALLENGE_DEFAULTS[type].rewardPoints,
        },
      })
    )
  );

  return prisma.dailyChallenge.findMany({ where: { userId, date: today }, orderBy: { type: "asc" } });
}

/**
 * Belirtilen tipteki bugünkü görevi bir birim ilerletir; hedefe ulaşıldığında
 * görevi tamamlanmış işaretler, ödül puanını ekler ve ilgili rozetleri
 * kontrol eder. Bu fonksiyon, soru cevaplama/konu tamamlama/oyun bitirme/
 * deney tamamlama noktalarından çağrılır.
 */
export async function incrementDailyChallenge(userId: string, type: DailyChallengeType, amount = 1): Promise<void> {
  await getOrCreateTodayChallenges(userId);
  const today = startOfDay(new Date());

  const challenge = await prisma.dailyChallenge.findUnique({
    where: { userId_date_type: { userId, date: today, type } },
  });
  if (!challenge || challenge.isCompleted) return;

  const nextCount = challenge.currentCount + amount;
  const isNowCompleted = nextCount >= challenge.targetCount;

  await prisma.dailyChallenge.update({
    where: { id: challenge.id },
    data: {
      currentCount: Math.min(nextCount, challenge.targetCount),
      isCompleted: isNowCompleted,
      completedAt: isNowCompleted ? new Date() : undefined,
    },
  });

  if (isNowCompleted) {
    await addUserPoints(userId, challenge.rewardPoints);
    await checkAndAwardMilestoneBadges(userId);
  }
}

/** Rozeti başlığına göre bulup kullanıcıya verir (zaten kazanılmışsa tekrar vermez). */
export async function awardBadgeByTitle(userId: string, title: string, source: string, gameId?: string): Promise<boolean> {
  const badge = await prisma.badge.findFirst({ where: { title } });
  if (!badge) return false;

  const existing = await prisma.gameAchievement.findUnique({
    where: { userId_badgeId: { userId, badgeId: badge.id } },
  });
  if (existing) return false;

  await prisma.gameAchievement.create({ data: { userId, badgeId: badge.id, source, gameId } });

  // Aşama 5: bildirim sistemi - kazanılan rozet hem öğrenciye hem velisine bildirilir
  await createNotification({
    userId,
    type: "BADGE_EARNED",
    title: `🏅 Yeni Rozet: ${badge.title}`,
    message: badge.description ?? `Tebrikler! "${badge.title}" rozetini kazandın.`,
    relatedUrl: "/ogrenci/rozetlerim",
  });
  await notifyParentsOfStudent(userId, {
    type: "BADGE_EARNED",
    title: `🏅 Çocuğunuz yeni bir rozet kazandı: ${badge.title}`,
    message: badge.description ?? `Çocuğunuz "${badge.title}" rozetini kazandı.`,
  });

  return true;
}

/**
 * Genel başarı eşiklerini kontrol edip uygun rozetleri verir. Basit, kural
 * tabanlı bir sistemdir: her aktivite sonrası çağrılabilir; zaten kazanılmış
 * rozetler tekrar verilmez (bkz. awardBadgeByTitle).
 */
export async function checkAndAwardMilestoneBadges(userId: string): Promise<void> {
  const [answeredCount, completedTopics, gamesPlayed, examResults] = await Promise.all([
    prisma.studentAnswer.count({ where: { result: { userId } } }),
    prisma.progress.count({ where: { userId, completion: 100 } }),
    prisma.gameScore.count({ where: { userId } }),
    prisma.studentExamResult.findMany({
      where: { userId, finishedAt: { not: null } },
      include: { exam: { select: { type: true } } },
    }),
  ]);

  if (answeredCount >= 1) await awardBadgeByTitle(userId, "İlk Adım", "milestone");
  if (answeredCount >= 100) await awardBadgeByTitle(userId, "Soru Şampiyonu", "milestone");
  if (completedTopics >= 5) await awardBadgeByTitle(userId, "Fen Ustası", "milestone");
  if (completedTopics >= 15) await awardBadgeByTitle(userId, "Bilim Kâşifi", "milestone");
  if (gamesPlayed >= 10) await awardBadgeByTitle(userId, "Bilim Kâşifi", "milestone");

  const lgsExamsPassed = examResults.filter((r) => r.exam?.type === "LGS" && r.successPercent >= 70);
  if (lgsExamsPassed.length >= 3) await awardBadgeByTitle(userId, "LGS Hazır", "milestone");
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}
