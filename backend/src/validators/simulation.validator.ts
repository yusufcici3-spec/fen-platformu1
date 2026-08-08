import { z } from "zod";

export const createSimulationSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3, "Başlık en az 3 karakter olmalı.").max(150),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(150)
      .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir."),
    description: z.string().optional(),
    componentKey: z.string().trim().min(2, "Bileşen anahtarı gerekli."),
    thumbnail: z.string().optional(),
    classLevel: z.number().int().min(5).max(8).optional(),
    topicId: z.string().uuid().optional(),
    isPublished: z.boolean().optional(),
    order: z.number().int().min(0).optional(),
  }),
});

export const updateSimulationSchema = createSimulationSchema.deepPartial();
