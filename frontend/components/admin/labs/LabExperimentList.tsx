"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { LabExperiment } from "@/types/games";

export function LabExperimentList({ onEdit, refreshKey }: { onEdit: (exp: LabExperiment) => void; refreshKey: number }) {
  const { accessToken } = useAuth();
  const [experiments, setExperiments] = useState<LabExperiment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiFetch<LabExperiment[]>("/deney-laboratuvari");
      setExperiments(res.data ?? []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  async function handleDelete(id: string) {
    if (!accessToken) return;
    if (!confirm("Bu deneyi silmek istediğinize emin misiniz?")) return;
    await apiFetch(`/deney-laboratuvari/${id}`, { method: "DELETE", token: accessToken });
    load();
  }

  if (isLoading) return <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>;
  if (experiments.length === 0) return <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Henüz deney eklenmedi.</p>;

  return (
    <div className="space-y-2">
      {experiments.map((exp) => (
        <div key={exp.id} className="flex items-center gap-3 rounded-lg border border-lab-paperLine px-4 py-3 dark:border-white/10">
          <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">{exp.classLevel}. Sınıf</span>
          <span className="flex-1 truncate text-sm font-medium">{exp.title}</span>
          {exp.simulation && (
            <span className="rounded-full bg-beaker/10 px-2 py-0.5 text-xs text-beaker-dark dark:text-beaker-light">
              🔬 {exp.simulation.title}
            </span>
          )}
          <button onClick={() => onEdit(exp)} className="text-xs font-semibold text-beaker hover:underline">
            Düzenle
          </button>
          <button onClick={() => handleDelete(exp.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
            Sil
          </button>
        </div>
      ))}
    </div>
  );
}
