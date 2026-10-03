import Link from "next/link";
import SolarSystemSimulator from "@/components/animations/SolarSystemSimulator/SolarSystemSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "6. Sınıf Animasyonları | Gezegenler ve Tutulmalar",
  description:
    "Gezegenleri yakından incele; Güneş ve Ay tutulmalarını etkileşimli simülatörle keşfet.",
};

export default function SixthGradePlanetAnimationsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">6. Sınıf · Güneş Sistemi</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>6. SINIF · GEZEGENLER VE TUTULMALAR</span>
          <h1>Gezegenleri keşfet, tutulmaları dene</h1>
          <p>
            Güneş çevresindeki sekiz gezegeni yakından incele; ardından Ay’ı hareket ettirerek
            Güneş ve Ay tutulmalarının nasıl oluştuğunu keşfet.
          </p>
          <div className={styles.heroLinks}>
            <span><i className={styles.miniDot} /> Kontroller sende · dokunmatik uyumlu</span>
            <a href="#tutulma-laboratuvari">Tutulma simülatörüne git ↓</a>
          </div>
        </header>

        <SolarSystemSimulator />

        <aside className={styles.lessonNote} aria-label="Ölçek bilgisi">
          <span className={styles.noteIcon} aria-hidden="true">i</span>
          <p>
            <strong>Ölçeği doğru yorumla:</strong> “Gerçek uzaklık” görünümünde yörünge yarıçapları
            Güneş’e ortalama uzaklıkla (AU) orantılıdır. Gezegenlerin çapları ve yörünge uzaklıkları
            aynı ekranda gerçek boyutlarıyla çizilseydi çoğu gezegen görünmeyecek kadar küçük kalırdı;
            bu nedenle gezegen diskleri seçilebilmeleri için büyütülmüştür. “Keşif görünümü” uzaklıkları
            sıkıştırır. Yörüngeler kolay anlaşılması için dairesel şemayla gösterilir.
          </p>
        </aside>

        <section
          id="tutulma-laboratuvari"
          className="mt-8 overflow-hidden rounded-[24px] border border-slate-200 bg-[#0a1322] shadow-lg dark:border-slate-700"
          aria-labelledby="eclipse-simulator-title"
        >
          <div className="flex flex-col gap-3 px-5 py-5 text-white sm:flex-row sm:items-end sm:justify-between sm:px-7">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                6. SINIF · GÜNEŞ VE AY
              </span>
              <h2 id="eclipse-simulator-title" className="mt-2 text-2xl font-bold">
                Tutulma Simülatörü
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Güneş tutulması ve Ay tutulması sekmelerini seç; Ay’ı yörüngesinde sürükleyerek
                gölgelerin nasıl oluştuğunu gözlemle.
              </p>
            </div>
            <Link
              href="/laboratuvar/tutulmalar"
              className="shrink-0 text-sm font-semibold text-sky-300 hover:underline"
            >
              Ayrıntılı tutulma sayfası →
            </Link>
          </div>
          <iframe
            title="Güneş ve Ay tutulması etkileşimli simülatörü"
            src="/tutulmalar/interaktif.html"
            className="block h-[720px] w-full border-0 sm:h-[780px]"
            loading="lazy"
            allowFullScreen
          />
        </section>

        <div className={styles.bottomNav}>
          <Link href="/#animasyonlar">← Diğer sınıf animasyonları</Link>
          <Link href="/sinif/6">6. sınıf ünitelerine git →</Link>
        </div>
      </div>
    </div>
  );
}
