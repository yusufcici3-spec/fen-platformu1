import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import { sanitizeQuestionForViewer } from "../utils/questionSecurity";
import { touchUserStreak, incrementDailyChallenge, addUserPoints, checkAndAwardMilestoneBadges, logStudyTime } from "../utils/gamification";
import { Prisma } from "../generated/prisma";

const QUESTION_INCLUDE = {
  topic: { include: { unit: { include: { class: true } } } },
  category: true,
  tags: true,
  images: { orderBy: { order: "asc" as const } },
  choiceOptions: { orderBy: { order: "asc" as const } },
  solution: true,
};

/**
 * Soruları filtreleyerek listeler. Sınıf/ünite/konu/kazanım/zorluk/tip/
 * etiket/kategori/anahtar kelime ile filtrelenebilir. Öğrenciler için
 * doğru cevap bilgisi gizlenir.
 */
export const listQuestions = catchAsync(async (req: Request, res: Response) => {
  const {
    classLevel,
    unitId,
    topicId,
    learningOutcomeId,
    difficulty,
    type,
    tag,
    category,
    q,
    page = "1",
    pageSize = "20",
  } = req.query;

  const where: Prisma.QuestionWhereInput = {
    isActive: true,
    ...(topicId ? { topicId: String(topicId) } : {}),
    ...(unitId ? { topic: { unitId: String(unitId) } } : {}),
    ...(classLevel && !unitId ? { topic: { unit: { class: { level: Number(classLevel) } } } } : {}),
    ...(learningOutcomeId ? { learningOutcomeId: String(learningOutcomeId) } : {}),
    ...(difficulty ? { difficulty: String(difficulty) as never } : {}),
    ...(type ? { type: String(type) as never } : {}),
    ...(tag ? { tags: { some: { slug: String(tag) } } } : {}),
    ...(category ? { category: { slug: String(category) } } : {}),
    ...(q ? { body: { contains: String(q), mode: "insensitive" } } : {}),
  };

  const pageNum = Math.max(1, Number(page));
  const pageSizeNum = Math.min(100, Math.max(1, Number(pageSize)));

  const [items, total] = await Promise.all([
    prisma.question.findMany({
      where,
      include: QUESTION_INCLUDE,
      orderBy: { createdAt: "desc" },
      skip: (pageNum - 1) * pageSizeNum,
      take: pageSizeNum,
    }),
    prisma.question.count({ where }),
  ]);

  const sanitized = items.map((q) => sanitizeQuestionForViewer(q, req.user?.role));

  return sendSuccess(res, { items: sanitized, total, page: pageNum, pageSize: pageSizeNum }, "Sorular listelendi.");
});

/** Bir soruyu ID ile getirir (öğrenciye doğru cevap gizlenir). */
export const getQuestion = catchAsync(async (req: Request, res: Response) => {
  const question = await prisma.question.findUnique({
    where: { id: req.params.id },
    include: QUESTION_INCLUDE,
  });
  if (!question) return sendSuccess(res, null, "Soru bulunamadı.", 404);

  return sendSuccess(res, sanitizeQuestionForViewer(question, req.user?.role), "Soru detayı.");
});

/**
 * Belirtilen kritere uyan sorular arasından rastgele birini döner.
 * GET /sorular/rastgele?topicId=...|unitId=...|classLevel=...&excludeIds=a,b,c
 */
export const getRandomQuestion = catchAsync(async (req: Request, res: Response) => {
  const { topicId, unitId, classLevel, difficulty, excludeIds } = req.query;
  const excluded = excludeIds ? String(excludeIds).split(",").filter(Boolean) : [];

  const where: Prisma.QuestionWhereInput = {
    isActive: true,
    ...(topicId ? { topicId: String(topicId) } : {}),
    ...(unitId ? { topic: { unitId: String(unitId) } } : {}),
    ...(classLevel && !unitId && !topicId
      ? { topic: { unit: { class: { level: Number(classLevel) } } } }
      : {}),
    ...(difficulty ? { difficulty: String(difficulty) as never } : {}),
    ...(excluded.length > 0 ? { id: { notIn: excluded } } : {}),
  };

  const total = await prisma.question.count({ where });
  if (total === 0) return sendSuccess(res, null, "Uygun soru bulunamadı.", 404);

  const skip = Math.floor(Math.random() * total);
  const [question] = await prisma.question.findMany({ where, include: QUESTION_INCLUDE, take: 1, skip });

  return sendSuccess(res, sanitizeQuestionForViewer(question, req.user?.role), "Rastgele soru.");
});

/** [Yönetici/Öğretmen] Yeni soru oluşturur (şıklar dahil, tek istekte). */
export const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const { options, tagIds, ...data } = req.body;

  const question = await prisma.question.create({
    data: {
      ...data,
      authorId: req.user!.id,
      ...(tagIds ? { tags: { connect: tagIds.map((id: string) => ({ id })) } } : {}),
      ...(options
        ? {
            choiceOptions: {
              create: options.map(
                (opt: { text: string; imageUrl?: string; matchText?: string; isCorrect: boolean }, i: number) => ({
                  text: opt.text,
                  imageUrl: opt.imageUrl,
                  matchText: opt.matchText,
                  isCorrect: opt.isCorrect,
                  order: i,
                })
              ),
            },
          }
        : {}),
    },
    include: QUESTION_INCLUDE,
  });

  return sendSuccess(res, question, "Soru oluşturuldu.", 201);
});

