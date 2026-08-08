"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { slugify } from "@/lib/slugify";
import { Game, GameType } from "@/types/games";

const TYPE_OPTIONS: { value: GameType; label: string }[] = [
  { value: "QUIZ", label: "Fen Bilgisi Yarışması" },
  { value: "MATCHING", label: "Kavram Eşleştirme" },
  { value: "MEMORY", label: "Hafıza Kartları" },
  { value: "WORD_SEARCH", label: "Kelime Avı" },
  { value: "HANGMAN", label: "Adam Asmaca" },
  { value: "DRAG_DROP", label: "Sürükle-Bırak" },
  { value: "TRUE_FALSE_MARATHON", label: "Doğru-Yanlış Maratonu" },
  { value: "WHEEL_OF_FORTUNE", label: "Çarkıfelek" },
  { value: "SCIENCE_ADVENTURE", label: "Bilim Macerası" },
  { value: "BADGE_HUNT", label: "Rozet Avı" },
];

interface TopicOption {
  id: string;
  title: string;
}

export function GameForm({ initial, onSaved, onCancel }: { initial?: Game; onSaved: () => void; onCancel: () => void }) {
  const { accessToken } = useAuth();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [type, setType] = useState<GameType>(initial?.type ?? "QUIZ");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [classLevel, setClassLevel] = useState<number | "">(initial?.classLevel ?? "");
  const [topicId, setTopicId] = useState(initial?.topicId ?? "");
  const [isPublished, setIsPublished] = useState(initial?.isPublished ?? true);
  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    apiFetch<TopicOption[]>("/konular?limit=500").then((res) => setTopics((res.data as unknown as TopicOption[]) ?? []));
  }, []);

  async function handleSubmit() {
    if (!accessToken) return;
    if (title.trim().length < 3) return setError("Oyun başlığı en az 3 karakter olmalı.");

    setError(null);
    setIsSaving(true);
    const payload = {
      title,
      slug: initial?.slug ?? slugify(title),
      type,
      description: description || undefined,
      classLevel: classLevel || undefined,
      topicId: topicId || undefined,
      isPublished,
    };

    try {
      if (initial) {
        await apiFetch(`/oyunlar/${initial.id}`, { method: "PUT", token: accessToken, body: JSON.stringify(payload) });
      } else {
        await apiFetch("/oyunlar", { method: "POST", token: accessToken, body: JSON.stringify(payload) });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Oyun kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-4 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <h3 className="font-display text-lg font-semibold">{initial ? "Oyunu Düzenle" : "Yeni Oyun Ekle"}</h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium">Başlık *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
        <div>
          <label className="text-xs font-medium">Oyun Tipi</label>
          <select
            value={type}
            disabled={!!initial}
            onChange={(e) => setType(e.target.value as GameType)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker disabled:opacity-60 dark:border-white/10"
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium">Açıklama</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium">Sınıf (opsiyonel)</label>
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value ? Number(e.target.value) : "")}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          >
            <option value="">Belirtilmedi</option>
            {[5, 6, 7, 8].map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}. Sınıf
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium">Konu (kavram gerektiren oyunlar için)</label>
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          >
            <option value="">Belirtilmedi</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="accent-beaker" />
        Yayınla
      </label>

      {error && <p className="text-sm text-reaction-dark">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
        >
          {isSaving ? "Kaydediliyor..." : initial ? "Güncelle" : "Oyunu Ekle"}
        </button>
        <button onClick={onCancel} className="rounded-full px-5 py-2.5 text-sm font-semibold text-lab-inkMuted">
          Vazgeç
        </button>
      </div>
    </div>
  );
}
