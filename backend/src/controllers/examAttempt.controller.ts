import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import { touchUserStreak, incrementDailyChallenge, checkAndAwardMilestoneBadges, logStudyTime } from "../utils/gamification";

/**
 * Öğrenci bir denemeyi başlatır. Aynı deneme için bitirilmemiş bir oturum
 * varsa onu döner (kaldığı yerden devam edebilir), yoksa yeni bir
 * StudentExamResult kaydı oluşturur.
 */
export const startExam = catchAsync(async (req: Request, res: Response) => {
  const { examId } = req.body;
  const userId = req.user!.id;

  const exam = await prisma.exam.findUnique({ where: { id: examId } });
  if (!exam || !exam.isPublished) throw new ApiError(404, "Deneme bulunamadı.");

  const existing = await prisma.studentExamResult.findFirst({
    where: { userId, examId, finishedAt: null },
  });
  if (existing) {
    return sendSuccess(res, existing, "Devam eden deneme oturumu bulundu.");
  }

  const result = await prisma.studentExamResult.create({
    data: { userId, examId },
  });

  return sendSuccess(res, result, "Deneme başlatıldı.", 201);
});

/**
 * Bir deneme oturumu içinde tek bir soruya cevap gönderir. Çoktan seçmeli /
 * doğru-yanlış / eşleştirme tipleri anında sunucuda değerlendirilir; açık
 * uçlu sorular `isCorrect: null` olarak kaydedilip daha sonra
 * değerlendirilebilir.
 */
export const submitAnswer = catchAsync(async (req: Request, res: Response) => {
  const { resultId, questionId, selectedOptionId, answerText } = req.body;
  const userId = req.user!.id;

  const result = await prisma.studentExamResult.findUnique({ where: { id: resultId } });
  if (!result || result.userId !== userId) throw new ApiError(404, "Deneme oturumu bulunamadı.");
  if (result.finishedAt) throw new ApiError(400, "Bu deneme oturumu zaten tamamlanmış.");

  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { choiceOptions: true },
  });
  if (!question) throw new ApiError(404, "Soru bulunamadı.");

  let isCorrect: boolean | null = null;
  if (question.type === "OPEN_ENDED") {
    isCorrect = null; // manuel değerlendirme gerektirir
  } else if (selectedOptionId) {
    const option = question.choiceOptions.find((o) => o.id === selectedOptionId);
    isCorrect = !!option?.isCorrect;
  } else if (answerText) {
    isCorrect = answerText.trim().toLocaleLowerCase("tr") === question.correctAnswer.trim().toLocaleLowerCase("tr");
  }

  const answer = await prisma.studentAnswer.upsert({
    where: { resultId_questionId: { resultId, questionId } },
    update: { selectedOptionId, answerText, isCorrect },
    create: { resultId, questionId, selectedOptionId, answerText, isCorrect },
  });

  return sendSuccess(res, answer, "Cevap kaydedildi.");
});

/**
 * Deneme oturumunu bitirir: tüm cevapları toplar, doğru/yanlış/boş sayısını
 * ve başarı yüzdesini hesaplar, WrongQuestion kayıtlarını günceller.
 */
export const finishExam = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await prisma.studentExamResult.findUnique({
    where: { id: req.params.resultId },
    include: { answers: { include: { question: true } }, exam: { include: { examQuestions: true } } },
  });
  if (!result || result.userId !== userId) throw new ApiError(404, "Deneme oturumu bulunamadı.");
  if (result.finishedAt) return sendSuccess(res, result, "Bu deneme zaten tamamlanmıştı.");

  const totalQuestions = result.exam.examQuestions.length;
  const answeredCount = result.answers.length;
  const blankCount = totalQuestions - answeredCount;

  const correctCount = result.answers.filter((a) => a.isCorrect === true).length;
  const wrongCount = result.answers.filter((a) => a.isCorrect === false).length;

  const totalScore = result.answers.reduce((sum, a) => {
    if (a.isCorrect === true) return sum + a.question.points;
    return sum;
  }, 0);

  const successPercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 1000) / 10 : 0;

  const updated = await prisma.studentExamResult.update({
    where: { id: result.id },
    data: { finishedAt: new Date(), correctCount, wrongCount, blankCount, totalScore, successPercent },
  });

  // Yanlış/doğru geçmişini güncelle (bir sonraki "yanlışlarım" listesi için)
  for (const answer of result.answers) {
    if (answer.isCorrect === false) {
      await prisma.wrongQuestion.upsert({
        where: { userId_questionId: { userId, questionId: answer.questionId } },
        update: { wrongCount: { increment: 1 }, lastWrongAt: new Date(), resolved: false },
        create: { userId, questionId: answer.questionId },
      });
    } else if (answer.isCorrect === true) {
      await prisma.wrongQuestion.updateMany({
        where: { userId, questionId: answer.questionId },
        data: { resolved: true },
      });
    }
  }

  // ---- Aşama 4: oyunlaştırma - deneme bitirme puan/seri/günlük görev tetikler ----
  if (correctCount > 0) {
    await touchUserStreak(userId);
    await incrementDailyChallenge(userId, "SOLVE_QUESTIONS", correctCount);
  }
  await checkAndAwardMilestoneBadges(userId);

  // ---- Aşama 5: çalışma süresi kaydı (oturumun gerçek süresi, dakika) ----
  const elapsedMinutes = Math.max(1, Math.round((Date.now() - result.startedAt.getTime()) / 60000));
  await logStudyTime(userId, Math.min(elapsedMinutes, result.exam.durationMin), "exam");

  return sendSuccess(res, updated, "Deneme tamamlandı.");
});

/** Bir deneme sonucunu (cevaplarıyla birlikte) getirir. */
export const getExamResult = catchAsync(async (req: Request, res: Response) => {
  const result = await prisma.studentExamResult.findUnique({
    where: { id: req.params.resultId },
    include: {
      exam: {
        include: {
          examQuestions: {
            include: {
              question: {
                include: {
                  choiceOptions: true,
                  solution: true,
                  topic: { select: { id: true, title: true, slug: true } },
                },
              },
            },
            orderBy: { order: "asc" },
          },
        },
      },
      answers: true,
    },
  });

  if (!result) return sendSuccess(res, null, "Sonuç bulunamadı.", 404);
  if (result.userId !== req.user!.id && req.user!.role === "STUDENT") {
    throw new ApiError(403, "Bu sonucu görüntüleme yetkiniz yok.");
  }

  return sendSuccess(res, result, "Deneme sonucu.");
});

/** Giriş yapmış kullanıcının geçmiş deneme sonuçlarını listeler. */
export const listMyExamResults = catchAsync(async (req: Request, res: Response) => {
  const results = await prisma.studentExamResult.findMany({
    where: { userId: req.user!.id },
    include: { exam: { select: { title: true, type: true, classLevel: true } } },
    orderBy: { startedAt: "desc" },
  });
  return sendSuccess(res, results, "Deneme geçmişi listelendi.");
});
