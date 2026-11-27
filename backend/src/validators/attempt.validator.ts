import { z } from "zod";

export const staticAttemptSchema = z.object({
  body: z.object({
    quizTitle: z.string().trim().min(1).max(200),
    answers: z
      .array(
        z.object({
          question: z.string().min(1).max(4000),
          selected: z.string().max(1000),
          correct: z.string().max(1000),
          isCorrect: z.boolean(),
        })
      )
      .min(1)
      .max(120),
  }),
});
