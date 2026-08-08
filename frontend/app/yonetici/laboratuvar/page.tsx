"use client";

import { useState } from "react";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { LabExperimentForm } from "@/components/admin/labs/LabExperimentForm";
import { LabExperimentList } from "@/components/admin/labs/LabExperimentList";
import { LabExperiment } from "@/types/games";

export default function AdminLabPage() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<LabExperiment | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleNew() {
    setEditing(undefined);
    setView("form");
  }
  function handleEdit(exp: LabExperiment) {
    setEditing(exp);
    setView("form");
  }
  function handleSaved() {
    setView("list");
    setRefreshKey((k) => k + 1);
  }

  return (
    <CurriculumShell title="Sanal Laboratuvar Yönetimi">
      <div className="mb-6 flex flex-wrap gap-2">
        <button onClick={handleNew} className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark">
          + Yeni Deney
        </button>
        {view !== "list" && (
          <button onClick={() => setView("list")} className="rounded-full px-5 py-2.5 text-sm font-semibold text-lab-inkMuted">
            ← Listeye Dön
          </button>
        )}
      </div>

      {view === "form" ? (
        <LabExperimentForm initial={editing} onSaved={handleSaved} onCancel={() => setView("list")} />
      ) : (
        <LabExperimentList onEdit={handleEdit} refreshKey={refreshKey} />
      )}
    </CurriculumShell>
  );
}
