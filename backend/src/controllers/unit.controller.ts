import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { ApiError } from "../utils/apiResponse";

/** Bir sınıfa ait tüm üniteleri (konu sayılarıyla birlikte) listeler. */
export const listUnitsByClass = catchAsync(async (req: Request, res: Response) => {
  const { classId } = req.query;
  if (!classId) throw new ApiError(400, "classId parametresi gerekli.");

  const units = await prisma.unit.findMany({
    where: { classId: String(classId) },
    orderBy: { order: "asc" },
    include: { _count: { select: { topics: true } } },
  });

  return sendSuccess(res, units, "Üniteler listelendi.");
});

export const getUnit = catchAsync(async (req: Request, res: Response) => {
  const unit = await prisma.unit.findUnique({
    where: { id: req.params.id },
    include: { topics: { orderBy: { order: "asc" } }, class: true },
  });
  if (!unit) return sendSuccess(res, null, "Ünite bulunamadı.", 404);
  return sendSuccess(res, unit, "Ünite detayı.");
});

/** [Yönetici/Öğretmen] Yeni ünite oluşturur. */
export const createUnit = catchAsync(async (req: Request, res: Response) => {
  const classItem = await prisma.class.findUnique({ where: { id: req.body.classId } });
  if (!classItem) throw new ApiError(404, "Belirtilen sınıf bulunamadı.");

  // Sıra numarası verilmediyse, mevcut son ünitenin ardına ekle
  let order = req.body.order;
  if (order === undefined) {
    const last = await prisma.unit.findFirst({
      where: { classId: req.body.classId },
      orderBy: { order: "desc" },
    });
    order = last ? last.order + 1 : 0;
  }

  const unit = await prisma.unit.create({
    data: { ...req.body, order },
  });
  return sendSuccess(res, unit, "Ünite oluşturuldu.", 201);
});

/** [Yönetici/Öğretmen] Ünite günceller. */
export const updateUnit = catchAsync(async (req: Request, res: Response) => {
  const unit = await prisma.unit.update({
    where: { id: req.params.id },
    data: req.body,
  });
  return sendSuccess(res, unit, "Ünite güncellendi.");
});

/** [Yönetici] Ünite siler (kaskad ile alt konular da silinir). */
export const deleteUnit = catchAsync(async (req: Request, res: Response) => {
  await prisma.unit.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Ünite silindi.");
});

/**
 * [Yönetici/Öğretmen] Bir sınıfa ait ünitelerin sırasını topluca günceller.
 * Body: { orderedIds: string[] } — yeni sıraya göre dizilmiş ünite kimlikleri.
 */
export const reorderUnits = catchAsync(async (req: Request, res: Response) => {
  const { orderedIds } = req.body as { orderedIds: string[] };

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.unit.update({ where: { id }, data: { order: index } })
    )
  );

  return sendSuccess(res, null, "Ünite sıralaması güncellendi.");
});
