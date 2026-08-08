"use client";

import { useEffect, useState, useCallback } from "react";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Assignment } from "@/types/analysis";

export default function AdminAssignmentsPage() {
  const { accessToken } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [classLevel, setClassLevel] = useState(5);
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const load = useCallback(async () => {
    if (!accessToken) return;
    const res = await apiFetch<Assignment[]>("/odevler/benim", { token: accessToken });
    setAssignments(res.data ?? []);
  }, [accessToken]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate() {
    if (!accessToken) return;
    if (title.trim().length < 3) return setError("Ödev başlığı en az 3 karakter olmalı.");
    if (!dueDate) return setError("Son teslim tarihi seçmelisiniz.");

    setError(null);
    setIsSaving(true);
    try {
      await apiFetch("/odevler", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ title, description: description || undefined, classLevel, dueDate }),
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ödev oluşturulamadı.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <CurriculumShell title="Ödev Yönetimi">
      <div className="space-y-4 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
        <h3 className="font-display text-lg font-semibold">Yeni Ödev Oluştur</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ödev başlığı"
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama (opsiyonel)"
          rows={3}
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(Number(e.target.value))}
            className="rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          >
            {[5, 6, 7, 8].map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}. Sınıf
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
        {error && <p className="text-sm text-reaction-dark">{error}</p>}
        <button
          onClick={handleCreate}
          disabled={isSaving}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
        >
          {isSaving ? "Oluşturuluyor..." : "Ödevi Oluştur ve Sınıfa Bildir"}
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {assignments.map((a) => (
          <div key={a.id} className="flex items-center gap-3 rounded-lg border border-lab-paperLine px-4 py-3 dark:border-white/10">
            <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">{a.classLevel}. Sınıf</span>
            <span className="flex-1 truncate text-sm font-medium">{a.title}</span>
            <span className="text-xs text-lab-inkMuted">{a._count?.submissions ?? 0} teslim</span>
            <span className="text-xs text-lab-inkMuted">Son: {new Date(a.dueDate).toLocaleDateString("tr-TR")}</span>
          </div>
        ))}
      </div>
    </CurriculumShell>
  );
}
