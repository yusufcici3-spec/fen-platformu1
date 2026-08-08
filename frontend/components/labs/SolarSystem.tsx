"use client";

import { useState } from "react";

const PLANETS = [
  { name: "Merkür", radius: 40, size: 4, color: "#A8A29E", period: 3, fact: "Güneş'e en yakın gezegendir." },
  { name: "Venüs", radius: 55, size: 6, color: "#FBBF24", period: 5, fact: "Güneş sisteminin en sıcak gezegenidir." },
  { name: "Dünya", radius: 72, size: 7, color: "#3B82F6", period: 7, fact: "Yaşamın bilinen tek olduğu gezegendir." },
  { name: "Mars", radius: 90, size: 5, color: "#F87171", period: 9, fact: "'Kızıl Gezegen' olarak bilinir." },
  { name: "Jüpiter", radius: 115, size: 12, color: "#F59E0B", period: 14, fact: "Güneş sistemindeki en büyük gezegendir." },
  { name: "Satürn", radius: 140, size: 10, color: "#FCD34D", period: 18, fact: "Belirgin halka sistemiyle bilinir." },
];

/** Basit, etkileşimli güneş sistemi animasyonu: gezegenlere tıklayınca bilgi gösterir. */
export function SolarSystem() {
  const [selected, setSelected] = useState<(typeof PLANETS)[number] | null>(null);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <div className="relative mx-auto grid h-80 w-80 place-items-center sm:h-96 sm:w-96">
        <span className="absolute grid h-10 w-10 place-items-center rounded-full bg-reaction text-lg shadow-lg">☀️</span>

        {PLANETS.map((planet) => (
          <div
            key={planet.name}
            className="absolute rounded-full border border-dashed border-lab-paperLine dark:border-white/10"
            style={{
              width: planet.radius * 2,
              height: planet.radius * 2,
              animation: `spin ${planet.period / speed}s linear infinite`,
            }}
          >
            <button
              onClick={() => setSelected(planet)}
              className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition hover:scale-125"
              style={{ width: planet.size * 2, height: planet.size * 2, backgroundColor: planet.color }}
              aria-label={planet.name}
            />
          </div>
        ))}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      <div className="mt-4 flex items-center justify-center gap-3">
        <label className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Hız:</label>
        <input
          type="range"
          min={0.2}
          max={3}
          step={0.2}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-32 accent-beaker"
        />
      </div>

      {selected && (
        <div className="mt-4 rounded-lg border border-lab-paperLine p-4 text-center text-sm dark:border-white/10">
          <p className="font-display font-semibold">{selected.name}</p>
          <p className="mt-1 text-lab-inkMuted dark:text-lab-paper/60">{selected.fact}</p>
        </div>
      )}
      {!selected && (
        <p className="mt-4 text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
          Bilgi almak için bir gezegene tıkla.
        </p>
      )}
    </div>
  );
}
