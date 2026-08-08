"use client";

import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "@/lib/api";
import { sfx } from "@/lib/sound";
import { Question } from "@/types/questions";
import { GameShell } from "./GameShell";
import { GameResultScreen } from "./GameResultScreen";
import { QuestionCard, QuestionAnswerValue } from "@/components/questions/QuestionCard";

const NODE_COUNT = 6;
const NODE_ICONS = ["🚀", "🪐", "🌋", "🧬", "⚗️", "🏆"];

export function ScienceAdventure({
  gameId,
  topicId,
  classLevel,
}: {
  gameId: string;
  topicId?: string | null;
  classLevel?: number | null;
}) {
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<QuestionAnswerValue>({});
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const loadQuestionFor = useCallback(
    async (excluded: string[]) => {
      const params = new URLSearchParams();
      if (topicId) params.set("topicId", topicId);
      else if (classLevel) params.set("classLevel", String(classLevel));
      if (excluded.length > 0) params.set("excludeIds", excluded.join(","));
      const res = await apiFetch<Question>(`/sorular/rastgele?${params.toString()}`);
      setQuestion(res.data ?? null);
    },
    [topicId, classLevel]
  );

  function openNode(index: number) {
    if (index > unlockedIndex) return;
    sfx.click();
    setActiveIndex(index);
    setAnswer({});
    setIsRevealed(false);
    loadQuestionFor(askedIds);
  }

  function handleAnswer() {
    if (!question) return;
    const correctOption = question.choiceOptions.find((o) => o.isCorrect);
    const isCorrect = !!correctOption && answer.selectedOptionId === correctOption.id;
    setIsRevealed(true);

    if (isCorrect) {
      sfx.correct();
      setScore((s) => s + 15);
      setCorrectCount((c) => c + 1);
    } else {
      sfx.wrong();
      setWrongCount((w) => w + 1);
    }
  }

  function handleContinue() {
    const next = [...askedIds, question!.id];
    setAskedIds(next);

    if (activeIndex === unlockedIndex && unlockedIndex < NODE_COUNT - 1) {
      setUnlockedIndex(unlockedIndex + 1);
    }

    setActiveIndex(null);
    setQuestion(null);

    if (activeIndex === NODE_COUNT - 1) {
      setIsFinished(true);
    }
  }

  if (isFinished) {
    return (
      <GameShell title="Bilim Macerası" score={score}>
        <GameResultScreen
          gameId={gameId}
          score={score}
          correctCount={correctCount}
          wrongCount={wrongCount}
          onPlayAgain={() => {
            setUnlockedIndex(0);
            setActiveIndex(null);
            setScore(0);
            setCorrectCount(0);
            setWrongCount(0);
            setAskedIds([]);
            setIsFinished(false);
          }}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Bilim Macerası" score={score}>
      <p className="mb-5 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Her bölümü sırasıyla tamamlayarak maceranın sonuna ulaş!
      </p>

      <div className="flex items-center justify-between">
        {Array.from({ length: NODE_COUNT }).map((_, i) => (
          <div key={i} className="flex flex-1 items-center">
            <button
              onClick={() => openNode(i)}
              disabled={i > unlockedIndex}
              className={`grid h-12 w-12 flex-shrink-0 place-items-center rounded-full text-xl transition sm:h-14 sm:w-14 ${
                i < unlockedIndex
                  ? "bg-leaf text-white"
                  : i === unlockedIndex
                  ? "animate-pulse bg-beaker text-white"
                  : "bg-lab-paperLine text-lab-inkMuted dark:bg-white/10"
              }`}
            >
              {NODE_ICONS[i]}
            </button>
            {i < NODE_COUNT - 1 && (
              <div className={`h-1 flex-1 ${i < unlockedIndex ? "bg-leaf" : "bg-lab-paperLine dark:bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="mt-6 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
          <p className="mb-3 font-mono text-xs font-semibold text-beaker-dark dark:text-beaker-light">
            Bölüm {activeIndex + 1} / {NODE_COUNT}
          </p>
          {!question ? (
            <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
          ) : (
            <>
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
                    onClick={handleAnswer}
                    disabled={!answer.selectedOptionId && !answer.answerText}
                    className="rounded-full bg-beaker px-6 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-50"
                  >
                    Cevapla
                  </button>
                ) : (
                  <button
                    onClick={handleContinue}
                    className="rounded-full bg-beaker px-6 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
                  >
                    Devam Et →
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </GameShell>
  );
}
