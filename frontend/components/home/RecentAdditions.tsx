import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { SectionHeading } from "./ClassesSection";

interface RecentTopic {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  unit: { class: { level: number; slug: string } };
}

export async function RecentAdditions() {
  let topics: RecentTopic[] = [];

  try {
    const res = await apiFetch<RecentTopic[]>("/anasayfa/son-eklenenler");
    topics = res.data ?? [];
  } catch {
    topics = [];
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Yeni" title="Son Eklenen Konular" />

      {topics.length === 0 ? (
        <EmptyState message="Henüz yayınlanmış bir konu yok. İçerikler eklendikçe burada listelenecek." />
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link
              key={t.id}
              href={`/sinif/${t.unit.class.level}/konu/${t.slug}`}
              className="rounded-card border border-lab-paperLine bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-lab-inkSoft"
            >
              <span className="font-mono text-xs font-semibold text-beaker-dark dark:text-beaker-light">
                {t.unit.class.level}. Sınıf
              </span>
              <h3 className="mt-1 font-display text-base font-semibold">{t.title}</h3>
              {t.summary && (
                <p className="mt-2 line-clamp-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">
                  {t.summary}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-8 rounded-card border border-dashed border-lab-paperLine bg-white/60 p-10 text-center dark:border-white/10 dark:bg-white/5">
      <p className="text-sm text-lab-inkMuted dark:text-lab-paper/60">{message}</p>
    </div>
  );
}
