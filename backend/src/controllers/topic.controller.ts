import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import { notifyClassLevel } from "../utils/notification";

/** Yayınlanmış konuları listeler (opsiyonel sınıf/ünite filtresi ile). */
export const listTopics = catchAsync(async (req: Request, res: Response) => {
  const { classLevel, unitId, limit } = req.query;

  const topics = await prisma.topic.findMany({
    where: {
      isPublished: true,
      ...(unitId ? { unitId: String(unitId) } : {}),
      ...(classLevel && !unitId
        ? { unit: { class: { level: Number(classLevel) } } }
        : {}),
    },
    include: { unit: { include: { class: true } } },
    orderBy: [{ unitId: "asc" }, { order: "asc" }],
    take: limit ? Number(limit) : 50,
  });

  return sendSuccess(res, topics, "Konular listelendi.");
});

/**
 * Konu detayını tüm zenginleştirilmiş içerikleriyle (kazanımlar, içerik
 * blokları, görseller, videolar, PDF'ler, deneyler, kavramlar) birlikte
 * getirir. Ayrıca aynı ünite içindeki önceki/sonraki konuyu da döner.
 */
export const getTopicBySlug = catchAsync(async (req: Request, res: Response) => {
  const { unitSlug } = req.query;

  const topic = await prisma.topic.findFirst({
    where: {
      slug: req.params.slug,
      isPublished: true,
      // unitSlug verildiyse (öğrenci tarafı /sinif/:level/:unitSlug/:topicSlug
      // rotasından gelir), aynı slug'a sahip farklı ünitelerdeki konularla
      // karışmaması için netleştirme yapılır.
      ...(unitSlug ? { unit: { slug: String(unitSlug) } } : {}),
    },
    include: {
      unit: { include: { class: true } },
      learningOutcomes: { orderBy: { order: "asc" } },
      contents: { orderBy: { order: "asc" } },
      images: { orderBy: { order: "asc" } },
      videos: { orderBy: { order: "asc" } },
      pdfs: { orderBy: { order: "asc" } },
      experiments: { orderBy: { order: "asc" } },
      glossaryTerms: { orderBy: { order: "asc" } },
    },
  });

  if (!topic) return sendSuccess(res, null, "Konu bulunamadı.", 404);

  const siblings = await prisma.topic.findMany({
    where: { unitId: topic.unitId, isPublished: true },
    orderBy: { order: "asc" },
    select: { id: true, slug: true, title: true, order: true },
  });

  const currentIndex = siblings.findIndex((t) => t.id === topic.id);
  const previousTopic = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const nextTopic = currentIndex >= 0 && currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

  return sendSuccess(res, { ...topic, previousTopic, nextTopic }, "Konu detayı.");
});

/** [Yönetici/Öğretmen] Yönetim paneli için bir konuyu ID ile (yayın durumu fark etmeksizin) getirir. */
export const getTopicById = catchAsync(async (req: Request, res: Response) => {
  const topic = await prisma.topic.findUnique({
    where: { id: req.params.id },
    include: {
      unit: { include: { class: true } },
      learningOutcomes: { orderBy: { order: "asc" } },
      contents: { orderBy: { order: "asc" } },
      images: { orderBy: { order: "asc" } },
      videos: { orderBy: { order: "asc" } },
      pdfs: { orderBy: { order: "asc" } },
      experiments: { orderBy: { order: "asc" } },
      glossaryTerms: { orderBy: { order: "asc" } },
    },
  });
  if (!topic) return sendSuccess(res, null, "Konu bulunamadı.", 404);
  return sendSuccess(res, topic, "Konu detayı.");
});

/** [Yönetici/Öğretmen] Yeni konu oluşturur. */
export const createTopic = catchAsync(async (req: Request, res: Response) => {
  const unit = await prisma.unit.findUnique({ where: { id: req.body.unitId } });
  if (!unit) throw new ApiError(404, "Belirtilen ünite bulunamadı.");

  let order = req.body.order;
  if (order === undefined) {
    const last = await prisma.topic.findFirst({
      where: { unitId: req.body.unitId },
      orderBy: { order: "desc" },
    });
    order = last ? last.order + 1 : 0;
  }

  const topic = await prisma.topic.create({
    data: { ...req.body, order, authorId: req.user!.id },
  });
  return sendSuccess(res, topic, "Konu oluşturuldu.", 201);
});

/** [Yönetici/Öğretmen] Konu günceller. */
export const updateTopic = catchAsync(async (req: Request, res: Response) => {
  const before = await prisma.topic.findUnique({ where: { id: req.params.id } });

  const topic = await prisma.topic.update({
    where: { id: req.params.id },
    data: req.body,
    include: { unit: { include: { class: true } } },
  });

  // Aşama 5: bildirim sistemi - konu ilk kez yayınlandığında sınıfa bildirim gönderilir
  if (req.body.isPublished === true && before && !before.isPublished) {
    await notifyClassLevel(topic.unit.class.level, {
      type: "NEW_TOPIC",
      title: `📘 Yeni Konu: ${topic.title}`,
      message: `"${topic.unit.title}" ünitesine yeni bir konu eklendi.`,
      relatedUrl: `/sinif/${topic.unit.class.level}/${topic.unit.slug}/${topic.slug}`,
    });
  }

  return sendSuccess(res, topic, "Konu güncellendi.");
});

/** [Yönetici] Konu siler. */
export const deleteTopic = catchAsync(async (req: Request, res: Response) => {
  await prisma.topic.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Konu silindi.");
});

/**
 * [Yönetici/Öğretmen] Bir üniteye ait konuların sırasını topluca günceller.
 * Body: { orderedIds: string[] }
 */
export const reorderTopics = catchAsync(async (req: Request, res: Response) => {
  const { orderedIds } = req.body as { orderedIds: string[] };

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.topic.update({ where: { id }, data: { order: index } })
    )
  );

  return sendSuccess(res, null, "Konu sıralaması güncellendi.");
});
