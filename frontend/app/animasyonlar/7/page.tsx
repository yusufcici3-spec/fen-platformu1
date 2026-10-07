import Link from "next/link";
import SpaceTechnologySimulator from "@/components/animations/SpaceTechnologySimulator/SpaceTechnologySimulator";
import StellarEvolutionSimulator from "@/components/animations/StellarEvolutionSimulator/StellarEvolutionSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "7. Sınıf Animasyonları | Uzay, Yıldızlar ve Enerji",
  description:
    "Uzay teknolojilerini, yıldızların yaşamını ve kuvvet-enerji konularını etkileşimli simülasyonlarla keşfet.",
};

export default function SeventhGradeSpaceTechnologyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">7. Sınıf · Uzay ve Yıldızlar</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>7. SINIF · UZAYI KEŞFET</span>
            <h1>Uzay araçlarını ve yıldızların yaşamını keşfet</h1>
            <p>
              Uzay teknolojilerini incele; yıldızın başlangıç kütlesinin yaşamını nasıl değiştirdiğini
              tıklanabilir, görsel bir simülasyonla adım adım öğren.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.heroAction} href="#simulator">
                Uzay teknolojilerine git <span aria-hidden="true">↓</span>
              </a>
              <a className={`${styles.heroAction} ${styles.heroActionSecondary}`} href="#stellar-life">
                Yıldızların yaşamını keşfet <span aria-hidden="true">✦</span>
              </a>
              <Link className={`${styles.heroAction} ${styles.heroActionSecondary}`} href="/animasyonlar/7/kuvvet-enerji">
                Kuvvet ve enerjiye git <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className={styles.heroOrbit} aria-hidden="true">
            <span className={styles.heroRing} />
            <span className={styles.heroRingTwo} />
            <span className={styles.heroEarth} />
            <span className={styles.heroSatellite}>✦</span>
            <span className={styles.heroStarOne}>✧</span>
            <span className={styles.heroStarTwo}>·</span>
          </div>
        </header>

        <section id="simulator" className={styles.simulatorSection} aria-labelledby="simulator-title">
          <div className={styles.sectionIntro}>
            <div>
              <span className={styles.sectionEyebrow}>KONTROLLER SENDE</span>
              <h2 id="simulator-title">Görev merkezini çalıştır</h2>
            </div>
            <p>Aracı seç · hareketi durdur · görünümü yakınlaştır</p>
          </div>
          <SpaceTechnologySimulator />
        </section>

        <section id="stellar-life" className={`${styles.simulatorSection} ${styles.starLifeSection}`} aria-labelledby="stellar-title">
          <div className={styles.sectionIntro}>
            <div>
              <span className={styles.sectionEyebrow}>KÜTLE, YILDIZIN KADERİNİ BELİRLER</span>
              <h2 id="stellar-title">Bir yıldız nasıl yaşar, nasıl sonlanır?</h2>
            </div>
            <p>Aşamaya tıkla · iki yaşam yolunu karşılaştır · animasyonu oynat</p>
          </div>
          <StellarEvolutionSimulator />
        </section>

        <div className={styles.bottomNav}>
          <Link href="/#animasyonlar">← Diğer sınıf animasyonları</Link>
          <span>Merak et, seç ve keşfet.</span>
        </div>
      </div>
    </main>
  );
}
