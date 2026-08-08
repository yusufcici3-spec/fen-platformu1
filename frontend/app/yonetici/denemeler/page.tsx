"use client";

import { useState } from "react";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { ExamForm } from "@/components/admin/exams/ExamForm";
import { ExamManagementList } from "@/components/admin/exams/ExamManagementList";
import { Exam } from "@/types/questions";

export default function AdminExamsPage() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<Exam | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleNew() {
    setEditing(undefined);
    setView("form");
  }

  function handleEdit(exam: Exam) {
    setEditing(exam);
    setView("form");
  }

  function handleSaved() {
    setView("list");
    setRefreshKey((k) => k + 1);
  }

  return (
    <CurriculumShell title="Deneme Sınavları">
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={handleNew}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
        >
          + Yeni Deneme
        </button>
        {view !== "list" && (
          <button onClick={() => setView("list")} className="rounded-full px-5 py-2.5 text-sm font-semibold text-lab-inkMuted">
            ← Listeye Dön
          </button>
        )}
      </div>

      {view === "form" ? (
        <ExamForm initial={editing} onSaved={handleSaved} onCancel={() => setView("list")} />
      ) : (
        <ExamManagementList onEdit={handleEdit} refreshKey={refreshKey} />
      )}
    </CurriculumShell>
  );
}
