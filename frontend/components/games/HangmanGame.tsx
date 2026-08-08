"use client";

import { useEffect, useMemo, useState } from "react";
import { sfx } from "@/lib/sound";
import { GlossaryTermRef } from "@/types/games";
import { GameShell } from "./GameShell";
import { GameResultScreen } from "./GameResultScreen";

const MAX_WRONG = 6;
const ALPHABET = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split("");
const HANGMAN_STAGES = ["🙂", "😐", "😕", "😟", "😖", "😣", "💀"];

function pickWord(terms: GlossaryTermRef[]): GlossaryTermRef | null {
  const candidates = terms.filter((t) => /^[A-Za-zÇĞİÖŞÜçğıöşü\s]{3,14}$/.test(t.term));
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function HangmanGame({ gameId, terms }: { gameId: string; terms: GlossaryTermRef[] }) {
  const [current, setCurrent] = useState<GlossaryTermRef | null>(null);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [won, setWon] = useState(false);
  const [startTime, setStartTime] = useState(() => Date.now());

  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms]);

  function setup() {
    setCurrent(pickWord(terms));
    setGuessed(new Set());
    setWrongCount(0);
    setIsFinished(false);
    setWon(false);
    setStartTime(Date.now());
  }

  const wordLetters = useMemo(
    () => (current ? current.term.toLocaleUpperCase("tr").split("") : []),
    [current]
  );

  function handleGuess(letter: string) {
    if (guessed.has(letter) || isFinished) return;
    const nextGuessed = new Set(guessed);
    nextGuessed.add(letter);
    setGuessed(nextGuessed);

    const isInWord = wordLetters.includes(letter);
    if (isInWord) {
      sfx.correct();
      const allRevealed = wordLetters.every((l) => l === " " || nextGuessed.has(l));
      if (allRevealed) {
        setWon(true);
        setIsFinished(true);
      }
    } else {
      sfx.wrong();
      const nextWrong = wrongCount + 1;
      setWrongCount(nextWrong);
      if (nextWrong >= MAX_WRONG) setIsFinished(true);
    }
  }

  if (!current) {
    return (
      <GameShell title="Adam Asmaca">
        <p className="text-sm text-lab-inkMuted">Bu oyun için uygun kavram bulunamadı.</p>
      </GameShell>
    );
  }

  if (isFinished) {
    const durationSec = Math.round((Date.now() - startTime) / 1000);
    const score = won ? Math.max(20, 100 - wrongCount * 10) : 0;
    return (
      <GameShell title="Adam Asmaca" score={score}>
        {!won && (
          <p className="mb-3 text-center text-sm text-reaction-dark">
            Kelime: <strong>{current.term}</strong>
          </p>
        )}
        <GameResultScreen
          gameId={gameId}
          score={score}
          correctCount={won ? 1 : 0}
          wrongCount={won ? 0 : 1}
          durationSec={durationSec}
          onPlayAgain={setup}
        />
      </GameShell>
    );
  }

  return (
    <GameShell title="Adam Asmaca" score={Math.max(0, 100 - wrongCount * 15)}>
      <div className="text-center">
        <div className="text-6xl">{HANGMAN_STAGES[wrongCount]}</div>
        <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">
          Yanlış hak: {MAX_WRONG - wrongCount}
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {wordLetters.map((letter, i) => (
            <span
              key={i}
              className="grid h-10 w-8 place-items-center border-b-2 border-lab-ink font-mono text-lg font-bold dark:border-lab-paper"
            >
              {letter === " " ? "" : guessed.has(letter) ? letter : ""}
            </span>
          ))}
        </div>

        {current.definition && (
          <p className="mt-4 text-sm italic text-lab-inkMuted dark:text-lab-paper/60">İpucu: {current.definition}</p>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessed.has(letter)}
              className={`h-9 w-9 rounded-lg text-sm font-bold transition ${
                !guessed.has(letter)
                  ? "border border-lab-paperLine hover:border-beaker hover:bg-beaker/10 dark:border-white/10"
                  : wordLetters.includes(letter)
                  ? "bg-leaf/20 text-leaf"
                  : "bg-reaction/20 text-reaction-dark"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </GameShell>
  );
}
