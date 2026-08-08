"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

/**
 * Öğrencinin bir konuyu "tamamlandı" olarak işaretlemesini sağlar.
 * Yalnızca STUDENT rolündeki giriş yapmış kullanıcılara gösterilir.
 */
export function MarkCompleteButton({ topicId }: { topicId: string }) {
  const { user, accessToken } = useAuth();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "STUDENT" || !accessToken) return;

    apiFetch<{ topicId: string; completion: number }[]>("/ilerleme", { token: accessToken })
      .then((res) => {
        const found = res.data?.find((p) => p.topicId === topicId);
        setIsCompleted((found?.completion ?? 0) >= 100);
      })
      .catch(() => {})
      .finally(() => setChecked(true));
  }, [user, accessToken, topicId]);

  if (!user || user.role !== "STUDENT") return null;

  async function toggleComplete() {
    if (!accessToken) return;
    setIsLoading(true);
    try {
      await apiFetch("/ilerleme", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ topicId, completion: isCompleted ? 0 : 100 }),
      });
      setIsCompleted((prev) => !prev);
    } catch {
      // sessizce yok say - kullanıcı tekrar deneyebilir
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={toggleComplete}
      disabled={isLoading || !checked}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition disabled:opacity-60 ${
        isCompleted
          ? "bg-leaf text-white hover:bg-leaf/90"
          : "border border-beaker text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
      }`}
    >
      {isCompleted ? "✓ Tamamlandı" : "Konuyu Tamamladım"}
    </button>
  );
}
