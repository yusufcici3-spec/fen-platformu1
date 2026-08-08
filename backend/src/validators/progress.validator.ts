import { z } from "zod";

export const upsertProgressSchema = z.object({
  body: z.object({
    topicId: z.string().uuid("Geçersiz konu kimliği."),
    completion: z.number().int().min(0).max(100),
    score: z.number().int().min(0).optional(),
  }),
});
