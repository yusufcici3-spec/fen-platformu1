"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { LearningOutcome } from "@/types/curriculum";

export function TopicOutcomesTab({
  topicId,
  outcomes,
  onChanged,
}: {
  topicId: string;
  outcomes: LearningOutcome[];
  onChanged: () => void;
}) {
  const { accessToken } = useAuth();
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    if (!accessToken || !description.trim()) return;
    setError(null);
    try {
      await apiFetch("/kazanimlar", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ topicId, code: code || undefined, description }),
      });
      setCode("");
      setDescription("");
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kazanım eklenemedi.");
    }
  }

  async function handleDelete(id: string) {
    if (!accessToken) return;
    await apiFetch(`/kazanimlar/${id}`, { method: "DELETE", token: accessToken });
    onChanged();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
        <h3 className="font-semibold">Yeni Kazanım Ekle</h3>
        <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Kod (ör: F.5.1.1)"
            className="rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm font-mono outline-none focus:border-beaker dark:border-white/10"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Kazanım açıklaması"
            className="rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
        {error && <p className="text-sm text-reaction-dark">{error}</p>}
        <button onClick={handleAdd} className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark">
          + Kazanım Ekle
        </button>
      </div>

      <ul className="space-y-2">
        {outcomes.map((o) => (
          <li key={o.id} className="flex items-center gap-3 rounded-lg border border-lab-paperLine px-3 py-2 dark:border-white/10">
            {o.code && <span className="font-mono text-xs text-beaker-dark dark:text-beaker-light">{o.code}</span>}
            <span className="flex-1 text-sm">{o.description}</span>
            <button onClick={() => handleDelete(o.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
