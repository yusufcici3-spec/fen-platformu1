"use client";

import { useState } from "react";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { GameForm } from "@/components/admin/games/GameForm";
import { GameManagementList } from "@/components/admin/games/GameManagementList";
import { Game } from "@/types/games";

export default function AdminGamesPage() {
  const [view, setView] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<Game | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleNew() {
    setEditing(undefined);
    setView("form");
  }
  function handleEdit(game: Game) {
    setEditing(game);
    setView("form");
  }
  function handleSaved() {
    setView("list");
    setRefreshKey((k) => k + 1);
  }

  return (
    <CurriculumShell title="Eğitsel Oyunlar">
      <div className="mb-6 flex flex-wrap gap-2">
        <button onClick={handleNew} className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark">
          + Yeni Oyun
        </button>
        {view !== "list" && (
          <button onClick={() => setView("list")} className="rounded-full px-5 py-2.5 text-sm font-semibold text-lab-inkMuted">
            ← Listeye Dön
          </button>
        )}
      </div>

      {view === "form" ? (
        <GameForm initial={editing} onSaved={handleSaved} onCancel={() => setView("list")} />
      ) : (
        <GameManagementList onEdit={handleEdit} refreshKey={refreshKey} />
      )}
    </CurriculumShell>
  );
}
