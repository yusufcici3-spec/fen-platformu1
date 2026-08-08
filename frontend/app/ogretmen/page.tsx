"use client";

import { RequireRole } from "@/components/auth/RequireRole";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card } from "@/components/ui/Card";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/ogretmen", label: "Genel Bakış", icon: "🏠" },
];

export default function TeacherPanelPage() {
  return (
    <RequireRole roles={["TEACHER"]}>
      <TeacherPanelContent />
    </RequireRole>
  );
}

function TeacherPanelContent() {
  const { user } = useAuth();

  return (
    <DashboardShell title="Öğretmen Paneli" navItems={NAV_ITEMS}>
      <h1 className="font-display text-2xl font-bold">
        Hoş geldin, {user?.firstName}! 🧑‍🏫
      </h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Konu ve soru oluşturma araçların burada yer alacak.
      </p>

      <Link
        href="/yonetici/konular"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-beaker-dark"
      >
        📘 Konu Yönetim Sistemine Git
      </Link>
      <Link
        href="/yonetici/sorular"
        className="mt-4 ml-3 inline-flex items-center gap-2 rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
      >
        ❓ Soru Bankasına Git
      </Link>
      <Link
        href="/yonetici/denemeler"
        className="mt-4 ml-3 inline-flex items-center gap-2 rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
      >
        📝 Denemeleri Yönet
      </Link>
      <Link
        href="/yonetici/oyunlar"
        className="mt-4 ml-3 inline-flex items-center gap-2 rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
      >
        🎮 Oyunları Yönet
      </Link>
      <Link
        href="/yonetici/laboratuvar"
        className="mt-4 ml-3 inline-flex items-center gap-2 rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
      >
        🧪 Sanal Laboratuvarı Yönet
      </Link>
      <Link
        href="/yonetici/ogrenciler"
        className="mt-4 ml-3 inline-flex items-center gap-2 rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
      >
        📈 Öğrenci Gelişim Raporları
      </Link>
      <Link
        href="/yonetici/odevler"
        className="mt-4 ml-3 inline-flex items-center gap-2 rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
      >
        📚 Ödev Ver
      </Link>
      <Link
        href="/yonetici/duyurular"
        className="mt-4 ml-3 inline-flex items-center gap-2 rounded-full border border-beaker px-5 py-2.5 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
      >
        📢 Duyuru Gönder
      </Link>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">OLUŞTURULAN KONU</p>
          <p className="mt-1 font-display text-3xl font-bold">0</p>
        </Card>
        <Card>
          <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">OLUŞTURULAN SORU</p>
          <p className="mt-1 font-display text-3xl font-bold">0</p>
        </Card>
        <Card>
          <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">TAKİP EDİLEN ÖĞRENCİ</p>
          <p className="mt-1 font-display text-3xl font-bold">0</p>
        </Card>
      </div>

      <div className="mt-8">
        <EmptyPanelState
          title="Henüz içerik oluşturmadın"
          description="Konu ve soru oluşturma araçları bir sonraki aşamada bu panele eklenecek."
        />
      </div>
    </DashboardShell>
  );
}
