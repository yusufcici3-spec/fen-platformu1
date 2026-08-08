import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import { buildAnalysisReport } from "../services/analysis.service";

/** [Veli] Kendi hesabına bağlı çocuk hesaplarını listeler. */
export const listMyChildren = catchAsync(async (req: Request, res: Response) => {
  const links = await prisma.parentChild.findMany({
    where: { parentId: req.user!.id },
    include: { child: { select: { id: true, firstName: true, lastName: true, classLevel: true, points: true, currentStreak: true } } },
  });
  return sendSuccess(res, links.map((l) => l.child), "Çocuklar listelendi.");
});

/** [Veli] Bir çocuğun e-posta adresiyle hesabına bağlanmasını sağlar. */
export const linkChild = catchAsync(async (req: Request, res: Response) => {
  const { childEmail } = req.body;

  const child = await prisma.user.findUnique({ where: { email: childEmail }, include: { role: true } });
  if (!child || child.role.name !== "STUDENT") {
    throw new ApiError(404, "Bu e-posta adresine sahip bir öğrenci bulunamadı.");
  }

  const link = await prisma.parentChild.upsert({
    where: { parentId_childId: { parentId: req.user!.id, childId: child.id } },
    update: {},
    create: { parentId: req.user!.id, childId: child.id },
  });

  return sendSuccess(res, link, "Öğrenci hesabınıza bağlandı.", 201);
});

/**
 * [Veli] Bağlı bir çocuğun gelişim raporunu, çalışma sürelerini, deneme
 * sonuçlarını ve öğretmen notlarını getirir. Yalnızca kendi bağlı
 * çocukları için erişime izin verilir.
 */
export const getChildReport = catchAsync(async (req: Request, res: Response) => {
  const link = await prisma.parentChild.findUnique({
    where: { parentId_childId: { parentId: req.user!.id, childId: req.params.childId } },
  });
  if (!link) throw new ApiError(403, "Bu öğrenciye erişim yetkiniz yok.");

  const [child, report, examResults, teacherNotes] = await Promise.all([
    prisma.user.findUnique({
      where: { id: req.params.childId },
      select: { id: true, firstName: true, lastName: true, classLevel: true, points: true, currentStreak: true },
    }),
    buildAnalysisReport(req.params.childId),
    prisma.studentExamResult.findMany({
      where: { userId: req.params.childId, finishedAt: { not: null } },
      include: { exam: { select: { title: true, type: true } } },
      orderBy: { finishedAt: "desc" },
      take: 10,
    }),
    prisma.teacherNote.findMany({
      where: { studentId: req.params.childId },
      include: { teacher: { select: { firstName: true, lastName: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return sendSuccess(res, { child, report, examResults, teacherNotes }, "Çocuk gelişim raporu.");
});
