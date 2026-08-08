"use client";

import { useState } from "react";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { QuestionForm } from "@/components/admin/questions/QuestionForm";
import { QuestionFilterList } from "@/components/admin/questions/QuestionFilterList";
import { BulkImportPanel } from "@/components/admin/questions/BulkImportPanel";
import { Question } from "@/types/questions";

export default function AdminQuestionsPage() {
  const [view, setView] = useState<"list" | "form" | "import">("list");
  const [editing, setEditing] = useState<Question | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleNew() {
    setEditing(undefined);
    setView("form");
  }

  function handleEdit(q: Question) {
    setEditing(q);
    setView("form");
  }

  function handleSaved() {
    setView("list");
    setRefreshKey((k) => k + 1);
  }

  return (
    <CurriculumShell title="Soru Bankası">
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={handleNew}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
        >
          + Yeni Soru
        </button>
        <button
          onClick={() => setView("import")}
          className="rounded-full border border-lab-paperLine px-5 py-2.5 text-sm font-semibold dark:border-white/10"
        >
          📥 Toplu İçe Aktar
        </button>
        {view !== "list" && (
          <button
            onClick={() => setView("list")}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-lab-inkMuted"
          >
            ← Listeye Dön
          </button>
        )}
      </div>

      {view === "form" && <QuestionForm initial={editing} onSaved={handleSaved} onCancel={() => setView("list")} />}
      {view === "import" && <BulkImportPanel onImported={() => setRefreshKey((k) => k + 1)} />}
      {view === "list" && <QuestionFilterList onEdit={handleEdit} refreshKey={refreshKey} />}
    </CurriculumShell>
  );
}
