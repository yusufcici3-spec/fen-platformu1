"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { TopicContentBlock, ContentBlockType } from "@/types/curriculum";

const TYPE_LABELS: Record<ContentBlockType, string> = {
  EXPLANATION: "Konu Anlatımı",
  IMPORTANT_INFO: "Önemli Bilgiler",
  DAILY_LIFE: "Günlük Yaşam Örneği",
};

export function TopicContentTab({
  topicId,
  contents,
  onChanged,
}: {
  topicId: string;
  contents: TopicContentBlock[];
  onChanged: () => void;
}) {
  const { accessToken } = useAuth();
  const [type, setType] = useState<ContentBlockType>("EXPLANATION");
  const [blockTitle, setBlockTitle] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleAdd() {
    if (!accessToken || !bodyHtml.trim()) return;
    setError(null);
    try {
      await apiFetch("/konu-icerikleri", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ topicId, type, title: blockTitle || undefined, bodyHtml }),
      });
      setBlockTitle("");
      setBodyHtml("");
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "İçerik eklenemedi.");
    }
  }

  async function handleDelete(id: string) {
    if (!accessToken) return;
    if (!confirm("Bu içerik bloğunu silmek istediğinize emin misiniz?")) return;
    await apiFetch(`/konu-icerikleri/${id}`, { method: "DELETE", token: accessToken });
    onChanged();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
        <h3 className="font-semibold">Yeni İçerik Bloğu Ekle</h3>

        <div className="flex flex-wrap gap-2">
          {(Object.keys(TYPE_LABELS) as ContentBlockType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                type === t ? "bg-beaker text-white" : "border border-lab-paperLine dark:border-white/10"
              }`}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        <input
          value={blockTitle}
          onChange={(e) => setBlockTitle(e.target.value)}
          placeholder="Bölüm başlığı (opsiyonel)"
          className="w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />

        <RichTextEditor value={bodyHtml} onChange={setBodyHtml} placeholder="İçeriği buraya yazın..." />

        {error && <p className="text-sm text-reaction-dark">{error}</p>}

        <button
          onClick={handleAdd}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
        >
          + Bloğu Ekle
        </button>
      </div>

      <div className="space-y-3">
        {contents.length === 0 ? (
          <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Henüz içerik bloğu eklenmedi.</p>
        ) : (
          contents.map((block) => (
            <div key={block.id} className="rounded-card border border-lab-paperLine p-4 dark:border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-beaker-dark dark:text-beaker-light">
                  {TYPE_LABELS[block.type]} {block.title && `· ${block.title}`}
                </span>
                <button onClick={() => handleDelete(block.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
                  Sil
                </button>
              </div>
              <div
                className="prose prose-sm mt-2 max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: block.bodyHtml }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
