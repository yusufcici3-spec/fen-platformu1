"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Question, QuestionType, Difficulty } from "@/types/questions";

const TYPE_LABELS: Record<QuestionType, string> = {
  MULTIPLE_CHOICE: "Çoktan Seçmeli",
  TRUE_FALSE: "Doğru/Yanlış",
  FILL_BLANK: "Boşluk Doldurma",
  MATCHING: "Eşleştirme",
  OPEN_ENDED: "Açık Uçlu",
  DRAG_DROP: "Sürükle Bırak",
  INTERACTIVE: "İnteraktif",
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = { EASY: "Kolay", MEDIUM: "Orta", HARD: "Zor" };

export function QuestionFilterList({
  onEdit,
  refreshKey,
}: {
  onEdit: (q: Question) => void;
  refreshKey: number;
}) {
  const { accessToken } = useAuth();
  const [classLevel, setClassLevel] = useState<number | "">("");
  const [type, setType] = useState<QuestionType | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Question[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({ page: String(page), pageSize: "15" });
    if (classLevel) params.set("classLevel", String(classLevel));
    if (type) params.set("type", type);
    if (difficulty) params.set("difficulty", difficulty);
    if (q) params.set("q", q);

    try {
      const res = await apiFetch<{ items: Question[]; total: number }>(`/sorular?${params.toString()}`, {
        token: accessToken ?? undefined,
      });
      setItems(res.data?.items ?? []);
      setTotal(res.data?.total ?? 0);
    } finally {
      setIsLoading(false);
    }
  }, [classLevel, type, difficulty, q, page, accessToken]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  async function handleDelete(id: string) {
    if (!accessToken) return;
    if (!confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;
    await apiFetch(`/sorular/${id}`, { method: "DELETE", token: accessToken });
    load();
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <select
          value={classLevel}
          onChange={(e) => {
            setPage(1);
            setClassLevel(e.target.value ? Number(e.target.value) : "");
          }}
          className="rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        >
          <option value="">Tüm Sınıflar</option>
          {[5, 6, 7, 8].map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}. Sınıf
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => {
            setPage(1);
            setType(e.target.value as QuestionType | "");
          }}
          className="rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        >
          <option value="">Tüm Tipler</option>
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={difficulty}
          onChange={(e) => {
            setPage(1);
            setDifficulty(e.target.value as Difficulty | "");
          }}
          className="rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        >
          <option value="">Tüm Zorluklar</option>
          {Object.entries(DIFFICULTY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <input
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
          placeholder="Soru metninde ara..."
          className="min-w-[200px] flex-1 rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <div className="mt-4 space-y-2">
        {isLoading ? (
          <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Kriterlere uyan soru bulunamadı.</p>
        ) : (
          items.map((question) => (
            <div
              key={question.id}
              className="flex items-center gap-3 rounded-lg border border-lab-paperLine px-4 py-3 dark:border-white/10"
            >
              <span className="rounded-full bg-beaker/10 px-2 py-0.5 text-xs font-semibold text-beaker-dark dark:text-beaker-light">
                {TYPE_LABELS[question.type]}
              </span>
              <span className="rounded-full bg-lab-paperLine/60 px-2 py-0.5 text-xs dark:bg-white/10">
                {DIFFICULTY_LABELS[question.difficulty]}
              </span>
              {question.topic && (
                <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">{question.topic.title}</span>
              )}
              <span className="flex-1 truncate text-sm">{question.body}</span>
              <button onClick={() => onEdit(question)} className="text-xs font-semibold text-beaker hover:underline">
                Düzenle
              </button>
              <button onClick={() => handleDelete(question.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
                Sil
              </button>
            </div>
          ))
        )}
      </div>

      {total > 15 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-full border border-lab-paperLine px-3 py-1.5 text-sm disabled:opacity-40 dark:border-white/10"
          >
            ← Önceki
          </button>
          <span className="text-sm text-lab-inkMuted">
            Sayfa {page} / {Math.ceil(total / 15)}
          </span>
          <button
            disabled={page >= Math.ceil(total / 15)}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full border border-lab-paperLine px-3 py-1.5 text-sm disabled:opacity-40 dark:border-white/10"
          >
            Sonraki →
          </button>
        </div>
      )}
    </div>
  );
}
