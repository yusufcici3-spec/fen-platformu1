"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Question, QuestionType, Difficulty } from "@/types/questions";

interface TopicOption {
  id: string;
  title: string;
  unit: { title: string; class: { level: number } };
}

interface TagOption {
  id: string;
  name: string;
}
interface CategoryOption {
  id: string;
  name: string;
}

const TYPE_OPTIONS: { value: QuestionType; label: string; hasOptions: boolean }[] = [
  { value: "MULTIPLE_CHOICE", label: "Çoktan Seçmeli", hasOptions: true },
  { value: "TRUE_FALSE", label: "Doğru / Yanlış", hasOptions: true },
  { value: "FILL_BLANK", label: "Boşluk Doldurma", hasOptions: false },
  { value: "MATCHING", label: "Eşleştirme", hasOptions: true },
  { value: "OPEN_ENDED", label: "Açık Uçlu", hasOptions: false },
  { value: "DRAG_DROP", label: "Sürükle Bırak", hasOptions: true },
  { value: "INTERACTIVE", label: "İnteraktif", hasOptions: false },
];

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: "EASY", label: "Kolay" },
  { value: "MEDIUM", label: "Orta" },
  { value: "HARD", label: "Zor" },
];

interface FormOption {
  text: string;
  matchText?: string;
  isCorrect: boolean;
}

