"use client";

import { ReactNode } from "react";
import { RequireRole } from "@/components/auth/RequireRole";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const ADMIN_NAV_ITEMS = [
  { href: "/yonetici", label: "Genel Bakış", icon: "🏠" },
  { href: "/yonetici/konular", label: "Konular", icon: "📘" },
  { href: "/yonetici/sorular", label: "Sorular", icon: "❓" },
  { href: "/yonetici/oyunlar", label: "Oyunlar", icon: "🎮" },
  { href: "/yonetici/laboratuvar", label: "Sanal Laboratuvar", icon: "🧪" },
  { href: "/yonetici/rozetler", label: "Rozetler", icon: "🏅" },
  { href: "/yonetici/denemeler", label: "Denemeler", icon: "📝" },
  { href: "/yonetici/ogrenciler", label: "Öğrenci Raporları", icon: "📈" },
  { href: "/yonetici/odevler", label: "Ödevler", icon: "📚" },
  { href: "/yonetici/kullanicilar", label: "Kullanıcılar", icon: "👥" },
  { href: "/yonetici/duyurular", label: "Duyurular", icon: "📢" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <RequireRole roles={["ADMIN"]}>
      <DashboardShell title="Yönetici Paneli" navItems={ADMIN_NAV_ITEMS}>
        {children}
      </DashboardShell>
    </RequireRole>
  );
}
