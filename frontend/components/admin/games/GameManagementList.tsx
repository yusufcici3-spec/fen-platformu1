"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Game } from "@/types/games";

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

export function GameManagementList({ onEdit, refreshKey }: { onEdit: (game: Game) => void; refreshKey: number }) {
  const { accessToken } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiFetch<Game[]>("/oyunlar/yonetim", { token: accessToken ?? undefined });
      setGames(res.data ?? []);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  async function handleDelete(id: string) {
    if (!accessToken) return;
    if (!confirm("Bu oyunu silmek istediğinize emin misiniz?")) return;
    await apiFetch(`/oyunlar/${id}`, { method: "DELETE", token: accessToken });
    load();
  }

  if (isLoading) return <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>;
  if (games.length === 0) return <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Henüz oyun eklenmedi.</p>;

  return (
    <div className="space-y-2">
      {games.map((game) => (
        <div key={game.id} className="flex items-center gap-3 rounded-lg border border-lab-paperLine px-4 py-3 dark:border-white/10">
          <span className="rounded-full bg-beaker/10 px-2 py-0.5 text-xs font-semibold text-beaker-dark dark:text-beaker-light">
            {TYPE_LABELS[game.type]}
          </span>
          <span className="flex-1 truncate text-sm font-medium">{game.title}</span>
          {game.classLevel && <span className="text-xs text-lab-inkMuted">{game.classLevel}. Sınıf</span>}
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${game.isPublished ? "bg-leaf/10 text-leaf" : "bg-reaction/10 text-reaction-dark"}`}>
            {game.isPublished ? "Yayında" : "Taslak"}
          </span>
          <button onClick={() => onEdit(game)} className="text-xs font-semibold text-beaker hover:underline">
            Düzenle
          </button>
          <button onClick={() => handleDelete(game.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
            Sil
          </button>
        </div>
      ))}
    </div>
  );
}
