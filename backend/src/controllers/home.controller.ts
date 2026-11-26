import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

/** Ana sayfa için özet istatistikleri döner. */
export const getStats = catchAsync(async (_req: Request, res: Response) => {
  const [userCount, topicCount, questionCount, gameCount] = await Promise.all([
    prisma.user.count(),
    prisma.topic.count({ where: { isPublished: true } }),
    prisma.question.count(),
    prisma.game.count({ where: { isPublished: true } }),
  ]);

  return sendSuccess(
    res,
    { userCount, topicCount, questionCount, gameCount },
    "İstatistikler getirildi."
  );
});

type RecentItem = {
  id: string;
  title: string;
  type: string;
  label: string;
  createdAt: Date;
  href: string;
  classLevel?: number | null;
};

/**
 * Ana sayfa akışı: yayınlanan yeni konu, soru, simülasyon, oyun,
 * deneme, konu materyali ve herkese açık duyuruları tarihe göre birleştirir.
 */
export const getRecentTopics = catchAsync(async (_req: Request, res: Response) => {
  const topicInclude = {
    unit: { include: { class: true } },
  } as const;

  const [
    topics,
    simulations,
    games,
    exams,
    questions,
    pdfs,
    videos,
    experiments,
    announcements,
  ] = await Promise.all([
    prisma.topic.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: topicInclude,
    }),
    prisma.simulation.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.game.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.exam.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.question.findMany({
      where: { isActive: true, topic: { is: { isPublished: true } } },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { topic: { include: topicInclude } },
    }),
    prisma.topicPDF.findMany({
      where: { topic: { is: { isPublished: true } } },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { topic: { include: topicInclude } },
    }),
    prisma.topicVideo.findMany({
      where: { topic: { is: { isPublished: true } } },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { topic: { include: topicInclude } },
    }),
    prisma.experiment.findMany({
      where: { topic: { is: { isPublished: true } } },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { topic: { include: topicInclude } },
    }),
    prisma.announcement.findMany({
      where: { classLevel: null, targetUserId: null },
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ]);

  const topicHref = (topic: { slug: string; unit: { slug: string; class: { level: number } } }) =>
    `/sinif/${topic.unit.class.level}/${topic.unit.slug}/${topic.slug}`;

  const items: RecentItem[] = [
    ...topics.map((item) => ({
      id: `topic-${item.id}`, title: item.title, type: "Konu", label: "Konu anlatımı",
      createdAt: item.createdAt, href: topicHref(item), classLevel: item.unit.class.level,
    })),
    ...simulations.map((item) => ({
      id: `simulation-${item.id}`, title: item.title, type: "Simülasyon", label: "İnteraktif simülasyon",
      createdAt: item.createdAt, href: `/laboratuvar?simulasyon=${item.slug}`, classLevel: item.classLevel,
    })),
    ...games.map((item) => ({
      id: `game-${item.id}`, title: item.title, type: "Oyun", label: "Eğitsel oyun",
      createdAt: item.createdAt, href: `/oyunlar/${item.slug}`, classLevel: item.classLevel,
    })),
    ...exams.map((item) => ({
      id: `exam-${item.id}`, title: item.title, type: "Deneme", label: "Deneme sınavı",
      createdAt: item.createdAt, href: `/denemeler`, classLevel: item.classLevel,
    })),
    ...questions.map((item) => ({
      id: `question-${item.id}`, title: `${item.topic.title} – Yeni soru eklendi`,
      type: "Soru", label: "Soru bankası", createdAt: item.createdAt,
      href: topicHref(item.topic), classLevel: item.topic.unit.class.level,
    })),
    ...pdfs.map((item) => ({
      id: `pdf-${item.id}`, title: item.title, type: "PDF", label: "Konu PDF'i",
      createdAt: item.createdAt, href: item.url, classLevel: item.topic.unit.class.level,
    })),
    ...videos.map((item) => ({
      id: `video-${item.id}`, title: item.title, type: "Video", label: "Konu videosu",
      createdAt: item.createdAt, href: topicHref(item.topic), classLevel: item.topic.unit.class.level,
    })),
    ...experiments.map((item) => ({
      id: `experiment-${item.id}`, title: item.title, type: "Deney", label: "Fen deneyi",
      createdAt: item.createdAt, href: topicHref(item.topic), classLevel: item.topic.unit.class.level,
    })),
    ...announcements.map((item) => ({
      id: `announcement-${item.id}`, title: item.title, type: "Duyuru", label: "Platform duyurusu",
      createdAt: item.createdAt, href: "/duyurular",
    })),
  ];

  items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return sendSuccess(res, items.slice(0, 9), "Son eklenen içerikler getirildi.");
});
