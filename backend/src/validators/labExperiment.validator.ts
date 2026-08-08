import { z } from "zod";

export const createLabExperimentSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3, "Başlık en az 3 karakter olmalı.").max(200),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(200)
      .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir."),
    purpose: z.string().trim().min(5, "Amaç alanı gerekli."),
    materials: z.string().trim().min(3, "Malzemeler gerekli."),
    steps: z.string().trim().min(3, "Deney adımları gerekli."),
    resultExplanation: z.string().trim().min(3, "Sonuç ve açıklama gerekli."),
    safetyWarnings: z.string().trim().min(3, "Güvenlik uyarıları gerekli."),
    classLevel: z.number().int().min(5).max(8),
    simulationId: z.string().uuid().optional(),
    topicId: z.string().uuid().optional(),
    isPublished: z.boolean().optional(),
    order: z.number().int().min(0).optional(),
  }),
});

export const updateLabExperimentSchema = createLabExperimentSchema.deepPartial();
