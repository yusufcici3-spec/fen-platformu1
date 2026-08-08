"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { slugify } from "@/lib/slugify";
import { TopicDetail } from "@/types/curriculum";

export function TopicGeneralTab({ topic, onSaved }: { topic: TopicDetail; onSaved: () => void }) {
  const { accessToken } = useAuth();
  const [title, setTitle] = useState(topic.title);
  const [slug, setSlug] = useState(topic.slug);
  const [summary, setSummary] = useState(topic.summary ?? "");
  const [isPublished, setIsPublished] = useState(topic.isPublished);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSave() {
    if (!accessToken) return;
    setIsSaving(true);
    setMessage(null);
    try {
      await apiFetch(`/konular/${topic.id}`, {
        method: "PUT",
        token: accessToken,
        body: JSON.stringify({ title, slug, summary: summary || undefined, isPublished }),
      });
      setMessage("Kaydedildi.");
      onSaved();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Konu Başlığı</label>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(slugify(e.target.value));
          }}
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Slug (URL)</label>
        <input
          value={slug}
          onChange={(e) => setSlug(slugify(e.target.value))}
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm font-mono outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Kısa Özet</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 rounded border-lab-paperLine accent-beaker"
        />
        Yayınla (öğrenciler görebilsin)
      </label>

      {message && <p className="text-sm text-leaf">{message}</p>}

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
      >
        {isSaving ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
}
