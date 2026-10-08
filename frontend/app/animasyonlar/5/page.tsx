import Link from "next/link";
import MoonPhasesSimulator from "@/components/animations/MoonPhasesSimulator/MoonPhasesSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "5. Sınıf Animasyonları | Ay’ın Evreleri ve Kuvvet",
  description:
    "Ay’ın evrelerini ve kuvvet ölçümünü etkileşimli Ay simülatörü ve dinamometre deneyimiyle keşfet.",
};

export default function FifthGradeMoonPhasesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">5. Sınıf · Ay’ın Evreleri</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>5. SINIF · GÖKYÜZÜNÜ KEŞFET</span>
            <h1>Ay’ın evrelerini kendi gözünle keşfet</h1>
            <p>
              Güneş ışığı, Dünya ve Ay’ın hareketlerini takip et. Ay’ın biçimi değişmeden,
              bize görünen aydınlık bölümün nasıl büyüyüp küçüldüğünü adım adım incele.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.heroAction} href="#moon-simulator">
                Simülatörü başlat <span aria-hidden="true">↓</span>
              </a>
              <a className={`${styles.heroAction} ${styles.heroActionSecondary}`} href="#moon-learning">
                Evrelerin sırasını öğren <span aria-hidden="true">✦</span>
              </a>
              <Link className={`${styles.heroAction} ${styles.heroActionSecondary}`} href="/animasyonlar/5/dinamometre">
                Dinamometreyle kuvvet ölç <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className={styles.heroOrbit} aria-hidden="true">
            <span className={styles.heroOrbitRing} />
            <span className={styles.heroEarth} />
            <span className={styles.heroMoon} />
            <span className={styles.heroSun} />
            <span className={styles.heroStar}>✦</span>
          </div>
        </header>

        <section id="moon-simulator" className={styles.simulatorSection} aria-labelledby="moon-simulator-title">
          <div className={styles.sectionIntro}>
            <div>
              <span className={styles.sectionEyebrow}>KONTROLLER SENDE</span>
              <h2 id="moon-simulator-title">Ay’ın bir aylık yolculuğunu canlandır</h2>
            </div>
            <p>Oynat · durdur · kaydır · evre seç</p>
          </div>
          <MoonPhasesSimulator />
        </section>

        <section id="moon-learning" className={styles.learningSection} aria-labelledby="moon-learning-title">
          <div className={styles.learningHeading}>
            <span className={styles.sectionEyebrow}>AKLINDA KALSIN</span>
            <h2 id="moon-learning-title">Sekiz evre, tek bir döngü</h2>
            <p>
              Evreler yaklaşık 29,5 günde bir aynı sırayla tekrar eder. “Büyüyen” evrelerde
              görünen aydınlık bölüm artar; “küçülen” evrelerde azalır.
            </p>
          </div>
          <div className={styles.phaseSequence} aria-label="Ay’ın evreleri sırasıyla">
            <span>Yeni Ay</span><i aria-hidden="true">→</i>
            <span>Büyüyen Hilal</span><i aria-hidden="true">→</i>
            <span>İlk Dördün</span><i aria-hidden="true">→</i>
            <span>Büyüyen Şişkin Ay</span><i aria-hidden="true">→</i>
            <span>Dolunay</span><i aria-hidden="true">→</i>
            <span>Küçülen Şişkin Ay</span><i aria-hidden="true">→</i>
            <span>Son Dördün</span><i aria-hidden="true">→</i>
            <span>Küçülen Hilal</span>
          </div>
          <p className={styles.sourceLine}>
            Kaynaklar: <a href="https://spaceplace.nasa.gov/moon-phases/" target="_blank" rel="noreferrer">NASA Space Place · Ay’ın evreleri</a>
            {" · "}
            <a href="https://science.nasa.gov/moon/moon-phases/" target="_blank" rel="noreferrer">NASA Science · Moon Phases</a>
          </p>
        </section>

        <div className={styles.bottomNav}>
          <Link href="/#animasyonlar">← Diğer sınıf animasyonları</Link>
          <span>Gözle, karşılaştır ve keşfet.</span>
        </div>
      </div>
    </main>
  );
}
