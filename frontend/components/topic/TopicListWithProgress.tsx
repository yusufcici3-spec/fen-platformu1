"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { TopicSummary } from "@/types/curriculum";
import { ProgressBar } from "./ProgressBar";

/**
 * Konu listesini, giriş yapmış bir öğrenci için tamamlanma durumlarıyla
 * (işaretli konular + ünite ilerleme çubuğu) birlikte gösterir.
 */
export function TopicListWithProgress({
  topics,
  level,
  unitSlug,
}: {
  topics: TopicSummary[];
  level: number;
  unitSlug: string;
}) {
  const { user, accessToken } = useAuth();
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user || user.role !== "STUDENT" || !accessToken) return;

    apiFetch<{ topicId: string; completion: number }[]>("/ilerleme", { token: accessToken })
      .then((res) => {
        const ids = new Set((res.data ?? []).filter((p) => p.completion >= 100).map((p) => p.topicId));
        setCompletedIds(ids);
      })
      .catch(() => {});
  }, [user, accessToken]);

  const showProgress = user?.role === "STUDENT" && topics.length > 0;
  const completedCount = topics.filter((t) => completedIds.has(t.id)).length;
  const percent = topics.length > 0 ? Math.round((completedCount / topics.length) * 100) : 0;

  return (
    <div>
      {showProgress && (
        <div className="mb-5">
          <ProgressBar percent={percent} label={`Ünite İlerlemesi (${completedCount}/${topics.length} konu)`} />
        </div>
      )}

      <ol className="space-y-3">
        {topics.map((topic, index) => {
          const isCompleted = completedIds.has(topic.id);
          return (
            <li key={topic.id}>
              <Link
                href={`/sinif/${level}/${unitSlug}/${topic.slug}`}
                className="flex items-center gap-4 rounded-card border border-lab-paperLine bg-white p-5 transition hover:border-beaker hover:shadow-md dark:border-white/10 dark:bg-lab-inkSoft"
              >
                <span
                  className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full font-mono text-sm font-bold ${
                    isCompleted
                      ? "bg-leaf text-white"
                      : "bg-beaker/10 text-beaker-dark dark:text-beaker-light"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold">{topic.title}</h3>
                  {topic.summary && (
                    <p className="mt-0.5 truncate text-sm text-lab-inkMuted dark:text-lab-paper/60">
                      {topic.summary}
                    </p>
                  )}
                </div>
                <span className="ml-auto text-beaker">→</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
