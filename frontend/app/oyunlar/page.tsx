import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { apiFetch } from "@/lib/api";
import { Game } from "@/types/games";

export const metadata = { title: "Oyunlar" };

const TYPE_LABELS: Record<string, string> = {
  QUIZ: "Fen Bilgisi Yarışması",
  MATCHING: "Kavram Eşleştirme",
  MEMORY: "Hafıza Kartları",
  WORD_SEARCH: "Kelime Avı",
  HANGMAN: "Adam Asmaca",
  DRAG_DROP: "Sürükle-Bırak",
  TRUE_FALSE_MARATHON: "Doğru-Yanlış Maratonu",
  WHEEL_OF_FORTUNE: "Çarkıfelek",
  SCIENCE_ADVENTURE: "Bilim Macerası",
  BADGE_HUNT: "Rozet Avı",
};

const TYPE_ICONS: Record<string, string> = {
  QUIZ: "❓",
  MATCHING: "🔗",
  MEMORY: "🃏",
  WORD_SEARCH: "🔤",
  HANGMAN: "🎯",
  DRAG_DROP: "🖐️",
  TRUE_FALSE_MARATHON: "⚡",
  WHEEL_OF_FORTUNE: "🎡",
  SCIENCE_ADVENTURE: "🚀",
  BADGE_HUNT: "🏅",
};

export default async function GamesPage() {
  let games: Game[] = [];
  try {
    const res = await apiFetch<Game[]>("/oyunlar");
    games = res.data ?? [];
  } catch {
    games = [];
  }

  return (
    <>
      <PageHeader
        eyebrow="Oyunlar"
        title="Eğitsel Oyunlar"
        description="Eğlenerek öğrenmek için fen bilimleri temalı oyunları keşfet. Her oyunda seviye, süre, puan ve rozet kazanma sistemi var."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {games.length === 0 ? (
          <EmptyPanelState
            title="Henüz yayınlanmış oyun yok"
            description="Oyunlar yönetim panelinden eklendikçe burada listelenecek."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <Link
                key={game.id}
                href={`/oyunlar/${game.slug}`}
                className="group rounded-card border border-lab-paperLine bg-white p-5 transition hover:-translate-y-1 hover:border-beaker hover:shadow-md dark:border-white/10 dark:bg-lab-inkSoft"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{TYPE_ICONS[game.type]}</span>
                  <span className="font-mono text-xs font-semibold text-beaker-dark dark:text-beaker-light">
                    {TYPE_LABELS[game.type]}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold">{game.title}</h3>
                {game.description && (
                  <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">{game.description}</p>
                )}
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-beaker">
                  Oyna
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
