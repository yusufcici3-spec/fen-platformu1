"use client";

import { useEffect, useState } from "react";

export const LOCAL_PROGRESS_PREFIX = "fenplatformu:konu-tamam:";

/**
 * Veritabanında karşılığı olmayan (kodla yönetilen) konular için, tamamlama durumunu
 * bu cihazın tarayıcısında saklar. Veritabanındaki konu bulunursa MarkCompleteButton kullanılır.
 */
export function LocalCompleteButton({ progressKey }: { progressKey: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      setDone(localStorage.getItem(LOCAL_PROGRESS_PREFIX + progressKey) === "1");
    } catch {
      /* tarayıcı depolaması kapalı olabilir */
    }
  }, [progressKey]);

  function toggle() {
    const next = !done;
    setDone(next);
    try {
      if (next) localStorage.setItem(LOCAL_PROGRESS_PREFIX + progressKey, "1");
      else localStorage.removeItem(LOCAL_PROGRESS_PREFIX + progressKey);
    } catch {
      /* yok say */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition ${
        done
          ? "bg-leaf text-white hover:bg-leaf/90"
          : "border border-beaker text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
      }`}
    >
      {done ? "✓ Tamamlandı" : "Konuyu Tamamladım"}
    </button>
  );
}
