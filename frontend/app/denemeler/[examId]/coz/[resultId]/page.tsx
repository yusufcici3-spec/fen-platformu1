"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { ExamDetail } from "@/types/questions";
import { QuestionCard, QuestionAnswerValue } from "@/components/questions/QuestionCard";
import { ExamTimer } from "@/components/questions/ExamTimer";

export default function ExamTakingPage({ params }: { params: { examId: string; resultId: string } }) {
  const { accessToken } = useAuth();
  const router = useRouter();
  const [exam, setExam] = useState<ExamDetail | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswerValue>>({});
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    apiFetch<ExamDetail>(`/denemeler/${params.examId}`, { token: accessToken ?? undefined })
      .then((res) => setExam(res.data ?? null))
      .catch(() => setExam(null));
  }, [params.examId, accessToken]);

  const finishExam = useCallback(async () => {
    if (!accessToken || isFinishing) return;
    setIsFinishing(true);
    try {
      await apiFetch(`/deneme-oturumlari/${params.resultId}/bitir`, {
        method: "POST",
        token: accessToken,
      });
    } finally {
      router.push(`/denemeler/${params.examId}/sonuc/${params.resultId}`);
    }
  }, [accessToken, params.examId, params.resultId, router, isFinishing]);

  async function handleAnswerChange(questionId: string, value: QuestionAnswerValue) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (!accessToken) return;
    try {
      await apiFetch("/deneme-oturumlari/cevapla", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ resultId: params.resultId, questionId, ...value }),
      });
    } catch {
      // otomatik kaydetme başarısız olursa sessizce yok say; öğrenci ilerlemeye devam edebilir
    }
  }

  if (!exam) {
    return <p className="p-10 text-center text-sm text-lab-inkMuted">Yükleniyor...</p>;
  }

  const currentEQ = exam.examQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-xl font-bold">{exam.title}</h1>
          <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">
            {answeredCount} / {exam.examQuestions.length} soru cevaplandı
          </p>
        </div>
        <ExamTimer durationMin={exam.durationMin} onExpire={finishExam} />
      </div>

      {/* Soru navigasyon şeridi */}
      <div className="mt-5 flex flex-wrap gap-2">
        {exam.examQuestions.map((eq, index) => {
          const isAnswered = !!answers[eq.question.id];
          const isCurrent = index === currentIndex;
          return (
            <button
              key={eq.id}
              onClick={() => setCurrentIndex(index)}
              className={`grid h-9 w-9 place-items-center rounded-full font-mono text-sm font-semibold transition ${
                isCurrent
                  ? "bg-beaker text-white"
                  : isAnswered
                  ? "bg-leaf/20 text-leaf"
                  : "bg-lab-paperLine/60 text-lab-inkMuted dark:bg-white/10 dark:text-lab-paper/60"
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Aktif soru */}
      <div className="mt-6 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
        <span className="font-mono text-xs font-semibold text-beaker-dark dark:text-beaker-light">
          Soru {currentIndex + 1} / {exam.examQuestions.length} · {currentEQ.question.points} puan
        </span>
        <div className="mt-3">
          <QuestionCard
            question={currentEQ.question}
            value={answers[currentEQ.question.id] ?? {}}
            onChange={(v) => handleAnswerChange(currentEQ.question.id, v)}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="rounded-full border border-lab-paperLine px-5 py-2.5 text-sm font-semibold disabled:opacity-40 dark:border-white/10"
        >
          ← Önceki
        </button>

        {currentIndex < exam.examQuestions.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
          >
            Sonraki →
          </button>
        ) : (
          <button
            onClick={finishExam}
            disabled={isFinishing}
            className="rounded-full bg-leaf px-6 py-2.5 text-sm font-semibold text-white hover:bg-leaf/90 disabled:opacity-60"
          >
            {isFinishing ? "Gönderiliyor..." : "Sınavı Bitir"}
          </button>
        )}
      </div>
    </div>
  );
}
