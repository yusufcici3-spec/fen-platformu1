"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RequireRole } from "@/components/auth/RequireRole";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { LabExperimentAttempt } from "@/types/games";

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

export default function LabHistoryPage() {
  return (
    <RequireRole roles={["STUDENT"]}>
      <LabHistoryContent />
    </RequireRole>
  );
}

function LabHistoryContent() {
  const { accessToken } = useAuth();
  const [attempts, setAttempts] = useState<LabExperimentAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    apiFetch<LabExperimentAttempt[]>("/deney-laboratuvari/gecmisim", { token: accessToken })
      .then((res) => setAttempts(res.data ?? []))
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  return (
    <DashboardShell title="Öğrenci Paneli" navItems={NAV_ITEMS}>
      <h1 className="font-display text-2xl font-bold">🧪 Laboratuvar Geçmişim</h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Tamamladığın sanal deneylerin geçmişi ve deney başarıların.
      </p>

      <div className="mt-6">
        {isLoading ? (
          <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
        ) : attempts.length === 0 ? (
          <EmptyPanelState title="Henüz deney tamamlamadın" description="Sanal laboratuvara giderek ilk deneyini yapabilirsin." />
        ) : (
          <div className="space-y-2">
            {attempts.map((a) => (
              <Link
                key={a.id}
                href={`/laboratuvar/${a.labExperiment.slug}`}
                className="flex items-center justify-between rounded-card border border-lab-paperLine bg-white p-4 transition hover:border-beaker dark:border-white/10 dark:bg-lab-inkSoft"
              >
                <div>
                  <p className="font-semibold">{a.labExperiment.title}</p>
                  <p className="text-xs text-lab-inkMuted dark:text-lab-paper/50">
                    {a.labExperiment.classLevel}. Sınıf · {new Date(a.completedAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <span className="text-leaf">✓ Tamamlandı</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
