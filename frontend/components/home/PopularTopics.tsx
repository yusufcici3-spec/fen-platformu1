"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SectionHeading } from "./ClassesSection";
import { EmptyState } from "./RecentAdditions";

type PopularTopic = {
  id: string;
  title: string;
  href: string;
  classLevel: number;
  activityCount: number;
};

export function PopularTopics() {
  const [topics, setTopics] = useState<PopularTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/anasayfa/populer-konular`,
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("Popüler konular alınamadı");
        const json = await response.json();
        if (active) setTopics(Array.isArray(json.data) ? json.data : []);
      } catch {
        if (active) setTopics([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Trend" title="Popüler Konular" />

      {loading ? (
        <div className="mt-8 rounded-card border border-lab-paperLine p-8 text-center text-sm text-lab-inkMuted dark:border-white/10 dark:text-lab-paper/60">
          Popüler konular yükleniyor…
        </div>
      ) : topics.length === 0 ? (
        <EmptyState message="Öğrenciler konular üzerinde çalıştıkça en çok ilgi görenler burada listelenecek." />
      ) : (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <li key={topic.id}>
              <Link
                href={topic.href}
                className="flex h-full items-center gap-4 rounded-card border border-lab-paperLine bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-lab-inkSoft"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-beaker-light/15 font-display font-bold text-beaker-dark dark:text-beaker-light">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-lab-ink dark:text-lab-paper">{topic.title}</span>
                  <span className="mt-1 block text-xs text-lab-inkMuted dark:text-lab-paper/60">
                    {topic.classLevel}. Sınıf · {topic.activityCount} öğrenci etkinliği
                  </span>
                </span>
                <span aria-hidden="true" className="text-beaker-dark dark:text-beaker-light">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
