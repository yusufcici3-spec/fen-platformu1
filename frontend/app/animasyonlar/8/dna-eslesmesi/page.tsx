import Link from "next/link";
import DnaPairingSimulator from "@/components/animations/DnaPairingSimulator/DnaPairingSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "DNA Baz Eşleşmesi Simülatörü | 8. Sınıf Fen Bilimleri",
  description:
    "Adenin, timin, guanin ve sitozin bazlarını karşılıklı eşleştir; DNA zincirini düzenle ve hidrojen bağlarını keşfet.",
};

export default function DnaPairingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/8">8. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">DNA Baz Eşleşmeleri</span>
        </nav>

        <header className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>8. SINIF · 2. ÜNİTE · DNA VE GENETİK KOD</span>
            <h1>DNA zincirini sen tamamla</h1>
            <p>
              Bir zincirdeki bazları düzenle; karşısına doğru bazı seçerek DNA merdivenini kur.
              Zincir uzunluğunu değiştir, yeni dizilimler oluştur ve eşleşmelerini kontrol et.
            </p>
            <div className={styles.heroFacts}>
              <span><b>A ↔ T</b> Adenin – Timin</span>
              <span><b>G ↔ C</b> Guanin – Sitozin</span>
              <span><b>6–12</b> baz çifti uzunluğu</span>
            </div>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <span className={styles.helixRail} />
            <span className={styles.helixRungs}><i /><i /><i /><i /><i /></span>
            <span className={styles.heroBase}>A·T</span>
          </div>
        </header>

        <DnaPairingSimulator />

        <section className={styles.learning} aria-labelledby="learning-title">
          <div className={styles.learningHeading}>
            <span className={styles.eyebrow}>DNA’NIN YAPI TAŞLARI</span>
            <h2 id="learning-title">Her bazın bir eşleşme kuralı var</h2>
          </div>
          <div className={styles.learningGrid}>
            <article className={styles.learningCard}>
              <span className={`${styles.baseMark} ${styles.adenine}`}>A</span>
              <div><h3>Adenin, Timin ile eşleşir</h3><p>A–T baz çiftini iki hidrojen bağı bir arada tutar.</p></div>
            </article>
            <article className={styles.learningCard}>
              <span className={`${styles.baseMark} ${styles.guanine}`}>G</span>
              <div><h3>Guanin, Sitozin ile eşleşir</h3><p>G–C baz çiftini üç hidrojen bağı bir arada tutar.</p></div>
            </article>
            <article className={styles.learningCard}>
              <span className={`${styles.baseMark} ${styles.dna}`}>↔</span>
              <div><h3>İki zincir birbirini tamamlar</h3><p>Bir zincirde hangi baz varsa, karşısındaki baz eşleşme kuralına göre belirlenir.</p></div>
            </article>
          </div>
          <div className={styles.sourceLinks}>
            <span>Bilimsel kaynaklar:</span>
            <a href="https://www.genome.gov/genetics-glossary/Base-Pair" target="_blank" rel="noreferrer">
              NHGRI · Baz çifti ve tamamlayıcı DNA bazları
            </a>
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6822018/" target="_blank" rel="noreferrer">
              Minchin & Lodge · DNA’nın yapısı ve hidrojen bağları
            </a>
          </div>
          <p className={styles.modelNote}>
            Bu etkinlik DNA’nın bir bölümünü basitleştirilmiş “merdiven” görünümünde modeller. Gerçek DNA iki zincirin sarmal hâlinde dolanmasıyla oluşur; burada bazların eşleşme kuralına odaklanıyoruz.
          </p>
        </section>

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/8">← 8. sınıf animasyonlarına dön</Link>
          <Link href="/animasyonlar/8/kalitim">Bezelyelerde kalıtım simülatörünü aç →</Link>
        </div>
      </div>
    </main>
  );
}
