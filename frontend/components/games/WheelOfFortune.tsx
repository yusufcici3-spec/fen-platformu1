"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { checkGameAnswer } from "./checkGameAnswer";
import { sfx } from "@/lib/sound";
import { Question } from "@/types/questions";
import { GameShell } from "./GameShell";
import { GameResultScreen } from "./GameResultScreen";
import { QuestionCard, QuestionAnswerValue } from "@/components/questions/QuestionCard";

const SEGMENTS = [
  { label: "10 Puan", points: 10, color: "#0EA5A0" },
  { label: "20 Puan", points: 20, color: "#3B82C4" },
  { label: "5 Puan", points: 5, color: "#8B5CF6" },
  { label: "30 Puan", points: 30, color: "#F5A623" },
  { label: "15 Puan", points: 15, color: "#3F9D63" },
  { label: "Şanssız!", points: 0, color: "#C17E0C" },
  { label: "25 Puan", points: 25, color: "#5FD6D0" },
  { label: "ÇİFT PUAN", points: -2, color: "#F87171" }, // -2 sinyali: çarpan
];

const TOTAL_SPINS = 5;

export function WheelOfFortune({
  gameId,
  classLevel,
}: {
  gameId: string;
  topicId?: string | null;
  classLevel?: number | null;
}) {
  const { accessToken } = useAuth();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<QuestionAnswerValue>({});
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(TOTAL_SPINS);
  const [multiplier, setMultiplier] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const segmentAngle = 360 / SEGMENTS.length;

  function handleSpin() {
    if (isSpinning || spinsLeft <= 0) return;
    sfx.click();
    setIsSpinning(true);
    setSelectedSegment(null);
    setQuestion(null);
    setIsRevealed(false);

    const targetIndex = Math.floor(Math.random() * SEGMENTS.length);
    const extraSpins = 4 + Math.floor(Math.random() * 3);
    const targetRotation = rotation + extraSpins * 360 + (360 - targetIndex * segmentAngle - segmentAngle / 2);

    setRotation(targetRotation);

    setTimeout(async () => {
      setIsSpinning(false);
      setSelectedSegment(targetIndex);
      sfx.win();

      if (SEGMENTS[targetIndex].points === -2) {
        setMultiplier(2);
      } else {
        setMultiplier(1);
      }

      try {
        const params = new URLSearchParams();
        if (classLevel) params.set("classLevel", String(classLevel));
        const res = await apiFetch<Question>(`/sorular/rastgele?${params.toString()}`);
        setQuestion(res.data ?? null);
      } catch {
        setQuestion(null);
      }
    }, 3200);
  }

  async function handleAnswer() {
    if (!question || selectedSegment === null || !answer.selectedOptionId) return;

    let isCorrect = false;
    try {
      const result = await checkGameAnswer(question.id, accessToken, {
        selectedOptionId: answer.selectedOptionId,
      });
      isCorrect = result.isCorrect;
    } catch {
      isCorrect = false;
    }

    setIsRevealed(true);
    const basePoints = Math.max(0, SEGMENTS[selectedSegment].points);
    if (isCorrect) {
      sfx.correct();
      setScore((s) => s + basePoints * multiplier);
      setCorrectCount((c) => c + 1);
    } else {
      sfx.wrong();
      setWrongCount((w) => w + 1);
    }
  }

  function handleNextSpin() {
    const remaining = spinsLeft - 1;
    setSpinsLeft(remaining);
    setSelectedSegment(null);
    setQuestion(null);
    setAnswer({});
    setIsRevealed(false);
    setMultiplier(1);
    if (remaining <= 0) setIsFinished(true);
  }

  if (isFinished) {
    return (
      <GameShell title="Çarkıfelek" score={score}>
        <GameResultScreen
          gameId={gameId}
          score={score}
          correctCount={correctCount}
          wrongCount={wrongCount}
          onPlayAgain={() => {
            setScore(0);
            setCorrectCount(0);
            setWrongCount(0);
            setSpinsLeft(TOTAL_SPINS);
            setIsFinished(false);
            setRotation(0);
          }}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Çarkıfelek" score={score}>
      <p className="mb-4 text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Kalan çevirme: {spinsLeft} / {TOTAL_SPINS}
      </p>

      <div className="relative mx-auto h-64 w-64">
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 text-3xl">🔻</div>
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full transition-transform"
          style={{ transform: `rotate(${rotation}deg)`, transitionDuration: isSpinning ? "3.2s" : "0s", transitionTimingFunction: "cubic-bezier(0.2,0.8,0.2,1)" }}
        >
          {SEGMENTS.map((seg, i) => {
            const startAngle = (i * segmentAngle * Math.PI) / 180;
            const endAngle = ((i + 1) * segmentAngle * Math.PI) / 180;
            const x1 = 100 + 95 * Math.sin(startAngle);
            const y1 = 100 - 95 * Math.cos(startAngle);
            const x2 = 100 + 95 * Math.sin(endAngle);
            const y2 = 100 - 95 * Math.cos(endAngle);
            const midAngle = startAngle + (endAngle - startAngle) / 2;
            const labelX = 100 + 60 * Math.sin(midAngle);
            const labelY = 100 - 60 * Math.cos(midAngle);

            return (
              <g key={i}>
                <path d={`M100,100 L${x1},${y1} A95,95 0 0,1 ${x2},${y2} Z`} fill={seg.color} stroke="white" strokeWidth="1" />
                <text x={labelX} y={labelY} fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">
                  {seg.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-5 text-center">
        {!question && selectedSegment === null && (
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="rounded-full bg-beaker px-8 py-3 text-base font-bold text-white hover:bg-beaker-dark disabled:opacity-60"
          >
            {isSpinning ? "Çeviriliyor..." : "🎡 Çevir!"}
          </button>
        )}
        {selectedSegment !== null && !question && (
          <p className="text-sm text-lab-inkMuted">Soru yükleniyor...</p>
        )}
      </div>

      {question && (
        <div className="mt-6 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
          {multiplier === 2 && (
            <p className="mb-2 text-center text-sm font-bold text-reaction-dark">✨ ÇİFT PUAN! ✨</p>
          )}
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
                disabled={!answer.selectedOptionId}
                className="rounded-full bg-beaker px-6 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-50"
              >
                Cevapla
              </button>
            ) : (
              <button
                onClick={handleNextSpin}
                className="rounded-full bg-beaker px-6 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
              >
                {spinsLeft <= 1 ? "Bitir" : "Tekrar Çevir →"}
              </button>
            )}
          </div>
        </div>
      )}
    </GameShell>
  );
}
