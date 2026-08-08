import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import {
  touchUserStreak,
  addUserPoints,
  incrementDailyChallenge,
  awardBadgeByTitle,
  checkAndAwardMilestoneBadges,
  logStudyTime,
} from "../utils/gamification";

/** Yayınlanmış oyunları listeler (sınıf/tip/konu filtresiyle). */
export const listGames = catchAsync(async (req: Request, res: Response) => {
  const { classLevel, type, topicId } = req.query;
  const games = await prisma.game.findMany({
    where: {
      isPublished: true,
      ...(classLevel ? { classLevel: Number(classLevel) } : {}),
      ...(type ? { type: String(type) as never } : {}),
      ...(topicId ? { topicId: String(topicId) } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { levels: { orderBy: { order: "asc" } }, topic: { select: { title: true, slug: true } } },
  });
  return sendSuccess(res, games, "Oyunlar listelendi.");
});

/** [Yönetici/Öğretmen] Yönetim paneli için tüm oyunları (taslak dahil) listeler. */
export const listGamesForManagement = catchAsync(async (_req: Request, res: Response) => {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { scores: true } }, topic: { select: { title: true } } },
  });
  return sendSuccess(res, games, "Oyunlar listelendi.");
});

/** Oyun detayını (seviyeleriyle) getirir — oyunu "başlatmak" için kullanılır. */
export const getGame = catchAsync(async (req: Request, res: Response) => {
  const game = await prisma.game.findUnique({
    where: { id: req.params.id },
    include: { levels: { orderBy: { order: "asc" } }, topic: { include: { glossaryTerms: true } } },
  });
  if (!game) return sendSuccess(res, null, "Oyun bulunamadı.", 404);
  return sendSuccess(res, game, "Oyun detayı.");
});

export const getGameBySlug = catchAsync(async (req: Request, res: Response) => {
  const game = await prisma.game.findUnique({
    where: { slug: req.params.slug },
    include: { levels: { orderBy: { order: "asc" } }, topic: { include: { glossaryTerms: true } } },
  });
  if (!game) return sendSuccess(res, null, "Oyun bulunamadı.", 404);
  return sendSuccess(res, game, "Oyun detayı.");
});

/** [Yönetici/Öğretmen] Yeni oyun oluşturur. */
export const createGame = catchAsync(async (req: Request, res: Response) => {
  const game = await prisma.game.create({ data: req.body });
  return sendSuccess(res, game, "Oyun oluşturuldu.", 201);
});

export const updateGame = catchAsync(async (req: Request, res: Response) => {
  const game = await prisma.game.update({ where: { id: req.params.id }, data: req.body });
  return sendSuccess(res, game, "Oyun güncellendi.");
});

export const deleteGame = catchAsync(async (req: Request, res: Response) => {
  await prisma.game.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Oyun silindi.");
});

/** [Yönetici/Öğretmen] Bir oyuna yeni seviye ekler. */
export const createGameLevel = catchAsync(async (req: Request, res: Response) => {
  const level = await prisma.gameLevel.create({
    data: { ...req.body, gameId: req.params.gameId },
  });
  return sendSuccess(res, level, "Seviye eklendi.", 201);
});

export const deleteGameLevel = catchAsync(async (req: Request, res: Response) => {
  await prisma.gameLevel.delete({ where: { id: req.params.levelId } });
  return sendSuccess(res, null, "Seviye silindi.");
});

/**
 * Öğrenci bir oyunu bitirdiğinde skorunu kaydeder. Bu tek uç nokta:
 * 1) GameScore kaydı oluşturur,
 * 2) kullanıcının toplam puanına skor kadar ekler,
 * 3) günlük "1 oyun bitir" görevini ilerletir,
 * 4) aktif gün serisini günceller,
 * 5) oyun sayısına bağlı rozet eşiklerini kontrol eder.
 */
export const submitGameScore = catchAsync(async (req: Request, res: Response) => {
  const { levelId, score, correctCount, wrongCount, durationSec } = req.body;
  const userId = req.user!.id;
  const gameId = req.params.id;

  const game = await prisma.game.findUnique({ where: { id: gameId } });
  if (!game || !game.isPublished) throw new ApiError(404, "Oyun bulunamadı.");

  const gameScore = await prisma.gameScore.create({
    data: {
      userId,
      gameId,
      levelId: levelId || undefined,
      score,
      correctCount: correctCount ?? 0,
      wrongCount: wrongCount ?? 0,
      durationSec: durationSec ?? undefined,
    },
  });

  await touchUserStreak(userId);
  await addUserPoints(userId, score);
  await incrementDailyChallenge(userId, "FINISH_GAME");
  await logStudyTime(userId, Math.max(1, Math.round((durationSec ?? 60) / 60)), "game");

  // İlk oyun için "İlk Adım", 10 oyunda "Bilim Kâşifi" gibi eşikler
  await checkAndAwardMilestoneBadges(userId);

  // Yüksek skor tek seferde "Fen Ustası" tetikleyebilir (örnek eşik)
  if (score >= 90) {
    await awardBadgeByTitle(userId, "Fen Ustası", "game", gameId);
  }

  return sendSuccess(res, gameScore, "Skor kaydedildi.", 201);
});

/** Giriş yapmış kullanıcının bir oyundaki geçmiş skorlarını listeler. */
export const listMyGameScores = catchAsync(async (req: Request, res: Response) => {
  const scores = await prisma.gameScore.findMany({
    where: { userId: req.user!.id, ...(req.query.gameId ? { gameId: String(req.query.gameId) } : {}) },
    include: { game: { select: { title: true, type: true, slug: true } } },
    orderBy: { playedAt: "desc" },
    take: 50,
  });
  return sendSuccess(res, scores, "Oyun skorları listelendi.");
});
