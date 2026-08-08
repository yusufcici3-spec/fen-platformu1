"use client";

import { useEffect, useMemo, useState } from "react";
import { sfx } from "@/lib/sound";
import { GlossaryTermRef } from "@/types/games";
import { GameShell } from "./GameShell";
import { GameResultScreen } from "./GameResultScreen";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function DragDropGame({ gameId, terms }: { gameId: string; terms: GlossaryTermRef[] }) {
  const usableTerms = useMemo(() => terms.slice(0, 5), [terms]);
  const [pool, setPool] = useState<GlossaryTermRef[]>([]);
  const [placements, setPlacements] = useState<Record<string, string>>({}); // definitionTermId -> droppedTermId
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [draggedId, setDraggedId] = useState<string | null>(null);

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms]);

  function setup() {
    setPool(shuffle(usableTerms));
    setPlacements({});
    setAttempts(0);
    setIsFinished(false);
  }

  function handleDrop(targetTermId: string) {
    if (!draggedId || placements[targetTermId]) return;
    setAttempts((a) => a + 1);

    if (draggedId === targetTermId) {
      sfx.correct();
      const next = { ...placements, [targetTermId]: draggedId };
      setPlacements(next);
      setPool((prev) => prev.filter((t) => t.id !== draggedId));
      if (Object.keys(next).length === usableTerms.length) {
        setTimeout(() => setIsFinished(true), 300);
      }
    } else {
      sfx.wrong();
      setWrongFlash(targetTermId);
      setTimeout(() => setWrongFlash(null), 400);
    }
    setDraggedId(null);
  }

  // Mobil/dokunmatik alternatif: tıkla-yerleştir
  const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null);
  function handleTapPlace(targetTermId: string) {
    if (!selectedPoolId || placements[targetTermId]) return;
    setDraggedId(selectedPoolId);
    handleDrop(targetTermId);
    setSelectedPoolId(null);
  }

  if (usableTerms.length < 2) {
    return (
      <GameShell title="Sürükle-Bırak Etkinlikleri">
        <p className="text-sm text-lab-inkMuted">Bu oyun için yeterli kavram verisi bulunamadı.</p>
      </GameShell>
    );
  }

  if (isFinished) {
    const durationSec = Math.round((Date.now() - startTime) / 1000);
    const score = Math.max(20, 100 - (attempts - usableTerms.length) * 10);
    return (
      <GameShell title="Sürükle-Bırak Etkinlikleri" score={score}>
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
    <GameShell title="Sürükle-Bırak Etkinlikleri" score={Object.keys(placements).length * 20}>
      <p className="mb-4 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Kavramları sürükleyip doğru tanımın üzerine bırak (mobilde: önce kavrama sonra tanıma dokun).
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {pool.map((t) => (
          <div
            key={t.id}
            draggable
            onDragStart={() => setDraggedId(t.id)}
            onClick={() => setSelectedPoolId(t.id === selectedPoolId ? null : t.id)}
            className={`cursor-grab rounded-full border px-4 py-2 text-sm font-semibold active:cursor-grabbing ${
              selectedPoolId === t.id ? "border-beaker bg-beaker/10" : "border-lab-paperLine dark:border-white/10"
            }`}
          >
            {t.term}
          </div>
        ))}
        {pool.length === 0 && <p className="text-sm text-leaf">Tüm kavramlar yerleştirildi! 🎉</p>}
      </div>

      <div className="space-y-2">
        {usableTerms.map((t) => (
          <div
            key={t.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(t.id)}
            onClick={() => handleTapPlace(t.id)}
            className={`flex min-h-[3.5rem] items-center gap-3 rounded-lg border-2 border-dashed px-4 py-3 text-sm transition ${
              placements[t.id]
                ? "border-leaf bg-leaf/10"
                : wrongFlash === t.id
                ? "border-reaction bg-reaction/10"
                : "border-lab-paperLine dark:border-white/10"
            }`}
          >
            {placements[t.id] && (
              <span className="rounded-full bg-leaf px-2 py-0.5 text-xs font-bold text-white">
                {usableTerms.find((x) => x.id === placements[t.id])?.term}
              </span>
            )}
            <span className="flex-1">{t.definition}</span>
          </div>
        ))}
      </div>
    </GameShell>
  );
}
