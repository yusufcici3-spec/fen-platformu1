import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

/** Bir konuya ait kazanımları listeler. */
export const listLearningOutcomes = catchAsync(async (req: Request, res: Response) => {
  const { topicId } = req.query;
  const outcomes = await prisma.learningOutcome.findMany({
    where: topicId ? { topicId: String(topicId) } : undefined,
    orderBy: { order: "asc" },
  });
  return sendSuccess(res, outcomes, "Kazanımlar listelendi.");
});

/** [Yönetici/Öğretmen] Yeni kazanım ekler. */
export const createLearningOutcome = catchAsync(async (req: Request, res: Response) => {
  let order = req.body.order;
  if (order === undefined) {
    const last = await prisma.learningOutcome.findFirst({
      where: { topicId: req.body.topicId },
      orderBy: { order: "desc" },
    });
    order = last ? last.order + 1 : 0;
  }

  const outcome = await prisma.learningOutcome.create({ data: { ...req.body, order } });
  return sendSuccess(res, outcome, "Kazanım eklendi.", 201);
});

export const updateLearningOutcome = catchAsync(async (req: Request, res: Response) => {
  const outcome = await prisma.learningOutcome.update({
    where: { id: req.params.id },
    data: req.body,
  });
  return sendSuccess(res, outcome, "Kazanım güncellendi.");
});

export const deleteLearningOutcome = catchAsync(async (req: Request, res: Response) => {
  await prisma.learningOutcome.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Kazanım silindi.");
});
