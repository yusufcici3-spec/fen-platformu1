import { z } from "zod";

export const createUnitSchema = z.object({
  body: z.object({
    classId: z.string().uuid("Geçersiz sınıf kimliği."),
    code: z.string().max(20).optional(),
    title: z.string().trim().min(3, "Ünite başlığı en az 3 karakter olmalı.").max(150),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(150)
      .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir."),
    description: z.string().max(1000).optional(),
    order: z.number().int().min(0).optional(),
  }),
});

export const updateUnitSchema = z.object({
  body: z.object({
    code: z.string().max(20).optional(),
    title: z.string().trim().min(3).max(150).optional(),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(150)
      .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir.")
      .optional(),
    description: z.string().max(1000).optional().nullable(),
    order: z.number().int().min(0).optional(),
  }),
});

export const reorderSchema = z.object({
  body: z.object({
    // Sıralanacak öğelerin, yeni sıraya göre dizilmiş kimlik listesi
    orderedIds: z.array(z.string().uuid()).min(1, "Sıralanacak öğe listesi boş olamaz."),
  }),
});
