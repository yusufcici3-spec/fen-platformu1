"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { isSoundEnabled, setSoundEnabled } from "@/lib/sound";

/**
 * Tüm oyunlar için ortak kabuk: başlık, canlı skor, süre göstergesi,
 * ses aç/kapa düğmesi ve çıkış bağlantısı. Mobil uyumlu, responsive.
 */
export function GameShell({
  title,
  score,
  secondsLeft,
  onExit,
  children,
}: {
  title: string;
  score?: number;
  secondsLeft?: number;
  onExit?: () => void;
  children: ReactNode;
}) {
  const [soundOn, setSoundOnState] = useState(true);

  useEffect(() => {
    setSoundOnState(isSoundEnabled());
  }, []);

  function toggleSound() {
    const next = !soundOn;
    setSoundOnState(next);
    setSoundEnabled(next);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {onExit ? (
            <button onClick={onExit} className="text-sm font-semibold text-beaker hover:underline">
              ← Çıkış
            </button>
          ) : (
            <Link href="/oyunlar" className="text-sm font-semibold text-beaker hover:underline">
              ← Oyunlara Dön
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          {score !== undefined && (
            <span className="rounded-full bg-beaker/10 px-3 py-1.5 font-mono text-sm font-bold text-beaker-dark dark:text-beaker-light">
              ⭐ {score}
            </span>
          )}
          {secondsLeft !== undefined && (
            <span
              className={`rounded-full px-3 py-1.5 font-mono text-sm font-bold ${
                secondsLeft <= 10 ? "animate-pulse bg-reaction/10 text-reaction-dark" : "bg-lab-paperLine/60 dark:bg-white/10"
              }`}
            >
              ⏱ {secondsLeft}s
            </span>
          )}
          <button
            onClick={toggleSound}
            aria-label="Ses efektlerini aç/kapat"
            className="rounded-full border border-lab-paperLine px-3 py-1.5 text-sm dark:border-white/10"
          >
            {soundOn ? "🔊" : "🔇"}
          </button>
        </div>
      </div>

      <h1 className="mt-4 font-display text-2xl font-bold">{title}</h1>

      <div className="mt-6">{children}</div>
    </div>
  );
}
