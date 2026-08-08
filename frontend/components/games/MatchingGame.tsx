"use client";

import { useEffect, useMemo, useState } from "react";
import { sfx } from "@/lib/sound";
import { GlossaryTermRef } from "@/types/games";
import { GameShell } from "./GameShell";
import { GameResultScreen } from "./GameResultScreen";

interface Card {
  key: string;
  label: string;
  termId: string;
  kind: "term" | "definition";
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function MatchingGame({ gameId, terms }: { gameId: string; terms: GlossaryTermRef[] }) {
  const usableTerms = useMemo(() => terms.slice(0, 6), [terms]);

  const [termCards, setTermCards] = useState<Card[]>([]);
  const [defCards, setDefCards] = useState<Card[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<Card | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongFlashId, setWrongFlashId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime] = useState(() => Date.now());

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms]);

  function setup() {
    setTermCards(shuffle(usableTerms.map((t) => ({ key: `term-${t.id}`, label: t.term, termId: t.id, kind: "term" as const }))));
    setDefCards(shuffle(usableTerms.map((t) => ({ key: `def-${t.id}`, label: t.definition, termId: t.id, kind: "definition" as const }))));
    setMatchedIds(new Set());
    setSelectedTerm(null);
    setAttempts(0);
    setIsFinished(false);
  }

  function handleTermClick(card: Card) {
    if (matchedIds.has(card.termId)) return;
    setSelectedTerm(card);
    sfx.click();
  }

  function handleDefClick(card: Card) {
    if (!selectedTerm || matchedIds.has(card.termId)) return;
    setAttempts((a) => a + 1);

    if (selectedTerm.termId === card.termId) {
      sfx.correct();
      const next = new Set(matchedIds);
      next.add(card.termId);
      setMatchedIds(next);
      setSelectedTerm(null);
      if (next.size === usableTerms.length) {
        setTimeout(() => setIsFinished(true), 400);
      }
    } else {
      sfx.wrong();
      setWrongFlashId(card.key);
      setTimeout(() => setWrongFlashId(null), 400);
      setSelectedTerm(null);
    }
  }

  if (usableTerms.length < 2) {
    return (
      <GameShell title="Kavram Eşleştirme">
        <p className="text-sm text-lab-inkMuted">Bu oyun için yeterli kavram verisi bulunamadı.</p>
      </GameShell>
    );
  }

  if (isFinished) {
    const durationSec = Math.round((Date.now() - startTime) / 1000);
    const score = Math.max(10, 100 - (attempts - usableTerms.length) * 10);
    return (
      <GameShell title="Kavram Eşleştirme" score={score}>
        <GameResultScreen
          gameId={gameId}
          score={score}
          correctCount={usableTerms.length}
          wrongCount={Math.max(0, attempts - usableTerms.length)}
          durationSec={durationSec}
          onPlayAgain={setup}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Kavram Eşleştirme" score={matchedIds.size * 10}>
      <p className="mb-4 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Önce bir kavrama, sonra doğru tanımına tıkla.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          {termCards.map((card) => (
            <button
              key={card.key}
              onClick={() => handleTermClick(card)}
              disabled={matchedIds.has(card.termId)}
              className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition ${
                matchedIds.has(card.termId)
                  ? "border-leaf bg-leaf/10 text-leaf line-through"
                  : selectedTerm?.key === card.key
                  ? "border-beaker bg-beaker/10"
                  : "border-lab-paperLine hover:border-beaker/50 dark:border-white/10"
              }`}
            >
              {card.label}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {defCards.map((card) => (
            <button
              key={card.key}
              onClick={() => handleDefClick(card)}
              disabled={matchedIds.has(card.termId)}
              className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition ${
                matchedIds.has(card.termId)
                  ? "border-leaf bg-leaf/10 text-leaf line-through"
                  : wrongFlashId === card.key
                  ? "border-reaction bg-reaction/10"
                  : "border-lab-paperLine hover:border-beaker/50 dark:border-white/10"
              }`}
            >
              {card.label}
            </button>
          ))}
        </div>
      </div>
    </GameShell>
  );
}
