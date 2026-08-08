"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { RequireRole } from "@/components/auth/RequireRole";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { ChildSummary } from "@/types/analysis";

export default function ParentPanelPage() {
  return (
    <RequireRole roles={["PARENT"]}>
      <ParentPanelContent />
    </RequireRole>
  );
}

function ParentPanelContent() {
  const { user, accessToken } = useAuth();
  const [children, setChildren] = useState<ChildSummary[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLinking, setIsLinking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    if (!accessToken) return;
    const res = await apiFetch<ChildSummary[]>("/veli/cocuklarim", { token: accessToken });
    setChildren(res.data ?? []);
    setIsLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  async function handleLink(e: FormEvent) {
    e.preventDefault();
    if (!accessToken) return;
    setError(null);
    setIsLinking(true);
    try {
      await apiFetch("/veli/cocuk-bagla", { method: "POST", token: accessToken, body: JSON.stringify({ childEmail: email }) });
      setEmail("");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Öğrenci bağlanamadı.");
    } finally {
      setIsLinking(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-bold">Hoş geldiniz, {user?.firstName}! 👋</h1>
      <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Çocuğunuzun gelişimini, çalışma sürelerini ve deneme sonuçlarını buradan takip edebilirsiniz.
      </p>

      <Card className="mt-6">
        <h2 className="font-display text-lg font-semibold">Öğrenci Hesabı Bağla</h2>
        <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">
          Çocuğunuzun platform kayıt e-postasını girerek hesabınıza bağlayabilirsiniz.
        </p>
        <form onSubmit={handleLink} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ogrenci@eposta.com"
            required
            className="flex-1 rounded-lg border border-lab-paperLine bg-transparent px-3 py-2 text-sm outline-none focus:border-beaker dark:border-white/10"
          />
          <button
            type="submit"
            disabled={isLinking}
            className="rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
          >
            {isLinking ? "Bağlanıyor..." : "Bağla"}
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-reaction-dark">{error}</p>}
      </Card>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold">Çocuklarım</h2>
        {isLoading ? (
          <p className="mt-3 text-sm text-lab-inkMuted">Yükleniyor...</p>
        ) : children.length === 0 ? (
          <p className="mt-3 text-sm text-lab-inkMuted dark:text-lab-paper/60">
            Henüz bağlı bir öğrenci hesabı yok. Yukarıdaki formu kullanarak bağlayabilirsiniz.
          </p>
        ) : (
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {children.map((child) => (
              <Link
                key={child.id}
                href={`/veli/cocuk/${child.id}`}
                className="rounded-card border border-lab-paperLine bg-white p-5 transition hover:border-beaker hover:shadow-md dark:border-white/10 dark:bg-lab-inkSoft"
              >
                <h3 className="font-display text-lg font-semibold">
                  {child.firstName} {child.lastName}
                </h3>
                <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">{child.classLevel}. Sınıf</p>
                <div className="mt-3 flex gap-4 text-xs text-lab-inkMuted dark:text-lab-paper/50">
                  <span>⭐ {child.points} puan</span>
                  <span>🔥 {child.currentStreak} gün seri</span>
                </div>
                <span className="mt-3 inline-block text-sm font-semibold text-beaker">Gelişim Raporunu Gör →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
