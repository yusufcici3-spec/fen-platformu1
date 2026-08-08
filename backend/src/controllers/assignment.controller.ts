import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import { notifyClassLevel, createNotification } from "../utils/notification";

/** [Öğretmen/Yönetici] Yeni ödev oluşturur ve o sınıftaki tüm öğrencilere bildirim gönderir. */
export const createAssignment = catchAsync(async (req: Request, res: Response) => {
  const assignment = await prisma.assignment.create({
    data: { ...req.body, dueDate: new Date(req.body.dueDate), teacherId: req.user!.id },
  });

  await notifyClassLevel(assignment.classLevel, {
    type: "ASSIGNMENT",
    title: `📚 Yeni Ödev: ${assignment.title}`,
    message: `Son teslim tarihi: ${new Date(assignment.dueDate).toLocaleDateString("tr-TR")}`,
    relatedUrl: "/ogrenci/odevlerim",
  });

  return sendSuccess(res, assignment, "Ödev oluşturuldu.", 201);
});

/** [Öğretmen/Yönetici] Oluşturduğu ödevleri (tamamlama istatistikleriyle) listeler. */
export const listMyAssignments = catchAsync(async (req: Request, res: Response) => {
  const assignments = await prisma.assignment.findMany({
    where: { teacherId: req.user!.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { submissions: true } }, topic: { select: { title: true } } },
  });
  return sendSuccess(res, assignments, "Ödevler listelendi.");
});

/** [Öğrenci] Kendi sınıfına atanmış ödevleri, tamamlama durumuyla listeler. */
export const listMyClassAssignments = catchAsync(async (req: Request, res: Response) => {
  const classLevel = req.user!.classLevel;
  if (!classLevel) return sendSuccess(res, [], "Sınıf bilgisi bulunamadı.");

  const assignments = await prisma.assignment.findMany({
    where: { classLevel },
    orderBy: { dueDate: "asc" },
    include: {
      submissions: { where: { studentId: req.user!.id } },
      topic: { select: { title: true, slug: true } },
      teacher: { select: { firstName: true, lastName: true } },
    },
  });

  const withStatus = assignments.map((a) => ({
    ...a,
    isCompleted: a.submissions.length > 0 && a.submissions[0].isCompleted,
  }));

  return sendSuccess(res, withStatus, "Ödevler listelendi.");
});

/** [Öğrenci] Bir ödevi tamamlandı olarak işaretler. */
export const completeAssignment = catchAsync(async (req: Request, res: Response) => {
  const assignment = await prisma.assignment.findUnique({ where: { id: req.params.id } });
  if (!assignment) throw new ApiError(404, "Ödev bulunamadı.");

  const submission = await prisma.assignmentSubmission.upsert({
    where: { assignmentId_studentId: { assignmentId: assignment.id, studentId: req.user!.id } },
    update: { isCompleted: true, completedAt: new Date(), note: req.body?.note },
    create: { assignmentId: assignment.id, studentId: req.user!.id, isCompleted: true, completedAt: new Date(), note: req.body?.note },
  });

  await createNotification({
    userId: assignment.teacherId,
    type: "ASSIGNMENT",
    title: "✅ Ödev tamamlandı",
    message: `Bir öğrenci "${assignment.title}" ödevini tamamladı.`,
  });

  return sendSuccess(res, submission, "Ödev tamamlandı olarak işaretlendi.");
});

/** [Öğretmen] Bir ödevin teslim/tamamlama durumlarını (sınıftaki tüm öğrenciler için) listeler. */
export const getAssignmentSubmissions = catchAsync(async (req: Request, res: Response) => {
  const assignment = await prisma.assignment.findUnique({ where: { id: req.params.id } });
  if (!assignment) throw new ApiError(404, "Ödev bulunamadı.");

  const students = await prisma.user.findMany({
    where: { classLevel: assignment.classLevel, role: { name: "STUDENT" } },
    select: { id: true, firstName: true, lastName: true },
  });
  const submissions = await prisma.assignmentSubmission.findMany({ where: { assignmentId: assignment.id } });
  const submissionMap = new Map<string, (typeof submissions)[number]>(submissions.map((s) => [s.studentId, s]));

  const result = students.map((s) => ({
    student: s,
    isCompleted: submissionMap.get(s.id)?.isCompleted ?? false,
    completedAt: submissionMap.get(s.id)?.completedAt ?? null,
  }));

  return sendSuccess(res, result, "Ödev teslim durumları listelendi.");
});
