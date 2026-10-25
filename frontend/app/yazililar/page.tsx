import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyPanelState } from "@/components/ui/EmptyPanelState";
import { YAZILI_GRADES, getYazililar, type YaziliItem } from "@/lib/yazililar";

export const metadata = {
  title: "Yazılılar | 5, 6, 7 ve 8. Sınıf Fen Bilimleri",
  description: "5, 6, 7 ve 8. sınıf fen bilimleri yazılılarını PDF veya resim olarak aç, indir ve sınavlara hazırlan.",
};

function PdfCard({ item }: { item: YaziliItem }) {
  return (
    <article className="rounded-card border border-lab-paperLine bg-white p-5 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">📄</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold">{item.title}</h3>
          <p className="text-xs text-lab-inkMuted dark:text-lab-paper/60">PDF</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <a href={item.url} target="_blank" rel="noreferrer" className="rounded-full bg-beaker px-4 py-2 text-sm font-semibold text-white hover:bg-beaker-dark">
          Aç
        </a>
        <a href={item.url} download className="rounded-full border border-beaker px-4 py-2 text-sm font-semibold text-beaker-dark hover:bg-beaker/10 dark:text-beaker-light">
          İndir
        </a>
      </div>
      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-semibold text-beaker">Sayfada önizle</summary>
        <iframe src={item.url} title={`${item.title} önizleme`} loading="lazy" className="mt-3 h-[560px] w-full rounded-lg border border-lab-paperLine dark:border-white/10" />
      </details>
    </article>
  );
}

function ImageCard({ item }: { item: YaziliItem }) {
  const pages = item.kind === "set" && item.pages ? item.pages : [item.url];
  return (
    <article className="rounded-card border border-lab-paperLine bg-white p-5 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">🖼️</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold">{item.title}</h3>
          <p className="text-xs text-lab-inkMuted dark:text-lab-paper/60">
            {pages.length > 1 ? `Resim · ${pages.length} sayfa` : "Resim"}
          </p>
        </div>
      </div>
      <div className={`mt-3 grid gap-2 ${pages.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {pages.map((src, i) => (
          <a key={src} href={src} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-lg border border-lab-paperLine dark:border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${item.title}${pages.length > 1 ? ` – sayfa ${i + 1}` : ""}`}
              loading="lazy"
              className="h-auto w-full object-cover transition group-hover:scale-[1.02]"
            />
          </a>
        ))}
      </div>
      <p className="mt-2 text-xs text-lab-inkMuted dark:text-lab-paper/60">Büyütmek için resme tıkla.</p>
    </article>
  );
}

export default function YazililarPage({ searchParams }: { searchParams: { sinif?: string } }) {
  const selected = Number(searchParams.sinif);
  const grade = (YAZILI_GRADES as readonly number[]).includes(selected) ? selected : null;
  const grades = grade ? [grade] : [...YAZILI_GRADES];

  return (
    <>
      <PageHeader
        eyebrow="Çalış · Dene · Hazırlan"
        title={grade ? `${grade}. Sınıf Yazılıları` : "Yazılılar"}
        description="Yazılıları PDF veya resim olarak açabilir, indirebilir ve sınavlara hazırlanırken kullanabilirsin."
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Sınıf seç" className="flex flex-wrap gap-2">
          <Link
            href="/yazililar"
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              !grade ? "border-beaker bg-beaker text-white" : "border-lab-paperLine hover:border-beaker dark:border-white/15"
            }`}
          >
            Tümü
          </Link>
          {YAZILI_GRADES.map((g) => (
            <Link
              key={g}
              href={`/yazililar?sinif=${g}`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                grade === g ? "border-beaker bg-beaker text-white" : "border-lab-paperLine hover:border-beaker dark:border-white/15"
              }`}
            >
              {g}. Sınıf
            </Link>
          ))}
        </nav>

        <div className="mt-8 space-y-10">
          {grades.map((g) => {
            const items = getYazililar(g);
            return (
              <div key={g}>
                {!grade && <h2 className="mb-4 font-display text-xl font-bold">{g}. Sınıf</h2>}
                {items.length === 0 ? (
                  <EmptyPanelState title={`${g}. sınıf için henüz yazılı eklenmedi`} description="Yazılılar eklendikçe burada listelenecek." />
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (item.kind === "pdf" ? <PdfCard key={item.id} item={item} /> : <ImageCard key={item.id} item={item} />))}
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
