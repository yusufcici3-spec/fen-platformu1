import { z } from "zod";

const questionType = z.enum([
  "MULTIPLE_CHOICE",
  "TRUE_FALSE",
  "FILL_BLANK",
  "MATCHING",
  "OPEN_ENDED",
  "DRAG_DROP",
  "INTERACTIVE",
]);
const difficulty = z.enum(["EASY", "MEDIUM", "HARD"]);

const optionSchema = z.object({
  text: z.string().min(1, "Şık metni gerekli."),
  imageUrl: z.string().optional(),
  matchText: z.string().optional(),
  isCorrect: z.boolean().default(false),
});

export const createQuestionSchema = z.object({
  body: z.object({
    topicId: z.string().uuid("Geçersiz konu kimliği."),
    type: questionType.default("MULTIPLE_CHOICE"),
    body: z.string().trim().min(3, "Soru metni en az 3 karakter olmalı."),
    correctAnswer: z.string().trim().min(1, "Doğru cevap gerekli."),
    explanation: z.string().optional(),
    difficulty: difficulty.default("MEDIUM"),
    points: z.number().int().min(1).max(100).default(10),
    estimatedTimeSec: z.number().int().min(5).max(3600).optional(),
    isScenario: z.boolean().optional(),
    isNextGen: z.boolean().optional(),
    categoryId: z.string().uuid().optional(),
    learningOutcomeId: z.string().uuid().optional(),
    tagIds: z.array(z.string().uuid()).optional(),
    options: z.array(optionSchema).optional(),
  }),
});

export const updateQuestionSchema = z.object({
  body: z.object({
    type: questionType.optional(),
    body: z.string().trim().min(3).optional(),
    correctAnswer: z.string().trim().min(1).optional(),
    explanation: z.string().optional().nullable(),
    difficulty: difficulty.optional(),
    points: z.number().int().min(1).max(100).optional(),
    estimatedTimeSec: z.number().int().min(5).max(3600).optional().nullable(),
    isScenario: z.boolean().optional(),
    isNextGen: z.boolean().optional(),
    isActive: z.boolean().optional(),
    categoryId: z.string().uuid().optional().nullable(),
    learningOutcomeId: z.string().uuid().optional().nullable(),
    tagIds: z.array(z.string().uuid()).optional(),
    options: z.array(optionSchema).optional(),
  }),
});

export const submitAnswerSchema = z.object({
  body: z.object({
    resultId: z.string().uuid("Geçersiz oturum kimliği."),
    questionId: z.string().uuid("Geçersiz soru kimliği."),
    selectedOptionId: z.string().uuid().optional(),
    answerText: z.string().optional(),
  }),
});
