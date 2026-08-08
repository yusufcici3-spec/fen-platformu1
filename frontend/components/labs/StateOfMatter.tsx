"use client";

import { useMemo, useState } from "react";

function getState(temp: number): { label: string; icon: string; color: string } {
  if (temp <= 0) return { label: "Katı", icon: "🧊", color: "#93C5FD" };
  if (temp < 100) return { label: "Sıvı", icon: "💧", color: "#38BDF8" };
  return { label: "Gaz", icon: "💨", color: "#E2E8F0" };
}

/** Sıcaklık kaydırıcısıyla maddenin hâl değişimini gösteren simülasyon. */
export function StateOfMatter() {
  const [temp, setTemp] = useState(20);
  const state = useMemo(() => getState(temp), [temp]);
  const particleCount = 16;

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <div className="flex flex-col items-center">
        <div
          className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border-2 border-lab-paperLine dark:border-white/10"
          style={{ backgroundColor: `${state.color}33` }}
        >
          {Array.from({ length: particleCount }).map((_, i) => {
            const isGas = state.label === "Gaz";
            const isLiquid = state.label === "Sıvı";
            const baseX = (i % 4) * 22 + 20;
            const baseY = Math.floor(i / 4) * 22 + 20;
            return (
              <span
                key={i}
                className="absolute h-3 w-3 rounded-full transition-all duration-700"
                style={{
                  backgroundColor: state.color,
                  left: isGas ? `${(baseX + i * 13) % 170}px` : `${baseX}px`,
                  top: isGas ? `${(baseY + i * 17) % 170}px` : isLiquid ? `${baseY + 30}px` : `${baseY}px`,
                  animation: isGas ? `float-${i % 3} 2s ease-in-out infinite` : undefined,
                  opacity: isLiquid ? 0.85 : 1,
                }}
              />
            );
          })}
          <span className="z-10 text-5xl">{state.icon}</span>
        </div>

        <p className="mt-4 font-display text-lg font-bold">{state.label}</p>
        <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">{temp}°C</p>

        <input
          type="range"
          min={-20}
          max={150}
          value={temp}
          onChange={(e) => setTemp(Number(e.target.value))}
          className="mt-4 w-full max-w-xs accent-beaker"
        />
        <div className="mt-1 flex w-full max-w-xs justify-between text-xs text-lab-inkMuted">
          <span>-20°C</span>
          <span>0°C</span>
          <span>100°C</span>
          <span>150°C</span>
        </div>

        <p className="mt-4 max-w-sm text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
          {temp <= 0 && "0°C ve altında madde katı hâldedir; parçacıklar sıkı ve düzenli dizilmiştir."}
          {temp > 0 && temp < 100 && "0-100°C arasında madde sıvı hâldedir; parçacıklar birbirine yakın ama hareketlidir."}
          {temp >= 100 && "100°C ve üzerinde madde gaz hâline geçer; parçacıklar birbirinden uzaklaşıp hızla hareket eder."}
        </p>
      </div>
    </div>
  );
}
