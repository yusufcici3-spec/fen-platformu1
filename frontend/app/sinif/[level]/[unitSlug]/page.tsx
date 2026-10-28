import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { TopicListWithProgress } from "@/components/topic/TopicListWithProgress";
import { apiFetch } from "@/lib/api";
import { UnitSummary, TopicSummary } from "@/types/curriculum";
import { getStaticUnit } from "@/lib/maarifContent";

interface ClassDetail {
  id: string;
  level: number;
  name: string;
  units: (UnitSummary & { topics: TopicSummary[] })[];
}

export async function generateMetadata({ params }: { params: { level: string; unitSlug: string } }) {
  return { title: `${params.level}. Sınıf Ünite İçeriği` };
}

export default async function UnitPage({ params }: { params: { level: string; unitSlug: string } }) {
  const level = Number(params.level);
  const staticUnit = getStaticUnit(level, params.unitSlug);

  if (staticUnit) {
    return (
      <>
        <PageHeader eyebrow={`${level}. Sınıf · Ünite ${staticUnit.code}`} title={staticUnit.title} description={staticUnit.description} />
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Link href={`/sinif/${level}`} className="text-sm font-semibold text-beaker hover:underline">← Tüm Ünitelere Dön</Link>
          <div className="mt-6 grid gap-4">
            {staticUnit.topics.map((topic, index) => (
              <Link key={topic.slug} href={`/sinif/${level}/${staticUnit.slug}/${topic.slug}`} className="group flex items-center gap-4 rounded-card border border-lab-paperLine bg-white p-5 transition hover:border-beaker hover:shadow-md dark:border-white/10 dark:bg-lab-inkSoft">
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-beaker/10 font-mono font-bold text-beaker-dark dark:text-beaker-light">{index + 1}</span>
                <div className="min-w-0 flex-1"><h2 className="font-semibold">{topic.title}</h2><p className="mt-1 text-sm text-lab-inkMuted dark:text-lab-paper/60">{topic.summary}</p><p className="mt-2 text-xs text-beaker">{topic.sections.length} anlatım bölümü · etkinlik · mini test</p></div>
                <span className="text-beaker">→</span>
              </Link>
            ))}
          </div>
        </section>
      </>
    );
  }

  let classData: ClassDetail | null = null;
  try {
    const res = await apiFetch<ClassDetail>(`/siniflar/${level}-sinif`);
    classData = res.data ?? null;
  } catch {
    classData = null;
  }

  const unit = classData?.units.find((u) => u.slug === params.unitSlug);
  if (!unit) notFound();

  return (
    <>
      <PageHeader eyebrow={`${level}. Sınıf${unit.code ? ` · Ünite ${unit.code}` : ""}`} title={unit.title} description={unit.description ?? undefined} />
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`/sinif/${level}`} className="text-sm font-semibold text-beaker hover:underline">← Tüm Ünitelere Dön</Link>
          {unit.topics.length > 0 && <Link href={`/pratik?unitId=${unit.id}&title=${encodeURIComponent(unit.title + " - Soru Çöz")}`} className="inline-flex items-center gap-2 rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark">📝 Bu Üniteden Soru Çöz</Link>}
        </div>
        {unit.topics.length === 0 ? <div className="mt-6"><EmptyPanelState title="Bu ünite için henüz konu eklenmedi" description="Konular yönetim panelinden eklendikçe burada listelenecek." /></div> : <div className="mt-6"><TopicListWithProgress topics={unit.topics} level={level} unitSlug={unit.slug} /></div>}
      </section>
    </>
  );
}
