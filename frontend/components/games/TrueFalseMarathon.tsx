"use client";

import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import { sfx } from "@/lib/sound";
import { Question } from "@/types/questions";
import { GameShell } from "./GameShell";
import { GameResultScreen } from "./GameResultScreen";

const SECONDS_PER_QUESTION = 8;

export function TrueFalseMarathon({
  gameId,
  topicId,
  classLevel,
}: {
  gameId: string;
  topicId?: string | null;
  classLevel?: number | null;
}) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [startTime] = useState(() => Date.now());

  const loadQuestion = useCallback(
    async (excluded: string[]) => {
      setIsLoading(true);
      setSecondsLeft(SECONDS_PER_QUESTION);
      try {
        const params = new URLSearchParams({ type: "TRUE_FALSE" });
        if (topicId) params.set("topicId", topicId);
        else if (classLevel) params.set("classLevel", String(classLevel));
        if (excluded.length > 0) params.set("excludeIds", excluded.join(","));
        const res = await apiFetch<Question>(`/sorular/rastgele?${params.toString()}`);
        setQuestion(res.data ?? null);
      } catch {
        // Doğru/Yanlış tipinde soru kalmadıysa maratonu bitir
        setIsFinished(true);
      } finally {
        setIsLoading(false);
      }
    },
    [topicId, classLevel]
  );

  useEffect(() => {
    loadQuestion([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFinished || isLoading || flash) return;
    if (secondsLeft <= 0) {
      handleAnswer(null);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, isFinished, isLoading, flash]);

  function handleAnswer(chosenOptionId: string | null) {
    if (!question) return;
    const correctOption = question.choiceOptions.find((o) => o.isCorrect);
    const isCorrect = !!chosenOptionId && chosenOptionId === correctOption?.id;

    if (isCorrect) {
      sfx.correct();
      setFlash("correct");
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore((s) => s + 10 * Math.min(5, 1 + Math.floor(newStreak / 3)));
      setCorrectCount((c) => c + 1);
    } else {
      sfx.wrong();
      setFlash("wrong");
      setStreak(0);
      setWrongCount((w) => w + 1);
    }

    setTimeout(async () => {
      setFlash(null);
      if (!isCorrect && wrongCount + 1 >= 3) {
        setIsFinished(true);
        return;
      }
      const next = [...askedIds, question.id];
      setAskedIds(next);
      await loadQuestion(next);
    }, 600);
  }

  if (isFinished) {
    const durationSec = Math.round((Date.now() - startTime) / 1000);
    return (
      <GameShell title="Doğru-Yanlış Maratonu" score={score}>
        <GameResultScreen
          gameId={gameId}
          score={score}
          correctCount={correctCount}
          wrongCount={wrongCount}
          durationSec={durationSec}
          onPlayAgain={() => {
            setScore(0);
            setStreak(0);
            setCorrectCount(0);
            setWrongCount(0);
            setAskedIds([]);
            setIsFinished(false);
            loadQuestion([]);
          }}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Doğru-Yanlış Maratonu" score={score} secondsLeft={secondsLeft}>
      <p className="mb-3 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        🔥 Seri: {streak} · 3 yanlışta maraton biter
      </p>

      {isLoading || !question ? (
        <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
      ) : (
        <div
          className={`rounded-card border p-8 text-center transition-colors ${
            flash === "correct"
              ? "border-leaf bg-leaf/10"
              : flash === "wrong"
              ? "border-reaction bg-reaction/10"
              : "border-lab-paperLine bg-white dark:border-white/10 dark:bg-lab-inkSoft"
          }`}
        >
          <p className="text-lg font-medium">{question.body}</p>

          <div className="mt-6 flex justify-center gap-4">
            {question.choiceOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.id)}
                disabled={!!flash}
                className="rounded-full bg-beaker px-8 py-3 text-base font-bold text-white hover:bg-beaker-dark disabled:opacity-60"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </GameShell>
  );
}
