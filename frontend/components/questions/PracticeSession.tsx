"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Question, PracticeAnswerResult } from "@/types/questions";
import { QuestionCard, QuestionAnswerValue } from "./QuestionCard";

interface PracticeScope {
  topicId?: string;
  unitId?: string;
  classLevel?: number;
  difficulty?: string;
  title: string;
}

/**
 * Konuya veya üniteye göre serbest soru çözme oturumu. Sorular tek tek
 * `/sorular/rastgele` uç noktasından çekilir (daha önce sorulanlar hariç
 * tutulur), cevap `/sorular/:id/pratik-cevap` ile sunucuda değerlendirilir.
 */
export function PracticeSession({ scope }: { scope: PracticeScope }) {
  const { user, accessToken } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<QuestionAnswerValue>({});
  const [result, setResult] = useState<PracticeAnswerResult | null>(null);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noMoreQuestions, setNoMoreQuestions] = useState(false);

  const loadNextQuestion = useCallback(
    async (excluded: string[]) => {
      setIsLoading(true);
      setResult(null);
      setAnswer({});
      setError(null);
      try {
        const params = new URLSearchParams();
        if (scope.topicId) params.set("topicId", scope.topicId);
        else if (scope.unitId) params.set("unitId", scope.unitId);
        else if (scope.classLevel) params.set("classLevel", String(scope.classLevel));
        if (scope.difficulty) params.set("difficulty", scope.difficulty);
        if (excluded.length > 0) params.set("excludeIds", excluded.join(","));

        const res = await apiFetch<Question>(`/sorular/rastgele?${params.toString()}`, {
          token: accessToken ?? undefined,
        });
        setQuestion(res.data ?? null);
        setIsFavorite(false);
      } catch {
        setNoMoreQuestions(true);
        setQuestion(null);
      } finally {
        setIsLoading(false);
      }
    },
    [scope, accessToken]
  );

  useEffect(() => {
    loadNextQuestion([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope.topicId, scope.unitId, scope.classLevel]);

  async function handleSubmit() {
    if (!question) return;
    try {
      const res = await apiFetch<PracticeAnswerResult>(`/sorular/${question.id}/pratik-cevap`, {
        method: "POST",
        token: accessToken ?? undefined,
        body: JSON.stringify(answer),
      });
      if (res.data) {
        setResult(res.data);
        setStats((s) => ({
          correct: s.correct + (res.data!.isCorrect ? 1 : 0),
          wrong: s.wrong + (res.data!.isCorrect ? 0 : 1),
          total: s.total + 1,
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cevap gönderilemedi.");
    }
  }

  async function handleNext() {
    const next = [...askedIds, question!.id];
    setAskedIds(next);
    await loadNextQuestion(next);
  }

  async function toggleFavorite() {
    if (!question || !accessToken) return;
    const res = await apiFetch<{ favorited: boolean }>(`/sorular/${question.id}/favori`, {
      method: "POST",
      token: accessToken,
    });
    setIsFavorite(res.data?.favorited ?? false);
  }

  const canAnswer = !!(answer.selectedOptionId || (answer.answerText && answer.answerText.trim().length > 0));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-lab-inkMuted dark:text-lab-paper/60">
        <span>{scope.title}</span>
        <span className="font-mono">
          ✓ {stats.correct} · ✕ {stats.wrong} / {stats.total}
        </span>
      </div>

      {isLoading ? (
        <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Soru yükleniyor...</p>
      ) : noMoreQuestions || !question ? (
        <div className="rounded-card border border-dashed border-lab-paperLine bg-white/60 p-10 text-center dark:border-white/10 dark:bg-white/5">
          <div className="text-4xl">🎉</div>
          <p className="mt-3 font-semibold">Bu kapsamdaki tüm soruları çözdün!</p>
          <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
            Toplam {stats.total} soru çözdün, {stats.correct} tanesi doğruydu.
          </p>
        </div>
      ) : (
        <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-lab-paperLine/60 px-2.5 py-1 text-xs font-medium dark:bg-white/10">
              {question.points} puan · {question.difficulty === "EASY" ? "Kolay" : question.difficulty === "HARD" ? "Zor" : "Orta"}
            </span>
            {user && (
              <button onClick={toggleFavorite} className="text-xl" aria-label="Favorilere ekle">
                {isFavorite ? "⭐" : "☆"}
              </button>
            )}
          </div>

          <QuestionCard
            question={question}
            value={answer}
            onChange={setAnswer}
            disabled={!!result}
            showCorrectness={!!result}
            isCorrect={result?.isCorrect}
          />

          {error && <p className="mt-3 text-sm text-reaction-dark">{error}</p>}

          {result && (
            <div className="mt-4 rounded-lg border border-lab-paperLine bg-lab-paper p-4 text-sm dark:border-white/10 dark:bg-lab-ink">
              <p>
                <strong>Doğru cevap:</strong> {result.correctAnswer}
              </p>
              {result.explanation && <p className="mt-1 text-lab-inkMuted dark:text-lab-paper/60">{result.explanation}</p>}
              {result.solution && (
                <div
                  className="prose prose-sm mt-2 max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: result.solution.explanationHtml }}
                />
              )}
            </div>
          )}

          <div className="mt-5 flex justify-end gap-2">
            {!result ? (
              <button
                onClick={handleSubmit}
                disabled={!canAnswer}
                className="rounded-full bg-beaker px-6 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-50"
              >
                Cevapla
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="rounded-full bg-beaker px-6 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
              >
                Sonraki Soru →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
