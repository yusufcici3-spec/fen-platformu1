import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { TopicListWithProgress } from "@/components/topic/TopicListWithProgress";
import { apiFetch } from "@/lib/api";
import { UnitSummary, TopicSummary } from "@/types/curriculum";

interface ClassDetail {
  id: string;
  level: number;
  name: string;
  units: (UnitSummary & { topics: TopicSummary[] })[];
}

export async function generateMetadata({ params }: { params: { level: string; unitSlug: string } }) {
  return { title: `${params.level}. Sınıf` };
}

export default async function UnitPage({ params }: { params: { level: string; unitSlug: string } }) {
  const level = Number(params.level);

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
      <PageHeader
        eyebrow={`${level}. Sınıf${unit.code ? ` · Ünite ${unit.code}` : ""}`}
        title={unit.title}
        description={unit.description ?? undefined}
      />
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`/sinif/${level}`} className="text-sm font-semibold text-beaker hover:underline">
            ← Tüm Ünitelere Dön
          </Link>
          {unit.topics.length > 0 && (
            <Link
              href={`/pratik?unitId=${unit.id}&title=${encodeURIComponent(unit.title + " - Soru Çöz")}`}
              className="inline-flex items-center gap-2 rounded-full bg-beaker px-5 py-2.5 text-sm font-semibold text-white hover:bg-beaker-dark"
            >
              📝 Bu Üniteden Soru Çöz
            </Link>
          )}
        </div>

        {unit.topics.length === 0 ? (
          <div className="mt-6">
            <EmptyPanelState
              title="Bu ünite için henüz konu eklenmedi"
              description="Konular yönetim panelinden eklendikçe burada listelenecek."
            />
          </div>
        ) : (
          <div className="mt-6">
            <TopicListWithProgress topics={unit.topics} level={level} unitSlug={unit.slug} />
          </div>
        )}
      </section>
    </>
  );
}
