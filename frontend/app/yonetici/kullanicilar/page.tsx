"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";

export default function AdminUsersPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold">Kullanıcılar</h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Öğrenci, öğretmen ve yönetici hesaplarını burada yönetebileceksin.
      </p>

      <div className="mt-6">
        <EmptyPanelState
          title="Kullanıcı listesi yüklenecek"
          description="Bu ekran, /api/kullanicilar uç noktasına bağlanarak kayıtlı kullanıcıları listeleyecek şekilde bir sonraki aşamada geliştirilecek."
        />
      </div>
    </AdminShell>
  );
}
