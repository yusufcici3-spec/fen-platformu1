"use client";

import { useEffect, useState } from "react";
import { dailyQuestions } from "@/content/daily";
import { todayIndex } from "./dailyPick";

export function DailyQuestion() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => setI(todayIndex(dailyQuestions.length)), []);
  const d = dailyQuestions[i];
  const done = picked !== null;
  return (
    <div className="rounded-card border border-reaction/30 bg-reaction/5 p-6">
      <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-reaction-dark">
        <span>❓</span> Günün Sorusu · {d.grade}
      </div>
      <p className="mt-4 text-sm font-semibold leading-relaxed text-lab-ink dark:text-lab-paper">{d.q}</p>
      <div className="mt-3 grid gap-2">
        {d.options.map((o, k) => {
          const right = done && k === d.answer;
          const wrong = done && k === picked && k !== d.answer;
          return (
            <button
              key={k}
              type="button"
              disabled={done}
              onClick={() => setPicked(k)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                right ? "border-green-500 bg-green-500/15" : wrong ? "border-red-500 bg-red-500/15" : "border-reaction/30 hover:bg-reaction/10"
              }`}
            >
              <span className="mr-2 font-mono font-semibold">{"ABCD"[k]}</span>{o}
            </button>
          );
        })}
      </div>
      {done && (
        <p className="mt-3 text-sm text-lab-inkMuted dark:text-lab-paper/70">
          <b>{picked === d.answer ? "Doğru! " : "Doğru cevap: " + "ABCD"[d.answer] + ". "}</b>
          {d.explain}
        </p>
      )}
    </div>
  );
}
