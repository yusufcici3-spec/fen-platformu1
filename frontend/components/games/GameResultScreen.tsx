"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { sfx } from "@/lib/sound";

/**
 * Oyun bittiğinde gösterilen ortak sonuç ekranı. Mount olduğunda skoru
 * otomatik olarak sunucuya kaydeder (puan/seri/rozet/günlük görev tetikler).
 */
export function GameResultScreen({
  gameId,
  score,
  correctCount,
  wrongCount,
  durationSec,
  onPlayAgain,
}: {
  gameId: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  durationSec?: number;
  onPlayAgain: () => void;
}) {
  const { accessToken, user } = useAuth();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    sfx.win();
    if (!accessToken) {
      setSaved(true);
      return;
    }
    apiFetch(`/oyunlar/${gameId}/skor`, {
      method: "POST",
      token: accessToken,
      body: JSON.stringify({ score, correctCount, wrongCount, durationSec }),
    })
      .catch(() => {})
      .finally(() => setSaved(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-8 text-center dark:border-white/10 dark:bg-lab-inkSoft">
      <div className="text-5xl">🎉</div>
      <h2 className="mt-3 font-display text-2xl font-bold">Oyun Bitti!</h2>
      <p className="mt-2 font-mono text-4xl font-bold text-beaker-dark dark:text-beaker-light">{score} puan</p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-leaf/10 p-4">
          <p className="font-mono text-2xl font-bold text-leaf">{correctCount}</p>
          <p className="text-xs text-lab-inkMuted dark:text-lab-paper/60">Doğru</p>
        </div>
        <div className="rounded-lg bg-reaction/10 p-4">
          <p className="font-mono text-2xl font-bold text-reaction-dark">{wrongCount}</p>
          <p className="text-xs text-lab-inkMuted dark:text-lab-paper/60">Yanlış</p>
        </div>
      </div>

      {!user && (
        <p className="mt-4 text-xs text-lab-inkMuted dark:text-lab-paper/50">
          Skorunun kaydedilmesi ve rozet kazanman için{" "}
          <Link href="/giris" className="font-semibold text-beaker hover:underline">
            giriş yap
          </Link>
          .
        </p>
      )}
      {user && saved && <p className="mt-4 text-xs text-leaf">✓ Skorun kaydedildi, puan ve rozetlerin güncellendi.</p>}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          onClick={onPlayAgain}
          className="rounded-full bg-beaker px-6 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
        >
          Tekrar Oyna
        </button>
        <Link
          href="/oyunlar"
          className="rounded-full border border-lab-paperLine px-6 py-2.5 text-sm font-semibold dark:border-white/10"
        >
          Diğer Oyunlar
        </Link>
      </div>
    </div>
  );
}
