import { z } from "zod";

const examType = z.enum(["TOPIC", "UNIT", "GENERAL", "LGS"]);

export const createExamSchema = z.object({
  body: z
    .object({
      title: z.string().trim().min(3, "Deneme başlığı en az 3 karakter olmalı.").max(200),
      description: z.string().max(1000).optional(),
      type: examType.default("GENERAL"),
      classLevel: z.number().int().min(5).max(8),
      durationMin: z.number().int().min(1).max(240).default(40),
      topicId: z.string().uuid().optional(),
      unitId: z.string().uuid().optional(),
      questionIds: z.array(z.string().uuid()).min(1, "En az bir soru seçilmeli."),
    })
    .refine((data) => data.type !== "TOPIC" || !!data.topicId, {
      message: "Konu denemesi için topicId gerekli.",
      path: ["topicId"],
    })
    .refine((data) => data.type !== "UNIT" || !!data.unitId, {
      message: "Ünite denemesi için unitId gerekli.",
      path: ["unitId"],
    }),
});

export const updateExamSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(200).optional(),
    description: z.string().max(1000).optional().nullable(),
    durationMin: z.number().int().min(1).max(240).optional(),
    isPublished: z.boolean().optional(),
    questionIds: z.array(z.string().uuid()).optional(),
  }),
});
