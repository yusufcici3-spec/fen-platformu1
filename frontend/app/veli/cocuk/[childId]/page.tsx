"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RequireRole } from "@/components/auth/RequireRole";
import { Card } from "@/components/ui/Card";
import { TrendChart } from "@/components/analysis/TrendChart";
import { DevelopmentScoreGauge } from "@/components/analysis/DevelopmentScoreGauge";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { AnalysisReport, TeacherNote } from "@/types/analysis";

interface ChildReportResponse {
  child: { id: string; firstName: string; lastName: string; classLevel: number | null; points: number; currentStreak: number };
  report: AnalysisReport;
  examResults: { id: string; successPercent: number; finishedAt: string | null; exam: { title: string; type: string } }[];
  teacherNotes: TeacherNote[];
}

export default function ChildReportPage({ params }: { params: { childId: string } }) {
  return (
    <RequireRole roles={["PARENT"]}>
      <ChildReportContent childId={params.childId} />
    </RequireRole>
  );
}

function ChildReportContent({ childId }: { childId: string }) {
  const { accessToken } = useAuth();
  const [data, setData] = useState<ChildReportResponse | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    apiFetch<ChildReportResponse>(`/veli/cocuk/${childId}/rapor`, { token: accessToken }).then((res) => setData(res.data ?? null));
  }, [accessToken, childId]);

  if (!data) {
    return <p className="p-10 text-center text-sm text-lab-inkMuted">Yükleniyor...</p>;
  }

  const { child, report, examResults, teacherNotes } = data;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/veli" className="text-sm font-semibold text-beaker hover:underline">
        ← Çocuklarıma Dön
      </Link>
      <h1 className="mt-2 font-display text-2xl font-bold">
        {child.firstName} {child.lastName}
      </h1>
      <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">
        {child.classLevel}. Sınıf · ⭐ {child.points} puan · 🔥 {child.currentStreak} gün seri
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
        <Card className="flex justify-center">
          <DevelopmentScoreGauge score={report.developmentScore} />
        </Card>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Card>
            <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">BAŞARI ORANI</p>
            <p className="mt-1 font-display text-2xl font-bold">%{report.successPercent}</p>
          </Card>
          <Card>
            <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">ÇALIŞMA SÜRESİ</p>
            <p className="mt-1 font-display text-2xl font-bold">{report.totalStudyMinutes} dk</p>
          </Card>
          <Card>
            <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">TAMAMLANAN KONU</p>
            <p className="mt-1 font-display text-2xl font-bold">{report.completedTopicsCount}</p>
          </Card>
          <Card>
            <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">DENEME ORT.</p>
            <p className="mt-1 font-display text-2xl font-bold">%{report.examPerformance.averageSuccess}</p>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <h2 className="font-display text-sm font-semibold">Haftalık Çalışma Grafiği</h2>
        <TrendChart data={report.weeklyChart} dataKeyLabel="Çözülen Soru" />
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-sm font-semibold">📝 Son Deneme Sonuçları</h2>
          {examResults.length === 0 ? (
            <p className="mt-2 text-sm text-lab-inkMuted">Henüz deneme sonucu yok.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {examResults.map((r) => (
                <li key={r.id} className="flex items-center justify-between text-sm">
                  <span>{r.exam.title}</span>
                  <span className="font-mono">%{r.successPercent}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="font-display text-sm font-semibold">📝 Öğretmen Notları</h2>
          {teacherNotes.length === 0 ? (
            <p className="mt-2 text-sm text-lab-inkMuted">Henüz öğretmen notu yok.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {teacherNotes.map((n) => (
                <li key={n.id} className="rounded-lg border border-lab-paperLine p-3 text-sm dark:border-white/10">
                  <p>{n.note}</p>
                  <p className="mt-1 text-xs text-lab-inkMuted dark:text-lab-paper/50">
                    {n.teacher?.firstName} {n.teacher?.lastName} ·{" "}
                    {new Date(n.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
