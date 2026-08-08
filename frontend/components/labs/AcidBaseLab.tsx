"use client";

import { useState } from "react";
import { sfx } from "@/lib/sound";

const SUBSTANCES = [
  { name: "Limon Suyu", ph: 2, type: "asit" },
  { name: "Sirke", ph: 3, type: "asit" },
  { name: "Saf Su", ph: 7, type: "nötr" },
  { name: "Sabunlu Su", ph: 9, type: "baz" },
  { name: "Çamaşır Suyu", ph: 12, type: "baz" },
];

function colorForPh(ph: number): string {
  if (ph <= 3) return "#EF4444"; // kırmızı - kuvvetli asit
  if (ph <= 6) return "#F97316"; // turuncu - zayıf asit
  if (ph === 7) return "#22C55E"; // yeşil - nötr
  if (ph <= 10) return "#3B82F6"; // mavi - zayıf baz
  return "#8B5CF6"; // mor - kuvvetli baz
}

/** Turnusol kâğıdı deneyi simülasyonu: madde seç, kâğıdın rengini gözlemle. */
export function AcidBaseLab() {
  const [selected, setSelected] = useState<(typeof SUBSTANCES)[number] | null>(null);
  const [tested, setTested] = useState(false);

  function handleTest(substance: (typeof SUBSTANCES)[number]) {
    sfx.click();
    setSelected(substance);
    setTested(false);
    setTimeout(() => {
      sfx.correct();
      setTested(true);
    }, 500);
  }

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold">Bir madde seç:</p>
          <div className="flex flex-wrap gap-2">
            {SUBSTANCES.map((s) => (
              <button
                key={s.name}
                onClick={() => handleTest(s)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selected?.name === s.name ? "border-beaker bg-beaker/10" : "border-lab-paperLine dark:border-white/10"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div
            className="h-32 w-10 rounded-full border-2 border-lab-inkMuted transition-colors duration-500"
            style={{ backgroundColor: tested && selected ? colorForPh(selected.ph) : "#e5e7eb" }}
          />
          <p className="mt-2 text-xs text-lab-inkMuted">Turnusol kâğıdı</p>
        </div>
      </div>

      {tested && selected && (
        <div className="mt-5 rounded-lg border border-lab-paperLine p-4 text-sm dark:border-white/10">
          <p>
            <strong>{selected.name}</strong> — pH: {selected.ph} —{" "}
            <span className="font-semibold capitalize">{selected.type}</span>
          </p>
          <p className="mt-1 text-lab-inkMuted dark:text-lab-paper/60">
            {selected.type === "asit" && "Asidik maddeler turnusol kâğıdını kırmızıya çevirir (pH < 7)."}
            {selected.type === "baz" && "Bazik maddeler turnusol kâğıdını maviye/mora çevirir (pH > 7)."}
            {selected.type === "nötr" && "Nötr maddeler turnusol kâğıdının rengini değiştirmez (pH = 7)."}
          </p>
        </div>
      )}
    </div>
  );
}
