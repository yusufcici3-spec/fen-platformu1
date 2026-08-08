"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Exam } from "@/types/questions";

const TYPE_LABELS: Record<string, string> = {
  TOPIC: "Konu Denemesi",
  UNIT: "Ünite Denemesi",
  GENERAL: "Genel Deneme",
  LGS: "LGS Tarzı Deneme",
};

export function ExamManagementList({ onEdit, refreshKey }: { onEdit: (exam: Exam) => void; refreshKey: number }) {
  const { accessToken } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apiFetch<Exam[]>("/denemeler/yonetim", { token: accessToken ?? undefined });
      setExams(res.data ?? []);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  async function togglePublish(exam: Exam) {
    if (!accessToken) return;
    await apiFetch(`/denemeler/${exam.id}`, {
      method: "PUT",
      token: accessToken,
      body: JSON.stringify({ isPublished: !exam.isPublished }),
    });
    load();
  }

  async function handleDelete(id: string) {
    if (!accessToken) return;
    if (!confirm("Bu denemeyi silmek istediğinize emin misiniz?")) return;
    await apiFetch(`/denemeler/${id}`, { method: "DELETE", token: accessToken });
    load();
  }

  if (isLoading) return <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>;
  if (exams.length === 0) return <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Henüz deneme oluşturulmadı.</p>;

  return (
    <div className="space-y-2">
      {exams.map((exam) => (
        <div key={exam.id} className="flex items-center gap-3 rounded-lg border border-lab-paperLine px-4 py-3 dark:border-white/10">
          <span className="rounded-full bg-beaker/10 px-2 py-0.5 text-xs font-semibold text-beaker-dark dark:text-beaker-light">
            {TYPE_LABELS[exam.type]}
          </span>
          <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">{exam.classLevel}. Sınıf</span>
          <span className="flex-1 truncate text-sm font-medium">{exam.title}</span>
          <span className="text-xs text-lab-inkMuted">{exam._count?.examQuestions ?? 0} soru</span>
          <button
            onClick={() => togglePublish(exam)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              exam.isPublished ? "bg-leaf/10 text-leaf" : "bg-reaction/10 text-reaction-dark"
            }`}
          >
            {exam.isPublished ? "Yayında" : "Taslak"}
          </button>
          <button onClick={() => onEdit(exam)} className="text-xs font-semibold text-beaker hover:underline">
            Düzenle
          </button>
          <button onClick={() => handleDelete(exam.id)} className="text-xs font-semibold text-reaction-dark hover:underline">
            Sil
          </button>
        </div>
      ))}
    </div>
  );
}
