import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

/** Tüm sınıfları (5-8) ünite sayılarıyla birlikte listeler. */
export const listClasses = catchAsync(async (_req: Request, res: Response) => {
  const classes = await prisma.class.findMany({
    orderBy: { level: "asc" },
    include: { _count: { select: { units: true } } },
  });
  return sendSuccess(res, classes, "Sınıflar listelendi.");
});

/** Bir sınıfı ünite ve konularıyla birlikte getirir (ör: /siniflar/5-sinif). */
export const getClassBySlug = catchAsync(async (req: Request, res: Response) => {
  const classItem = await prisma.class.findUnique({
    where: { slug: req.params.slug },
    include: {
      units: {
        orderBy: { order: "asc" },
        include: { topics: { where: { isPublished: true }, orderBy: { order: "asc" } } },
      },
    },
  });
  if (!classItem) {
    return sendSuccess(res, null, "Sınıf bulunamadı.", 404);
  }
  return sendSuccess(res, classItem, "Sınıf detayı.");
});
