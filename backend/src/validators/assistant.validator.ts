import { z } from "zod";

export const askAssistantSchema = z.object({
  body: z.object({
    message: z.string().trim().min(1, "Mesaj boş olamaz.").max(2000),
    questionId: z.string().uuid().optional(),
  }),
});
