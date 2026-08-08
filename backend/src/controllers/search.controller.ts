import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";

/**
 * Genel arama uç noktası. Kullanıcılar konuya, üniteye, kazanıma veya
 * anahtar kelimeye göre arama yapabilir.
 *
 * GET /api/arama?q=gezegen&classLevel=5
 */
export const search = catchAsync(async (req: Request, res: Response) => {
  const { q, classLevel } = req.query;
  const query = String(q ?? "").trim();

  if (query.length < 2) {
    throw new ApiError(422, "Arama terimi en az 2 karakter olmalı.");
  }

  const classFilter = classLevel ? { unit: { class: { level: Number(classLevel) } } } : {};

  const [topics, units, learningOutcomes] = await Promise.all([
    // Konu başlığı / özeti / içeriğinde ara
    prisma.topic.findMany({
      where: {
        isPublished: true,
        ...classFilter,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { summary: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
        ],
      },
      include: { unit: { include: { class: true } } },
      take: 20,
    }),

    // Ünite başlığında ara
    prisma.unit.findMany({
      where: {
        title: { contains: query, mode: "insensitive" },
        ...(classLevel ? { class: { level: Number(classLevel) } } : {}),
      },
      include: { class: true },
      take: 10,
    }),

    // Kazanım açıklamasında ara
    prisma.learningOutcome.findMany({
      where: {
        description: { contains: query, mode: "insensitive" },
        ...(classLevel
          ? { topic: { unit: { class: { level: Number(classLevel) } } } }
          : {}),
      },
      include: { topic: { include: { unit: { include: { class: true } } } } },
      take: 10,
    }),
  ]);

  return sendSuccess(
    res,
    { query, topics, units, learningOutcomes },
    `"${query}" için ${topics.length + units.length + learningOutcomes.length} sonuç bulundu.`
  );
});
