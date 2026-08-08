"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Question, PracticeAnswerResult } from "@/types/questions";
import { QuestionCard, QuestionAnswerValue } from "./QuestionCard";

/** Favori veya yanlış yapılan soruların listesini gösterir; her biri açılıp çözülebilir. */
export function QuestionReviewList({
  questions,
  emptyMessage,
}: {
  questions: (Question & { wrongCount?: number })[];
  emptyMessage: string;
}) {
  const { accessToken } = useAuth();
  const [openId, setOpenId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswerValue>>({});
  const [results, setResults] = useState<Record<string, PracticeAnswerResult>>({});

  async function handleSubmit(questionId: string) {
    try {
      const res = await apiFetch<PracticeAnswerResult>(`/sorular/${questionId}/pratik-cevap`, {
        method: "POST",
        token: accessToken ?? undefined,
        body: JSON.stringify(answers[questionId] ?? {}),
      });
      if (res.data) setResults((prev) => ({ ...prev, [questionId]: res.data! }));
    } catch {
      // sessizce yok say
    }
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-lab-paperLine bg-white/60 p-10 text-center dark:border-white/10 dark:bg-white/5">
        <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {questions.map((q) => {
        const isOpen = openId === q.id;
        const result = results[q.id];

        return (
          <div key={q.id} className="rounded-card border border-lab-paperLine bg-white dark:border-white/10 dark:bg-lab-inkSoft">
            <button
              onClick={() => setOpenId(isOpen ? null : q.id)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left"
            >
              {q.topic && (
                <span className="rounded-full bg-beaker/10 px-2.5 py-1 text-xs font-semibold text-beaker-dark dark:text-beaker-light">
                  {q.topic.title}
                </span>
              )}
              <span className="flex-1 truncate text-sm">{q.body}</span>
              {q.wrongCount !== undefined && (
                <span className="text-xs text-reaction-dark">{q.wrongCount}× yanlış</span>
              )}
              <span className="text-lab-inkMuted">{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div className="border-t border-lab-paperLine/70 p-5 dark:border-white/10">
                <QuestionCard
                  question={q}
                  value={answers[q.id] ?? {}}
                  onChange={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
                  disabled={!!result}
                  showCorrectness={!!result}
                  isCorrect={result?.isCorrect}
                />
                {!result ? (
                  <button
                    onClick={() => handleSubmit(q.id)}
                    className="mt-4 rounded-full bg-beaker px-5 py-2 text-sm font-semibold text-white hover:bg-beaker-dark"
                  >
                    Cevapla
                  </button>
                ) : (
                  <div className="mt-4 rounded-lg border border-lab-paperLine bg-lab-paper p-4 text-sm dark:border-white/10 dark:bg-lab-ink">
                    <strong>Doğru cevap:</strong> {result.correctAnswer}
                    {result.explanation && <p className="mt-1 text-lab-inkMuted dark:text-lab-paper/60">{result.explanation}</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