/** [Yönetici/Öğretmen] Soru günceller. Şıklar gönderildiyse tamamen yenilenir. */
export const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const { options, tagIds, ...data } = req.body;

  if (options) {
    await prisma.questionOption.deleteMany({ where: { questionId: req.params.id } });
  }

  const question = await prisma.question.update({
    where: { id: req.params.id },
    data: {
      ...data,
      ...(tagIds ? { tags: { set: tagIds.map((id: string) => ({ id })) } } : {}),
      ...(options
        ? {
            choiceOptions: {
              create: options.map(
                (opt: { text: string; imageUrl?: string; matchText?: string; isCorrect: boolean }, i: number) => ({
                  text: opt.text,
                  imageUrl: opt.imageUrl,
                  matchText: opt.matchText,
                  isCorrect: opt.isCorrect,
                  order: i,
                })
              ),
            },
          }
        : {}),
    },
    include: QUESTION_INCLUDE,
  });

  return sendSuccess(res, question, "Soru güncellendi.");
});

/** [Yönetici] Soru siler. */
export const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  await prisma.question.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Soru silindi.");
});

/**
 * Deneme dışı serbest pratik modunda bir soruya verilen cevabı değerlendirir.
 * Doğruluk her zaman sunucu tarafında hesaplanır. Öğrenci ise yanlış/doğru
 * geçmişi (WrongQuestion) otomatik güncellenir.
 */
export const checkPracticeAnswer = catchAsync(async (req: Request, res: Response) => {
  const { selectedOptionId, answerText } = req.body as { selectedOptionId?: string; answerText?: string };

  const question = await prisma.question.findUnique({
    where: { id: req.params.id },
    include: { choiceOptions: true, solution: true },
  });
  if (!question) throw new ApiError(404, "Soru bulunamadı.");

  let isCorrect = false;
  if (selectedOptionId) {
    const option = question.choiceOptions.find((o) => o.id === selectedOptionId);
    isCorrect = !!option?.isCorrect;
  } else if (answerText) {
    isCorrect = answerText.trim().toLocaleLowerCase("tr") === question.correctAnswer.trim().toLocaleLowerCase("tr");
  }

  // Giriş yapmış öğrenci için yanlış/doğru geçmişini güncelle
  if (req.user && req.user.role === "STUDENT") {
    if (isCorrect) {
      await prisma.wrongQuestion.updateMany({
        where: { userId: req.user.id, questionId: question.id },
        data: { resolved: true },
      });

      // ---- Aşama 4: oyunlaştırma - doğru cevap puan/seri/günlük görev tetikler ----
      await touchUserStreak(req.user.id);
      await addUserPoints(req.user.id, 2);
      await incrementDailyChallenge(req.user.id, "SOLVE_QUESTIONS");
      await checkAndAwardMilestoneBadges(req.user.id);
      // ---- Aşama 5: çalışma süresi kaydı (soru için tahmini süre, yoksa 1 dk) ----
      await logStudyTime(req.user.id, Math.max(1, Math.round((question.estimatedTimeSec ?? 60) / 60)), "question");
    } else {
      await prisma.wrongQuestion.upsert({
        where: { userId_questionId: { userId: req.user.id, questionId: question.id } },
        update: { wrongCount: { increment: 1 }, lastWrongAt: new Date(), resolved: false },
        create: { userId: req.user.id, questionId: question.id },
      });
    }
  }

  return sendSuccess(
    res,
    {
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      solution: question.solution,
    },
    isCorrect ? "Doğru cevap!" : "Yanlış cevap."
  );
});

// ---------------------------------------------------------------------------
// FAVORİLER
// ---------------------------------------------------------------------------

export const toggleFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const questionId = req.params.id;

  const existing = await prisma.favoriteQuestion.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });

  if (existing) {
    await prisma.favoriteQuestion.delete({ where: { id: existing.id } });
    return sendSuccess(res, { favorited: false }, "Favorilerden çıkarıldı.");
  }

  await prisma.favoriteQuestion.create({ data: { userId, questionId } });
  return sendSuccess(res, { favorited: true }, "Favorilere eklendi.");
});

export const listFavorites = catchAsync(async (req: Request, res: Response) => {
  const favorites = await prisma.favoriteQuestion.findMany({
    where: { userId: req.user!.id },
    include: { question: { include: QUESTION_INCLUDE } },
    orderBy: { createdAt: "desc" },
  });

  const questions = favorites.map((f) => sanitizeQuestionForViewer(f.question, req.user?.role));
  return sendSuccess(res, questions, "Favori sorular listelendi.");
});

// ---------------------------------------------------------------------------
// YANLIŞ SORULAR
// ---------------------------------------------------------------------------

export const listWrongQuestions = catchAsync(async (req: Request, res: Response) => {
  const wrongs = await prisma.wrongQuestion.findMany({
    where: { userId: req.user!.id, resolved: false },
    include: { question: { include: QUESTION_INCLUDE } },
    orderBy: { lastWrongAt: "desc" },
  });

  const questions = wrongs.map((w) => ({
    ...sanitizeQuestionForViewer(w.question, req.user?.role),
    wrongCount: w.wrongCount,
    lastWrongAt: w.lastWrongAt,
  }));

  return sendSuccess(res, questions, "Yanlış yapılan sorular listelendi.");
});
