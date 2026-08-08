import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

export const listSimulations = catchAsync(async (req: Request, res: Response) => {
  const { classLevel, topicId } = req.query;
  const simulations = await prisma.simulation.findMany({
    where: {
      isPublished: true,
      ...(classLevel ? { classLevel: Number(classLevel) } : {}),
      ...(topicId ? { topicId: String(topicId) } : {}),
    },
    orderBy: { order: "asc" },
    include: { _count: { select: { labExperiments: true } } },
  });
  return sendSuccess(res, simulations, "Simülasyonlar listelendi.");
});

export const getSimulationBySlug = catchAsync(async (req: Request, res: Response) => {
  const simulation = await prisma.simulation.findUnique({
    where: { slug: req.params.slug },
    include: { labExperiments: { where: { isPublished: true }, orderBy: { order: "asc" } } },
  });
  if (!simulation) return sendSuccess(res, null, "Simülasyon bulunamadı.", 404);
  return sendSuccess(res, simulation, "Simülasyon detayı.");
});

export const createSimulation = catchAsync(async (req: Request, res: Response) => {
  const simulation = await prisma.simulation.create({ data: req.body });
  return sendSuccess(res, simulation, "Simülasyon oluşturuldu.", 201);
});

export const updateSimulation = catchAsync(async (req: Request, res: Response) => {
  const simulation = await prisma.simulation.update({ where: { id: req.params.id }, data: req.body });
  return sendSuccess(res, simulation, "Simülasyon güncellendi.");
});

export const deleteSimulation = catchAsync(async (req: Request, res: Response) => {
  await prisma.simulation.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Simülasyon silindi.");
});
