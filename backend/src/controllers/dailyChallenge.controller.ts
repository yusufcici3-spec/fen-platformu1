import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { getOrCreateTodayChallenges } from "../utils/gamification";

const TYPE_LABELS: Record<string, string> = {
  SOLVE_QUESTIONS: "10 Soru Çöz",
  COMPLETE_TOPIC: "1 Konu Tamamla",
  DO_EXPERIMENT: "1 Deney Yap",
  FINISH_GAME: "1 Oyun Bitir",
};

const TYPE_ICONS: Record<string, string> = {
  SOLVE_QUESTIONS: "❓",
  COMPLETE_TOPIC: "📘",
  DO_EXPERIMENT: "🧪",
  FINISH_GAME: "🎮",
};

/**
 * Giriş yapmış kullanıcının bugünkü 4 görevini döner; ilk erişimde otomatik
 * oluşturulur. İlerleme, ilgili aksiyonlar (soru cevaplama, konu tamamlama,
 * oyun bitirme, deney tamamlama) gerçekleştiğinde arka planda güncellenir.
 */
export const getTodayChallenges = catchAsync(async (req: Request, res: Response) => {
  const challenges = await getOrCreateTodayChallenges(req.user!.id);
  const withLabels = challenges.map((c) => ({ ...c, label: TYPE_LABELS[c.type], icon: TYPE_ICONS[c.type] }));
  return sendSuccess(res, withLabels, "Günlük görevler getirildi.");
});
