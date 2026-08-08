import { z } from "zod";

const gameType = z.enum([
  "QUIZ",
  "MATCHING",
  "MEMORY",
  "WORD_SEARCH",
  "HANGMAN",
  "DRAG_DROP",
  "TRUE_FALSE_MARATHON",
  "WHEEL_OF_FORTUNE",
  "SCIENCE_ADVENTURE",
  "BADGE_HUNT",
]);

export const createGameSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3, "Oyun başlığı en az 3 karakter olmalı.").max(150),
    slug: z
      .string()
      .trim()
      .min(3)
      .max(150)
      .regex(/^[a-z0-9-]+$/, "Slug yalnızca küçük harf, rakam ve tire içerebilir."),
    description: z.string().max(1000).optional(),
    instructions: z.string().optional(),
    type: gameType.default("QUIZ"),
    classLevel: z.number().int().min(5).max(8).optional(),
    topicId: z.string().uuid().optional(),
    thumbnail: z.string().optional(),
    hasSound: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    config: z.record(z.unknown()).optional(),
  }),
});

export const updateGameSchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(150).optional(),
    description: z.string().max(1000).optional().nullable(),
    instructions: z.string().optional().nullable(),
    classLevel: z.number().int().min(5).max(8).optional().nullable(),
    topicId: z.string().uuid().optional().nullable(),
    thumbnail: z.string().optional().nullable(),
    hasSound: z.boolean().optional(),
    isPublished: z.boolean().optional(),
    config: z.record(z.unknown()).optional(),
  }),
});

export const submitGameScoreSchema = z.object({
  body: z.object({
    levelId: z.string().uuid().optional(),
    score: z.number().int().min(0).max(100000),
    correctCount: z.number().int().min(0).optional(),
    wrongCount: z.number().int().min(0).optional(),
    durationSec: z.number().int().min(0).optional(),
  }),
});
