"use client";

import { useEffect, useState } from "react";
import { RequireRole } from "@/components/auth/RequireRole";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { DevelopmentScoreGauge } from "@/components/analysis/DevelopmentScoreGauge";
import { TrendChart } from "@/components/analysis/TrendChart";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { AnalysisReport } from "@/types/analysis";

const NAV_ITEMS = [
  { href: "/ogrenci", label: "Genel Bakış", icon: "🏠" },
  { href: "/ogrenci/analiz", label: "Gelişim Analizim", icon: "📈" },
  { href: "/ogrenci/takvim", label: "Çalışma Takvimim", icon: "🗓️" },
  { href: "/ogrenci/odevlerim", label: "Ödevlerim", icon: "📚" },
  { href: "/ogrenci/favorilerim", label: "Favorilerim", icon: "⭐" },
  { href: "/ogrenci/yanlislarim", label: "Yanlışlarım", icon: "📌" },
  { href: "/ogrenci/istatistiklerim", label: "İstatistiklerim", icon: "📊" },
  { href: "/ogrenci/laboratuvar-gecmisim", label: "Laboratuvar Geçmişim", icon: "🧪" },
  { href: "/liderlik-tablosu", label: "Liderlik Tablosu", icon: "🏆" },
];

export default function AnalysisPage() {
  return (
    <RequireRole roles={["STUDENT"]}>
      <AnalysisContent />
    </RequireRole>
  );
}

function AnalysisContent() {
  const { accessToken } = useAuth();
  const [report, setReport] = useState<AnalysisReport | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    apiFetch<AnalysisReport>("/analiz/benim", { token: accessToken }).then((res) => setReport(res.data ?? null));
  }, [accessToken]);

  return (
    <DashboardShell title="Öğrenci Paneli" navItems={NAV_ITEMS}>
      <h1 className="font-display text-2xl font-bold">📈 Gelişim Analizim</h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Yapay zekâ destekli analiz motorunun senin için hazırladığı ayrıntılı başarı profili.
      </p>

      {!report ? (
        <p className="mt-6 text-sm text-lab-inkMuted">Yükleniyor...</p>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
            <Card className="flex justify-center">
              <DevelopmentScoreGauge score={report.developmentScore} />
            </Card>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Card>
                <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">TAMAMLANAN KONU</p>
                <p className="mt-1 font-display text-2xl font-bold">{report.completedTopicsCount}</p>
              </Card>
              <Card>
                <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">TOPLAM ÇALIŞMA</p>
                <p className="mt-1 font-display text-2xl font-bold">{report.totalStudyMinutes} dk</p>
              </Card>
              <Card>
                <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">ORT. ÇÖZÜM SÜRESİ</p>
                <p className="mt-1 font-display text-2xl font-bold">{report.avgSecondsPerQuestion} sn</p>
              </Card>
              <Card>
                <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">BAŞARI ORANI</p>
                <p className="mt-1 font-display text-2xl font-bold text-beaker-dark dark:text-beaker-light">
                  %{report.successPercent}
                </p>
              </Card>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <h3 className="font-display text-sm font-semibold">Günlük Başarı (7 gün)</h3>
              <TrendChart data={report.dailyChart} dataKeyLabel="Çözülen Soru" color="#0EA5A0" />
            </Card>
            <Card>
              <h3 className="font-display text-sm font-semibold">Haftalık Gelişim (8 hafta)</h3>
              <TrendChart data={report.weeklyChart} dataKeyLabel="Çözülen Soru" color="#F5A623" />
            </Card>
            <Card>
              <h3 className="font-display text-sm font-semibold">Aylık İlerleme (6 ay)</h3>
              <TrendChart data={report.monthlyChart} dataKeyLabel="Çözülen Soru" color="#8B5CF6" />
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <h3 className="font-display text-sm font-semibold text-leaf">🏆 En Güçlü Konular</h3>
              <ul className="mt-3 space-y-2">
                {report.strongestTopics.length === 0 && <p className="text-sm text-lab-inkMuted">Henüz yeterli veri yok.</p>}
                {report.strongestTopics.map((t) => (
                  <li key={t.topicId} className="flex items-center justify-between text-sm">
                    <span>{t.title}</span>
                    <span className="font-mono text-leaf">%{t.successRate}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="font-display text-sm font-semibold text-reaction-dark">⚠️ Geliştirilmesi Gereken Konular</h3>
              <ul className="mt-3 space-y-2">
                {report.weakestTopics.length === 0 && <p className="text-sm text-lab-inkMuted">Henüz yeterli veri yok.</p>}
                {report.weakestTopics.map((t) => (
                  <li key={t.topicId} className="flex items-center justify-between text-sm">
                    <span>{t.title}</span>
                    <span className="font-mono text-reaction-dark">%{t.successRate}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {report.outcomeRates.length > 0 && (
            <Card>
              <h3 className="font-display text-sm font-semibold">🎯 Kazanım Bazlı Başarı Oranları</h3>
              <ul className="mt-3 space-y-2">
                {report.outcomeRates.map((o) => (
                  <li key={o.learningOutcomeId}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-lab-inkMuted dark:text-lab-paper/60">{o.description}</span>
                      <span className="font-mono">%{o.successRate}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-lab-paperLine dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-beaker"
                        style={{ width: `${o.successRate}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <h3 className="font-display text-sm font-semibold">📝 Deneme Performansı</h3>
              <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">
                Toplam {report.examPerformance.totalExams} deneme · Ortalama başarı %{report.examPerformance.averageSuccess}
              </p>
              <ul className="mt-3 space-y-1.5">
                {report.examPerformance.recentResults.map((r, i) => (
                  <li key={i} className="flex items-center justify-between text-xs">
                    <span>{r.examTitle}</span>
                    <span className="font-mono">%{r.successPercent}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="font-display text-sm font-semibold">🎮 Oyun Başarıları</h3>
              <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">
                Toplam {report.gamePerformance.totalGamesPlayed} oyun · Ortalama skor {report.gamePerformance.averageScore}
              </p>
              {report.gamePerformance.bestGame && (
                <p className="mt-2 text-xs text-lab-inkMuted dark:text-lab-paper/50">
                  En iyi skor: {report.gamePerformance.bestGame.score} puan
                  {report.gamePerformance.bestGame.game ? ` (${report.gamePerformance.bestGame.game.title})` : ""}
                </p>
              )}
            </Card>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
