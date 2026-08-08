import { z } from "zod";

export const createTopicImageSchema = z.object({
  body: z.object({
    topicId: z.string().uuid("Geçersiz konu kimliği."),
    url: z.string().min(1, "Görsel yolu gerekli."),
    caption: z.string().max(200).optional(),
    order: z.number().int().min(0).optional(),
  }),
});

export const createTopicVideoSchema = z.object({
  body: z.object({
    topicId: z.string().uuid("Geçersiz konu kimliği."),
    title: z.string().trim().min(2, "Video başlığı gerekli.").max(150),
    source: z.enum(["YOUTUBE", "UPLOAD"]).default("YOUTUBE"),
    url: z.string().min(1, "Video adresi gerekli."),
    order: z.number().int().min(0).optional(),
  }),
});

export const createTopicPdfSchema = z.object({
  body: z.object({
    topicId: z.string().uuid("Geçersiz konu kimliği."),
    title: z.string().trim().min(2, "PDF başlığı gerekli.").max(150),
    url: z.string().min(1, "PDF adresi gerekli."),
    order: z.number().int().min(0).optional(),
  }),
});
