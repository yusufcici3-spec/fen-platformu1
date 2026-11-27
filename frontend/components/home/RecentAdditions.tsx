"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SectionHeading } from "./ClassesSection";
import { SON_EKLENENLER } from "@/lib/sonEklenenler";

type RecentItem = {
  id: string;
  title: string;
  type: string;
  label: string;
  createdAt: string;
  href: string;
  classLevel?: number | null;
};

const typeStyles: Record<string, string> = {
  Konu: "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300",
  Soru: "bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300",
  Simülasyon: "bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300",
  Oyun: "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
  Deneme: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
  PDF: "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
  Video: "bg-orange-50 text-orange-700 dark:bg-orange-400/10 dark:text-orange-300",
  Deney: "bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300",
  Duyuru: "bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300",
};

function formatDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function RecentAdditions() {
  const [apiItems, setItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/anasayfa/son-eklenenler`,
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("Son eklenenler alınamadı");
        const json = await response.json();
        if (active) setItems(Array.isArray(json.data) ? json.data : []);
      } catch {
        if (active) setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const items = [...SON_EKLENENLER, ...apiItems]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 9);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Yeni" title="Son Eklenenler" />
      <p className="mt-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">
        Platforma eklenen en yeni konu, soru, simülasyon, oyun ve materyaller.
      </p>

      {loading && items.length === 0 ? (
        <div className="mt-8 rounded-card border border-lab-paperLine p-8 text-center text-sm text-lab-inkMuted dark:border-white/10 dark:text-lab-paper/60">
          Yeni içerikler yükleniyor…
        </div>
      ) : items.length === 0 ? (
        <div className="mt-8 rounded-card border border-dashed border-lab-paperLine bg-white/60 p-10 text-center dark:border-white/10 dark:bg-white/5">
          <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">
            Henüz yeni içerik yok. İçerikler eklendikçe burada otomatik listelenecek.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group rounded-card border border-lab-paperLine bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-lab-inkSoft"
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${typeStyles[item.type] ?? "bg-slate-100 text-slate-700"}`}>
                  {item.type}
                </span>
                {Date.now() - new Date(item.createdAt).getTime() <= 7 * 24 * 60 * 60 * 1000 && (<span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">YENİ</span>)}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold group-hover:text-beaker-dark dark:group-hover:text-beaker-light">
                {item.title}
              </h3>
              <div className="mt-3 flex items-center justify-between gap-2 text-xs text-lab-inkMuted dark:text-lab-paper/60">
                <span>{item.classLevel ? `${item.classLevel}. Sınıf · ` : ""}{item.label}</span>
                <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-beaker-dark dark:text-beaker-light">
                İçeriğe git <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}


// Shared empty-state component used by the homepage sections.
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-8 rounded-card border border-dashed border-lab-paperLine bg-white/60 p-10 text-center dark:border-white/10 dark:bg-white/5">
      <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">{message}</p>
    </div>
  );
}
