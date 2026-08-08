import { z } from "zod";

export const createTagSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Etiket adı en az 2 karakter olmalı.").max(50),
  }),
});

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Kategori adı en az 2 karakter olmalı.").max(100),
    description: z.string().max(500).optional(),
  }),
});
