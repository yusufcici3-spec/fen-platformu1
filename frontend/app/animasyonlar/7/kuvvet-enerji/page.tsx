import Link from "next/link";
import EnergyConversionSimulator from "@/components/animations/EnergyConversionSimulator/EnergyConversionSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "Kuvvet ve Enerji Simülatörü | 7. Sınıf Fen Bilimleri",
  description:
    "7. sınıf için kütle, yükseklik, kinetik enerji, çekim potansiyel enerjisi ve sürtünmenin etkisini etkileşimli hız treni animasyonunda keşfet.",
};

export default function ForceAndEnergyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/7">7. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Kuvvet ve Enerji</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              7. SINIF · 2. ÜNİTE · KUVVET VE ENERJİYİ KEŞFEDELİM
            </span>
            <h1>Enerji dönüşümünü kendi deneyinle keşfet</h1>
            <p>
              Hız treninin kütlesini ve başladığı yüksekliği değiştir. Treni
              çalıştır, yol üzerinde ilerlet ve çekim potansiyel enerjisinin
              kinetik enerjiye dönüşümünü canlı göstergelerle izle.
            </p>
            <div className={styles.heroFacts}>
              <span><b>Kontrol et:</b> kütle · yükseklik · sürtünme</span>
              <span><b>Gözlemle:</b> potansiyel · kinetik · ısı enerjisi</span>
            </div>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <span className={styles.orbit} />
            <span className={styles.energyOrb}>↗</span>
            <span className={styles.energySpark}>✦</span>
            <span className={styles.energyDot} />
          </div>
        </header>

        <EnergyConversionSimulator />

        <section className={styles.learning} aria-labelledby="learning-title">
          <div className={styles.learningHeading}>
            <span className={styles.eyebrow}>KISA BİLGİ · GÖZLEMİNİ YORUMLA</span>
            <h2 id="learning-title">Enerji hangi durumda nasıl değişir?</h2>
          </div>
          <div className={styles.learningGrid}>
            <article className={styles.learningCard}>
              <span className={`${styles.learningIcon} ${styles.blue}`} aria-hidden="true">↟</span>
              <h3>Yükseklik artınca</h3>
              <p>
                Aynı kütledeki tren daha yükseğe çıkarıldığında çekim potansiyel
                enerjisi artar.
              </p>
            </article>
            <article className={styles.learningCard}>
              <span className={`${styles.learningIcon} ${styles.orange}`} aria-hidden="true">➜</span>
              <h3>Tren hızlanınca</h3>
              <p>
                Tren alçalırken potansiyel enerjinin bir bölümü kinetik enerjiye
                dönüşür; sürati yükselir.
              </p>
            </article>
            <article className={styles.learningCard}>
              <span className={`${styles.learningIcon} ${styles.rose}`} aria-hidden="true">≈</span>
              <h3>Sürtünme olunca</h3>
              <p>
                Hareket enerjisinin bir bölümü ısıya dönüşür. Enerji yok olmaz,
                başka bir biçime dönüşür.
              </p>
            </article>
          </div>
          <p className={styles.modelDisclaimer}>
            Simülasyon, enerji dönüşümünü görünür kılmak için basitleştirilmiştir.
            Gerçek sistemlerde sürtünme ve hava direnci değişebilir; ekrandaki
            sayısal değerler bu modelin yaklaşık ölçümleridir.
          </p>
          <div className={styles.sources}>
            <span>Kaynaklar:</span>
            <a
              href="https://mufredat.meb.gov.tr/Dosyalar/201812312311937-FEN%20B%C4%B0L%C4%B0MLER%C4%B0%20%C3%96%C4%9ERET%C4%B0M%20PROGRAMI2018.pdf"
              target="_blank"
              rel="noreferrer"
            >
              MEB · Fen Bilimleri Öğretim Programı
            </a>
            <a
              href="https://phys.libretexts.org/Bookshelves/College_Physics/College_Physics_1e_(OpenStax )/07%3A_Work_Energy_and_Energy_Resources/7.03%3A_Gravitational_Potential_Energy"
              target="_blank"
              rel="noreferrer"
            >
              OpenStax · Çekim potansiyel enerjisi
            </a>
          </div>
        </section>

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link>
          <Link href="/#animasyonlar">Diğer sınıflara git →</Link>
        </div>
      </div>
    </main>
  );
}
