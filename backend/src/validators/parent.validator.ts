import { z } from "zod";

export const linkChildSchema = z.object({
  body: z.object({
    childEmail: z.string().trim().email("Geçerli bir öğrenci e-postası girin."),
  }),
});
