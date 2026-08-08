"use client";

import { useEffect, useState } from "react";
import { RequireRole } from "@/components/auth/RequireRole";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { DailyChart, WeeklyChart } from "@/components/questions/StatsCharts";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { MyStats } from "@/types/questions";

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

export default function StatsPage() {
  return (
    <RequireRole roles={["STUDENT"]}>
      <StatsContent />
    </RequireRole>
  );
}

function StatsContent() {
  const { accessToken } = useAuth();
  const [stats, setStats] = useState<MyStats | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    apiFetch<MyStats>("/istatistikler/benim", { token: accessToken }).then((res) => setStats(res.data ?? null));
  }, [accessToken]);

  return (
    <DashboardShell title="Öğrenci Paneli" navItems={NAV_ITEMS}>
      <h1 className="font-display text-2xl font-bold">📊 İstatistiklerim</h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">Genel ilerlemeni ve başarı durumunu incele.</p>

      {!stats ? (
        <p className="mt-6 text-sm text-lab-inkMuted">Yükleniyor...</p>
      ) : (
        <div className="mt-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card>
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">TOPLAM ÇÖZÜLEN</p>
              <p className="mt-1 font-display text-2xl font-bold">{stats.totalAnswered}</p>
            </Card>
            <Card>
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">DOĞRU</p>
              <p className="mt-1 font-display text-2xl font-bold text-leaf">{stats.correctCount}</p>
            </Card>
            <Card>
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">YANLIŞ</p>
              <p className="mt-1 font-display text-2xl font-bold text-reaction-dark">{stats.wrongCount}</p>
            </Card>
            <Card>
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">BAŞARI YÜZDESİ</p>
              <p className="mt-1 font-display text-2xl font-bold text-beaker-dark dark:text-beaker-light">%{stats.successPercent}</p>
            </Card>
            <Card>
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">TEKRAR EDİLECEK</p>
              <p className="mt-1 font-display text-2xl font-bold">{stats.wrongQuestionCount}</p>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <h3 className="font-display text-sm font-semibold">Günlük Çözüm Grafiği (Son 7 Gün)</h3>
              <DailyChart data={stats.dailyChart} />
            </Card>
            <Card>
              <h3 className="font-display text-sm font-semibold">Haftalık Çözüm Grafiği (Son 8 Hafta)</h3>
              <WeeklyChart data={stats.weeklyChart} />
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <h3 className="font-display text-sm font-semibold text-leaf">🏆 En Başarılı Konular</h3>
              <ul className="mt-3 space-y-2">
                {stats.bestTopics.length === 0 && <p className="text-sm text-lab-inkMuted">Henüz yeterli veri yok.</p>}
                {stats.bestTopics.map((t) => (
                  <li key={t.topicId} className="flex items-center justify-between text-sm">
                    <span>{t.title}</span>
                    <span className="font-mono text-leaf">%{t.successRate}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <h3 className="font-display text-sm font-semibold text-reaction-dark">⚠️ En Çok Zorlanılan Konular</h3>
              <ul className="mt-3 space-y-2">
                {stats.weakestTopics.length === 0 && <p className="text-sm text-lab-inkMuted">Henüz yeterli veri yok.</p>}
                {stats.weakestTopics.map((t) => (
                  <li key={t.topicId} className="flex items-center justify-between text-sm">
                    <span>{t.title}</span>
                    <span className="font-mono text-reaction-dark">%{t.successRate}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
