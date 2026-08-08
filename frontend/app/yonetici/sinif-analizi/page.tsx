"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

interface ClassAnalysis {
  studentCount: number;
  classAverage: number;
  strugglingOutcomes: { learningOutcomeId: string; description: string; successRate: number; total: number }[];
  perStudent: { studentId: string; name: string; answeredCount: number }[];
}

export default function ClassAnalysisPage() {
  const { accessToken } = useAuth();
  const searchParams = useSearchParams();
  const [classLevel, setClassLevel] = useState(Number(searchParams.get("classLevel") ?? 5));
  const [data, setData] = useState<ClassAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    if (!accessToken) return;
    setIsLoading(true);
    const res = await apiFetch<ClassAnalysis>(`/analiz/sinif/${classLevel}`, { token: accessToken });
    setData(res.data ?? null);
    setIsLoading(false);
  }, [accessToken, classLevel]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <CurriculumShell title="Sınıf Bazlı Analiz">
      <div className="flex gap-2">
        {[5, 6, 7, 8].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setClassLevel(lvl)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              classLevel === lvl ? "bg-beaker text-white" : "border border-lab-paperLine dark:border-white/10"
            }`}
          >
            {lvl}. Sınıf
          </button>
        ))}
      </div>

      {isLoading || !data ? (
        <p className="mt-6 text-sm text-lab-inkMuted">Yükleniyor...</p>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">ÖĞRENCİ SAYISI</p>
              <p className="mt-1 font-display text-3xl font-bold">{data.studentCount}</p>
            </Card>
            <Card>
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">SINIF ORTALAMASI</p>
              <p className="mt-1 font-display text-3xl font-bold text-beaker-dark dark:text-beaker-light">%{data.classAverage}</p>
            </Card>
          </div>

          <Card>
            <h3 className="font-display text-sm font-semibold">⚠️ En Çok Zorlanılan Kazanımlar</h3>
            {data.strugglingOutcomes.length === 0 ? (
              <p className="mt-2 text-sm text-lab-inkMuted">Henüz yeterli veri yok.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {data.strugglingOutcomes.map((o) => (
                  <li key={o.learningOutcomeId} className="flex items-center justify-between text-sm">
                    <span className="text-lab-inkMuted dark:text-lab-paper/70">{o.description}</span>
                    <span className="font-mono text-reaction-dark">%{o.successRate}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <h3 className="font-display text-sm font-semibold">Öğrenci Aktivite Özeti</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {data.perStudent.map((s) => (
                <li key={s.studentId} className="flex justify-between">
                  <span>{s.name}</span>
                  <span className="text-lab-inkMuted">{s.answeredCount} soru cevaplandı</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </CurriculumShell>
  );
}
