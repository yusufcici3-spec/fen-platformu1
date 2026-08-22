"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { slugify } from "@/lib/slugify";
import { useAuth } from "@/context/AuthContext";
import { ClassSummary, UnitSummary, TopicSummary } from "@/types/curriculum";

type UnitWithCount = UnitSummary & { _count: { topics: number } };

export function CurriculumManager() {
  const { accessToken } = useAuth();
  const router = useRouter();

  const [classes, setClasses] = useState<ClassSummary[]>([]);
  const [activeLevel, setActiveLevel] = useState(5);
  const [units, setUnits] = useState<UnitWithCount[]>([]);
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>(null);
  const [unitTopics, setUnitTopics] = useState<Record<string, TopicSummary[]>>({});
  const [isLoadingUnits, setIsLoadingUnits] = useState(false);
  const [isSavingUnit, setIsSavingUnit] = useState(false);
  const [showNewUnitForm, setShowNewUnitForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeClass = classes.find((c) => c.level === activeLevel);

  useEffect(() => {
    apiFetch<ClassSummary[]>("/siniflar")
      .then((res) => setClasses(res.data ?? []))
      .catch(() => setError("Sınıflar yüklenemedi."));
  }, []);

  const loadUnits = useCallback(async () => {
    if (!activeClass) return;
    setIsLoadingUnits(true);
    try {
      const res = await apiFetch<UnitWithCount[]>(`/uniteler?classId=${activeClass.id}`);
      setUnits(res.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Üniteler yüklenemedi.");
    } finally {
      setIsLoadingUnits(false);
    }
  }, [activeClass]);

  useEffect(() => {
    loadUnits();
    setExpandedUnitId(null);
  }, [loadUnits]);

  async function toggleExpand(unitId: string) {
    if (expandedUnitId === unitId) {
      setExpandedUnitId(null);
      return;
    }

    setExpandedUnitId(unitId);
    if (!unitTopics[unitId]) {
      try {
        const res = await apiFetch<UnitSummary & { topics: TopicSummary[] }>(`/uniteler/${unitId}`);
        setUnitTopics((prev) => ({ ...prev, [unitId]: res.data?.topics ?? [] }));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Konular yüklenemedi.");
      }
    }
  }

  async function handleCreateUnit(data: {
    code: string;
    title: string;
    description: string;
  }) {
    setError(null);

    if (!accessToken) {
      setError("Oturum bilgisi bulunamadı. Lütfen çıkış yapıp tekrar giriş yapın.");
      return;
    }

    if (!activeClass) {
      setError("Sınıf bilgisi yüklenemedi. Sayfayı yenileyip tekrar deneyin.");
      return;
    }

    if (!data.title.trim()) {
      setError("Ünite başlığı boş bırakılamaz.");
      return;
    }

    const generatedSlug = slugify(data.title);
    if (!generatedSlug) {
      setError("Ünite başlığından geçerli bir bağlantı adı oluşturulamadı.");
      return;
    }

    setIsSavingUnit(true);
    try {
      await apiFetch("/uniteler", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({
          classId: activeClass.id,
          code: data.code.trim() || undefined,
          title: data.title.trim(),
          slug: generatedSlug,
          description: data.description.trim() || undefined,
        }),
      });

      setShowNewUnitForm(false);
      await loadUnits();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ünite oluşturulamadı.");
    } finally {
      setIsSavingUnit(false);
    }
  }

  async function handleDeleteUnit(unitId: string) {
    if (!accessToken) {
      setError("Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.");
      return;
    }
    if (!confirm("Bu üniteyi ve içindeki tüm konuları silmek istediğinize emin misiniz?")) return;

    try {
      await apiFetch(`/uniteler/${unitId}`, { method: "DELETE", token: accessToken });
      await loadUnits();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ünite silinemedi.");
    }
  }

  async function moveUnit(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= units.length || !accessToken) return;

    const reordered = [...units];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    setUnits(reordered);

    try {
      await apiFetch("/uniteler/siralama/kaydet", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ orderedIds: reordered.map((u) => u.id) }),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sıralama kaydedilemedi.");
      await loadUnits();
    }
  }

  async function handleCreateTopic(unitId: string, title: string) {
    if (!accessToken) {
      setError("Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.");
      return;
    }

    if (!title.trim()) {
      setError("Konu başlığı boş bırakılamaz.");
      return;
    }

    const generatedSlug = slugify(title);
    if (!generatedSlug) {
      setError("Konu başlığından geçerli bir bağlantı adı oluşturulamadı.");
      return;
    }

    try {
      const res = await apiFetch<{ id: string }>("/konular", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ unitId, title: title.trim(), slug: generatedSlug }),
      });

      if (res.data?.id) {
        router.push(`/yonetici/konular/${res.data.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Konu oluşturulamadı.");
    }
  }

  async function handleDeleteTopic(unitId: string, topicId: string) {
    if (!accessToken) {
      setError("Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.");
      return;
    }
    if (!confirm("Bu konuyu silmek istediğinize emin misiniz?")) return;

    try {
      await apiFetch(`/konular/${topicId}`, { method: "DELETE", token: accessToken });
      setUnitTopics((prev) => ({
        ...prev,
        [unitId]: prev[unitId].filter((t) => t.id !== topicId),
      }));
      await loadUnits();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Konu silinemedi.");
    }
  }

  async function moveTopic(unitId: string, index: number, direction: -1 | 1) {
    const topics = unitTopics[unitId];
    if (!topics || !accessToken) return;

    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= topics.length) return;

    const reordered = [...topics];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    setUnitTopics((prev) => ({ ...prev, [unitId]: reordered }));

    try {
      await apiFetch("/konular/siralama/kaydet", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ orderedIds: reordered.map((t) => t.id) }),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Konu sıralaması kaydedilemedi.");
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-lg border border-reaction/40 bg-reaction/10 px-4 py-3 text-sm text-reaction-dark">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        {[5, 6, 7, 8].map((level) => (
          <button
            type="button"
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeLevel === level
                ? "bg-beaker text-white"
                : "border border-lab-paperLine text-lab-inkMuted hover:bg-lab-paperLine/60 dark:border-white/10 dark:text-lab-paper/70"
            }`}
          >
            {level}. Sınıf
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Üniteler</h2>
        <button
          type="button"
          onClick={() => setShowNewUnitForm((v) => !v)}
          className="rounded-full bg-beaker px-4 py-2 text-sm font-semibold text-white hover:bg-beaker-dark"
        >
          + Yeni Ünite
        </button>
      </div>

      {showNewUnitForm && (
        <NewUnitForm
          isSaving={isSavingUnit}
          onCancel={() => setShowNewUnitForm(false)}
          onSubmit={handleCreateUnit}
        />
      )}

      {isLoadingUnits ? (
        <p className="mt-6 text-sm text-lab-inkMuted dark:text-lab-paper/60">Yükleniyor...</p>
      ) : units.length === 0 ? (
        <p className="mt-6 text-sm text-lab-inkMuted dark:text-lab-paper/60">
          Bu sınıfa henüz ünite eklenmedi.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {units.map((unit, index) => (
            <UnitRow
              key={unit.id}
              unit={unit}
              index={index}
              isFirst={index === 0}
              isLast={index === units.length - 1}
              isExpanded={expandedUnitId === unit.id}
              topics={unitTopics[unit.id]}
              onToggle={() => toggleExpand(unit.id)}
              onMove={(dir) => moveUnit(index, dir)}
              onDelete={() => handleDeleteUnit(unit.id)}
              onCreateTopic={(title) => handleCreateTopic(unit.id, title)}
              onDeleteTopic={(topicId) => handleDeleteTopic(unit.id, topicId)}
              onMoveTopic={(topicIndex, dir) => moveTopic(unit.id, topicIndex, dir)}
              onEditTopic={(topicId) => router.push(`/yonetici/konular/${topicId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NewUnitForm({
  isSaving,
  onCancel,
  onSubmit,
}: {
  isSaving: boolean;
  onCancel: () => void;
  onSubmit: (data: { code: string; title: string; description: string }) => void;
}) {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim() || isSaving) return;
        onSubmit({ code, title, description });
      }}
      className="mt-4 space-y-3 rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft"
    >
      <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
        <div>
          <label className="text-xs font-medium" htmlFor="unit-code">
            MEB Kodu
          </label>
          <input
            id="unit-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="ör: 5.1"
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>

        <div>
          <label className="text-xs font-medium" htmlFor="unit-title">
            Ünite Başlığı *
          </label>
          <input
            id="unit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium" htmlFor="unit-description">
          Açıklama
        </label>
        <textarea
          id="unit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-beaker px-4 py-2 text-sm font-semibold text-white hover:bg-beaker-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Ünite ekleniyor..." : "Ünite Ekle"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="rounded-full px-4 py-2 text-sm font-semibold text-lab-inkMuted disabled:opacity-60"
        >
          Vazgeç
        </button>
      </div>
    </form>
  );
}

function UnitRow({
  unit,
  index,
  isFirst,
  isLast,
  isExpanded,
  topics,
  onToggle,
  onMove,
  onDelete,
  onCreateTopic,
  onDeleteTopic,
  onMoveTopic,
  onEditTopic,
}: {
  unit: UnitWithCount;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isExpanded: boolean;
  topics: TopicSummary[] | undefined;
  onToggle: () => void;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
  onCreateTopic: (title: string) => void;
  onDeleteTopic: (topicId: string) => void;
  onMoveTopic: (topicIndex: number, direction: -1 | 1) => void;
  onEditTopic: (topicId: string) => void;
}) {
  const [newTopicTitle, setNewTopicTitle] = useState("");

  return (
    <div className="rounded-card border border-lab-paperLine bg-white dark:border-white/10 dark:bg-lab-inkSoft">
      <div className="flex items-center gap-3 p-4">
        <div className="flex flex-col">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => onMove(-1)}
            className="text-xs text-lab-inkMuted disabled:opacity-30"
            aria-label="Yukarı taşı"
          >
            ▲
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={() => onMove(1)}
            className="text-xs text-lab-inkMuted disabled:opacity-30"
            aria-label="Aşağı taşı"
          >
            ▼
          </button>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="flex flex-1 items-center gap-3 text-left"
        >
          {unit.code && (
            <span className="font-mono text-xs font-semibold text-beaker-dark dark:text-beaker-light">
              {unit.code}
            </span>
          )}
          <span className="font-semibold">{unit.title}</span>
          <span className="rounded-full bg-lab-paperLine/60 px-2 py-0.5 text-xs dark:bg-white/10">
            {unit._count.topics} konu
          </span>
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="text-sm text-reaction-dark hover:underline"
        >
          Sil
        </button>
        <button type="button" onClick={onToggle} className="text-lab-inkMuted">
          {isExpanded ? "▲" : "▼"}
        </button>
      </div>

      {isExpanded && (
        <div className="border-t border-lab-paperLine/70 p-4 dark:border-white/10">
          {!topics ? (
            <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
          ) : topics.length === 0 ? (
            <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">
              Bu ünitede henüz konu yok.
            </p>
          ) : (
            <ul className="space-y-2">
              {topics.map((topic, topicIndex) => (
                <li
                  key={topic.id}
                  className="flex items-center gap-2 rounded-lg border border-lab-paperLine px-3 py-2 dark:border-white/10"
                >
                  <div className="flex flex-col">
                    <button
                      type="button"
                      disabled={topicIndex === 0}
                      onClick={() => onMoveTopic(topicIndex, -1)}
                      className="text-[10px] text-lab-inkMuted disabled:opacity-30"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={topicIndex === topics.length - 1}
                      onClick={() => onMoveTopic(topicIndex, 1)}
                      className="text-[10px] text-lab-inkMuted disabled:opacity-30"
                    >
                      ▼
                    </button>
                  </div>
                  <span className="flex-1 text-sm">{topic.title}</span>
                  {!topic.isPublished && (
                    <span className="rounded-full bg-reaction/10 px-2 py-0.5 text-xs text-reaction-dark">
                      Taslak
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onEditTopic(topic.id)}
                    className="text-xs font-semibold text-beaker hover:underline"
                  >
                    Düzenle
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteTopic(topic.id)}
                    className="text-xs font-semibold text-reaction-dark hover:underline"
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newTopicTitle.trim()) return;
              onCreateTopic(newTopicTitle.trim());
              setNewTopicTitle("");
            }}
            className="mt-3 flex gap-2"
          >
            <input
              value={newTopicTitle}
              onChange={(e) => setNewTopicTitle(e.target.value)}
              placeholder="Yeni konu başlığı..."
              className="flex-1 rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
            />
            <button
              type="submit"
              className="rounded-lg bg-beaker px-3 py-2 text-sm font-semibold text-white hover:bg-beaker-dark"
            >
              + Konu Ekle
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
