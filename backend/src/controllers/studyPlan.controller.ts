import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendSuccess, ApiError } from "../utils/apiResponse";
import { getOrCreateTodayPlan, completeStudyPlanItem, getOrCreateWeeklyGoal } from "../services/studyPlan.service";

export const getTodayPlan = catchAsync(async (req: Request, res: Response) => {
  const plan = await getOrCreateTodayPlan(req.user!.id);
  return sendSuccess(res, plan, "Günlük çalışma planı getirildi.");
});

export const completeItem = catchAsync(async (req: Request, res: Response) => {
  const item = await completeStudyPlanItem(req.user!.id, req.params.itemId);
  if (!item) throw new ApiError(404, "Plan öğesi bulunamadı.");
  return sendSuccess(res, item, "Plan öğesi tamamlandı.");
});

export const getWeeklyGoal = catchAsync(async (req: Request, res: Response) => {
  const goal = await getOrCreateWeeklyGoal(req.user!.id);
  return sendSuccess(res, goal, "Haftalık hedef getirildi.");
});
