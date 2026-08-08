import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { apiFetch } from "@/lib/api";
import { UnitSummary, TopicSummary } from "@/types/curriculum";

const VALID_LEVELS = [5, 6, 7, 8];

interface ClassDetail {
  id: string;
  level: number;
  name: string;
  units: (UnitSummary & { topics: TopicSummary[] })[];
}

export async function generateMetadata({ params }: { params: { level: string } }) {
  return { title: `${params.level}. Sınıf Üniteleri` };
}

export default async function ClassLevelPage({ params }: { params: { level: string } }) {
  const level = Number(params.level);
  if (!VALID_LEVELS.includes(level)) notFound();

  let classData: ClassDetail | null = null;
  try {
    const res = await apiFetch<ClassDetail>(`/siniflar/${level}-sinif`);
    classData = res.data ?? null;
  } catch {
    classData = null;
  }

  return (
    <>
      <PageHeader
        eyebrow={`${level}. Sınıf`}
        title={`${level}. Sınıf Fen Bilimleri Üniteleri`}
        description="Bir üniteye tıklayarak o ünitedeki konuları görüntüleyebilirsin."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {!classData || classData.units.length === 0 ? (
          <EmptyPanelState
            title="Bu sınıf için henüz ünite eklenmedi"
            description="Üniteler yönetim panelinden eklendikçe burada listelenecek."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {classData.units.map((unit) => (
              <Link
                key={unit.id}
                href={`/sinif/${level}/${unit.slug}`}
                className="group rounded-card border border-lab-paperLine bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-lab-inkSoft"
              >
                <div className="flex items-center justify-between">
                  {unit.code && (
                    <span className="font-mono text-xs font-semibold text-beaker-dark dark:text-beaker-light">
                      Ünite {unit.code}
                    </span>
                  )}
                  <span className="rounded-full bg-lab-paperLine/60 px-2.5 py-1 text-xs font-medium text-lab-inkMuted dark:bg-white/10 dark:text-lab-paper/60">
                    {unit.topics.length} konu
                  </span>
                </div>
                <h2 className="mt-2 font-display text-lg font-semibold">{unit.title}</h2>
                {unit.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-lab-inkMuted dark:text-lab-paper/60">
                    {unit.description}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-beaker">
                  Konuları görüntüle
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
