import { createHash, randomUUID } from "crypto";
import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

/**
 * Kodla yönetilen (veritabanında soru kaydı olmayan) testlerin cevapları.
 * Tablo yoksa ilk kullanımda oluşturulur; elle migration gerektirmez.
 * Şema karşılığı: database/schema.prisma -> StaticAttempt
 */
let tableReady: Promise<unknown> | null = null;
function ensureTable() {
  tableReady ??= (async () => {
    await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "static_attempts" (
      "id" TEXT PRIMARY KEY,
      "user_id" TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      "quiz_title" TEXT NOT NULL,
      "question_key" TEXT NOT NULL,
      "question_text" TEXT NOT NULL,
      "selected_text" TEXT NOT NULL,
      "correct_text" TEXT NOT NULL,
      "is_correct" BOOLEAN NOT NULL,
      "answered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);
    await prisma.$executeRawUnsafe(
      `CREATE UNIQUE INDEX IF NOT EXISTS "static_attempts_user_id_question_key_key" ON "static_attempts"("user_id", "question_key")`
    );
  })().catch((err) => {
    tableReady = null;
    throw err;
  });
  return tableReady;
}

/** [Öğrenci] Hazır testlerde verdiği cevapları kaydeder. Aynı soruda son cevap geçerlidir. */
export const saveStaticAttempts = catchAsync(async (req: Request, res: Response) => {
  if (req.user!.role !== "STUDENT") return sendSuccess(res, { saved: 0 }, "Yalnızca öğrenci cevapları kaydedilir.");

  const { quizTitle, answers } = req.body as {
    quizTitle: string;
    answers: { question: string; selected: string; correct: string; isCorrect: boolean }[];
  };
  await ensureTable();

  await prisma.$transaction(
    answers.map((a) => {
      const key = createHash("sha1").update(`${quizTitle}\n${a.question}`).digest("hex");
      return prisma.$executeRaw`
        INSERT INTO "static_attempts"
          ("id", "user_id", "quiz_title", "question_key", "question_text", "selected_text", "correct_text", "is_correct")
        VALUES (${randomUUID()}, ${req.user!.id}, ${quizTitle}, ${key}, ${a.question}, ${a.selected}, ${a.correct}, ${a.isCorrect})
        ON CONFLICT ("user_id", "question_key") DO UPDATE SET
          "selected_text" = EXCLUDED."selected_text",
          "correct_text" = EXCLUDED."correct_text",
          "is_correct" = EXCLUDED."is_correct",
          "answered_at" = CURRENT_TIMESTAMP`;
    })
  );

  return sendSuccess(res, { saved: answers.length }, "Cevaplar kaydedildi.");
});

/** [Öğretmen/Yönetici] Öğrencinin hazır test özeti ve yanlış yaptığı tüm sorular. */
export const getStudentQuestionDetail = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.studentId;
  await ensureTable();

  const [attempts, bankWrongs] = await Promise.all([
    prisma.$queryRaw<
      { quiz_title: string; question_text: string; selected_text: string; correct_text: string; is_correct: boolean; answered_at: Date }[]
    >`SELECT "quiz_title", "question_text", "selected_text", "correct_text", "is_correct", "answered_at"
      FROM "static_attempts" WHERE "user_id" = ${userId} ORDER BY "answered_at" DESC`,
    prisma.wrongQuestion.findMany({
      where: { userId, resolved: false },
      include: { question: { include: { topic: { select: { title: true } } } } },
      orderBy: { lastWrongAt: "desc" },
    }),
  ]);

  const quizMap = new Map<string, { title: string; total: number; correct: number }>();
  attempts.forEach((a) => {
    const entry = quizMap.get(a.quiz_title) ?? { title: a.quiz_title, total: 0, correct: 0 };
    entry.total += 1;
    if (a.is_correct) entry.correct += 1;
    quizMap.set(a.quiz_title, entry);
  });

  const wrongQuestions = [
    ...attempts
      .filter((a) => !a.is_correct)
      .map((a) => ({
        source: a.quiz_title,
        question: a.question_text,
        selected: a.selected_text as string | null,
        correct: a.correct_text,
        date: a.answered_at,
      })),
    ...bankWrongs.map((w) => ({
      source: w.question.topic.title,
      question: w.question.body,
      selected: null as string | null,
      correct: w.question.correctAnswer,
      date: w.lastWrongAt,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return sendSuccess(res, { quizzes: Array.from(quizMap.values()), wrongQuestions }, "Öğrenci soru ayrıntıları.");
});
