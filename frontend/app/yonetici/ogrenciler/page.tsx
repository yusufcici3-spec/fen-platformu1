"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { CurriculumShell } from "@/components/admin/CurriculumShell";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

interface StudentSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  points: number;
  currentStreak: number;
}

export default function TeacherStudentsPage() {
  const { accessToken } = useAuth();
  const [classLevel, setClassLevel] = useState(5);
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    if (!accessToken) return;
    setIsLoading(true);
    const res = await apiFetch<StudentSummary[]>(`/kullanicilar/ogrenciler?classLevel=${classLevel}`, { token: accessToken });
    setStudents(res.data ?? []);
    setIsLoading(false);
  }, [accessToken, classLevel]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <CurriculumShell title="Öğrenci Gelişim Raporları">
      <div className="flex gap-2">
        {[5, 6, 7, 8].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setClassLevel(lvl)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              classLevel === lvl ? "bg-beaker text-white" : "border border-lab-paperLine dark:border-white/10"
            }`}
          >
            {lvl}. Sınıf
          </button>
        ))}
        <Link
          href={`/yonetici/sinif-analizi?classLevel=${classLevel}`}
          className="ml-auto rounded-full border border-beaker px-4 py-2 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light"
        >
          📊 Sınıf Analizi
        </Link>
      </div>

      <div className="mt-6 space-y-2">
        {isLoading ? (
          <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
        ) : students.length === 0 ? (
          <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Bu sınıfta kayıtlı öğrenci yok.</p>
        ) : (
          students.map((s) => (
            <Link
              key={s.id}
              href={`/yonetici/ogrenciler/${s.id}`}
              className="flex items-center gap-3 rounded-lg border border-lab-paperLine px-4 py-3 transition hover:border-beaker dark:border-white/10"
            >
              <span className="flex-1 text-sm font-medium">
                {s.firstName} {s.lastName}
              </span>
              <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">⭐ {s.points} puan</span>
              <span className="text-xs text-lab-inkMuted dark:text-lab-paper/50">🔥 {s.currentStreak} gün</span>
              <span className="text-beaker">→</span>
            </Link>
          ))
        )}
      </div>
    </CurriculumShell>
  );
}
