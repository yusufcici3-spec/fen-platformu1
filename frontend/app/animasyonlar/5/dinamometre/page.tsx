import Link from "next/link";
import DynamometerSimulator from "@/components/animations/DynamometerSimulator/DynamometerSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "Dinamometre Simülatörü | 5. Sınıf Fen Bilimleri",
  description:
    "Kütle ağırlıkları ekle, dinamometrenin yay uzamasını gözlemle ve ölçülen kuvveti Newton birimiyle karşılaştır.",
};

export default function DynamometerPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/5">5. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Kuvvetin Ölçülmesi</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>5. SINIF · KUVVETİN ÖLÇÜLMESİ</span>
            <h1>Ağırlığı ekle, dinamometredeki değişimi gözle</h1>
            <p>
              Farklı kütleleri yaya as. Yayın uzamasını ve dinamometrenin ölçtüğü ağırlık kuvvetini
              karşılaştır; ölçüm aralığını aşınca ne olduğunu keşfet.
            </p>
            <div className={styles.heroFacts}>
              <span><b>Kütle:</b> gram (g)</span>
              <span><b>Kuvvet:</b> Newton (N)</span>
              <span><b>Kontrol:</b> ölçüm aralığı</span>
            </div>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <span className={styles.orbit} />
            <span className={styles.springIcon}>⌁</span>
            <span className={styles.forceArrow}>↓</span>
            <span className={styles.heroSpark}>✦</span>
          </div>
        </header>

        <DynamometerSimulator />

        <section className={styles.learning} aria-labelledby="learning-title">
          <div className={styles.learningHeading}>
            <span className={styles.eyebrow}>ÖLÇ · KARŞILAŞTIR · YORUMLA</span>
            <h2 id="learning-title">Dinamometre bize neyi gösterir?</h2>
          </div>
          <div className={styles.learningGrid}>
            <article className={styles.learningCard}>
              <span className={`${styles.learningIcon} ${styles.blue}`} aria-hidden="true">N</span>
              <h3>Kuvvetin birimi Newton’dur</h3>
              <p>Dinamometre kuvveti ölçer; ölçüm sonucu Newton (N) birimiyle yazılır.</p>
            </article>
            <article className={styles.learningCard}>
              <span className={`${styles.learningIcon} ${styles.teal}`} aria-hidden="true">↕</span>
              <h3>Kuvvet artınca yay uzar</h3>
              <p>Ölçüm sınırları içinde, daha büyük kuvvet yayın daha fazla uzamasına neden olur.</p>
            </article>
            <article className={styles.learningCard}>
              <span className={`${styles.learningIcon} ${styles.orange}`} aria-hidden="true">!</span>
              <h3>Kapasiteyi kontrol et</h3>
              <p>Ölçebileceğinden fazla kuvvet dinamometrenin yayını bozabilir; aralık aşılırsa ölçüme güvenme.</p>
            </article>
          </div>
          <p className={styles.modelNote}>
            Bu eğitim modelinde Dünya’daki yer çekimi yaklaşık 10 N/kg alınmıştır; örneğin 100 g kütle yaklaşık 1 N ağırlık kuvveti oluşturur.
            Simülatör ideal bir yay varsayar ve gerçek ölçüm cihazlarının yerini tutmaz.
          </p>
          <div className={styles.sources}>
            <span>Kaynaklar:</span>
            <a href="https://bilimgenc.tubitak.gov.tr/makale/dinamometre-nedir-nasil-calisir" target="_blank" rel="noreferrer">
              TÜBİTAK Bilim Genç · Dinamometre nasıl çalışır?
            </a>
            <a href="https://burdur.meb.gov.tr/meb_iys_dosyalar/2020_09/17103713_Fen_ve_Teknoloji_5.SYnYf_3.Tema_-_Kuvvetin_Olculmesi_ve_Surtunme.pdf" target="_blank" rel="noreferrer">
              MEB · Kuvvetin ölçülmesi
            </a>
          </div>
        </section>

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/5">← 5. sınıf animasyonlarına dön</Link>
          <Link href="/#animasyonlar">Diğer sınıflara git →</Link>
        </div>
      </div>
    </main>
  );
}
