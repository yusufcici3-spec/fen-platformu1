import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

/** Bir konuya ait içerik bloklarını (anlatım / önemli bilgi / günlük yaşam) listeler. */
export const listTopicContents = catchAsync(async (req: Request, res: Response) => {
  const { topicId } = req.query;
  const contents = await prisma.topicContent.findMany({
    where: topicId ? { topicId: String(topicId) } : undefined,
    orderBy: { order: "asc" },
  });
  return sendSuccess(res, contents, "İçerik blokları listelendi.");
});

/** [Yönetici/Öğretmen] Zengin metin editöründen gelen yeni içerik bloğu ekler. */
export const createTopicContent = catchAsync(async (req: Request, res: Response) => {
  let order = req.body.order;
  if (order === undefined) {
    const last = await prisma.topicContent.findFirst({
      where: { topicId: req.body.topicId },
      orderBy: { order: "desc" },
    });
    order = last ? last.order + 1 : 0;
  }

  const content = await prisma.topicContent.create({ data: { ...req.body, order } });
  return sendSuccess(res, content, "İçerik bloğu eklendi.", 201);
});

export const updateTopicContent = catchAsync(async (req: Request, res: Response) => {
  const content = await prisma.topicContent.update({
    where: { id: req.params.id },
    data: req.body,
  });
  return sendSuccess(res, content, "İçerik bloğu güncellendi.");
});

export const deleteTopicContent = catchAsync(async (req: Request, res: Response) => {
  await prisma.topicContent.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "İçerik bloğu silindi.");
});
