import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

/** Giriş yapmış kullanıcının bildirimlerini listeler (en yeni önce). */
export const listMyNotifications = catchAsync(async (req: Request, res: Response) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  const unreadCount = await prisma.notification.count({ where: { userId: req.user!.id, isRead: false } });
  return sendSuccess(res, { notifications, unreadCount }, "Bildirimler listelendi.");
});

export const markAsRead = catchAsync(async (req: Request, res: Response) => {
  await prisma.notification.updateMany({
    where: { id: req.params.id, userId: req.user!.id },
    data: { isRead: true },
  });
  return sendSuccess(res, null, "Bildirim okundu olarak işaretlendi.");
});

export const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  await prisma.notification.updateMany({ where: { userId: req.user!.id, isRead: false }, data: { isRead: true } });
  return sendSuccess(res, null, "Tüm bildirimler okundu olarak işaretlendi.");
});
