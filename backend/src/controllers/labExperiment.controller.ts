import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import { touchUserStreak, addUserPoints, incrementDailyChallenge, awardBadgeByTitle, logStudyTime } from "../utils/gamification";

/** Yayınlanmış sanal laboratuvar deneylerini listeler (sınıf/simülasyon filtresiyle). */
export const listLabExperiments = catchAsync(async (req: Request, res: Response) => {
  const { classLevel, simulationId, topicId } = req.query;
  const experiments = await prisma.labExperiment.findMany({
    where: {
      isPublished: true,
      ...(classLevel ? { classLevel: Number(classLevel) } : {}),
      ...(simulationId ? { simulationId: String(simulationId) } : {}),
      ...(topicId ? { topicId: String(topicId) } : {}),
    },
    orderBy: { order: "asc" },
    include: { simulation: { select: { title: true, slug: true, componentKey: true } } },
  });
  return sendSuccess(res, experiments, "Deneyler listelendi.");
});

export const getLabExperimentBySlug = catchAsync(async (req: Request, res: Response) => {
  const experiment = await prisma.labExperiment.findUnique({
    where: { slug: req.params.slug },
    include: { simulation: true, topic: { select: { title: true, slug: true } } },
  });
  if (!experiment) return sendSuccess(res, null, "Deney bulunamadı.", 404);
  return sendSuccess(res, experiment, "Deney detayı.");
});

export const createLabExperiment = catchAsync(async (req: Request, res: Response) => {
  const experiment = await prisma.labExperiment.create({ data: req.body });
  return sendSuccess(res, experiment, "Deney oluşturuldu.", 201);
});

export const updateLabExperiment = catchAsync(async (req: Request, res: Response) => {
  const experiment = await prisma.labExperiment.update({ where: { id: req.params.id }, data: req.body });
  return sendSuccess(res, experiment, "Deney güncellendi.");
});

export const deleteLabExperiment = catchAsync(async (req: Request, res: Response) => {
  await prisma.labExperiment.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Deney silindi.");
});

/**
 * Öğrenci bir sanal deneyi tamamladığında çağrılır: deneyimi kaydeder,
 * günlük "1 deney yap" görevini ilerletir, puan/seri günceller ve
 * "Deney Uzmanı" rozetini (5+ farklı deney) kontrol eder.
 */
export const completeLabExperiment = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const experiment = await prisma.labExperiment.findUnique({ where: { id: req.params.id } });
  if (!experiment) throw new ApiError(404, "Deney bulunamadı.");

  const attempt = await prisma.labExperimentAttempt.create({
    data: { userId, labExperimentId: experiment.id, notes: req.body?.notes },
  });

  await touchUserStreak(userId);
  await addUserPoints(userId, 15);
  await incrementDailyChallenge(userId, "DO_EXPERIMENT");
  await logStudyTime(userId, 10, "experiment");

  const distinctExperiments = await prisma.labExperimentAttempt.findMany({
    where: { userId },
    distinct: ["labExperimentId"],
    select: { labExperimentId: true },
  });
  if (distinctExperiments.length >= 5) {
    await awardBadgeByTitle(userId, "Deney Uzmanı", "lab_experiment");
  }

  return sendSuccess(res, attempt, "Deney tamamlandı olarak kaydedildi.", 201);
});

/** Giriş yapmış kullanıcının sanal laboratuvar geçmişini (tamamladığı deneyler) listeler. */
export const listMyLabHistory = catchAsync(async (req: Request, res: Response) => {
  const attempts = await prisma.labExperimentAttempt.findMany({
    where: { userId: req.user!.id },
    include: { labExperiment: { select: { title: true, slug: true, classLevel: true } } },
    orderBy: { completedAt: "desc" },
    take: 50,
  });
  return sendSuccess(res, attempts, "Simülasyon geçmişi listelendi.");
});
