"use client";

/** Genel gelişim puanını (0-100) dairesel bir gösterge ile görselleştirir. */
export function DevelopmentScoreGauge({ score }: { score: number }) {
  const clamped = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (clamped / 100) * circumference;
  const color = clamped >= 70 ? "#3F9D63" : clamped >= 40 ? "#F5A623" : "#EF4444";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 100" className="h-32 w-32">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text x="50" y="55" textAnchor="middle" fontSize="22" fontWeight="bold" fill="currentColor">
          {clamped}
        </text>
      </svg>
      <p className="mt-1 text-sm font-semibold">Genel Gelişim Puanı</p>
    </div>
  );
}
