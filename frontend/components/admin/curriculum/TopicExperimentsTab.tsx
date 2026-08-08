"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Experiment } from "@/types/curriculum";

export function TopicExperimentsTab({
  topicId,
  experiments,
  onChanged,
}: {
  topicId: string;
  experiments: Experiment[];
  onChanged: () => void;
}) {
  const { accessToken } = useAuth();
  const [title, setTitle] = useState("");
  const [materials, setMaterials] = useState("");
  const [steps, setSteps] = useState("");
  const [safetyNotes, setSafetyNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    if (!accessToken || !title.trim() || !materials.trim() || !steps.trim()) return;
    setError(null);
    try {
      await apiFetch("/deneyler", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ topicId, title, materials, steps, safetyNotes: safetyNotes || undefined }),
      });
      setTitle("");
      setMaterials("");
      setSteps("");
      setSafetyNotes("");
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deney eklenemedi.");
    }
  }

  async function handleDelete(id: string) {
    if (!accessToken) return;
    await apiFetch(`/deneyler/${id}`, { method: "DELETE", token: accessToken });
    onChanged();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
        <h3 className="font-semibold">Yeni Deney Ekle</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Deney başlığı"
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        <textarea
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
          placeholder="Malzemeler (her satıra bir malzeme)"
          rows={3}
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="Adımlar (her satıra bir adım)"
          rows={3}
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        <textarea
          value={safetyNotes}
          onChange={(e) => setSafetyNotes(e.target.value)}
          placeholder="Güvenlik notu (opsiyonel)"
          rows={2}
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        {error && <p className="text-sm text-reaction-dark">{error}</p>}
        <button onClick={handleAdd} className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark">
          + Deney Ekle
        </button>
      </div>

      <div className="space-y-3">
        {experiments.map((exp) => (
          <div key={exp.id} className="rounded-card border border-lab-paperLine p-4 dark:border-white/10">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{exp.title}</span>
              <button onClick={() => handleDelete(exp.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
                Sil
              </button>
            </div>
            <p className="mt-1 whitespace-pre-line text-sm text-lab-inkMuted dark:text-lab-paper/60">{exp.materials}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
