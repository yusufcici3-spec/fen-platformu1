"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { StudentExamResult, ExamQuestion } from "@/types/questions";

interface FullResult extends StudentExamResult {
  exam: StudentExamResult["exam"] & { examQuestions: ExamQuestion[] };
}

export default function ExamResultPage({ params }: { params: { examId: string; resultId: string } }) {
  const { accessToken } = useAuth();
  const [result, setResult] = useState<FullResult | null>(null);

  useEffect(() => {
    apiFetch<FullResult>(`/deneme-oturumlari/${params.resultId}`, { token: accessToken ?? undefined })
      .then((res) => setResult(res.data ?? null))
      .catch(() => setResult(null));
  }, [params.resultId, accessToken]);

  if (!result) {
    return <p className="p-10 text-center text-sm text-lab-inkMuted">Sonuç yükleniyor...</p>;
  }

  // Kazanım / konu analizi: her sorunun konusuna göre doğru/yanlış say
  const topicBreakdown = new Map<string, { title: string; wrong: number; correct: number }>();
  result.exam.examQuestions?.forEach((eq) => {
    const answer = result.answers?.find((a) => a.questionId === eq.question.id);
    const topicTitle = eq.question.topic?.title ?? "Diğer";
    const entry = topicBreakdown.get(topicTitle) ?? { title: topicTitle, wrong: 0, correct: 0 };
    if (answer?.isCorrect === true) entry.correct += 1;
    else if (answer?.isCorrect === false) entry.wrong += 1;
    topicBreakdown.set(topicTitle, entry);
  });

  const weakTopics = Array.from(topicBreakdown.values())
    .filter((t) => t.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong);

  const successColor =
    result.successPercent >= 70 ? "text-leaf" : result.successPercent >= 40 ? "text-reaction-dark" : "text-red-500";

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-card border border-lab-paperLine bg-white p-8 text-center dark:border-white/10 dark:bg-lab-inkSoft">
        <div className="text-5xl">{result.successPercent >= 70 ? "🎉" : result.successPercent >= 40 ? "💪" : "📚"}</div>
        <h1 className="mt-3 font-display text-2xl font-bold">Deneme Tamamlandı</h1>
        <p className={`mt-2 font-mono text-4xl font-bold ${successColor}`}>%{result.successPercent}</p>
        <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">Başarı Oranı</p>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-lg bg-leaf/10 p-4">
            <p className="font-mono text-2xl font-bold text-leaf">{result.correctCount}</p>
            <p className="text-xs text-lab-inkMuted dark:text-lab-paper/60">Doğru</p>
          </div>
          <div className="rounded-lg bg-reaction/10 p-4">
            <p className="font-mono text-2xl font-bold text-reaction-dark">{result.wrongCount}</p>
            <p className="text-xs text-lab-inkMuted dark:text-lab-paper/60">Yanlış</p>
          </div>
          <div className="rounded-lg bg-lab-paperLine/60 p-4 dark:bg-white/10">
            <p className="font-mono text-2xl font-bold">{result.blankCount}</p>
            <p className="text-xs text-lab-inkMuted dark:text-lab-paper/60">Boş</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-lab-inkMuted dark:text-lab-paper/60">
          Toplam puan: <strong>{result.totalScore}</strong>
        </p>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/denemeler"
            className="rounded-full border border-lab-paperLine px-5 py-2.5 text-sm font-semibold dark:border-white/10"
          >
            Denemelere Dön
          </Link>
          <Link
            href="/ogrenci/yanlislarim"
            className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
          >
            Yanlışlarımı İncele
          </Link>
        </div>
      </div>

      {weakTopics.length > 0 && (
        <div className="mt-6 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
          <h2 className="font-display text-lg font-semibold">📊 Eksik Konu Raporu</h2>
          <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
            Bu denemede en çok zorlandığın konular:
          </p>
          <ul className="mt-4 space-y-2">
            {weakTopics.map((t) => (
              <li key={t.title} className="flex items-center justify-between rounded-lg border border-lab-paperLine px-4 py-2.5 text-sm dark:border-white/10">
                <span>{t.title}</span>
                <span className="font-mono text-reaction-dark">{t.wrong} yanlış</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
