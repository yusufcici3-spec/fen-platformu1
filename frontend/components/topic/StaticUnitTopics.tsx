"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { StaticTopic } from "@/lib/maarifContent";
import { LOCAL_PROGRESS_PREFIX } from "./LocalCompleteButton";

export function StaticUnitTopics({ level, unitSlug, topics }: { level: number; unitSlug: string; topics: StaticTopic[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const next: Record<string, boolean> = {};
      for (const t of topics) next[t.slug] = localStorage.getItem(LOCAL_PROGRESS_PREFIX + t.slug) === "1";
      setDone(next);
    } catch {
      /* yok say */
    }
  }, [topics]);

  const completed = topics.filter((t) => done[t.slug]).length;

  return (
    <div>
      <p className="text-sm text-lab-inkMuted dark:text-lab-paper/70">
        Tamamlanan konu: <strong>{completed}</strong> / {topics.length}
      </p>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-lab-paperLine/60 dark:bg-white/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={topics.length}
        aria-valuenow={completed}
        aria-label="Ünite ilerlemesi"
      >
        <div className="h-full bg-leaf transition-all" style={{ width: `${(completed / topics.length) * 100}%` }} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {topics.map((t, i) => (
          <Link
            key={t.slug}
            href={`/sinif/${level}/${unitSlug}/${t.slug}`}
            className="group rounded-card border border-lab-paperLine bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-lab-inkSoft"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-beaker-dark dark:text-beaker-light">
                Konu {i + 1} · {t.outcome.code}
              </span>
              {done[t.slug] && (
                <span className="rounded-full bg-leaf/15 px-2.5 py-1 text-xs font-semibold text-leaf">✓ Tamamlandı</span>
              )}
            </div>
            <h2 className="mt-2 font-display text-lg font-semibold">{t.title}</h2>
            <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/65">{t.summary}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-beaker">
              Konuya git <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
