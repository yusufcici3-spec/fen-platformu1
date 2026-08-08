import { z } from "zod";

export const createAssignmentSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3, "Ödev başlığı en az 3 karakter olmalı.").max(200),
    description: z.string().max(2000).optional(),
    classLevel: z.number().int().min(5).max(8),
    dueDate: z.string().min(1, "Son teslim tarihi gerekli."),
    topicId: z.string().uuid().optional(),
  }),
});

export const completeSubmissionSchema = z.object({
  body: z.object({
    note: z.string().max(1000).optional(),
  }),
});
