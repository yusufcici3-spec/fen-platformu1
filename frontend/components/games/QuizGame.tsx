"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { checkGameAnswer } from "./checkGameAnswer";
import { sfx } from "@/lib/sound";
import { Question } from "@/types/questions";
import { GameShell } from "./GameShell";
import { GameResultScreen } from "./GameResultScreen";
import { QuestionCard, QuestionAnswerValue } from "@/components/questions/QuestionCard";

const TOTAL_ROUNDS = 8;
const SECONDS_PER_QUESTION = 20;

export function QuizGame({
  gameId,
  topicId,
  classLevel,
}: {
  gameId: string;
  topicId?: string | null;
  classLevel?: number | null;
}) {
  const { accessToken } = useAuth();
  const [round, setRound] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [answer, setAnswer] = useState<QuestionAnswerValue>({});
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_QUESTION);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadQuestion = useCallback(
    async (excluded: string[]) => {
      setIsLoading(true);
      setIsRevealed(false);
      setAnswer({});
      setSecondsLeft(SECONDS_PER_QUESTION);
      try {
        const params = new URLSearchParams();
        if (topicId) params.set("topicId", topicId);
        else if (classLevel) params.set("classLevel", String(classLevel));
        if (excluded.length > 0) params.set("excludeIds", excluded.join(","));
        const res = await apiFetch<Question>(`/sorular/rastgele?${params.toString()}`);
        setQuestion(res.data ?? null);
      } catch {
        setQuestion(null);
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
    if (isRevealed || isFinished || isLoading) return;
    if (secondsLeft <= 0) {
      handleReveal(false);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, isRevealed, isFinished, isLoading]);

  async function handleReveal(userAnswered: boolean) {
    if (!question) return;

    let isCorrect = false;
    if (userAnswered && answer.selectedOptionId) {
      try {
        const result = await checkGameAnswer(question.id, accessToken, {
          selectedOptionId: answer.selectedOptionId,
        });
        isCorrect = result.isCorrect;
      } catch {
        isCorrect = false;
      }
    }

    setIsRevealed(true);
    if (isCorrect) {
      sfx.correct();
      setScore((s) => s + 10 + Math.max(0, secondsLeft));
      setCorrectCount((c) => c + 1);
    } else {
      sfx.wrong();
      setWrongCount((w) => w + 1);
    }
  }

  async function handleNext() {
    const nextRound = round + 1;
    if (nextRound >= TOTAL_ROUNDS) {
      setIsFinished(true);
      return;
    }
    setRound(nextRound);
    const next = [...askedIds, question!.id];
    setAskedIds(next);
    await loadQuestion(next);
  }

  function handleRestart() {
    setRound(0);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setIsFinished(false);
    setAskedIds([]);
    loadQuestion([]);
  }

  if (isFinished) {
    return (
      <GameShell title="Fen Bilgisi Yarışması" score={score}>
        <GameResultScreen
          gameId={gameId}
          score={score}
          correctCount={correctCount}
          wrongCount={wrongCount}
          onPlayAgain={handleRestart}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Fen Bilgisi Yarışması" score={score} secondsLeft={isRevealed ? undefined : secondsLeft}>
      <p className="mb-3 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Soru {round + 1} / {TOTAL_ROUNDS}
      </p>

      {isLoading || !question ? (
        <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
      ) : (
        <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
          <QuestionCard
            question={question}
            value={answer}
            onChange={setAnswer}
            disabled={isRevealed}
            showCorrectness={isRevealed}
          />

          <div className="mt-5 flex justify-end">
            {!isRevealed ? (
              <button
                onClick={() => handleReveal(true)}
                disabled={!answer.selectedOptionId && !answer.answerText}
                className="rounded-full bg-beaker px-6 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-50"
              >
                Cevapla
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="rounded-full bg-beaker px-6 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
              >
                {round + 1 >= TOTAL_ROUNDS ? "Bitir" : "Sonraki →"}
              </button>
            )}
          </div>
        </div>
      )}
    </GameShell>
  );
}
