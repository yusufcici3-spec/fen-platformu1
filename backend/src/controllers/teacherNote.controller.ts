import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { notifyParentsOfStudent } from "../utils/notification";

/** [Öğretmen] Bir öğrenci hakkında not yazar; öğrencinin velisine bildirim gönderilir. */
export const createTeacherNote = catchAsync(async (req: Request, res: Response) => {
  const { studentId, note } = req.body;

  const created = await prisma.teacherNote.create({
    data: { teacherId: req.user!.id, studentId, note },
  });

  await notifyParentsOfStudent(studentId, {
    type: "TEACHER_NOTE",
    title: "📝 Öğretmeninizden yeni bir not var",
    message: note.length > 120 ? `${note.slice(0, 120)}...` : note,
    relatedUrl: "/veli",
  });

  return sendSuccess(res, created, "Not eklendi.", 201);
});

/** [Öğretmen] Bir öğrenci hakkında yazdığı notları listeler. */
export const listNotesForStudent = catchAsync(async (req: Request, res: Response) => {
  const notes = await prisma.teacherNote.findMany({
    where: { studentId: req.params.studentId },
    include: { teacher: { select: { firstName: true, lastName: true } } },
    orderBy: { createdAt: "desc" },
  });
  return sendSuccess(res, notes, "Notlar listelendi.");
});
