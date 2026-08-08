import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import { cacheOrCompute } from "../utils/cache";
import { buildAnalysisReport } from "../services/analysis.service";

/** Giriş yapmış kullanıcının kendi ayrıntılı analiz raporu. */
export const getMyAnalysisReport = catchAsync(async (req: Request, res: Response) => {
  const report = await cacheOrCompute(`analiz:${req.user!.id}`, 60, () => buildAnalysisReport(req.user!.id));
  return sendSuccess(res, report, "Analiz raporu hazırlandı.");
});

/**
 * [Öğretmen/Yönetici] Belirli bir öğrencinin analiz raporu.
 * Öğretmen, kendi sınıfındaki (aynı classLevel) öğrencileri görebilir; ADMIN sınırsız.
 */
export const getStudentAnalysisReport = catchAsync(async (req: Request, res: Response) => {
  const student = await prisma.user.findUnique({ where: { id: req.params.studentId } });
  if (!student) throw new ApiError(404, "Öğrenci bulunamadı.");

  const report = await buildAnalysisReport(student.id);
  return sendSuccess(res, { student: { id: student.id, firstName: student.firstName, lastName: student.lastName, classLevel: student.classLevel }, report }, "Öğrenci analiz raporu.");
});

/**
 * [Öğretmen/Yönetici] Sınıf bazlı toplu analiz: sınıfın genel başarı
 * ortalaması ve en çok zorlanılan kazanımlar.
 */
export const getClassAnalysisReport = catchAsync(async (req: Request, res: Response) => {
  const classLevel = Number(req.params.classLevel);

  const report = await cacheOrCompute(`sinif-analiz:${classLevel}`, 120, async () => {
    const students = await prisma.user.findMany({
      where: { classLevel, role: { name: "STUDENT" } },
      select: { id: true, firstName: true, lastName: true },
    });

    const answers = await prisma.studentAnswer.findMany({
      where: { result: { user: { classLevel, role: { name: "STUDENT" } } } },
      include: {
        question: { include: { learningOutcome: true, topic: true } },
        result: { select: { userId: true } },
      },
    });

    const total = answers.length;
    const correct = answers.filter((a) => a.isCorrect === true).length;
    const classAverage = total > 0 ? Math.round((correct / total) * 1000) / 10 : 0;

    // En çok zorlanılan kazanımlar (en düşük başarı oranına sahip, en az 3 denemesi olanlar)
    const outcomeStats = new Map<string, { description: string; correct: number; total: number }>();
    answers.forEach((a) => {
      const outcome = a.question.learningOutcome;
      if (!outcome) return;
      const entry = outcomeStats.get(outcome.id) ?? { description: outcome.description, correct: 0, total: 0 };
      entry.total += 1;
      if (a.isCorrect) entry.correct += 1;
      outcomeStats.set(outcome.id, entry);
    });
    const strugglingOutcomes = Array.from(outcomeStats.entries())
      .map(([id, s]) => ({ learningOutcomeId: id, description: s.description, successRate: Math.round((s.correct / s.total) * 1000) / 10, total: s.total }))
      .filter((o) => o.total >= 3)
      .sort((a, b) => a.successRate - b.successRate)
      .slice(0, 10);

    // Öğrenci bazlı özet sıralama (en yüksekten en düşüğe)
    const perStudent = students.map((s) => {
      const studentAnswers = answers.filter((a) => a.result.userId === s.id);
      return { studentId: s.id, name: `${s.firstName} ${s.lastName}`, answeredCount: studentAnswers.length };
    });

    return { studentCount: students.length, classAverage, strugglingOutcomes, perStudent };
  });

  return sendSuccess(res, report, "Sınıf analiz raporu.");
});