export function QuestionForm({
  initial,
  defaultTopicId,
  onSaved,
  onCancel,
}: {
  initial?: Question;
  defaultTopicId?: string;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const { accessToken } = useAuth();
  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [tags, setTags] = useState<TagOption[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  const [topicId, setTopicId] = useState(initial?.topicId ?? defaultTopicId ?? "");
  const [type, setType] = useState<QuestionType>(initial?.type ?? "MULTIPLE_CHOICE");
  const [body, setBody] = useState(initial?.body ?? "");
  const [correctAnswer, setCorrectAnswer] = useState(initial?.correctAnswer ?? "");
  const [explanation, setExplanation] = useState(initial?.explanation ?? "");
  const [difficulty, setDifficulty] = useState<Difficulty>(initial?.difficulty ?? "MEDIUM");
  const [points, setPoints] = useState(initial?.points ?? 10);
  const [estimatedTimeSec, setEstimatedTimeSec] = useState(initial?.estimatedTimeSec ?? 60);
  const [isScenario, setIsScenario] = useState(initial?.isScenario ?? false);
  const [isNextGen, setIsNextGen] = useState(initial?.isNextGen ?? false);
  const [categoryId, setCategoryId] = useState(initial?.category?.id ?? "");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(initial?.tags.map((t) => t.id) ?? []);
  const [options, setOptions] = useState<FormOption[]>(
    initial?.choiceOptions.map((o) => ({ text: o.text, matchText: o.matchText ?? undefined, isCorrect: !!o.isCorrect })) ?? [
      { text: "", isCorrect: true },
      { text: "", isCorrect: false },
    ]
  );
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const typeMeta = TYPE_OPTIONS.find((t) => t.value === type)!;

  useEffect(() => {
    apiFetch<TopicOption[]>("/konular?limit=500").then((res) => {
      // NOT: /konular yalnızca yayınlanmış konuları döner. Taslak konular için
      // soru eklemek isteniyorsa önce ilgili konu yayına alınmalıdır.
      setTopics((res.data as unknown as TopicOption[]) ?? []);
    });
    apiFetch<TagOption[]>("/etiketler").then((res) => setTags(res.data ?? []));
    apiFetch<CategoryOption[]>("/soru-kategorileri").then((res) => setCategories(res.data ?? []));
  }, []);

  function updateOption(index: number, patch: Partial<FormOption>) {
    setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, ...patch } : o)));
  }

  function setCorrectOption(index: number) {
    setOptions((prev) => prev.map((o, i) => ({ ...o, isCorrect: i === index })));
    setCorrectAnswer(options[index]?.text ?? "");
  }

  function addOption() {
    setOptions((prev) => [...prev, { text: "", isCorrect: false }]);
  }

  function removeOption(index: number) {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  }

  function toggleTag(id: string) {
    setSelectedTagIds((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  }

  async function handleSubmit() {
    if (!accessToken) return;
    if (!topicId) return setError("Konu seçimi zorunlu.");
    if (body.trim().length < 3) return setError("Soru metni çok kısa.");
    if (!correctAnswer.trim()) return setError("Doğru cevap gerekli.");

    setError(null);
    setIsSaving(true);

    const payload = {
      topicId,
      type,
      body,
      correctAnswer,
      explanation: explanation || undefined,
      difficulty,
      points: Number(points),
      estimatedTimeSec: Number(estimatedTimeSec),
      isScenario,
      isNextGen,
      categoryId: categoryId || undefined,
      tagIds: selectedTagIds,
      ...(typeMeta.hasOptions
        ? { options: options.filter((o) => o.text.trim().length > 0) }
        : {}),
    };

    try {
      if (initial) {
        await apiFetch(`/sorular/${initial.id}`, { method: "PUT", token: accessToken, body: JSON.stringify(payload) });
      } else {
        await apiFetch("/sorular", { method: "POST", token: accessToken, body: JSON.stringify(payload) });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Soru kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-4 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <h3 className="font-display text-lg font-semibold">{initial ? "Soruyu Düzenle" : "Yeni Soru Ekle"}</h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium">Konu *</label>
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          >
            <option value="">Seçiniz...</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.unit?.class?.level}. Sınıf · {t.unit?.title} · {t.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium">Soru Tipi</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as QuestionType)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
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
        <label className="text-xs font-medium">Soru Metni *</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      {typeMeta.hasOptions ? (
        <div>
          <label className="text-xs font-medium">Şıklar (doğru olanı işaretleyin)</label>
          <div className="mt-2 space-y-2">
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={opt.isCorrect}
                  onChange={() => setCorrectOption(i)}
                  className="h-4 w-4 accent-beaker"
                />
                <input
                  value={opt.text}
                  onChange={(e) => updateOption(i, { text: e.target.value })}
                  placeholder={`Şık ${i + 1}`}
                  className="flex-1 rounded-lg border border-lab-paperLine bg-transparent px-3 py-1.5 text-sm outline-none focus:border-beaker dark:border-white/10"
                />
                {(type === "MATCHING" || type === "DRAG_DROP") && (
                  <input
                    value={opt.matchText ?? ""}
                    onChange={(e) => updateOption(i, { matchText: e.target.value })}
                    placeholder="Eşleşen değer"
                    className="w-40 rounded-lg border border-lab-paperLine bg-transparent px-3 py-1.5 text-sm outline-none focus:border-beaker dark:border-white/10"
                  />
                )}
                <button type="button" onClick={() => removeOption(i)} className="text-xs text-reaction-dark">
                  Sil
                </button>
              </div>
            ))}
            <button type="button" onClick={addOption} className="text-xs font-semibold text-beaker hover:underline">
              + Şık Ekle
            </button>
          </div>
        </div>
      ) : (
        <div>
          <label className="text-xs font-medium">Doğru Cevap *</label>
          <input
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
      )}

      <div>
        <label className="text-xs font-medium">Kısa Açıklama</label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div>
          <label className="text-xs font-medium">Zorluk</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          >
            {DIFFICULTY_OPTIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium">Puan</label>
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
        <div>
          <label className="text-xs font-medium">Süre (sn)</label>
          <input
            type="number"
            value={estimatedTimeSec}
            onChange={(e) => setEstimatedTimeSec(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
        <div>
          <label className="text-xs font-medium">Kategori</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          >
            <option value="">Yok</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isScenario} onChange={(e) => setIsScenario(e.target.checked)} className="accent-beaker" />
          Senaryolu soru
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isNextGen} onChange={(e) => setIsNextGen(e.target.checked)} className="accent-beaker" />
          Yeni nesil beceri temelli
        </label>
      </div>

      {tags.length > 0 && (
        <div>
          <label className="text-xs font-medium">Etiketler</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  selectedTagIds.includes(tag.id)
                    ? "bg-beaker text-white"
                    : "border border-lab-paperLine dark:border-white/10"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-sm text-reaction-dark">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
        >
          {isSaving ? "Kaydediliyor..." : initial ? "Güncelle" : "Soruyu Ekle"}
        </button>
        <button onClick={onCancel} className="rounded-full px-5 py-2.5 text-sm font-semibold text-lab-inkMuted">
          Vazgeç
        </button>
      </div>
    </div>
  );
}
