import Link from "next/link";
import SpaceTechnologySimulator from "@/components/animations/SpaceTechnologySimulator/SpaceTechnologySimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "7. Sınıf Animasyonları | Uzay Teknolojileri",
  description:
    "Uzay istasyonu, uzay sondası, teleskop, roket, uzay mekiği ve gözlemevini etkileşimli simülatörle keşfet.",
};

export default function SeventhGradeSpaceTechnologyPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">7. Sınıf · Uzay Teknolojileri</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>7. SINIF · GÖKYÜZÜNDEKİ TEKNOLOJİLER</span>
            <h1>Uzay araçlarının görevini keşfet</h1>
            <p>
              Uzay istasyonundan derin uzay sondalarına kadar farklı teknolojileri seç, yörüngedeki
              hareketlerini izle ve görevlerinin nasıl çalıştığını öğren.
            </p>
            <a className={styles.heroAction} href="#simulator">
              Simülatörü keşfet <span aria-hidden="true">↓</span>
            </a>
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

        <div className={styles.bottomNav}>
          <Link href="/#animasyonlar">← Diğer sınıf animasyonları</Link>
          <span>Merak et, seç ve keşfet.</span>
        </div>
      </div>
    </main>
  );
}
