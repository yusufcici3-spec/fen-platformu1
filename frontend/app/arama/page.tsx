"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { SearchResult } from "@/types/curriculum";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [classLevel, setClassLevel] = useState<number | "">("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (query.trim().length < 2) {
      setError("Arama terimi en az 2 karakter olmalı.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams({ q: query });
      if (classLevel) params.set("classLevel", String(classLevel));
      const res = await apiFetch<SearchResult>(`/arama?${params.toString()}`);
      setResult(res.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Arama yapılamadı.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  const totalResults = result ? result.topics.length + result.units.length + result.learningOutcomes.length : 0;

  return (
    <>
      <PageHeader
        eyebrow="Arama"
        title="Konu, Ünite veya Kazanım Ara"
        description="Anahtar kelimeye göre konu, ünite ve kazanımlar içinde arama yapabilirsin."
      />

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Örn: gezegen, sindirim, kazanım..."
            className="flex-1 rounded-full border border-lab-paperLine bg-white px-5 py-3 text-sm outline-none focus:border-beaker dark:border-white/10 dark:bg-lab-inkSoft"
          />
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value ? Number(e.target.value) : "")}
            className="rounded-full border border-lab-paperLine bg-white px-4 py-3 text-sm outline-none focus:border-beaker dark:border-white/10 dark:bg-lab-inkSoft"
          >
            <option value="">Tüm Sınıflar</option>
            {[5, 6, 7, 8].map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}. Sınıf
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-beaker px-6 py-3 text-sm font-semibold text-white hover:bg-beaker-dark disabled:opacity-60"
          >
            {isLoading ? "Aranıyor..." : "Ara"}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-reaction-dark">{error}</p>}

        {searched && !isLoading && !error && (
          <div className="mt-8">
            {totalResults === 0 ? (
              <EmptyPanelState title="Sonuç bulunamadı" description="Farklı bir anahtar kelime ile tekrar deneyebilirsin." />
            ) : (
              <div className="space-y-8">
                {result!.topics.length > 0 && (
                  <div>
                    <h2 className="font-display text-lg font-semibold">📘 Konular</h2>
                    <div className="mt-3 space-y-2">
                      {result!.topics.map((t) => (
                        <Link
                          key={t.id}
                          href={`/sinif/${t.unit.class.level}/${t.unit.slug}/${t.slug}`}
                          className="block rounded-card border border-lab-paperLine bg-white p-4 transition hover:border-beaker dark:border-white/10 dark:bg-lab-inkSoft"
                        >
                          <span className="font-mono text-xs text-beaker-dark dark:text-beaker-light">
                            {t.unit.class.level}. Sınıf · {t.unit.title}
                          </span>
                          <p className="mt-1 font-semibold">{t.title}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {result!.units.length > 0 && (
                  <div>
                    <h2 className="font-display text-lg font-semibold">📗 Üniteler</h2>
                    <div className="mt-3 space-y-2">
                      {result!.units.map((u) => (
                        <Link
                          key={u.id}
                          href={`/sinif/${u.class.level}/${u.slug}`}
                          className="block rounded-card border border-lab-paperLine bg-white p-4 transition hover:border-beaker dark:border-white/10 dark:bg-lab-inkSoft"
                        >
                          <span className="font-mono text-xs text-beaker-dark dark:text-beaker-light">
                            {u.class.level}. Sınıf
                          </span>
                          <p className="mt-1 font-semibold">{u.title}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {result!.learningOutcomes.length > 0 && (
                  <div>
                    <h2 className="font-display text-lg font-semibold">🎯 Kazanımlar</h2>
                    <div className="mt-3 space-y-2">
                      {result!.learningOutcomes.map((o) => (
                        <Link
                          key={o.id}
                          href={`/sinif/${o.topic.unit.class.level}/${o.topic.unit.slug}/${o.topic.slug}`}
                          className="block rounded-card border border-lab-paperLine bg-white p-4 transition hover:border-beaker dark:border-white/10 dark:bg-lab-inkSoft"
                        >
                          <span className="font-mono text-xs text-beaker-dark dark:text-beaker-light">
                            {o.topic.unit.class.level}. Sınıf · {o.topic.title}
                          </span>
                          <p className="mt-1 text-sm">{o.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
