import { z } from "zod";

export const createLearningOutcomeSchema = z.object({
  body: z.object({
    topicId: z.string().uuid("Geçersiz konu kimliği."),
    code: z.string().max(30).optional(),
    description: z.string().trim().min(5, "Kazanım açıklaması en az 5 karakter olmalı."),
    order: z.number().int().min(0).optional(),
  }),
});

export const updateLearningOutcomeSchema = z.object({
  body: z.object({
    code: z.string().max(30).optional().nullable(),
    description: z.string().trim().min(5).optional(),
    order: z.number().int().min(0).optional(),
  }),
});
