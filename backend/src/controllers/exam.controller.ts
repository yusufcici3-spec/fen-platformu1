import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { notifyClassLevel } from "../utils/notification";

/** Yayınlanmış denemeleri listeler (sınıf/tip filtresiyle). */
export const listExams = catchAsync(async (req: Request, res: Response) => {
  const { classLevel, type } = req.query;
  const exams = await prisma.exam.findMany({
    where: {
      isPublished: true,
      ...(classLevel ? { classLevel: Number(classLevel) } : {}),
      ...(type ? { type: String(type) as never } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { examQuestions: true } },
      topic: { select: { title: true, slug: true } },
      unit: { select: { title: true, slug: true } },
    },
  });
  return sendSuccess(res, exams, "Denemeler listelendi.");
});

export const getExam = catchAsync(async (req: Request, res: Response) => {
  const exam = await prisma.exam.findUnique({
    where: { id: req.params.id },
    include: {
      examQuestions: {
        include: { question: { include: { choiceOptions: { orderBy: { order: "asc" } }, images: true } } },
        orderBy: { order: "asc" },
      },
      topic: { select: { title: true, slug: true } },
      unit: { select: { title: true, slug: true } },
    },
  });
  if (!exam) return sendSuccess(res, null, "Deneme bulunamadı.", 404);

  // Öğrenciye doğru cevap bilgisi sızdırılmaz; sınav sırasında kontrol sunucuda yapılır.
  if (req.user?.role === "STUDENT") {
    exam.examQuestions.forEach((eq) => {
      eq.question.choiceOptions.forEach((opt) => {
        (opt as { isCorrect?: boolean }).isCorrect = undefined;
      });
      (eq.question as { correctAnswer?: string }).correctAnswer = undefined;
    });
  }

  return sendSuccess(res, exam, "Deneme detayı.");
});

/** [Yönetici/Öğretmen] Yeni deneme oluşturur (seçilen sorularla). */
export const createExam = catchAsync(async (req: Request, res: Response) => {
  const { questionIds, ...data } = req.body;

  const exam = await prisma.exam.create({
    data: {
      ...data,
      examQuestions: {
        create: questionIds.map((questionId: string, index: number) => ({ questionId, order: index })),
      },
    },
    include: { examQuestions: true },
  });

  // Aşama 5: bildirim sistemi - yeni deneme yayınlandıysa sınıfa bildirim gönderilir
  if (exam.isPublished) {
    await notifyClassLevel(exam.classLevel, {
      type: "NEW_EXAM",
      title: `📝 Yeni Deneme: ${exam.title}`,
      message: `${exam.durationMin} dakikalık yeni bir deneme yayınlandı.`,
      relatedUrl: `/denemeler/${exam.id}`,
    });
  }

  return sendSuccess(res, exam, "Deneme oluşturuldu.", 201);
});

/** [Yönetici/Öğretmen] Deneme günceller (soru listesi gönderildiyse tamamen yenilenir). */
export const updateExam = catchAsync(async (req: Request, res: Response) => {
  const { questionIds, ...data } = req.body;
  const before = await prisma.exam.findUnique({ where: { id: req.params.id } });

  if (questionIds) {
    await prisma.examQuestion.deleteMany({ where: { examId: req.params.id } });
  }

  const exam = await prisma.exam.update({
    where: { id: req.params.id },
    data: {
      ...data,
      ...(questionIds
        ? {
            examQuestions: {
              create: questionIds.map((questionId: string, index: number) => ({ questionId, order: index })),
            },
          }
        : {}),
    },
    include: { examQuestions: true },
  });

  if (req.body.isPublished === true && before && !before.isPublished) {
    await notifyClassLevel(exam.classLevel, {
      type: "NEW_EXAM",
      title: `📝 Yeni Deneme: ${exam.title}`,
      message: `${exam.durationMin} dakikalık yeni bir deneme yayınlandı.`,
      relatedUrl: `/denemeler/${exam.id}`,
    });
  }

  return sendSuccess(res, exam, "Deneme güncellendi.");
});

export const deleteExam = catchAsync(async (req: Request, res: Response) => {
  await prisma.exam.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Deneme silindi.");
});

/** [Yönetici/Öğretmen] Yönetim paneli için tüm denemeleri (taslak dahil) listeler. */
export const listExamsForManagement = catchAsync(async (req: Request, res: Response) => {
  const { classLevel } = req.query;
  const exams = await prisma.exam.findMany({
    where: classLevel ? { classLevel: Number(classLevel) } : undefined,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { examQuestions: true, results: true } } },
  });
  return sendSuccess(res, exams, "Denemeler listelendi.");
});
