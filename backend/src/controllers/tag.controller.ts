import { Request, Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess } from "../utils/apiResponse";

function slugify(text: string): string {
  const map: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" };
  return text
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export const listTags = catchAsync(async (_req: Request, res: Response) => {
  const tags = await prisma.questionTag.findMany({ orderBy: { name: "asc" } });
  return sendSuccess(res, tags, "Etiketler listelendi.");
});

export const createTag = catchAsync(async (req: Request, res: Response) => {
  const tag = await prisma.questionTag.create({
    data: { name: req.body.name, slug: slugify(req.body.name) },
  });
  return sendSuccess(res, tag, "Etiket oluşturuldu.", 201);
});

export const deleteTag = catchAsync(async (req: Request, res: Response) => {
  await prisma.questionTag.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Etiket silindi.");
});
