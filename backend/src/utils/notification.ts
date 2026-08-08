import { prisma } from "../config/db";
import { NotificationType } from "../generated/prisma";

interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedUrl?: string;
}

/** Tek bir kullanıcıya bildirim oluşturur. */
export async function createNotification(input: CreateNotificationInput) {
  return prisma.notification.create({ data: input });
}

/** Birden fazla kullanıcıya aynı bildirimi oluşturur (ör. sınıfa duyuru). */
export async function createNotificationForUsers(
  userIds: string[],
  data: Omit<CreateNotificationInput, "userId">
) {
  if (userIds.length === 0) return;
  await prisma.notification.createMany({
    data: userIds.map((userId) => ({ ...data, userId })),
  });
}

/** Belirli bir sınıf seviyesindeki tüm öğrencilere bildirim gönderir. */
export async function notifyClassLevel(classLevel: number, data: Omit<CreateNotificationInput, "userId">) {
  const students = await prisma.user.findMany({
    where: { classLevel, role: { name: "STUDENT" } },
    select: { id: true },
  });
  await createNotificationForUsers(
    students.map((s) => s.id),
    data
  );
}

/** Bir öğrencinin velilerine bildirim gönderir (ör. rozet kazanma, öğretmen notu). */
export async function notifyParentsOfStudent(studentId: string, data: Omit<CreateNotificationInput, "userId">) {
  const links = await prisma.parentChild.findMany({ where: { childId: studentId }, select: { parentId: true } });
  await createNotificationForUsers(
    links.map((l) => l.parentId),
    data
  );
}
