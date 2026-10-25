import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";
import styles from "./page.module.css";

export const metadata = {
  title: "Dinamometreni Ölçeklendir | 5. Sınıf Fen Bilimleri",
  description:
    "Bilinen ağırlıklarla kendi dinamometre ölçeğini işaretle, sonra gizemli cisimlerin ağırlığını ölçerek tahmin et.",
};

export default function DynamometerCalibrationPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/5">5. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Dinamometreni Ölçeklendir</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>5. SINIF · KUVVETİN ÖLÇÜLMESİ · ETKİNLİK</span>
          <h1>Dinamometreni kendin ölçeklendir</h1>
          <p>
            Önce bilinen ağırlıklar asıp yayın uzamasını ölçeğe işaretle. Sonra ölçeğini kullanarak
            gizemli cisimlerin ağırlığını Newton (N) cinsinden tahmin et.
          </p>
        </header>

        <HtmlAnimationFrame
          src="/animasyonlar/dinamometre-olcekle.html"
          title="Dinamometre ölçeklendirme etkinliği"
          minHeight={760}
        />

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/5">← 5. sınıf animasyonlarına dön</Link>
          <Link href="/animasyonlar/5/dinamometre">Dinamometre simülatörünü aç →</Link>
        </div>
      </div>
    </main>
  );
}
