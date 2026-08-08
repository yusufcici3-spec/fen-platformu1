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

export const listCategories = catchAsync(async (_req: Request, res: Response) => {
  const categories = await prisma.questionCategory.findMany({ orderBy: { name: "asc" } });
  return sendSuccess(res, categories, "Kategoriler listelendi.");
});

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await prisma.questionCategory.create({
    data: { name: req.body.name, slug: slugify(req.body.name), description: req.body.description },
  });
  return sendSuccess(res, category, "Kategori oluşturuldu.", 201);
});

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await prisma.questionCategory.delete({ where: { id: req.params.id } });
  return sendSuccess(res, null, "Kategori silindi.");
});
