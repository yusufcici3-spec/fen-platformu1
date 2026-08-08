import { Request, Response } from "express";
import * as XLSX from "xlsx";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import { QuestionType, Difficulty } from "../generated/prisma";

interface ImportRow {
  topicSlug?: string;
  type?: string;
  body?: string;
  correctAnswer?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  difficulty?: string;
  points?: number | string;
  explanation?: string;
  tags?: string;
  estimatedTimeSec?: number | string;
}

const VALID_TYPES = new Set(Object.values(QuestionType));
const VALID_DIFFICULTIES = new Set(Object.values(Difficulty));

/**
 * Excel (.xlsx) veya CSV dosyasından toplu soru içe aktarır.
 * Beklenen sütunlar: topicSlug, type, body, correctAnswer, option1..4,
 * difficulty, points, explanation, tags (virgülle ayrılmış), estimatedTimeSec.
 *
 * Hatalı satırlar atlanır ve `errors` dizisinde satır numarasıyla birlikte
 * raporlanır; geçerli satırlar veritabanına kaydedilir.
 */
export const bulkImportQuestions = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(400, "Yüklenecek bir Excel/CSV dosyası seçin.");

  let rows: ImportRow[];
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    rows = XLSX.utils.sheet_to_json<ImportRow>(firstSheet, { defval: "" });
  } catch {
    throw new ApiError(422, "Dosya okunamadı. Lütfen geçerli bir .xlsx veya .csv dosyası yükleyin.");
  }

  if (rows.length === 0) throw new ApiError(422, "Dosyada hiç satır bulunamadı.");

  const errors: { row: number; message: string }[] = [];
  let created = 0;

  // Konu slug -> id eşleşmesini tek seferde çıkar (performans için)
  const topicSlugs = [...new Set(rows.map((r) => r.topicSlug).filter(Boolean))] as string[];
  const topics = await prisma.topic.findMany({ where: { slug: { in: topicSlugs } } });
  const topicMap = new Map(topics.map((t) => [t.slug, t.id]));

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNumber = i + 2; // 1. satır başlık

    if (!row.topicSlug || !topicMap.has(row.topicSlug)) {
      errors.push({ row: rowNumber, message: `Konu bulunamadı: "${row.topicSlug}"` });
      continue;
    }
    if (!row.body || String(row.body).trim().length < 3) {
      errors.push({ row: rowNumber, message: "Soru metni eksik veya çok kısa." });
      continue;
    }
    if (!row.correctAnswer) {
      errors.push({ row: rowNumber, message: "Doğru cevap eksik." });
      continue;
    }

    const type = VALID_TYPES.has(row.type as QuestionType) ? (row.type as QuestionType) : QuestionType.MULTIPLE_CHOICE;
    const difficulty = VALID_DIFFICULTIES.has(row.difficulty as Difficulty)
      ? (row.difficulty as Difficulty)
      : Difficulty.MEDIUM;

    const options = [row.option1, row.option2, row.option3, row.option4]
      .filter((opt): opt is string => !!opt && String(opt).trim().length > 0)
      .map((text, order) => ({
        text: String(text),
        isCorrect: String(text).trim() === String(row.correctAnswer).trim(),
        order,
      }));

    const tagNames = row.tags
      ? String(row.tags)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    try {
      await prisma.question.create({
        data: {
          topicId: topicMap.get(row.topicSlug)!,
          type,
          body: String(row.body),
          correctAnswer: String(row.correctAnswer),
          explanation: row.explanation ? String(row.explanation) : undefined,
          difficulty,
          points: row.points ? Number(row.points) : 10,
          estimatedTimeSec: row.estimatedTimeSec ? Number(row.estimatedTimeSec) : undefined,
          authorId: req.user!.id,
          ...(options.length > 0 ? { choiceOptions: { create: options } } : {}),
          ...(tagNames.length > 0
            ? {
                tags: {
                  connectOrCreate: tagNames.map((name) => ({
                    where: { slug: name.toLowerCase().replace(/\s+/g, "-") },
                    create: { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
                  })),
                },
              }
            : {}),
        },
      });
      created++;
    } catch (err) {
      errors.push({ row: rowNumber, message: err instanceof Error ? err.message : "Bilinmeyen hata." });
    }
  }

  return sendSuccess(
    res,
    { created, failed: errors.length, errors },
    `${created} soru içe aktarıldı, ${errors.length} satır atlandı.`
  );
});
