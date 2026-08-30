"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { Game } from "@/types/games";
import { QuizGame } from "@/components/games/QuizGame";
import { MatchingGame } from "@/components/games/MatchingGame";
import { MemoryGame } from "@/components/games/MemoryGame";
import { WordSearchGame } from "@/components/games/WordSearchGame";
import { HangmanGame } from "@/components/games/HangmanGame";
import { DragDropGame } from "@/components/games/DragDropGame";
import { TrueFalseMarathon } from "@/components/games/TrueFalseMarathon";
import { WheelOfFortune } from "@/components/games/WheelOfFortune";
import { ScienceAdventure } from "@/components/games/ScienceAdventure";
import { BadgeHunt } from "@/components/games/BadgeHunt";
import { ScienceLadder } from "@/components/games/ScienceLadder";

export default function PlayGamePage({ params }: { params: { slug: string } }) {
  const [game, setGame] = useState<Game | null | undefined>(undefined);

  useEffect(() => {
    apiFetch<Game>(`/oyunlar/slug/${params.slug}`)
      .then((res) => setGame(res.data))
      .catch(() => setGame(null));
  }, [params.slug]);

  if (game === undefined) {
    return <p className="p-10 text-center text-sm text-lab-inkMuted">Yükleniyor...</p>;
  }

  if (!game) {
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-lab-inkMuted">Oyun bulunamadı.</p>
        <Link href="/oyunlar" className="mt-2 inline-block text-sm font-semibold text-beaker hover:underline">
          ← Oyunlara Dön
        </Link>
      </div>
    );
  }

  const terms = game.topic?.glossaryTerms ?? [];

  // Bilim Basamakları, mevcut QUIZ türü altyapısını kullanır ancak slug üzerinden
  // tamamen özgün oyun ekranına yönlendirilir; yeni veritabanı enum/migration gerekmez.
  const normalizedTitle = game.title.toLocaleLowerCase("tr-TR");
  if (
    game.slug === "bilim-basamaklari" ||
    game.slug === "fen-bilim-basamaklari" ||
    normalizedTitle.includes("bilim basamakları")
  ) {
    return <ScienceLadder gameId={game.id} topicId={game.topicId} classLevel={game.classLevel} />;
  }

  switch (game.type) {
    case "QUIZ":
      return <QuizGame gameId={game.id} topicId={game.topicId} classLevel={game.classLevel} />;
    case "MATCHING":
      return <MatchingGame gameId={game.id} terms={terms} />;
    case "MEMORY":
      return <MemoryGame gameId={game.id} terms={terms} />;
    case "WORD_SEARCH":
      return <WordSearchGame gameId={game.id} terms={terms} />;
    case "HANGMAN":
      return <HangmanGame gameId={game.id} terms={terms} />;
    case "DRAG_DROP":
      return <DragDropGame gameId={game.id} terms={terms} />;
    case "TRUE_FALSE_MARATHON":
      return <TrueFalseMarathon gameId={game.id} topicId={game.topicId} classLevel={game.classLevel} />;
    case "WHEEL_OF_FORTUNE":
      return <WheelOfFortune gameId={game.id} topicId={game.topicId} classLevel={game.classLevel} />;
    case "SCIENCE_ADVENTURE":
      return <ScienceAdventure gameId={game.id} topicId={game.topicId} classLevel={game.classLevel} />;
    case "BADGE_HUNT":
      return <BadgeHunt gameId={game.id} />;
    default:
      return <p className="p-10 text-center text-sm text-lab-inkMuted">Bu oyun tipi henüz desteklenmiyor.</p>;
  }
}
