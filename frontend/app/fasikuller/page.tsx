import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { FASIKUL_GRADES, getFasikuller } from "@/lib/fasikuller";

export const metadata = {
  title: "Fasiküller | 5, 6, 7 ve 8. Sınıf Fen Bilimleri",
  description: "Fen bilimleri fasiküllerini ve çalışma kâğıtlarını PDF olarak aç ve indir.",
};

export default function FasikullerPage({ searchParams }: { searchParams: { sinif?: string } }) {
  const selected = Number(searchParams.sinif);
  const grade = (FASIKUL_GRADES as readonly number[]).includes(selected) ? selected : null;
  const grades = grade ? [grade] : [...FASIKUL_GRADES];
  return (
    <>
      <PageHeader eyebrow="Çalış · Pekiştir" title={grade ? `${grade}. Sınıf Fasikülleri` : "Fasiküller"} description="Fasikülleri ve çalışma kâğıtlarını açabilir veya indirebilirsin." />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Sınıf seç" className="flex flex-wrap gap-2">
          <Link href="/fasikuller" className={`rounded-full border px-4 py-2 text-sm font-semibold ${!grade ? "border-beaker bg-beaker text-white" : "border-lab-paperLine hover:border-beaker dark:border-white/15"}`}>Tümü</Link>
          {FASIKUL_GRADES.map((g) => (
            <Link key={g} href={`/fasikuller?sinif=${g}`} className={`rounded-full border px-4 py-2 text-sm font-semibold ${grade === g ? "border-beaker bg-beaker text-white" : "border-lab-paperLine hover:border-beaker dark:border-white/15"}`}>{g}. Sınıf</Link>
          ))}
        </nav>
        <div className="mt-8 space-y-10">
          {grades.map((g) => {
            const items = getFasikuller(g);
            return (
              <div key={g}>
                {!grade && <h2 className="mb-4 font-display text-xl font-bold">{g}. Sınıf</h2>}
                {items.length === 0 ? (
                  <EmptyPanelState title={`${g}. sınıf için henüz fasikül eklenmedi`} description="Fasiküller eklendikçe burada listelenecek." />
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <article key={item.url} className="rounded-card border border-lab-paperLine bg-white p-5 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl" aria-hidden="true">📄</span>
                          <div className="min-w-0 flex-1"><h3 className="font-display font-semibold">{item.title}</h3><p className="text-xs text-lab-inkMuted dark:text-lab-paper/60">PDF · 7 sayfa</p></div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a href={item.url} target="_blank" rel="noreferrer" className="rounded-full bg-beaker px-4 py-2 text-sm font-semibold text-white hover:bg-beaker-dark">Aç</a>
                          <a href={item.url} download={item.file} className="rounded-full border border-beaker px-4 py-2 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light">İndir</a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
