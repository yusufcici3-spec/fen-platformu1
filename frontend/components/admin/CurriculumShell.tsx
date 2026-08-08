"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { RequireRole } from "@/components/auth/RequireRole";
import { useAuth } from "@/context/AuthContext";

/**
 * Konu yönetim sistemi hem Yönetici hem Öğretmen tarafından kullanılabilir.
 * Bu nedenle AdminShell (yalnızca ADMIN) yerine bu ayrı kabuk kullanılır.
 */
export function CurriculumShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <RequireRole roles={["ADMIN", "TEACHER"]}>
      <CurriculumShellContent title={title}>{children}</CurriculumShellContent>
    </RequireRole>
  );
}

function CurriculumShellContent({ title, children }: { title: string; children: ReactNode }) {
  const { user } = useAuth();
  const panelHref = user?.role === "ADMIN" ? "/yonetici" : "/ogretmen";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href={panelHref} className="text-sm font-semibold text-beaker hover:underline">
        ← Panele Dön
      </Link>
      <h1 className="mt-2 font-display text-2xl font-bold">{title}</h1>
      <div className="mt-6">{children}</div>
    </div>
  );
}
