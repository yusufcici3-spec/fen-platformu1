"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Badge } from "@/types/games";

export function BadgesWidget() {
  const { accessToken } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    if (!accessToken) return;
    apiFetch<Badge[]>("/basarimlar/durumum", { token: accessToken }).then((res) => setBadges(res.data ?? []));
  }, [accessToken]);

  const earned = badges.filter((b) => b.earned);

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
          <span>🏅</span> Rozetlerim
        </h2>
        <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">
          {earned.length} / {badges.length}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {badges.map((b) => (
          <div
            key={b.id}
            title={b.earned ? b.title : `${b.title} (henüz kazanılmadı)`}
            className={`grid h-12 w-12 place-items-center rounded-full text-2xl ${
              b.earned ? "bg-leaf/10" : "bg-lab-paperLine/50 grayscale dark:bg-white/5"
            }`}
          >
            {b.icon ?? "🏅"}
          </div>
        ))}
      </div>

      <Link href="/oyunlar/rozet-avi" className="mt-4 inline-block text-xs font-semibold text-beaker hover:underline">
        Tüm rozetleri ve nasıl kazanılacaklarını keşfet →
      </Link>
    </div>
  );
}
