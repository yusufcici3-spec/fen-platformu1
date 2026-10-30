import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { apiFetch } from "@/lib/api";
import { UnitSummary, TopicSummary } from "@/types/curriculum";
import { getStaticUnitsForLevel } from "@/lib/maarifContent";

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

  const staticUnits = getStaticUnitsForLevel(level);
  const dbUnits = (classData?.units ?? []).filter((u) => {
    const isStaticDuplicate = staticUnits.some((s) => s.slug === u.slug);
    const isLegacyPhysicalEventsUnit = level === 8 && (
      u.code?.trim().toLowerCase() === "f.8.7" ||
      u.title.toLocaleLowerCase("tr-TR").includes("fiziksel olaylar")
    );
    return !isStaticDuplicate && !isLegacyPhysicalEventsUnit;
  });

  return (
    <>
      <PageHeader
        eyebrow={`${level}. Sınıf`}
        title={`${level}. Sınıf Fen Bilimleri Üniteleri`}
        description="Bir üniteye tıklayarak o ünitedeki konuları görüntüleyebilirsin."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        {level === 6 && (
          <Link
            href="/laboratuvar/tutulmalar"
            className="group mb-8 block rounded-card border border-beaker/25 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-beaker/30 dark:bg-lab-inkSoft"
          >
            <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
              6. SINIF · GÜNEŞ SİSTEMİ VE TUTULMALAR
            </span>
            <h2 className="mt-2 font-display text-xl font-bold">
              Güneş ve Ay tutulmalarını keşfet
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-lab-inkMuted dark:text-lab-paper/65">
              Tutulmaların nasıl oluştuğunu izle; Ay’ı sürükleyip etkileşimli simülasyonu kendin kontrol et.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-beaker">
              Simülasyonu aç <span aria-hidden="true">→</span>
            </span>
          </Link>
        )}
        {staticUnits.length > 0 && (
          <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {staticUnits.map((unit) => (
              <Link
                key={unit.slug}
                href={`/sinif/${level}/${unit.slug}`}
                className="group rounded-card border border-beaker/30 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-beaker/30 dark:bg-lab-inkSoft"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-beaker-dark dark:text-beaker-light">
                    Ünite {unit.code} · Maarif Modeli
                  </span>
                  <span className="rounded-full bg-lab-paperLine/60 px-2.5 py-1 text-xs font-medium text-lab-inkMuted dark:bg-white/10 dark:text-lab-paper/60">
                    {unit.topics.length} konu
                  </span>
                </div>
                <h2 className="mt-2 font-display text-lg font-semibold">{unit.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-lab-inkMuted dark:text-lab-paper/60">{unit.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-beaker">
                  Konuları görüntüle
                  <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        )}
        {staticUnits.length === 0 && (!classData || classData.units.length === 0) ? (
          <EmptyPanelState
            title="Bu sınıf için henüz ünite eklenmedi"
            description="Üniteler yönetim panelinden eklendikçe burada listelenecek."
          />
        ) : dbUnits.length === 0 ? null : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dbUnits.map((unit) => (
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
