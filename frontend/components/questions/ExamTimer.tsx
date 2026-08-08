"use client";

import { useEffect, useState } from "react";

/** Geri sayım sayacı. Süre dolduğunda `onExpire` çağrılır. */
export function ExamTimer({ durationMin, onExpire }: { durationMin: number; onExpire: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState(durationMin * 60);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isLow = secondsLeft < 60;

  return (
    <span
      className={`rounded-full px-4 py-2 font-mono text-sm font-bold ${
        isLow ? "animate-pulse bg-reaction/10 text-reaction-dark" : "bg-beaker/10 text-beaker-dark dark:text-beaker-light"
      }`}
    >
      ⏱ {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
}
