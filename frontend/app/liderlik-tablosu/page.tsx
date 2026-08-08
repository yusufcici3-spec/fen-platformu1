"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { LeaderboardEntryView } from "@/types/games";

const RANK_MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [scope, setScope] = useState<"ALL_TIME" | "WEEKLY">("ALL_TIME");
  const [classLevel, setClassLevel] = useState<number | "">(user?.classLevel ?? "");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams({ scope });
    if (classLevel) params.set("classLevel", String(classLevel));
    apiFetch<{ leaderboard: LeaderboardEntryView[] }>(`/liderlik?${params.toString()}`)
      .then((res) => setLeaderboard(res.data?.leaderboard ?? []))
      .finally(() => setIsLoading(false));
  }, [scope, classLevel]);

  return (
    <>
      <PageHeader
        eyebrow="Liderlik Tablosu"
        title="En Başarılı Öğrenciler"
        description="Genel puan sıralamasını veya bu haftanın oyun liderlik tablosunu incele."
      />
      <section className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setScope("ALL_TIME")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${scope === "ALL_TIME" ? "bg-beaker text-white" : "border border-lab-paperLine dark:border-white/10"}`}
          >
            Genel Sıralama
          </button>
          <button
            onClick={() => setScope("WEEKLY")}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${scope === "WEEKLY" ? "bg-beaker text-white" : "border border-lab-paperLine dark:border-white/10"}`}
          >
            Bu Hafta
          </button>
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value ? Number(e.target.value) : "")}
            className="rounded-full border border-lab-paperLine bg-transparent px-4 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          >
            <option value="">Tüm Sınıflar</option>
            {[5, 6, 7, 8].map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}. Sınıf
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-2">
          {isLoading ? (
            <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
          ) : leaderboard.length === 0 ? (
            <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Henüz sıralama verisi yok.</p>
          ) : (
            leaderboard.map((entry) => (
              <div
                key={entry.userId ?? entry.user?.id}
                className="flex items-center gap-3 rounded-card border border-lab-paperLine bg-white p-4 dark:border-white/10 dark:bg-lab-inkSoft"
              >
                <span className="w-8 text-center text-lg">{RANK_MEDALS[entry.rank] ?? `#${entry.rank}`}</span>
                <span className="flex-1 font-medium">
                  {entry.user ? `${entry.user.firstName} ${entry.user.lastName}` : entry.name}
                </span>
                <span className="font-mono text-sm font-bold text-beaker-dark dark:text-beaker-light">
                  {entry.totalScore} p
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
