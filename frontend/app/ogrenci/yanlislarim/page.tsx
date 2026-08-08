"use client";

import { useEffect, useState } from "react";
import { RequireRole } from "@/components/auth/RequireRole";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { QuestionReviewList } from "@/components/questions/QuestionReviewList";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { Question } from "@/types/questions";

const NAV_ITEMS = [
  { href: "/ogrenci", label: "Genel Bakış", icon: "🏠" },
  { href: "/ogrenci/analiz", label: "Gelişim Analizim", icon: "📈" },
  { href: "/ogrenci/takvim", label: "Çalışma Takvimim", icon: "🗓️" },
  { href: "/ogrenci/odevlerim", label: "Ödevlerim", icon: "📚" },
  { href: "/ogrenci/favorilerim", label: "Favorilerim", icon: "⭐" },
  { href: "/ogrenci/yanlislarim", label: "Yanlışlarım", icon: "📌" },
  { href: "/ogrenci/istatistiklerim", label: "İstatistiklerim", icon: "📊" },
  { href: "/ogrenci/laboratuvar-gecmisim", label: "Laboratuvar Geçmişim", icon: "🧪" },
  { href: "/liderlik-tablosu", label: "Liderlik Tablosu", icon: "🏆" },
];

export default function WrongQuestionsPage() {
  return (
    <RequireRole roles={["STUDENT"]}>
      <WrongQuestionsContent />
    </RequireRole>
  );
}

function WrongQuestionsContent() {
  const { accessToken } = useAuth();
  const [questions, setQuestions] = useState<(Question & { wrongCount?: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    apiFetch<(Question & { wrongCount?: number })[]>("/sorular/yanlislarim", { token: accessToken })
      .then((res) => setQuestions(res.data ?? []))
      .finally(() => setIsLoading(false));
  }, [accessToken]);

  return (
    <DashboardShell title="Öğrenci Paneli" navItems={NAV_ITEMS}>
      <h1 className="font-display text-2xl font-bold">📌 Yanlışlarım</h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Daha önce yanlış yaptığın soruları burada tekrar çözebilirsin.
      </p>
      <div className="mt-6">
        {isLoading ? (
          <p className="text-sm text-lab-inkMuted">Yükleniyor...</p>
        ) : (
          <QuestionReviewList questions={questions} emptyMessage="Harika! Şu anda tekrar edilmesi gereken bir sorun yok." />
        )}
      </div>
    </DashboardShell>
  );
}
