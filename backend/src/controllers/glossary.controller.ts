import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

export const listGlossaryTerms = catchAsync(async (req: Request, res: Response) => {
  const { topicId } = req.query;
  const terms = await prisma.glossaryTerm.findMany({
    where: topicId ? { topicId: String(topicId) } : undefined,
    orderBy: { order: "asc" },
  });
  return sendSuccess(res, terms, "Kavramlar listelendi.");
});

export const createGlossaryTerm = catchAsync(async (req: Request, res: Response) => {
  let order = req.body.order;
  if (order === undefined) {
    const last = await prisma.glossaryTerm.findFirst({
      where: { topicId: req.body.topicId },
      orderBy: { order: "desc" },
    });
    order = last ? last.order + 1 : 0;
  }
  const term = await prisma.glossaryTerm.create({ data: { ...req.body, order } });
  return sendSuccess(res, term, "Kavram eklendi.", 201);
});

export const updateGlossaryTerm = catchAsync(async (req: Request, res: Response) => {
  const term = await prisma.glossaryTerm.update({
    where: { id: req.params.id },
    data: req.body,
  });
  return sendSuccess(res, term, "Kavram güncellendi.");
});

export const deleteGlossaryTerm = catchAsync(async (req: Request, res: Response) => {
  await prisma.glossaryTerm.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Kavram silindi.");
});
