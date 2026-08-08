import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

export const listExperiments = catchAsync(async (req: Request, res: Response) => {
  const { topicId } = req.query;
  const experiments = await prisma.experiment.findMany({
    where: topicId ? { topicId: String(topicId) } : undefined,
    orderBy: { order: "asc" },
  });
  return sendSuccess(res, experiments, "Deneyler listelendi.");
});

export const createExperiment = catchAsync(async (req: Request, res: Response) => {
  let order = req.body.order;
  if (order === undefined) {
    const last = await prisma.experiment.findFirst({
      where: { topicId: req.body.topicId },
      orderBy: { order: "desc" },
    });
    order = last ? last.order + 1 : 0;
  }
  const experiment = await prisma.experiment.create({ data: { ...req.body, order } });
  return sendSuccess(res, experiment, "Deney eklendi.", 201);
});

export const updateExperiment = catchAsync(async (req: Request, res: Response) => {
  const experiment = await prisma.experiment.update({
    where: { id: req.params.id },
    data: req.body,
  });
  return sendSuccess(res, experiment, "Deney güncellendi.");
});

export const deleteExperiment = catchAsync(async (req: Request, res: Response) => {
  await prisma.experiment.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Deney silindi.");
});
