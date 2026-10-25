import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { StaticUnitTopics } from "@/components/topic/StaticUnitTopics";
import { apiFetch } from "@/lib/api";
import { getStaticUnit } from "@/lib/maarifContent";
import { UnitSummary, TopicSummary } from "@/types/curriculum";

const LEVEL = 5;
const UNIT_SLUG = "gokyuzundeki-komsularimiz-ve-biz";

interface ClassDetail {
  units: (UnitSummary & { topics: TopicSummary[] })[];
}

export const metadata = {
  title: "5. Sınıf · Gökyüzündeki Komşularımız ve Biz",
  description:
    "Güneş’in yapısı ve dönmesi, Ay’ın özellikleri, hareketleri ve evreleri, Güneş-Dünya-Ay modeli. Türkiye Yüzyılı Maarif Modeli’ne uygun konu anlatımı.",
};

export default async function GokyuzuUnitPage() {
  const unit = getStaticUnit(LEVEL, UNIT_SLUG);
  if (!unit) notFound();

  // Ünite veritabanında da varsa "Bu Üniteden Soru Çöz" bağlantısı gösterilir.
  let dbUnitId: string | null = null;
  try {
    const res = await apiFetch<ClassDetail>(`/siniflar/${LEVEL}-sinif`);
    dbUnitId = res.data?.units.find((u) => u.slug === UNIT_SLUG)?.id ?? null;
  } catch {
    dbUnitId = null;
  }

  return (
    <>
      <PageHeader
        eyebrow={`${LEVEL}. Sınıf · Ünite ${unit.code} · ${unit.hours} ders saati`}
        title={unit.title}
        description={unit.description}
      />
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`/sinif/${LEVEL}`} className="text-sm font-semibold text-beaker hover:underline">
            ← Tüm Ünitelere Dön
          </Link>
          {dbUnitId && (
            <Link
              href={`/pratik?unitId=${dbUnitId}&title=${encodeURIComponent(unit.title + " - Soru Çöz")}`}
              className="inline-flex items-center gap-2 rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
            >
              📝 Bu Üniteden Soru Çöz
            </Link>
          )}
        </div>

        <div className="mt-6 rounded-card border border-lab-paperLine bg-white p-6 dark:border-white/10 dark:bg-lab-inkSoft">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <span>🎯</span> Bu ünitenin öğrenme çıktıları
          </h2>
          <ul className="mt-3 space-y-2">
            {unit.topics.map((t) => (
              <li key={t.slug} className="flex gap-2 text-sm text-lab-inkMuted dark:text-lab-paper/70">
                <span className="mt-0.5 text-leaf">✓</span>
                <span>
                  <span className="mr-1 font-mono text-xs text-beaker-dark dark:text-beaker-light">{t.outcome.code}</span>
                  {t.outcome.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <StaticUnitTopics level={LEVEL} unitSlug={UNIT_SLUG} topics={unit.topics} />
        </div>

        <p className="mt-8 text-xs text-lab-inkMuted dark:text-lab-paper/50">
          Kaynak: {unit.source}.
        </p>
      </section>
    </>
  );
}
