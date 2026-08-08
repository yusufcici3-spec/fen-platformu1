"use client";

import { useEffect, useState, useCallback } from "react";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

interface Announcement {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  classLevel: number | null;
  createdAt: string;
}

export default function AdminAnnouncementsPage() {
  const { accessToken } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [classLevel, setClassLevel] = useState<number | "">("");
  const [isPinned, setIsPinned] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await apiFetch<Announcement[]>("/duyurular", { token: accessToken ?? undefined });
    setAnnouncements(res.data ?? []);
  }, [accessToken]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate() {
    if (!accessToken) return;
    if (title.trim().length < 3) return setError("Duyuru başlığı en az 3 karakter olmalı.");
    if (content.trim().length < 3) return setError("Duyuru içeriği gerekli.");

    setError(null);
    setIsSaving(true);
    try {
      await apiFetch("/duyurular", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ title, content, isPinned, classLevel: classLevel || undefined }),
      });
      setTitle("");
      setContent("");
      setIsPinned(false);
      setClassLevel("");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Duyuru oluşturulamadı.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!accessToken) return;
    if (!confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) return;
    await apiFetch(`/duyurular/${id}`, { method: "DELETE", token: accessToken });
    load();
  }

  return (
    <CurriculumShell title="Duyurular">
      <div className="space-y-4 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
        <h3 className="font-display text-lg font-semibold">Yeni Duyuru Oluştur</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Duyuru başlığı"
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Duyuru içeriği"
          rows={3}
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value ? Number(e.target.value) : "")}
            className="rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          >
            <option value="">Herkese Göster</option>
            {[5, 6, 7, 8].map((lvl) => (
              <option key={lvl} value={lvl}>
                Sadece {lvl}. Sınıf
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} className="accent-beaker" />
            Sabitle
          </label>
        </div>
        {error && <p className="text-sm text-reaction-dark">{error}</p>}
        <button
          onClick={handleCreate}
          disabled={isSaving}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
        >
          {isSaving ? "Gönderiliyor..." : "Duyuruyu Yayınla"}
        </button>
      </div>

      <div className="mt-6">
        {announcements.length === 0 ? (
          <EmptyPanelState title="Henüz duyuru eklenmedi" description="Yukarıdaki formu kullanarak ilk duyurunu oluşturabilirsin." />
        ) : (
          <div className="space-y-2">
            {announcements.map((a) => (
              <div key={a.id} className="rounded-lg border border-lab-paperLine p-4 dark:border-white/10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {a.isPinned && <span className="text-xs">📌</span>}
                      <h4 className="font-semibold">{a.title}</h4>
                      {a.classLevel && (
                        <span className="rounded-full bg-beaker/10 px-2 py-0.5 text-xs text-beaker-dark dark:text-beaker-light">
                          {a.classLevel}. Sınıf
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">{a.content}</p>
                  </div>
                  <button onClick={() => handleDelete(a.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CurriculumShell>
  );
}
