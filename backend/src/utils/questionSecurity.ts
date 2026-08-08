import { RoleName } from "../generated/prisma";

/**
 * Öğrencilere gönderilen soru verisinden doğru cevap bilgisini gizler.
 * Böylece tarayıcı ağ sekmesinden cevap "kopyalanamaz"; doğruluk kontrolü
 * her zaman sunucu tarafında yapılır (bkz. question.controller checkAnswer /
 * examAttempt.controller submitAnswer).
 */
export function sanitizeQuestionForViewer<
  T extends {
    correctAnswer: string;
    choiceOptions?: { isCorrect: boolean }[];
    solution?: unknown;
  }
>(question: T, role: RoleName | undefined): T {
  if (role === "ADMIN" || role === "TEACHER") return question;

  const clone = { ...question } as any;
  delete clone.correctAnswer;
  delete clone.solution;

  if (clone.choiceOptions) {
    clone.choiceOptions = clone.choiceOptions.map((opt: any) => ({ ...opt, isCorrect: undefined }));
  }

  return clone as T;
}
