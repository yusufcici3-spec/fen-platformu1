"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RequireRole } from "@/components/auth/RequireRole";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { DailyChallengesWidget } from "@/components/student/DailyChallengesWidget";
import { BadgesWidget } from "@/components/student/BadgesWidget";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { MyStats, Suggestions } from "@/types/questions";

export const STUDENT_NAV_ITEMS = [
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

export default function StudentPanelPage() {
  return (
    <RequireRole roles={["STUDENT"]}>
      <StudentPanelContent />
    </RequireRole>
  );
}

function StudentPanelContent() {
  const { user, accessToken } = useAuth();
  const [stats, setStats] = useState<MyStats | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    apiFetch<MyStats>("/istatistikler/benim", { token: accessToken }).then((res) => setStats(res.data ?? null));
    apiFetch<Suggestions>("/oneriler", { token: accessToken }).then((res) => setSuggestions(res.data ?? null));
  }, [accessToken]);

  return (
    <DashboardShell title="Öğrenci Paneli" navItems={STUDENT_NAV_ITEMS}>
      <h1 className="font-display text-2xl font-bold">Merhaba, {user?.firstName}! 👋</h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        {user?.classLevel}. sınıf öğrencisisin. İlerlemen aşağıda.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">ÇÖZÜLEN SORU</p>
          <p className="mt-1 font-display text-3xl font-bold">{stats?.totalAnswered ?? 0}</p>
        </Card>
        <Card>
          <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">BAŞARI YÜZDESİ</p>
          <p className="mt-1 font-display text-3xl font-bold text-beaker-dark dark:text-beaker-light">
            %{stats?.successPercent ?? 0}
          </p>
        </Card>
        <Card>
          <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">TOPLAM PUAN</p>
          <p className="mt-1 font-display text-3xl font-bold text-reaction-dark">🔥 {user?.points ?? 0}</p>
        </Card>
        <Card>
          <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">AKTİF SERİ</p>
          <p className="mt-1 font-display text-3xl font-bold">{user?.currentStreak ?? 0} gün</p>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <DailyChallengesWidget />
        <BadgesWidget />
      </div>

      {suggestions && (
        <div className="mt-8 rounded-card border border-beaker/30 bg-beaker/5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">🎯 Günlük Hedefin</h2>
            <span className="font-mono text-sm">
              {suggestions.dailyGoal.completed} / {suggestions.dailyGoal.target}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-lab-paperLine dark:bg-white/10">
            <div
              className="h-full rounded-full bg-beaker transition-all"
              style={{ width: `${Math.min(100, (suggestions.dailyGoal.completed / suggestions.dailyGoal.target) * 100)}%` }}
            />
          </div>

          {suggestions.weakTopics.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold">Bu konularda pratik yapmanı öneririz:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {suggestions.weakTopics.map((t) => (
                  <Link
                    key={t.id}
                    href={`/pratik?topicId=${t.id}&title=${encodeURIComponent(t.title + " - Soru Çöz")}`}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-beaker-dark shadow-sm hover:bg-beaker/10 dark:bg-lab-inkSoft dark:text-beaker-light"
                  >
                    {t.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {suggestions.suggestedQuestions.length > 0 && (
            <Link
              href={`/pratik?classLevel=${user?.classLevel ?? 5}&title=${encodeURIComponent("Sana Özel Öneriler")}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
            >
              ✨ Önerilen Soruları Çöz
            </Link>
          )}
        </div>
      )}
    </DashboardShell>
  );
}
