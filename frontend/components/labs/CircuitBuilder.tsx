"use client";

import { useState } from "react";
import { sfx } from "@/lib/sound";

/**
 * Basit elektrik devresi simülasyonu: pil, anahtar ve ampulü içeren bir
 * devre. Anahtar kapatıldığında (ve tüm bağlantılar tamamsa) ampul yanar.
 */
export function CircuitBuilder() {
  const [switchClosed, setSwitchClosed] = useState(false);
  const [batteryConnected, setBatteryConnected] = useState(true);
  const [bulbConnected, setBulbConnected] = useState(true);

  const isLit = switchClosed && batteryConnected && bulbConnected;

  function toggleSwitch() {
    sfx.click();
    setSwitchClosed((s) => !s);
  }

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 300 160" className="w-full max-w-md">
          {/* Devre teli */}
          <rect x="20" y="20" width="260" height="120" rx="8" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray={isLit ? "0" : "0"} />

          {/* Pil */}
          <g transform="translate(20,60)">
            <rect width="50" height="40" rx="4" fill={batteryConnected ? "#0EA5A0" : "#cbd5e1"} />
            <text x="25" y="25" fontSize="11" fill="white" textAnchor="middle">
              PİL
            </text>
          </g>

          {/* Ampul */}
          <g transform="translate(230,50)">
            <circle cx="20" cy="20" r="24" fill={isLit ? "#FDE68A" : "#e2e8f0"} stroke={isLit ? "#F5A623" : "#94a3b8"} strokeWidth="3" />
            <text x="20" y="25" fontSize="20" textAnchor="middle">
              💡
            </text>
          </g>

          {/* Anahtar */}
          <g transform="translate(130,10)" onClick={toggleSwitch} style={{ cursor: "pointer" }}>
            <circle cx="0" cy="10" r="4" fill="#334155" />
            <circle cx="40" cy="10" r="4" fill="#334155" />
            <line
              x1="0"
              y1="10"
              x2={switchClosed ? "40" : "28"}
              y2={switchClosed ? "10" : "-6"}
              stroke={switchClosed ? "#0EA5A0" : "#94a3b8"}
              strokeWidth="4"
            />
            <text x="20" y="35" fontSize="10" textAnchor="middle" fill="currentColor">
              Anahtar
            </text>
          </g>
        </svg>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={toggleSwitch}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold text-white transition ${
              switchClosed ? "bg-leaf hover:bg-leaf/90" : "bg-beaker hover:bg-beaker-dark"
            }`}
          >
            {switchClosed ? "Anahtarı Aç" : "Anahtarı Kapat"}
          </button>
          <button
            onClick={() => setBatteryConnected((b) => !b)}
            className="rounded-full border border-lab-paperLine px-6 py-2.5 text-sm font-semibold dark:border-white/10"
          >
            Pili {batteryConnected ? "Çıkar" : "Tak"}
          </button>
        </div>

        <p className="text-center text-sm text-lab-inkMuted dark:text-lab-paper/60">
          {isLit
            ? "✅ Devre tamamlandı! Ampul yanıyor çünkü elektrik akımı kesintisiz akıyor."
            : "Devre açık veya eksik. Pili takıp anahtarı kapatarak devreyi tamamla."}
        </p>
      </div>
    </div>
  );
}
