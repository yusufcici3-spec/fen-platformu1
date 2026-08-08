import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { notifyClassLevel, createNotification } from "../utils/notification";

export const listAnnouncements = catchAsync(async (req: Request, res: Response) => {
  const classLevel = req.user?.classLevel;

  const announcements = await prisma.announcement.findMany({
    where: {
      OR: [
        { classLevel: null, targetUserId: null },
        ...(classLevel ? [{ classLevel }] : []),
        ...(req.user ? [{ targetUserId: req.user.id }] : []),
      ],
    },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  });
  return sendSuccess(res, announcements, "Duyurular listelendi.");
});

/**
 * [Yönetici/Öğretmen] Yeni duyuru oluşturur. `classLevel` verilirse yalnızca
 * o sınıftaki öğrencilere, `targetUserId` verilirse tek bir öğrenciye,
 * ikisi de boşsa herkese gösterilir. Aşama 5: oluşturma anında ilgili
 * kullanıcılara bildirim de gönderilir.
 */
export const createAnnouncement = catchAsync(async (req: Request, res: Response) => {
  const announcement = await prisma.announcement.create({
    data: { ...req.body, authorId: req.user!.id },
  });

  const notifyData = {
    type: "ANNOUNCEMENT" as const,
    title: `📢 ${announcement.title}`,
    message: announcement.content.length > 150 ? `${announcement.content.slice(0, 150)}...` : announcement.content,
    relatedUrl: "/duyurular",
  };

  if (announcement.targetUserId) {
    await createNotification({ userId: announcement.targetUserId, ...notifyData });
  } else if (announcement.classLevel) {
    await notifyClassLevel(announcement.classLevel, notifyData);
  }

  return sendSuccess(res, announcement, "Duyuru oluşturuldu.", 201);
});

export const updateAnnouncement = catchAsync(async (req: Request, res: Response) => {
  const announcement = await prisma.announcement.update({
    where: { id: req.params.id },
    data: req.body,
  });
  return sendSuccess(res, announcement, "Duyuru güncellendi.");
});

export const deleteAnnouncement = catchAsync(async (req: Request, res: Response) => {
  await prisma.announcement.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Duyuru silindi.");
});
