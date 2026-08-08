import { z } from "zod";

export const startExamSchema = z.object({
  body: z.object({
    examId: z.string().uuid("Geçersiz deneme kimliği."),
  }),
});
