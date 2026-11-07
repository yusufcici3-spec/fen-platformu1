"use client";

import { useEffect, useState } from "react";
import { dailyFacts } from "@/content/daily";
import { todayIndex } from "./dailyPick";

export function DailyFact() {
  const [i, setI] = useState(0);
  useEffect(() => setI(todayIndex(dailyFacts.length)), []);
  const f = dailyFacts[i];
  return (
    <div className="rounded-card border border-beaker/30 bg-beaker/5 p-6">
      <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
        <span>💡</span> Günün Bilgisi · {f.kind}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-lab-ink dark:text-lab-paper/90">{f.text}</p>
      {f.by && <p className="mt-2 text-xs font-semibold text-lab-inkMuted dark:text-lab-paper/60">— {f.by}</p>}
    </div>
  );
}
