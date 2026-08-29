"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { Card } from "@/components/ui/Card";
import { TrendChart } from "@/components/analysis/TrendChart";
import { DevelopmentScoreGauge } from "@/components/analysis/DevelopmentScoreGauge";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { AnalysisReport, TeacherNote } from "@/types/analysis";

interface StudentReportResponse {
  student: { id: string; firstName: string; lastName: string; classLevel: number | null };
  report: AnalysisReport;
}

export default function StudentReportPage({ params }: { params: { studentId: string } }) {
  const { accessToken } = useAuth();
  const [data, setData] = useState<StudentReportResponse | null>(null);
  const [notes, setNotes] = useState<TeacherNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loadNotes = useCallback(async () => {
    if (!accessToken) return;
    const res = await apiFetch<TeacherNote[]>(`/ogretmen-notlari/ogrenci/${params.studentId}`, { token: accessToken });
    setNotes(res.data ?? []);
  }, [accessToken, params.studentId]);

  useEffect(() => {
    if (!accessToken) return;
    apiFetch<StudentReportResponse>(`/analiz/ogrenci/${params.studentId}`, { token: accessToken }).then((res) => setData(res.data ?? null));
    loadNotes();
  }, [accessToken, params.studentId, loadNotes]);

  async function handleAddNote() {
    if (!accessToken || newNote.trim().length < 3) return setError("Not en az 3 karakter olmalı.");
    setError(null);
    try {
      await apiFetch("/ogretmen-notlari", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ studentId: params.studentId, note: newNote }),
      });
      setNewNote("");
      loadNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Not eklenemedi.");
    }
  }

  if (!data) {
    return (
      <CurriculumShell title="Öğrenci Raporu">
        <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
      </CurriculumShell>
    );
  }

  const { student, report } = data;

  return (
    <CurriculumShell title="Öğrenci Raporu">
      <Link href="/yonetici/ogrenciler" className="text-sm font-semibold text-beaker hover:underline">
        ← Öğrenci Listesine Dön
      </Link>
      <h2 className="mt-2 font-display text-xl font-bold">
        {student.firstName} {student.lastName} — {student.classLevel}. Sınıf
      </h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
        <Card className="flex justify-center">
          <DevelopmentScoreGauge score={report.developmentScore} />
        </Card>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="border-beaker/30 bg-beaker/5">
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">ÇÖZÜLEN SORU</p>
              <p className="mt-1 font-display text-2xl font-bold text-beaker">{report.totalAnswered}</p>
            </Card>
            <Card className="border-leaf/30 bg-leaf/5">
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">DOĞRU</p>
              <p className="mt-1 font-display text-2xl font-bold text-leaf">{report.correctCount}</p>
            </Card>
            <Card className="border-reaction-dark/30 bg-reaction-dark/5">
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">YANLIŞ</p>
              <p className="mt-1 font-display text-2xl font-bold text-reaction-dark">{report.wrongCount}</p>
            </Card>
          </div>
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
      </div>

      <Card className="mt-6">
        <h3 className="font-display text-sm font-semibold">Haftalık Gelişim</h3>
        <TrendChart data={report.weeklyChart} dataKeyLabel="Çözülen Soru" />
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-display text-sm font-semibold text-leaf">🏆 Güçlü Konular</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {report.strongestTopics.map((t) => (
              <li key={t.topicId} className="flex justify-between">
                <span>{t.title}</span>
                <span className="font-mono text-leaf">%{t.successRate}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h3 className="font-display text-sm font-semibold text-reaction-dark">⚠️ Zayıf Konular</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {report.weakestTopics.map((t) => (
              <li key={t.topicId} className="flex justify-between">
                <span>{t.title}</span>
                <span className="font-mono text-reaction-dark">%{t.successRate}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <h3 className="font-display text-sm font-semibold">📝 Öğrenci Hakkında Not Ekle</h3>
        <p className="mt-1 text-xs text-lab-inkMuted dark:text-lab-paper/50">Bu not, öğrencinin velisine bildirim olarak iletilir.</p>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          rows={3}
          className="mt-2 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        {error && <p className="mt-1 text-sm text-reaction-dark">{error}</p>}
        <button onClick={handleAddNote} className="mt-2 rounded-full bg-beaker px-5 py-2 text-sm font-semibold text-white hover:bg-beaker-dark">
          Notu Ekle
        </button>

        <div className="mt-4 space-y-2">
          {notes.map((n) => (
            <div key={n.id} className="rounded-lg border border-lab-paperLine p-3 text-sm dark:border-white/10">
              <p>{n.note}</p>
              <p className="mt-1 text-xs text-lab-inkMuted dark:text-lab-paper/50">{new Date(n.createdAt).toLocaleDateString("tr-TR")}</p>
            </div>
          ))}
        </div>
      </Card>
    </CurriculumShell>
  );
}
