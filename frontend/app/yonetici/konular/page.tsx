"use client";

import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { CurriculumManager } from "@/components/admin/curriculum/CurriculumManager";

export default function AdminTopicsPage() {
  return (
    <CurriculumShell title="Konu Yönetim Sistemi">
      <CurriculumManager />
    </CurriculumShell>
  );
}
