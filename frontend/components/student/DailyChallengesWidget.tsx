"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { DailyChallenge } from "@/types/games";

export function DailyChallengesWidget() {
  const { accessToken } = useAuth();
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    apiFetch<DailyChallenge[]>("/gorevler/bugun", { token: accessToken })
      .then((res) => setChallenges(res.data ?? []))
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  if (isLoading) return null;
  if (challenges.length === 0) return null;

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <span>📅</span> Günlük Görevler
      </h2>
      <div className="mt-4 space-y-3">
        {challenges.map((c) => {
          const percent = Math.min(100, Math.round((c.currentCount / c.targetCount) * 100));
          return (
            <div key={c.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span>{c.icon}</span>
                  {c.label}
                  {c.isCompleted && <span className="text-leaf">✓</span>}
                </span>
                <span className="font-mono text-xs text-lab-inkMuted dark:text-lab-paper/50">
                  {c.currentCount}/{c.targetCount} · +{c.rewardPoints}p
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-lab-paperLine dark:bg-white/10">
                <div
                  className={`h-full rounded-full transition-all ${c.isCompleted ? "bg-leaf" : "bg-beaker"}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
