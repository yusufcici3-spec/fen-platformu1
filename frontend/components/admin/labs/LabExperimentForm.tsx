"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { slugify } from "@/lib/slugify";
import { LabExperiment, Simulation } from "@/types/games";

export function LabExperimentForm({
  initial,
  onSaved,
  onCancel,
}: {
  initial?: LabExperiment;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const { accessToken } = useAuth();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [purpose, setPurpose] = useState(initial?.purpose ?? "");
  const [materials, setMaterials] = useState(initial?.materials ?? "");
  const [steps, setSteps] = useState(initial?.steps ?? "");
  const [resultExplanation, setResultExplanation] = useState(initial?.resultExplanation ?? "");
  const [safetyWarnings, setSafetyWarnings] = useState(initial?.safetyWarnings ?? "");
  const [classLevel, setClassLevel] = useState(initial?.classLevel ?? 5);
  const [simulationId, setSimulationId] = useState(initial?.simulationId ?? "");
  const [isPublished, setIsPublished] = useState(initial?.isPublished ?? true);
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    apiFetch<Simulation[]>("/simulasyonlar").then((res) => setSimulations(res.data ?? []));
  }, []);

  async function handleSubmit() {
    if (!accessToken) return;
    if (title.trim().length < 3) return setError("Başlık en az 3 karakter olmalı.");
    if (!purpose.trim() || !materials.trim() || !steps.trim() || !resultExplanation.trim() || !safetyWarnings.trim()) {
      return setError("Tüm alanlar (amaç, malzemeler, adımlar, sonuç, güvenlik) doldurulmalı.");
    }

    setError(null);
    setIsSaving(true);
    const payload = {
      title,
      slug: initial?.slug ?? slugify(title),
      purpose,
      materials,
      steps,
      resultExplanation,
      safetyWarnings,
      classLevel,
      simulationId: simulationId || undefined,
      isPublished,
    };

    try {
      if (initial) {
        await apiFetch(`/deney-laboratuvari/${initial.id}`, { method: "PUT", token: accessToken, body: JSON.stringify(payload) });
      } else {
        await apiFetch("/deney-laboratuvari", { method: "POST", token: accessToken, body: JSON.stringify(payload) });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deney kaydedilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  const fieldClass =
    "mt-1 w-full rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10";

  return (
    <div className="space-y-4 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
      <h3 className="font-display text-lg font-semibold">{initial ? "Deneyi Düzenle" : "Yeni Sanal Deney Ekle"}</h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium">Başlık *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={fieldClass} />
        </div>
        <div>
          <label className="text-xs font-medium">Sınıf</label>
          <select value={classLevel} onChange={(e) => setClassLevel(Number(e.target.value))} className={fieldClass}>
            {[5, 6, 7, 8].map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}. Sınıf
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium">🎯 Amaç *</label>
        <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} rows={2} className={fieldClass} />
      </div>
      <div>
        <label className="text-xs font-medium">🧰 Gerekli Malzemeler *</label>
        <textarea value={materials} onChange={(e) => setMaterials(e.target.value)} rows={2} className={fieldClass} />
      </div>
      <div>
        <label className="text-xs font-medium">📋 Deney Adımları *</label>
        <textarea value={steps} onChange={(e) => setSteps(e.target.value)} rows={3} className={fieldClass} />
      </div>
      <div>
        <label className="text-xs font-medium">✅ Sonuç ve Açıklama *</label>
        <textarea value={resultExplanation} onChange={(e) => setResultExplanation(e.target.value)} rows={2} className={fieldClass} />
      </div>
      <div>
        <label className="text-xs font-medium">⚠️ Güvenlik Uyarıları *</label>
        <textarea value={safetyWarnings} onChange={(e) => setSafetyWarnings(e.target.value)} rows={2} className={fieldClass} />
      </div>

      <div>
        <label className="text-xs font-medium">Bağlı Etkileşimli Simülasyon (opsiyonel)</label>
        <select value={simulationId} onChange={(e) => setSimulationId(e.target.value)} className={fieldClass}>
          <option value="">Yok (genel etkileşimli aktivite kullanılır)</option>
          {simulations.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
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
          {isSaving ? "Kaydediliyor..." : initial ? "Güncelle" : "Deneyi Ekle"}
        </button>
        <button onClick={onCancel} className="rounded-full px-5 py-2.5 text-sm font-semibold text-lab-inkMuted">
          Vazgeç
        </button>
      </div>
    </div>
  );
}
