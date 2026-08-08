import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

// ---------------------------------------------------------------------------
// GÖRSELLER
// ---------------------------------------------------------------------------

export const createTopicImage = catchAsync(async (req: Request, res: Response) => {
  const image = await prisma.topicImage.create({ data: req.body });
  return sendSuccess(res, image, "Görsel eklendi.", 201);
});

export const deleteTopicImage = catchAsync(async (req: Request, res: Response) => {
  await prisma.topicImage.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Görsel silindi.");
});

// ---------------------------------------------------------------------------
// VİDEOLAR
// ---------------------------------------------------------------------------

export const createTopicVideo = catchAsync(async (req: Request, res: Response) => {
  const video = await prisma.topicVideo.create({ data: req.body });
  return sendSuccess(res, video, "Video eklendi.", 201);
});

export const deleteTopicVideo = catchAsync(async (req: Request, res: Response) => {
  await prisma.topicVideo.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Video silindi.");
});

// ---------------------------------------------------------------------------
// PDF'LER
// ---------------------------------------------------------------------------

export const createTopicPdf = catchAsync(async (req: Request, res: Response) => {
  const pdf = await prisma.topicPDF.create({ data: req.body });
  return sendSuccess(res, pdf, "PDF eklendi.", 201);
});

export const deleteTopicPdf = catchAsync(async (req: Request, res: Response) => {
  await prisma.topicPDF.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "PDF silindi.");
});
