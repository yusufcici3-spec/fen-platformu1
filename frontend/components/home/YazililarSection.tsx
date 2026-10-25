import Link from "next/link";
import { YAZILI_GRADES, getYazililar } from "@/lib/yazililar";

export function YazililarSection() {
  return (
    <section id="yazililar" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="yazililar-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
            ÇALIŞ · DENE · HAZIRLAN
          </span>
          <h2 id="yazililar-title" className="mt-2 font-display text-3xl font-bold">Yazılılar</h2>
          <p className="mt-2 max-w-2xl text-lab-inkMuted dark:text-lab-paper/70">
            Sınıfını seç; geçmiş yazılıları PDF veya resim olarak aç, indir ve sınavlara hazırlan.
          </p>
        </div>
        <Link href="/yazililar" className="text-sm font-semibold text-beaker hover:underline">
          Tüm yazılılar →
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {YAZILI_GRADES.map((grade) => {
          const items = getYazililar(grade);
          const latest = items.slice(-3).reverse();
          return (
            <article
              key={grade}
              className="flex flex-col rounded-card border border-lab-paperLine bg-white p-5 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-bold text-beaker">{grade}</span>
                <span className="rounded-full bg-lab-paperLine/60 px-2.5 py-1 text-xs font-medium text-lab-inkMuted dark:bg-white/10 dark:text-lab-paper/60">
                  {items.length} yazılı
                </span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold">{grade}. Sınıf Yazılıları</h3>
              {latest.length > 0 ? (
                <ul className="mt-3 space-y-1.5 text-sm">
                  {latest.map((item) => (
                    <li key={item.id} className="flex gap-2">
                      <span aria-hidden="true">{item.kind === "pdf" ? "📄" : "🖼️"}</span>
                      <a href={item.url} target="_blank" rel="noreferrer" className="line-clamp-1 hover:text-beaker hover:underline">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-lab-inkMuted dark:text-lab-paper/60">Yazılılar yakında eklenecek.</p>
              )}
              <Link
                href={`/yazililar?sinif=${grade}`}
                className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-beaker"
              >
                {grade}. sınıf yazılılarını aç <span aria-hidden="true">→</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
