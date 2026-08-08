"use client";

import { useState } from "react";
import { sfx } from "@/lib/sound";

const OBJECTS = [
  { name: "Mantar", density: 0.24, icon: "🟤" },
  { name: "Tahta Parçası", density: 0.6, icon: "🪵" },
  { name: "Buz Küpü", density: 0.92, icon: "🧊" },
  { name: "Plastik Top", density: 0.95, icon: "⚪" },
  { name: "Elma", density: 0.9, icon: "🍎" },
  { name: "Metal Vida", density: 7.8, icon: "🔩" },
  { name: "Taş", density: 2.6, icon: "🪨" },
];

const WATER_DENSITY = 1.0;

/** Yoğunluk deneyi: nesneleri suya bırak, batıp batmadığını gözlemle. */
export function DensityTank() {
  const [dropped, setDropped] = useState<{ name: string; icon: string; sinks: boolean }[]>([]);

  function handleDrop(obj: (typeof OBJECTS)[number]) {
    sfx.click();
    const sinks = obj.density > WATER_DENSITY;
    setDropped((prev) => [...prev.filter((p) => p.name !== obj.name), { name: obj.name, icon: obj.icon, sinks }]);
    setTimeout(() => (sinks ? sfx.wrong() : sfx.correct()), 500);
  }

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <p className="mb-3 text-sm font-semibold">Bir nesne seçip suya bırak:</p>
      <div className="mb-5 flex flex-wrap gap-2">
        {OBJECTS.map((obj) => (
          <button
            key={obj.name}
            onClick={() => handleDrop(obj)}
            className="rounded-full border border-lab-paperLine px-4 py-2 text-sm font-medium hover:border-beaker dark:border-white/10"
          >
            {obj.icon} {obj.name}
          </button>
        ))}
      </div>

      <div className="relative h-56 w-full overflow-hidden rounded-2xl border-2 border-lab-paperLine bg-gradient-to-b from-sky-100 to-sky-300 dark:border-white/10 dark:from-sky-900 dark:to-sky-950">
        <div className="absolute bottom-0 h-2/3 w-full bg-sky-400/50" />
        {dropped.map((d, i) => (
          <div
            key={d.name}
            className="absolute text-2xl transition-all duration-1000"
            style={{
              left: `${15 + (i % 5) * 16}%`,
              top: d.sinks ? "80%" : "38%",
              transform: "translateY(-50%)",
            }}
          >
            {d.icon}
          </div>
        ))}
        <span className="absolute left-2 top-1/3 text-xs text-lab-inkMuted dark:text-lab-paper/50">Su yüzeyi →</span>
      </div>

      {dropped.length > 0 && (
        <div className="mt-4 space-y-1 text-sm">
          {dropped.map((d) => (
            <p key={d.name}>
              {d.icon} <strong>{d.name}</strong>: {d.sinks ? "Battı (yoğunluğu sudan fazla)" : "Yüzdü (yoğunluğu sudan az)"}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
