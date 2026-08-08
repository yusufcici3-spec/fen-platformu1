"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { RequireRole } from "@/components/auth/RequireRole";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { StudyPlanItem, WeeklyGoal } from "@/types/analysis";
import { Exam } from "@/types/questions";

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

const TYPE_ICONS: Record<string, string> = {
  TOPIC_REVIEW: "📘",
  QUESTION_PRACTICE: "❓",
  EXAM: "📝",
  EXPERIMENT: "🧪",
  GAME: "🎮",
};

const TYPE_LINKS: Record<string, (item: StudyPlanItem) => string> = {
  TOPIC_REVIEW: (item) =>
    item.topic?.unit?.class && item.topic.unit
      ? `/sinif/${item.topic.unit.class.level}/${item.topic.unit.slug}/${item.topic.slug}`
      : "/oyunlar",
  QUESTION_PRACTICE: (item) => (item.topicId ? `/pratik?topicId=${item.topicId}` : "/pratik"),
  EXAM: () => "/denemeler",
  EXPERIMENT: () => "/laboratuvar",
  GAME: () => "/oyunlar",
};

export default function CalendarPage() {
  return (
    <RequireRole roles={["STUDENT"]}>
      <CalendarContent />
    </RequireRole>
  );
}

function CalendarContent() {
  const { accessToken, user } = useAuth();
  const [plan, setPlan] = useState<StudyPlanItem[]>([]);
  const [goal, setGoal] = useState<WeeklyGoal | null>(null);
  const [upcomingExams, setUpcomingExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    if (!accessToken) return;
    setIsLoading(true);
    const [planRes, goalRes, examsRes] = await Promise.all([
      apiFetch<StudyPlanItem[]>("/calisma-plani/gunluk", { token: accessToken }),
      apiFetch<WeeklyGoal>("/calisma-plani/haftalik", { token: accessToken }),
      apiFetch<Exam[]>(`/denemeler?classLevel=${user?.classLevel ?? ""}`),
    ]);
    setPlan(planRes.data ?? []);
    setGoal(goalRes.data ?? null);
    setUpcomingExams((examsRes.data ?? []).slice(0, 5));
    setIsLoading(false);
  }, [accessToken, user?.classLevel]);

  useEffect(() => {
    load();
  }, [load]);

  async function completeItem(itemId: string) {
    if (!accessToken) return;
    await apiFetch(`/calisma-plani/gunluk/${itemId}/tamamla`, { method: "POST", token: accessToken });
    setPlan((prev) => prev.map((p) => (p.id === itemId ? { ...p, isCompleted: true } : p)));
  }

  return (
    <DashboardShell title="Öğrenci Paneli" navItems={NAV_ITEMS}>
      <h1 className="font-display text-2xl font-bold">🗓️ Çalışma Takvimim</h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Yapay zekânın senin için hazırladığı günlük plan ve haftalık hedefler.
      </p>

      {isLoading ? (
        <p className="mt-6 text-sm text-lab-inkMuted">Yükleniyor...</p>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <h2 className="font-display text-lg font-semibold">Bugünkü Çalışma Planı</h2>
              <div className="mt-4 space-y-3">
                {plan.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                      item.isCompleted ? "border-leaf/40 bg-leaf/5" : "border-lab-paperLine dark:border-white/10"
                    }`}
                  >
                    <span className="text-xl">{TYPE_ICONS[item.type]}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${item.isCompleted ? "text-leaf line-through" : ""}`}>{item.title}</p>
                      {item.description && (
                        <p className="text-xs text-lab-inkMuted dark:text-lab-paper/50">{item.description}</p>
                      )}
                      <p className="text-xs text-lab-inkMuted dark:text-lab-paper/40">~{item.estimatedMinutes} dakika</p>
                    </div>
                    {!item.isCompleted ? (
                      <div className="flex gap-2">
                        <Link
                          href={TYPE_LINKS[item.type]?.(item) ?? "/"}
                          className="rounded-full bg-beaker px-3 py-1.5 text-xs font-semibold text-white hover:bg-beaker-dark"
                        >
                          Başla
                        </Link>
                        <button
                          onClick={() => completeItem(item.id)}
                          className="rounded-full border border-lab-paperLine px-3 py-1.5 text-xs font-semibold dark:border-white/10"
                        >
                          ✓
                        </button>
                      </div>
                    ) : (
                      <span className="text-leaf">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="mt-6">
              <h2 className="font-display text-lg font-semibold">📅 Yaklaşan Sınavlar</h2>
              {upcomingExams.length === 0 ? (
                <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">Şu anda yaklaşan bir deneme yok.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {upcomingExams.map((e) => (
                    <li key={e.id}>
                      <Link
                        href={`/denemeler/${e.id}`}
                        className="flex items-center justify-between rounded-lg border border-lab-paperLine px-4 py-2.5 text-sm hover:border-beaker dark:border-white/10"
                      >
                        <span>{e.title}</span>
                        <span className="text-xs text-lab-inkMuted">{e.durationMin} dk</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>

          <div>
            <Card>
              <h2 className="font-display text-lg font-semibold">🎯 Haftalık Hedefler</h2>
              {goal && (
                <div className="mt-4 space-y-4">
                  <GoalBar label="Soru Çözme" achieved={goal.achievedQuestions} target={goal.targetQuestions} />
                  <GoalBar label="Konu Tamamlama" achieved={goal.achievedTopics} target={goal.targetTopics} />
                  <GoalBar label="Çalışma Süresi (dk)" achieved={goal.achievedMinutes} target={goal.targetMinutes} />
                </div>
              )}
            </Card>

            <Card className="mt-6 text-center">
              <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">ÇALIŞMA SERİN</p>
              <p className="mt-1 text-3xl font-bold">🔥 {user?.currentStreak ?? 0} gün</p>
              <p className="mt-1 text-xs text-lab-inkMuted dark:text-lab-paper/50">
                Serini korumak için her gün en az bir aktivite tamamla.
              </p>
            </Card>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function GoalBar({ label, achieved, target }: { label: string; achieved: number; target: number }) {
  const percent = target > 0 ? Math.min(100, Math.round((achieved / target) * 100)) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span>{label}</span>
        <span className="font-mono">
          {achieved} / {target}
        </span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-lab-paperLine dark:bg-white/10">
        <div className={`h-full rounded-full ${percent >= 100 ? "bg-leaf" : "bg-beaker"}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
