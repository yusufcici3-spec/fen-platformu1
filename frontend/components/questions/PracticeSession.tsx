"use client";

// 1. PracticePage'den gönderdiğin verilerin tiplerini tanımlıyoruz
export interface PracticeScope {
  topicId?: string;
  unitId?: string;
  classLevel?: number;
  title?: string;
}

export interface PracticeSessionProps {
  scope?: PracticeScope;
}

// 2. Bileşen fonksiyonu
export function PracticeSession({ scope }: PracticeSessionProps) {
  // Gelen verileri scope içinden çekebilirsin:
  const { topicId, unitId, classLevel, title } = scope || {};

  return (
    <div className="space-y-4 rounded-lg border p-6 bg-card text-card-foreground shadow-sm">
      <h2 className="text-xl font-semibold">
        {title ?? "Pratik Oturumu"}
      </h2>
      
      {/* Test/Geliştirme amaçlı gelen değerleri kontrol etmek istersen: */}
      <div className="text-sm text-muted-foreground space-y-1">
        {topicId && <p>Konu ID: {topicId}</p>}
        {unitId && <p>Ünite ID: {unitId}</p>}
        {classLevel && <p>Sınıf Düzeyi: {classLevel}. Sınıf</p>}
      </div>

      {/* Soru çözme mantığı ve component kodların buraya gelecek */}
    </div>
  );
}
