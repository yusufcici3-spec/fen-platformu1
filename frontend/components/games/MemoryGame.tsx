"use client";

import { useEffect, useMemo, useState } from "react";
import { sfx } from "@/lib/sound";
import { GlossaryTermRef } from "@/types/games";
import { GameShell } from "./GameShell";
import { GameResultScreen } from "./GameResultScreen";

interface MemoryCard {
  key: string;
  pairId: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function MemoryGame({ gameId, terms }: { gameId: string; terms: GlossaryTermRef[] }) {
  const usableTerms = useMemo(() => terms.slice(0, 6), [terms]);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedKeys, setFlippedKeys] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [startTime] = useState(() => Date.now());

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms]);

  function setup() {
    const deck: MemoryCard[] = usableTerms.flatMap((t) => [
      { key: `${t.id}-term`, pairId: t.id, label: t.term, isFlipped: false, isMatched: false },
      { key: `${t.id}-def`, pairId: t.id, label: t.definition, isFlipped: false, isMatched: false },
    ]);
    setCards(shuffle(deck));
    setFlippedKeys([]);
    setMoves(0);
    setIsFinished(false);
  }

  function handleFlip(card: MemoryCard) {
    if (isBusy || card.isFlipped || card.isMatched || flippedKeys.length === 2) return;
    sfx.click();

    const updated = cards.map((c) => (c.key === card.key ? { ...c, isFlipped: true } : c));
    setCards(updated);
    const nextFlipped = [...flippedKeys, card.key];
    setFlippedKeys(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsBusy(true);
      setMoves((m) => m + 1);
      const [firstKey, secondKey] = nextFlipped;
      const first = updated.find((c) => c.key === firstKey)!;
      const second = updated.find((c) => c.key === secondKey)!;

      setTimeout(() => {
        if (first.pairId === second.pairId) {
          sfx.correct();
          setCards((prev) =>
            prev.map((c) => (c.pairId === first.pairId ? { ...c, isMatched: true, isFlipped: true } : c))
          );
          setFlippedKeys([]);
          setIsBusy(false);
          setCards((prev) => {
            const allMatched = prev.every((c) => c.isMatched || c.pairId === first.pairId);
            if (allMatched) setTimeout(() => setIsFinished(true), 300);
            return prev;
          });
        } else {
          sfx.wrong();
          setCards((prev) => prev.map((c) => (c.key === firstKey || c.key === secondKey ? { ...c, isFlipped: false } : c)));
          setFlippedKeys([]);
          setIsBusy(false);
        }
      }, 700);
    }
  }

  if (usableTerms.length < 2) {
    return (
      <GameShell title="Hafıza Kartları">
        <p className="text-sm text-lab-inkMuted">Bu oyun için yeterli kavram verisi bulunamadı.</p>
      </GameShell>
    );
  }

  if (isFinished) {
    const durationSec = Math.round((Date.now() - startTime) / 1000);
    const score = Math.max(10, 100 - (moves - usableTerms.length) * 5);
    return (
      <GameShell title="Hafıza Kartları" score={score}>
        <GameResultScreen
          gameId={gameId}
          score={score}
          correctCount={usableTerms.length}
          wrongCount={Math.max(0, moves - usableTerms.length)}
          durationSec={durationSec}
          onPlayAgain={setup}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Hafıza Kartları" score={moves > 0 ? Math.max(0, 100 - moves * 2) : 100}>
      <p className="mb-4 text-sm text-lab-inkMuted dark:text-lab-paper/60">Hamle: {moves}</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {cards.map((card) => (
          <button
            key={card.key}
            onClick={() => handleFlip(card)}
            className={`flex h-24 items-center justify-center rounded-lg border p-2 text-center text-xs font-medium transition sm:h-28 sm:text-sm ${
              card.isMatched
                ? "border-leaf bg-leaf/10 text-leaf"
                : card.isFlipped
                ? "border-beaker bg-beaker/10"
                : "border-lab-paperLine bg-lab-inkSoft text-transparent hover:border-beaker/50 dark:border-white/10"
            }`}
          >
            {card.isFlipped || card.isMatched ? card.label : "❓"}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
