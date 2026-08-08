"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

interface ImportSummary {
  created: number;
  failed: number;
  errors: { row: number; message: string }[];
}

export function BulkImportPanel({ onImported }: { onImported: () => void }) {
  const { accessToken } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload() {
    const file = fileInputRef.current?.files?.[0];
    if (!file || !accessToken) return;
    setIsUploading(true);
    setError(null);
    setSummary(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_URL}/sorular/toplu-yukle`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message ?? "İçe aktarma başarısız.");

      setSummary(json.data);
      onImported();
    } catch (err) {
      setError(err instanceof Error ? err.message : "İçe aktarma başarısız.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <h3 className="font-display text-lg font-semibold">📥 Excel / CSV ile Toplu Soru Yükle</h3>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Beklenen sütunlar: <code className="font-mono">topicSlug, type, body, correctAnswer, option1..4,
        difficulty, points, explanation, tags, estimatedTimeSec</code>. İlk satır başlık olmalıdır.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls" />
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
        >
          {isUploading ? "Yükleniyor..." : "Dosyayı Yükle"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-reaction-dark">{error}</p>}

      {summary && (
        <div className="mt-4 rounded-lg border border-lab-paperLine p-4 text-sm dark:border-white/10">
          <p>
            <strong className="text-leaf">{summary.created}</strong> soru başarıyla eklendi,{" "}
            <strong className="text-reaction-dark">{summary.failed}</strong> satır atlandı.
          </p>
          {summary.errors.length > 0 && (
            <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto text-xs text-reaction-dark">
              {summary.errors.map((e, i) => (
                <li key={i}>
                  Satır {e.row}: {e.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
