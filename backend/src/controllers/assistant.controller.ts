import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";
import { getAssistantReply } from "../services/aiProvider";

/** Yapay zekâ destekli yardımcıya mesaj gönderir; ipucu/açıklama içeren yanıt döner. */
export const askAssistant = catchAsync(async (req: Request, res: Response) => {
  const { message, questionId } = req.body;
  const userId = req.user!.id;

  let questionContext: { questionBody?: string; questionTopic?: string } = {};
  if (questionId) {
    const question = await prisma.question.findUnique({ where: { id: questionId }, include: { topic: true } });
    if (question) {
      questionContext = { questionBody: question.body, questionTopic: question.topic.title };
    }
  }

  const history = await prisma.assistantMessage.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  await prisma.assistantMessage.create({ data: { userId, role: "user", content: message, questionId } });

  const reply = await getAssistantReply(
    message,
    { studentClassLevel: req.user!.classLevel, ...questionContext },
    history.reverse().map((h) => ({ role: h.role, content: h.content }))
  );

  await prisma.assistantMessage.create({ data: { userId, role: "assistant", content: reply, questionId } });

  return sendSuccess(res, { reply }, "Yanıt hazır.");
});

/** Kullanıcının asistan sohbet geçmişini getirir. */
export const getAssistantHistory = catchAsync(async (req: Request, res: Response) => {
  const messages = await prisma.assistantMessage.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "asc" },
    take: 50,
  });
  return sendSuccess(res, messages, "Sohbet geçmişi getirildi.");
});
