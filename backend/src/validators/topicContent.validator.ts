import { z } from "zod";

const contentBlockType = z.enum(["EXPLANATION", "IMPORTANT_INFO", "DAILY_LIFE"]);

export const createTopicContentSchema = z.object({
  body: z.object({
    topicId: z.string().uuid("Geçersiz konu kimliği."),
    type: contentBlockType.default("EXPLANATION"),
    title: z.string().max(150).optional(),
    bodyHtml: z.string().min(1, "İçerik boş olamaz."),
    order: z.number().int().min(0).optional(),
  }),
});

export const updateTopicContentSchema = z.object({
  body: z.object({
    type: contentBlockType.optional(),
    title: z.string().max(150).optional().nullable(),
    bodyHtml: z.string().min(1).optional(),
    order: z.number().int().min(0).optional(),
  }),
});
