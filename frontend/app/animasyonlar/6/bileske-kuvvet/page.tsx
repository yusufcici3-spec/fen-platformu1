import Link from "next/link";
import BileskeKuvvetSimulator from "@/components/animations/BileskeKuvvetSimulator/BileskeKuvvetSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "Bileşke Kuvvet Simülatörü | 6. Sınıf Fen Bilimleri",
  description:
    "Zıt ve aynı yönlü kuvvetleri ayarla, bileşke kuvveti bul ve kutunun hareketini izle.",
};

export default function BileskeKuvvetPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/6">6. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Bileşke Kuvvet</span>
        </nav>

        <header className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>6. SINIF · KUVVET VE HAREKET</span>
            <h1>Bileşke kuvveti sen bul</h1>
            <p>
              İki kişinin kutuya uyguladığı kuvvetleri değiştir. Kuvvetler zıt yönlüyken çıkarılır,
              aynı yönlüyken toplanır; bileşke kuvvet kutunun hareketini belirler.
            </p>
            <div className={styles.heroFacts}>
              <span><b>Aynı yön</b> kuvvetler toplanır</span>
              <span><b>Zıt yön</b> kuvvetler çıkarılır</span>
              <span><b>0 N</b> dengelenmiş kuvvetler</span>
            </div>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <i className={styles.arrowBlue} />
            <i className={styles.arrowOrange} />
            <i className={styles.arrowGreen} />
          </div>
        </header>

        <BileskeKuvvetSimulator />

        <section className={styles.learning} aria-labelledby="learning-title">
          <div className={styles.learningHeading}>
            <span className={styles.eyebrow}>BİLEŞKE KUVVET</span>
            <h2 id="learning-title">Birden fazla kuvvet tek bir kuvvet gibi etki eder</h2>
          </div>
          <div className={styles.learningGrid}>
            <article className={styles.learningCard}>
              <span className={`${styles.mark} ${styles.markSame}`}>+</span>
              <div>
                <h3>Aynı yönlü kuvvetler toplanır</h3>
                <p>Bileşke kuvvet, kuvvetlerin toplamına eşittir ve onlarla aynı yöndedir.</p>
              </div>
            </article>
            <article className={styles.learningCard}>
              <span className={`${styles.mark} ${styles.markOpposite}`}>−</span>
              <div>
                <h3>Zıt yönlü kuvvetler çıkarılır</h3>
                <p>Büyük kuvvetten küçük kuvvet çıkarılır. Bileşke kuvvet büyük kuvvetin yönündedir.</p>
              </div>
            </article>
            <article className={styles.learningCard}>
              <span className={`${styles.mark} ${styles.markBalanced}`}>0</span>
              <div>
                <h3>Dengelenmiş kuvvetler</h3>
                <p>Bileşke kuvvet 0 N ise cismin hareket durumu değişmez: durgun cisim durmaya devam eder.</p>
              </div>
            </article>
          </div>
          <div className={styles.sourceLinks}>
            <span>Bilimsel kaynak:</span>
            <a
              href="https://www.grc.nasa.gov/WWW/K-12/airplane/equilib.html"
              target="_blank"
              rel="noreferrer"
            >
              NASA Glenn · Dengelenmiş ve dengelenmemiş kuvvetler
            </a>
          </div>
          <p className={styles.modelNote}>
            Bu etkinlik hareketi basitleştirilmiş bir model olarak gösterir: sürtünme yoktur ve kutunun
            hızı bileşke kuvvetin etkisiyle değişir. Görüntü, kutuyu izleyen bir kamera gibi zemini kaydırır.
          </p>
        </section>

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link>
          <Link href="/#animasyonlar">Tüm animasyonlar →</Link>
        </div>
      </div>
    </main>
  );
}
