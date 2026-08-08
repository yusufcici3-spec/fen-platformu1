import { z } from "zod";

export const createGlossaryTermSchema = z.object({
  body: z.object({
    topicId: z.string().uuid("Geçersiz konu kimliği."),
    term: z.string().trim().min(2, "Kavram adı en az 2 karakter olmalı.").max(100),
    definition: z.string().trim().min(3, "Tanım gerekli."),
    order: z.number().int().min(0).optional(),
  }),
});

export const updateGlossaryTermSchema = z.object({
  body: z.object({
    term: z.string().trim().min(2).max(100).optional(),
    definition: z.string().trim().min(3).optional(),
    order: z.number().int().min(0).optional(),
  }),
});
