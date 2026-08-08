"use client";

import { useEffect, useMemo, useState } from "react";
import { sfx } from "@/lib/sound";
import { GlossaryTermRef } from "@/types/games";
import { GameShell } from "./GameShell";
import { GameResultScreen } from "./GameResultScreen";

const GRID_SIZE = 10;
const TR_LETTERS = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ";

function normalizeWord(word: string): string {
  return word
    .toLocaleUpperCase("tr")
    .replace(/[^A-ZÇĞİÖŞÜ]/g, "")
    .slice(0, GRID_SIZE);
}

interface Placement {
  word: string;
  cells: [number, number][];
  found: boolean;
}

function buildGrid(words: string[]): { grid: string[][]; placements: Placement[] } {
  const grid: string[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));
  const placements: Placement[] = [];
  const directions = [
    [0, 1], // sağa
    [1, 0], // aşağı
    [1, 1], // çapraz aşağı-sağ
  ];

  for (const word of words) {
    let placed = false;
    for (let attempt = 0; attempt < 40 && !placed; attempt++) {
      const [dr, dc] = directions[Math.floor(Math.random() * directions.length)];
      const maxRow = dr === 1 ? GRID_SIZE - word.length : GRID_SIZE - 1;
      const maxCol = dc === 1 ? GRID_SIZE - word.length : GRID_SIZE - 1;
      const startRow = Math.floor(Math.random() * (maxRow + 1));
      const startCol = Math.floor(Math.random() * (maxCol + 1));

      const cells: [number, number][] = [];
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const r = startRow + dr * i;
        const c = startCol + dc * i;
        if (grid[r][c] !== "" && grid[r][c] !== word[i]) {
          fits = false;
          break;
        }
        cells.push([r, c]);
      }

      if (fits) {
        cells.forEach(([r, c], i) => (grid[r][c] = word[i]));
        placements.push({ word, cells, found: false });
        placed = true;
      }
    }
  }

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!grid[r][c]) grid[r][c] = TR_LETTERS[Math.floor(Math.random() * TR_LETTERS.length)];
    }
  }

  return { grid, placements };
}

export function WordSearchGame({ gameId, terms }: { gameId: string; terms: GlossaryTermRef[] }) {
  const words = useMemo(
    () =>
      [...new Set(terms.map((t) => normalizeWord(t.term)).filter((w) => w.length >= 3 && w.length <= GRID_SIZE))].slice(
        0,
        6
      ),
    [terms]
  );

  const [board, setBoard] = useState<{ grid: string[][]; placements: Placement[] } | null>(null);
  const [selection, setSelection] = useState<[number, number][]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [isFinished, setIsFinished] = useState(false);
  const [startTime] = useState(() => Date.now());

  useEffect(() => {
    if (words.length >= 2) setBoard(buildGrid(words));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms]);

  function cellKey(r: number, c: number) {
    return `${r}-${c}`;
  }

  function handleCellDown(r: number, c: number) {
    setIsDragging(true);
    setSelection([[r, c]]);
  }

  function handleCellEnter(r: number, c: number) {
    if (!isDragging || selection.length === 0) return;
    const [startR, startC] = selection[0];
    const dr = Math.sign(r - startR);
    const dc = Math.sign(c - startC);
    const length = Math.max(Math.abs(r - startR), Math.abs(c - startC)) + 1;
    const path: [number, number][] = Array.from({ length }, (_, i) => [startR + dr * i, startC + dc * i]);
    setSelection(path);
  }

  function handleCellUp() {
    if (!board) return;
    setIsDragging(false);

    const selectedWord = selection.map(([r, c]) => board.grid[r][c]).join("");
    const reversedWord = selectedWord.split("").reverse().join("");

    const match = board.placements.find(
      (p) => !p.found && (p.word === selectedWord || p.word === reversedWord)
    );

    if (match) {
      sfx.correct();
      match.found = true;
      const nextFound = new Set(foundWords);
      nextFound.add(match.word);
      setFoundWords(nextFound);
      if (nextFound.size === board.placements.length) {
        setTimeout(() => setIsFinished(true), 300);
      }
    }
    setSelection([]);
  }

  if (!board) {
    return (
      <GameShell title="Kelime Avı">
        <p className="text-sm text-lab-inkMuted">Bu oyun için yeterli kavram verisi bulunamadı.</p>
      </GameShell>
    );
  }

  if (isFinished) {
    const durationSec = Math.round((Date.now() - startTime) / 1000);
    const score = Math.max(20, 100 - durationSec);
    return (
      <GameShell title="Kelime Avı" score={score}>
        <GameResultScreen
          gameId={gameId}
          score={score}
          correctCount={board.placements.length}
          wrongCount={0}
          durationSec={durationSec}
          onPlayAgain={() => {
            setBoard(buildGrid(words));
            setFoundWords(new Set());
            setIsFinished(false);
          }}
        />
      </GameShell>
    );
  }

  const selectedSet = new Set(selection.map(([r, c]) => cellKey(r, c)));

  return (
    <GameShell title="Kelime Avı" score={foundWords.size * 15}>
      <p className="mb-3 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Kelimeleri bulmak için harfler üzerinde sürükle. Bulunan: {foundWords.size} / {board.placements.length}
      </p>

      <div
        className="mx-auto grid w-fit select-none gap-1 rounded-card border border-lab-paperLine bg-white p-3 dark:border-white/10 dark:bg-lab-inkSoft"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0,1fr))` }}
        onMouseUp={handleCellUp}
        onMouseLeave={() => isDragging && handleCellUp()}
      >
        {board.grid.map((row, r) =>
          row.map((letter, c) => (
            <button
              key={cellKey(r, c)}
              onMouseDown={() => handleCellDown(r, c)}
              onMouseEnter={() => handleCellEnter(r, c)}
              className={`grid h-7 w-7 place-items-center rounded text-xs font-bold sm:h-8 sm:w-8 sm:text-sm ${
                selectedSet.has(cellKey(r, c)) ? "bg-beaker text-white" : "hover:bg-lab-paperLine/60 dark:hover:bg-white/10"
              }`}
            >
              {letter}
            </button>
          ))
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {board.placements.map((p) => (
          <span
            key={p.word}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              foundWords.has(p.word) ? "bg-leaf/10 text-leaf line-through" : "bg-lab-paperLine/60 dark:bg-white/10"
            }`}
          >
            {p.word}
          </span>
        ))}
      </div>
    </GameShell>
  );
}
