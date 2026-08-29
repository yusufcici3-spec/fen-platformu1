import { apiFetch } from "@/lib/api";
import type { PracticeAnswerResult } from "@/types/questions";

/** Oyun cevaplarını sunucuda kontrol eder; doğru cevap istemciye önceden gönderilmez. */
export async function checkGameAnswer(
  questionId: string,
  accessToken: string | null,
  answer: { selectedOptionId?: string; answerText?: string }
): Promise<PracticeAnswerResult> {
  const response = await apiFetch<PracticeAnswerResult>(`/sorular/${questionId}/pratik-cevap`, {
    method: "POST",
    token: accessToken,
    body: JSON.stringify(answer),
  });

  if (!response.data) throw new Error("Cevap kontrol edilemedi.");
  return response.data;
}
