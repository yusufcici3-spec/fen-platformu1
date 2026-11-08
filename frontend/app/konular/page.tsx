import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { getStaticUnitsForLevel } from "@/lib/maarifContent";

export const metadata = { title: "Tüm Konular" };

const LEVELS = [5, 6, 7, 8];

export default function KonularPage() {
  return (
    <>
      <PageHeader
        eyebrow="5 · 6 · 7 · 8. Sınıflar"
        title="Tüm Fen Bilimleri Konuları"
        description="Sınıfını seç, ünitelere ve konulara ulaş."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <nav className="mb-10 flex flex-wrap gap-2 text-sm font-semibold">
          {LEVELS.map((l) => (
            <a key={l} href={`#sinif-${l}`} className="rounded-full border border-beaker/30 px-4 py-2 text-beaker hover:bg-beaker/10">
              {l}. Sınıf
            </a>
          ))}
        </nav>
        {LEVELS.map((level) => {
          const units = getStaticUnitsForLevel(level);
          return (
            <div key={level} id={`sinif-${level}`} className="mb-14 scroll-mt-24">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-2xl font-bold">{level}. Sınıf</h2>
                <Link href={`/sinif/${level}`} className="text-sm font-semibold text-beaker">
                  {level}. sınıfın tüm üniteleri →
                </Link>
              </div>
              {units.length === 0 ? (
                <Link href={`/sinif/${level}`} className="text-sm text-lab-inkMuted underline">
                  {level}. sınıf ünitelerini görüntüle
                </Link>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {units.map((unit) => (
                    <Link
                      key={unit.slug}
                      href={`/sinif/${level}/${unit.slug}`}
                      className="group rounded-card border border-beaker/30 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-lab-inkSoft"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-beaker-dark dark:text-beaker-light">Ünite {unit.code}</span>
                        <span className="rounded-full bg-lab-paperLine/60 px-2.5 py-1 text-xs font-medium text-lab-inkMuted dark:bg-white/10 dark:text-lab-paper/60">
                          {unit.topics.length} konu
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-semibold">{unit.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm text-lab-inkMuted dark:text-lab-paper/60">{unit.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-beaker">
                        Konuları görüntüle <span className="transition group-hover:translate-x-1">→</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}
