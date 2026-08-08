"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { ExamDetail, StudentExamResult } from "@/types/questions";
import { PageHeader } from "@/components/ui/PageHeader";

const TYPE_LABELS: Record<string, string> = {
  TOPIC: "Konu Denemesi",
  UNIT: "Ünite Denemesi",
  GENERAL: "Genel Deneme",
  LGS: "LGS Tarzı Deneme",
};

export default function ExamDetailPage({ params }: { params: { examId: string } }) {
  const { user, accessToken } = useAuth();
  const router = useRouter();
  const [exam, setExam] = useState<ExamDetail | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<ExamDetail>(`/denemeler/${params.examId}`, { token: accessToken ?? undefined })
      .then((res) => setExam(res.data ?? null))
      .catch(() => setExam(null));
  }, [params.examId, accessToken]);

  async function handleStart() {
    if (!user) {
      router.push("/giris");
      return;
    }
    if (!accessToken) return;
    setIsStarting(true);
    setError(null);
    try {
      const res = await apiFetch<StudentExamResult>("/deneme-oturumlari/baslat", {
        method: "POST",
        token: accessToken,
        body: JSON.stringify({ examId: params.examId }),
      });
      if (res.data) {
        router.push(`/denemeler/${params.examId}/coz/${res.data.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deneme başlatılamadı.");
    } finally {
      setIsStarting(false);
    }
  }

  if (!exam) {
    return <p className="p-10 text-center text-sm text-lab-inkMuted">Yükleniyor...</p>;
  }

  return (
    <>
      <PageHeader
        eyebrow={TYPE_LABELS[exam.type]}
        title={exam.title}
        description={exam.description ?? undefined}
      />
      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-lab-inkMuted dark:text-lab-paper/50">Sınıf</dt>
              <dd className="font-semibold">{exam.classLevel}. Sınıf</dd>
            </div>
            <div>
              <dt className="text-lab-inkMuted dark:text-lab-paper/50">Süre</dt>
              <dd className="font-semibold">{exam.durationMin} dakika</dd>
            </div>
            <div>
              <dt className="text-lab-inkMuted dark:text-lab-paper/50">Soru Sayısı</dt>
              <dd className="font-semibold">{exam.examQuestions.length}</dd>
            </div>
            <div>
              <dt className="text-lab-inkMuted dark:text-lab-paper/50">Tip</dt>
              <dd className="font-semibold">{TYPE_LABELS[exam.type]}</dd>
            </div>
          </dl>

          {error && <p className="mt-4 text-sm text-reaction-dark">{error}</p>}

          <button
            onClick={handleStart}
            disabled={isStarting}
            className="mt-6 w-full rounded-full bg-beaker px-6 py-3 text-sm font-semibold text-white shadow-md shadow-beaker/30 hover:bg-beaker-dark disabled:opacity-60"
          >
            {isStarting ? "Başlatılıyor..." : user ? "Sınava Başla" : "Başlamak için giriş yap"}
          </button>
        </div>
      </section>
    </>
  );
}
