"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { RequireRole } from "@/components/auth/RequireRole";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Assignment } from "@/types/analysis";

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

export default function AssignmentsPage() {
  return (
    <RequireRole roles={["STUDENT"]}>
      <AssignmentsContent />
    </RequireRole>
  );
}

function AssignmentsContent() {
  const { accessToken } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    if (!accessToken) return;
    const res = await apiFetch<Assignment[]>("/odevler/sinifim", { token: accessToken });
    setAssignments(res.data ?? []);
    setIsLoading(false);
  }, [accessToken]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleComplete(id: string) {
    if (!accessToken) return;
    await apiFetch(`/odevler/${id}/tamamla`, { method: "POST", token: accessToken, body: JSON.stringify({}) });
    setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, isCompleted: true } : a)));
  }

  return (
    <DashboardShell title="Öğrenci Paneli" navItems={NAV_ITEMS}>
      <h1 className="font-display text-2xl font-bold">📚 Ödevlerim</h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">Öğretmenin sana atadığı ödevler.</p>

      <div className="mt-6">
        {isLoading ? (
          <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
        ) : assignments.length === 0 ? (
          <EmptyPanelState title="Henüz ödev yok" description="Öğretmenin yeni bir ödev verdiğinde burada görünecek." />
        ) : (
          <div className="space-y-3">
            {assignments.map((a) => {
              const isOverdue = new Date(a.dueDate) < new Date() && !a.isCompleted;
              return (
                <div
                  key={a.id}
                  className={`rounded-card border p-5 ${
                    a.isCompleted
                      ? "border-leaf/40 bg-leaf/5"
                      : isOverdue
                      ? "border-reaction/40 bg-reaction/5"
                      : "border-lab-paperLine bg-white dark:border-white/10 dark:bg-lab-inkSoft"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{a.title}</h3>
                      {a.description && <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">{a.description}</p>}
                      <p className="mt-2 text-xs text-lab-inkMuted dark:text-lab-paper/50">
                        Son teslim: {new Date(a.dueDate).toLocaleDateString("tr-TR")}
                        {a.teacher && ` · ${a.teacher.firstName} ${a.teacher.lastName}`}
                      </p>
                      {a.topic && (
                        <Link href={`/pratik?topicId=${a.topic.slug}`} className="mt-1 inline-block text-xs font-semibold text-beaker hover:underline">
                          İlgili konu: {a.topic.title}
                        </Link>
                      )}
                    </div>
                    {a.isCompleted ? (
                      <span className="text-leaf">✓ Tamamlandı</span>
                    ) : (
                      <button
                        onClick={() => handleComplete(a.id)}
                        className="whitespace-nowrap rounded-full bg-beaker px-4 py-2 text-xs font-semibold text-white hover:bg-beaker-dark"
                      >
                        Tamamladım
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
