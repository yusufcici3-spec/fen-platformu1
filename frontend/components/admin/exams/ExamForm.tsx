"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Exam, ExamType, Question } from "@/types/questions";

interface UnitOption {
  id: string;
  title: string;
}
interface TopicOption {
  id: string;
  title: string;
}

const TYPE_OPTIONS: { value: ExamType; label: string }[] = [
  { value: "TOPIC", label: "Konu Denemesi" },
  { value: "UNIT", label: "Ünite Denemesi" },
  { value: "GENERAL", label: "Genel Deneme" },
  { value: "LGS", label: "LGS Tarzı Deneme" },
];

export function ExamForm({ initial, onSaved, onCancel }: { initial?: Exam; onSaved: () => void; onCancel: () => void }) {
  const { accessToken } = useAuth();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [type, setType] = useState<ExamType>(initial?.type ?? "GENERAL");
  const [classLevel, setClassLevel] = useState(initial?.classLevel ?? 5);
  const [durationMin, setDurationMin] = useState(initial?.durationMin ?? 40);
  const [topicId, setTopicId] = useState(initial?.topicId ?? "");
  const [unitId, setUnitId] = useState(initial?.unitId ?? "");

  const [units, setUnits] = useState<UnitOption[]>([]);
  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>(
    (initial as unknown as { examQuestions?: { question: { id: string } }[] })?.examQuestions?.map((eq) => eq.question.id) ?? []
  );
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Sınıfa ait ünite/konu listelerini çek (Konu/Ünite denemesi seçildiğinde kapsam belirlemek için)
  useEffect(() => {
    apiFetch<{ id: string; level: number }[]>("/siniflar").then(async (res) => {
      const cls = res.data?.find((c) => c.level === classLevel);
      if (!cls) return;
      const unitsRes = await apiFetch<UnitOption[]>(`/uniteler?classId=${cls.id}`);
      setUnits(unitsRes.data ?? []);
    });
  }, [classLevel]);

  useEffect(() => {
    if (!unitId) return;
    apiFetch<{ topics: TopicOption[] }>(`/uniteler/${unitId}`).then((res) => setTopics(res.data?.topics ?? []));
  }, [unitId]);

  const loadQuestions = useCallback(async () => {
    const params = new URLSearchParams({ classLevel: String(classLevel), pageSize: "100" });
    if (type === "TOPIC" && topicId) params.set("topicId", topicId);
    if (type === "UNIT" && unitId) params.set("unitId", unitId);

    const res = await apiFetch<{ items: Question[] }>(`/sorular?${params.toString()}`, { token: accessToken ?? undefined });
    setAvailableQuestions(res.data?.items ?? []);
  }, [classLevel, type, topicId, unitId, accessToken]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  function toggleQuestion(id: string) {
    setSelectedQuestionIds((prev) => (prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]));
  }

  async function handleSubmit() {
    if (!accessToken) return;
    if (title.trim().length < 3) return setError("Deneme başlığı en az 3 karakter olmalı.");
    if (type === "TOPIC" && !topicId) return setError("Konu denemesi için konu seçilmeli.");
    if (type === "UNIT" && !unitId) return setError("Ünite denemesi için ünite seçilmeli.");
    if (selectedQuestionIds.length === 0) return setError("En az bir soru seçilmeli.");

    setError(null);
    setIsSaving(true);

    const payload = {
      title,
      description: description || undefined,
      type,
      classLevel,
      durationMin,
      topicId: type === "TOPIC" ? topicId : undefined,
      unitId: type === "UNIT" ? unitId : undefined,
      questionIds: selectedQuestionIds,
    };

    try {
      if (initial) {
        await apiFetch(`/denemeler/${initial.id}`, {
          method: "PUT",
          token: accessToken,
          body: JSON.stringify({ title, description, durationMin, questionIds: selectedQuestionIds }),
        });
      } else {
        await apiFetch("/denemeler", { method: "POST", token: accessToken, body: JSON.stringify(payload) });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deneme kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-4 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <h3 className="font-display text-lg font-semibold">{initial ? "Denemeyi Düzenle" : "Yeni Deneme Oluştur"}</h3>

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
          <label className="text-xs font-medium">Tip</label>
          <select
            value={type}
            disabled={!!initial}
            onChange={(e) => setType(e.target.value as ExamType)}
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

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="text-xs font-medium">Sınıf</label>
          <select
            value={classLevel}
            disabled={!!initial}
            onChange={(e) => setClassLevel(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker disabled:opacity-60 dark:border-white/10"
          >
            {[5, 6, 7, 8].map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}. Sınıf
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium">Süre (dk)</label>
          <input
            type="number"
            value={durationMin}
            onChange={(e) => setDurationMin(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
        {(type === "TOPIC" || type === "UNIT") && (
          <div>
            <label className="text-xs font-medium">Ünite {type === "TOPIC" && "(konu için)"}</label>
            <select
              value={unitId}
              disabled={!!initial}
              onChange={(e) => {
                setUnitId(e.target.value);
                setTopicId("");
              }}
              className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker disabled:opacity-60 dark:border-white/10"
            >
              <option value="">Seçiniz...</option>
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {type === "TOPIC" && unitId && (
        <div>
          <label className="text-xs font-medium">Konu</label>
          <select
            value={topicId}
            disabled={!!initial}
            onChange={(e) => setTopicId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker disabled:opacity-60 dark:border-white/10"
          >
            <option value="">Seçiniz...</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="text-xs font-medium">
          Sorular ({selectedQuestionIds.length} seçili / {availableQuestions.length} uygun soru)
        </label>
        <div className="mt-2 max-h-72 space-y-1 overflow-y-auto rounded-lg border border-lab-paperLine p-2 dark:border-white/10">
          {availableQuestions.length === 0 ? (
            <p className="p-2 text-sm text-lab-inkMuted">Bu kapsamda uygun soru bulunamadı.</p>
          ) : (
            availableQuestions.map((q) => (
              <label key={q.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-lab-paperLine/40 dark:hover:bg-white/5">
                <input
                  type="checkbox"
                  checked={selectedQuestionIds.includes(q.id)}
                  onChange={() => toggleQuestion(q.id)}
                  className="accent-beaker"
                />
                <span className="truncate">{q.body}</span>
              </label>
            ))
          )}
        </div>
      </div>

      {error && <p className="text-sm text-reaction-dark">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
        >
          {isSaving ? "Kaydediliyor..." : initial ? "Güncelle" : "Denemeyi Oluştur"}
        </button>
        <button onClick={onCancel} className="rounded-full px-5 py-2.5 text-sm font-semibold text-lab-inkMuted">
          Vazgeç
        </button>
      </div>
    </div>
  );
}
