"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { sfx } from "@/lib/sound";
import { LabExperiment } from "@/types/games";
import { SimulationRenderer } from "@/components/labs/SimulationRenderer";
import { PageHeader } from "@/components/ui/PageHeader";

export default function LabExperimentPage({ params }: { params: { slug: string } }) {
  const { user, accessToken } = useAuth();
  const [experiment, setExperiment] = useState<LabExperiment | null | undefined>(undefined);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    apiFetch<LabExperiment>(`/deney-laboratuvari/${params.slug}`)
      .then((res) => setExperiment(res.data))
      .catch(() => setExperiment(null));
  }, [params.slug]);

  async function handleComplete() {
    if (!experiment || !accessToken) return;
    setIsCompleting(true);
    try {
      await apiFetch(`/deney-laboratuvari/${experiment.id}/tamamla`, { method: "POST", token: accessToken });
      sfx.win();
      setCompleted(true);
    } catch {
      // sessizce yok say
    } finally {
      setIsCompleting(false);
    }
  }

  if (experiment === undefined) {
    return <p className="p-10 text-center text-sm text-lab-inkMuted">Yükleniyor...</p>;
  }

  if (!experiment) {
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-lab-inkMuted">Deney bulunamadı.</p>
        <Link href="/laboratuvar" className="mt-2 inline-block text-sm font-semibold text-beaker hover:underline">
          ← Laboratuvara Dön
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader eyebrow={`${experiment.classLevel}. Sınıf · Sanal Laboratuvar`} title={experiment.title} />

      <section className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-card border border-beaker/30 bg-beaker/5 p-5">
          <h2 className="font-semibold">🎯 Amaç</h2>
          <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/70">{experiment.purpose}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
            <h2 className="font-semibold">🧰 Gerekli Malzemeler</h2>
            <p className="mt-1 whitespace-pre-line text-sm text-lab-inkMuted dark:text-lab-paper/70">{experiment.materials}</p>
          </div>
          <div className="rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft">
            <h2 className="font-semibold">📋 Deney Adımları</h2>
            <p className="mt-1 whitespace-pre-line text-sm text-lab-inkMuted dark:text-lab-paper/70">{experiment.steps}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-3 font-semibold">🔬 Etkileşimli Simülasyon</h2>
          <SimulationRenderer componentKey={experiment.simulation?.componentKey} slug={experiment.slug} />
        </div>

        <div className="rounded-card border border-leaf/30 bg-leaf/5 p-5">
          <h2 className="font-semibold text-leaf">✅ Sonuç ve Açıklama</h2>
          <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/70">{experiment.resultExplanation}</p>
        </div>

        <div className="rounded-card border border-reaction/30 bg-reaction/5 p-5">
          <h2 className="font-semibold text-reaction-dark">⚠️ Güvenlik Uyarıları</h2>
          <p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/70">{experiment.safetyWarnings}</p>
        </div>

        <div className="text-center">
          {!user ? (
            <p className="text-sm text-lab-inkMuted">
              Deneyi tamamlandı olarak kaydetmek için{" "}
              <Link href="/giris" className="font-semibold text-beaker hover:underline">
                giriş yap
              </Link>
              .
            </p>
          ) : completed ? (
            <p className="text-sm font-semibold text-leaf">✓ Deney tamamlandı olarak kaydedildi!</p>
          ) : (
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="rounded-full bg-leaf px-8 py-3 text-sm font-semibold text-white hover:bg-leaf/90 disabled:opacity-60"
            >
              {isCompleting ? "Kaydediliyor..." : "✓ Deneyi Tamamladım"}
            </button>
          )}
        </div>
      </section>
    </>
  );
}
