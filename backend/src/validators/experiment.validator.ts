import { z } from "zod";

export const createExperimentSchema = z.object({
  body: z.object({
    topicId: z.string().uuid("Geçersiz konu kimliği."),
    title: z.string().trim().min(3, "Deney başlığı en az 3 karakter olmalı.").max(200),
    materials: z.string().trim().min(3, "Malzeme listesi gerekli."),
    steps: z.string().trim().min(3, "Deney adımları gerekli."),
    safetyNotes: z.string().max(1000).optional(),
    videoUrl: z.string().max(500).optional(),
    order: z.number().int().min(0).optional(),
  }),
});

export const updateExperimentSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(200).optional(),
    materials: z.string().trim().min(3).optional(),
    steps: z.string().trim().min(3).optional(),
    safetyNotes: z.string().max(1000).optional().nullable(),
    videoUrl: z.string().max(500).optional().nullable(),
    order: z.number().int().min(0).optional(),
  }),
});
