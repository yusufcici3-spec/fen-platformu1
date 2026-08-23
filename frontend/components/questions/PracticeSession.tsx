"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import type { PracticeAnswerResult, Question, QuestionOption } from "@/types/questions";

export interface PracticeScope {
  topicId?: string;
  unitId?: string;
  classLevel?: number;
  title?: string;
}

export interface PracticeSessionProps {
  scope?: PracticeScope;
}

function buildQuestionUrl(scope: PracticeScope, excludeIds: string[]) {
  const params = new URLSearchParams();
  if (scope.topicId) params.set("topicId", scope.topicId);
  else if (scope.unitId) params.set("unitId", scope.unitId);
  else if (scope.classLevel) params.set("classLevel", String(scope.classLevel));
  if (excludeIds.length > 0) params.set("excludeIds", excludeIds.join(","));
  return `/sorular/rastgele?${params.toString()}`;
}

function isChoiceQuestion(question: Question) {
  return ["MULTIPLE_CHOICE", "TRUE_FALSE", "MATCHING", "DRAG_DROP"].includes(question.type);
}

export default function PracticeSession({ scope = {} }: PracticeSessionProps) {
  const { accessToken } = useAuth();
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [result, setResult] = useState<PracticeAnswerResult | null>(null);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scopeKey = useMemo(
    () => `${scope.topicId ?? ""}|${scope.unitId ?? ""}|${scope.classLevel ?? ""}`,
    [scope.topicId, scope.unitId, scope.classLevel]
  );

  const loadQuestion = useCallback(
    async (ids: string[] = []) => {
      setIsLoading(true);
      setError(null);
      setResult(null);
      setSelectedOptionId(null);
      setAnswerText("");
      try {
        const response = await apiFetch<Question>(buildQuestionUrl(scope, ids), {
          token: accessToken,
        });
        setQuestion(response.data ?? null);
        if (!response.data) setError("Bu kapsamda henüz soru bulunmuyor.");
      } catch (err) {
        setQuestion(null);
        setError(err instanceof Error ? err.message : "Sorular yüklenemedi.");
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken, scope]
  );

  useEffect(() => {
    setExcludedIds([]);
    void loadQuestion([]);
  }, [scopeKey, loadQuestion]);

  async function submitAnswer() {
    if (!question || isSubmitting) return;
    if (isChoiceQuestion(question) && !selectedOptionId) {
      setError("Lütfen bir seçenek işaretleyin.");
      return;
    }
    if (!isChoiceQuestion(question) && !answerText.trim()) {
      setError("Lütfen cevabınızı yazın.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const response = await apiFetch<PracticeAnswerResult>(`/sorular/${question.id}/pratik-cevap`, {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({
          ...(selectedOptionId ? { selectedOptionId } : {}),
          ...(!selectedOptionId ? { answerText: answerText.trim() } : {}),
        }),
      });
      setResult(response.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cevap kontrol edilemedi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function nextQuestion() {
    if (!question) return;
    const nextIds = [...excludedIds, question.id];
    setExcludedIds(nextIds);
    await loadQuestion(nextIds);
  }

  if (isLoading) {
    return <div className="rounded-lg border p-6 text-sm text-muted-foreground">Soru yükleniyor...</div>;
  }

  if (!question) {
    return (
      <div className="rounded-lg border p-6 text-sm text-muted-foreground">
        {error ?? "Bu kapsamda henüz soru bulunmuyor."}
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-lg border p-6 shadow-sm bg-card text-card-foreground">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Soru</span>
        <span className="text-xs text-muted-foreground">{question.points} puan</span>
      </div>

      <div className="whitespace-pre-wrap text-base leading-7">{question.body}</div>

      {isChoiceQuestion(question) ? (
        <div className="space-y-2">
          {question.choiceOptions.map((option: QuestionOption) => (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                selectedOptionId === option.id ? "border-beaker bg-beaker/10" : "border-border"
              } ${result ? "cursor-default opacity-80" : ""}`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option.id}
                checked={selectedOptionId === option.id}
                onChange={() => setSelectedOptionId(option.id)}
                disabled={!!result}
              />
              <span>{option.text}</span>
            </label>
          ))}
        </div>
      ) : (
        <input
          value={answerText}
          onChange={(event) => setAnswerText(event.target.value)}
          disabled={!!result}
          placeholder="Cevabınızı yazın"
          className="w-full rounded-lg border bg-transparent px-3 py-2 outline-none focus:border-beaker"
        />
      )}

      {error && <p className="text-sm text-reaction-dark">{error}</p>}

      {result && (
        <div className={`rounded-lg p-4 text-sm ${result.isCorrect ? "bg-emerald-500/10" : "bg-amber-500/10"}`}>
          <p className="font-semibold">{result.isCorrect ? "Doğru cevap!" : "Yanlış cevap."}</p>
          {result.explanation && <p className="mt-1 whitespace-pre-wrap">{result.explanation}</p>}
          {!result.isCorrect && result.correctAnswer && (
            <p className="mt-2">Doğru cevap: <strong>{result.correctAnswer}</strong></p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {!result ? (
          <button
            type="button"
            onClick={submitAnswer}
            disabled={isSubmitting}
            className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isSubmitting ? "Kontrol ediliyor..." : "Cevabı kontrol et"}
          </button>
        ) : (
          <button
            type="button"
            onClick={nextQuestion}
            className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white"
          >
            Sonraki soru
          </button>
        )}
      </div>
    </div>
  );
}
