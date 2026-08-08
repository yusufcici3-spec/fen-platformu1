import { SectionHeading } from "./ClassesSection";
import { EmptyState } from "./RecentAdditions";

export function PopularTopics() {
  // NOT: Popülerlik hesaplaması (görüntülenme/tamamlanma sayısına göre)
  // ilerleyen aşamada eklenecek. Şimdilik boş durum gösteriliyor.
  const popularTopics: { id: string; title: string }[] = [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Trend" title="Popüler Konular" />

      {popularTopics.length === 0 ? (
        <EmptyState message="Popüler konular, öğrenciler platformu kullanmaya başladıkça burada görünecek." />
      ) : (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popularTopics.map((t) => (
            <li key={t.id} className="rounded-card border border-lab-paperLine bg-white p-4 dark:border-white/10 dark:bg-lab-inkSoft">
              {t.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
