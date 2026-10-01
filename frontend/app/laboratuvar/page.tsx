import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata = {
  title: "Güneş ve Ay Tutulmaları",
  description:
    "Ay'ı yörüngesinde hareket ettirerek Güneş ve Ay tutulmalarının nasıl oluştuğunu keşfet.",
};

export default function EclipsesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Etkileşimli Fen Laboratuvarı"
        title="Güneş ve Ay Tutulmaları"
        description="Gök cisimlerini hareket ettir, gölgelerin nasıl oluştuğunu keşfet ve kısa animasyonu izle."
      />

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="grid gap-8 rounded-card border border-lab-paperLine bg-white p-5 dark:border-white/10 dark:bg-lab-inkSoft sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-center">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
              25 saniyelik dikey animasyon
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold">Önce izle, sonra kendin dene</h2>
            <p className="mt-3 text-lab-inkMuted dark:text-lab-paper/70">
              Güneş tutulmasında Ay’ın gölgesi Dünya’ya; Ay tutulmasında ise Dünya’nın gölgesi Ay’a düşer.
              Animasyon iki hizalanmayı da adım adım gösterir.
            </p>
            <p className="mt-4 text-sm text-lab-inkMuted dark:text-lab-paper/60">
              Videoyu telefonda dikey olarak izleyebilir, etkileşimli simülasyonda Ay’ı dokunarak sürükleyebilirsin.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl bg-lab-ink shadow-lg ring-1 ring-black/10">
            <video
              className="block aspect-[9/16] h-auto max-h-[70vh] w-full object-contain"
              controls
              playsInline
              preload="metadata"
              poster="/tutulmalar/kapak.png"
              aria-label="Güneş ve Ay tutulmalarını anlatan Türkçe dikey animasyon"
            >
              <source src="/tutulmalar/tutulma-mobil.mp4" type="video/mp4" />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          </div>
        </section>

        <section aria-labelledby="interactive-title">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wide text-beaker-dark dark:text-beaker-light">
                Dokun ve keşfet
              </span>
              <h2 id="interactive-title" className="mt-1 font-display text-2xl font-bold">
                Tutulma Laboratuvarı
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-lab-inkMuted dark:text-lab-paper/65">
                Tutulma türünü seç; Ay’ı yörüngesinde tutup sürükle veya kaydırıcıyı kullan.
                Tutulma hizasına geldiğinde gölgenin nereye düştüğünü gözlemle.
              </p>
            </div>
            <Link
              href="/tutulmalar/interaktif.html"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-sm font-semibold text-beaker hover:underline"
            >
              Tam ekranda aç →
            </Link>
          </div>
          <div className="rounded-2xl border border-lab-paperLine bg-white p-6 shadow-sm dark:border-white/10 dark:bg-lab-inkSoft sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg font-semibold">Kontroller sende</p>
                <p className="mt-1 max-w-2xl text-sm text-lab-inkMuted dark:text-lab-paper/65">
                  Güneş veya Ay tutulmasını seç; Ay’ı dokunarak yörüngesinde hareket ettir, oynat veya hizala.
                </p>
              </div>
              <Link
                href="/tutulmalar/interaktif.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-beaker px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-beaker-dark"
              >
                Etkileşimli simülasyonu aç →
              </Link>
            </div>
          </div>
          <p className="mt-3 text-xs text-lab-inkMuted dark:text-lab-paper/55">
            Şema eğitim amaçlıdır; gök cisimlerinin boyutları ve aralarındaki uzaklıklar ölçekte değildir.
          </p>
        </section>
      </div>
    </>
  );
}
