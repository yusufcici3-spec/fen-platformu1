"use client";

import { useEffect, useState } from "react";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Badge } from "@/types/games";

export default function AdminBadgesPage() {
  const { accessToken } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🏅");
  const [error, setError] = useState<string | null>(null);

  function load() {
    apiFetch<Badge[]>("/basarimlar").then((res) => setBadges(res.data ?? []));
  }

  useEffect(load, []);

  async function handleAdd() {
    if (!accessToken || title.trim().length < 2) return setError("Rozet adı en az 2 karakter olmalı.");
    setError(null);
    try {
      await apiFetch("/basarimlar", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ title, description: description || undefined, icon }),
      });
      setTitle("");
      setDescription("");
      setIcon("🏅");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Rozet eklenemedi.");
    }
  }

  async function handleDelete(id: string) {
    if (!accessToken) return;
    if (!confirm("Bu rozeti silmek istediğinize emin misiniz?")) return;
    await apiFetch(`/basarimlar/${id}`, { method: "DELETE", token: accessToken });
    load();
  }

  return (
    <CurriculumShell title="Rozet Yönetimi">
      <div className="space-y-4 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
        <h3 className="font-display text-lg font-semibold">Yeni Rozet Ekle</h3>
        <div className="grid gap-3 sm:grid-cols-[80px_1fr]">
          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="🏅"
            className="rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-center text-lg outline-none focus:border-beaker dark:border-white/10"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Rozet adı"
            className="rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Açıklama (nasıl kazanılır?)"
          rows={2}
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        {error && <p className="text-sm text-reaction-dark">{error}</p>}
        <button onClick={handleAdd} className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark">
          + Rozet Ekle
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b) => (
          <div key={b.id} className="rounded-card border border-lab-paperLine bg-white p-4 text-center dark:border-white/10 dark:bg-lab-inkSoft">
            <span className="text-3xl">{b.icon}</span>
            <p className="mt-2 text-sm font-semibold">{b.title}</p>
            <p className="mt-1 text-xs text-lab-inkMuted dark:text-lab-paper/60">{b.description}</p>
            <button onClick={() => handleDelete(b.id)} className="mt-2 text-xs font-semibold text-reaction-dark hover:underline">
              Sil
            </button>
          </div>
        ))}
      </div>
    </CurriculumShell>
  );
}
