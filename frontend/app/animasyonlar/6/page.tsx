import Link from "next/link";
import SolarSystemSimulator from "@/components/animations/SolarSystemSimulator/SolarSystemSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "6. Sınıf Animasyonları | Fen Bilimleri",
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
            <Link href="/animasyonlar/6/bileske-kuvvet">Bileşke kuvvet simülatörü ↗</Link>
            <Link href="/animasyonlar/6/surat-ve-hiz">Sürat ve hız animasyonu ↗</Link>
            <Link href="/animasyonlar/6/ip-cekme">İp çekme etkinliği ↗</Link>
            <Link href="/animasyonlar/6/cicekli-bitkiler-yasam-dongusu">Çiçekli bitkilerin yaşam döngüsü 🌼</Link>
            <Link href="/animasyonlar/6/cicegin-kisimlari">🌺 Çiçeğin Kısımları – Etkileşimli Animasyon</Link>
            <Link href="/animasyonlar/6/esesiz-ureme">Eşeysiz üreme çeşitleri 🧫</Link>
            <Link href="/animasyonlar/6/fen-futbolu6">Fen Futbolu 6 oyunu ⚽</Link>
          </div>
        </header>

        <section className="mb-7 overflow-hidden rounded-2xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 to-white p-5 shadow-md dark:border-emerald-800 dark:from-emerald-950 dark:to-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-black tracking-wider text-emerald-700 dark:text-emerald-300">YENİ ETKİLEŞİMLİ ETKİNLİK · 6. SINIF FEN BİLİMLERİ</span>
              <h2 className="mt-1 text-2xl font-black text-emerald-950 dark:text-white">🌺 Çiçeğin Kısımları ve Görevleri</h2>
              <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-200">Çiçeğin üzerindeki bölümlere dokun, adlarını ve görevlerini etkileşimli olarak keşfet.</p>
            </div>
            <Link href="/animasyonlar/6/cicegin-kisimlari" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-sm font-extrabold text-white shadow hover:bg-emerald-800">Animasyonu Aç →</Link>
          </div>
        </section>

        <section className="mb-7 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 to-white p-5 shadow-sm dark:border-sky-900 dark:from-slate-800 dark:to-slate-900">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-xs font-extrabold tracking-wider text-sky-700 dark:text-sky-300">6. SINIF · HAREKET VE ÖLÇME</span>
              <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">🚗 Sürat ve Hız: Aracı Kendin Hareket Ettir</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Aracın süratini ayarla; doğuya, batıya gitmesini veya geri dönmesini sağla. Alınan yol ve yer değiştirme farkını keşfet.</p>
            </div>
            <Link href="/animasyonlar/6/surat-ve-hiz" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-sky-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-800">Animasyonu Aç →</Link>
          </div>
        </section>

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
