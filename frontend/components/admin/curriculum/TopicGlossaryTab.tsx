"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { GlossaryTerm } from "@/types/curriculum";

export function TopicGlossaryTab({
  topicId,
  terms,
  onChanged,
}: {
  topicId: string;
  terms: GlossaryTerm[];
  onChanged: () => void;
}) {
  const { accessToken } = useAuth();
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    if (!accessToken || !term.trim() || !definition.trim()) return;
    setError(null);
    try {
      await apiFetch("/kavramlar", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ topicId, term, definition }),
      });
      setTerm("");
      setDefinition("");
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kavram eklenemedi.");
    }
  }

  async function handleDelete(id: string) {
    if (!accessToken) return;
    await apiFetch(`/kavramlar/${id}`, { method: "DELETE", token: accessToken });
    onChanged();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
        <h3 className="font-semibold">Yeni Kavram Ekle</h3>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Kavram adı"
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        <textarea
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          placeholder="Tanım"
          rows={2}
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        {error && <p className="text-sm text-reaction-dark">{error}</p>}
        <button onClick={handleAdd} className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark">
          + Kavram Ekle
        </button>
      </div>

      <ul className="space-y-2">
        {terms.map((t) => (
          <li key={t.id} className="rounded-lg border border-lab-paperLine px-3 py-2 dark:border-white/10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-semibold">{t.term}</span>
                <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">{t.definition}</p>
              </div>
              <button onClick={() => handleDelete(t.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
