import { z } from "zod";

export const createTopicSchema = z.object({
  body: z.object({
    unitId: z.string().uuid("Geçersiz ünite kimliği."),
    title: z.string().trim().min(3, "Konu başlığı en az 3 karakter olmalı.").max(200),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(200)
      .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir."),
    summary: z.string().max(500).optional(),
    content: z.string().optional(),
    coverImage: z.string().optional(),
    order: z.number().int().min(0).optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const updateTopicSchema = z.object({
  body: z.object({
    unitId: z.string().uuid().optional(),
    title: z.string().trim().min(3).max(200).optional(),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(200)
      .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir.")
      .optional(),
    summary: z.string().max(500).optional().nullable(),
    content: z.string().optional().nullable(),
    coverImage: z.string().optional().nullable(),
    order: z.number().int().min(0).optional(),
    isPublished: z.boolean().optional(),
  }),
});
