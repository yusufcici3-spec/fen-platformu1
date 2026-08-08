"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";

export default function AdminOverviewPage() {
  return (
    <AdminShell>
      <h1 className="font-display text-2xl font-bold">Yönetici Genel Bakış</h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Platformun genel durumunu buradan takip edebilirsin.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "TOPLAM KULLANICI", value: 0 },
          { label: "YAYINLANAN KONU", value: 0 },
          { label: "SORU BANKASI", value: 0 },
          { label: "AKTİF DENEME", value: 0 },
        ].map((stat) => (
          <Card key={stat.label}>
            <p className="text-xs font-mono text-lab-inkMuted dark:text-lab-paper/50">{stat.label}</p>
            <p className="mt-1 font-display text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
