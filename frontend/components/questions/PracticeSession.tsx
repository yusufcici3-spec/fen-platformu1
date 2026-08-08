"use client";

// 1. Tip Tanımlamaları
export interface PracticeScope {
  topicId?: string;
  unitId?: string;
  classLevel?: number;
  title?: string;
}

export interface PracticeSessionProps {
  scope?: PracticeScope;
}

// 2. Bileşen (Default Export)
export default function PracticeSession({ scope }: PracticeSessionProps) {
  const { topicId, unitId, classLevel, title } = scope || {};

  return (
    <div className="space-y-4 rounded-lg border p-6 bg-card text-card-foreground shadow-sm">
      <h2 className="text-xl font-semibold">
        {title ?? "Pratik Oturumu"}
      </h2>

      {/* Test / Geliştirme amaçlı verileri görmek istersen: */}
      <div className="text-sm text-muted-foreground space-y-1">
        {topicId && <p>Konu ID: {topicId}</p>}
        {unitId && <p>Ünite ID: {unitId}</p>}
        {classLevel && <p>Sınıf Düzeyi: {classLevel}. Sınıf</p>}
      </div>

      {/* Soru çözme mantığın ve bileşen kodların buraya gelecek */}
    </div>
  );
}
