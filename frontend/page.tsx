import Link from "next/link";
import SolarSystemSimulator from "@/components/animations/SolarSystemSimulator/SolarSystemSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "6. Sınıf Animasyonları | Güneş Sistemi ve Gezegenler",
  description:
    "Güneş Sistemi'ndeki sekiz gezegeni seç, yakınlaştır ve gerçek yörünge uzaklıklarıyla temel özelliklerini keşfet.",
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
          <span className={styles.eyebrow}>6. SINIF · GÜNEŞ SİSTEMİ</span>
          <h1>Gezegenleri seç, yaklaş ve keşfet</h1>
          <p>
            Güneş çevresindeki sekiz gezegene tıkla, yakından incele ve çap, uzaklık,
            yörünge, dönüş, uydu sayısı ile daha fazlasını öğren.
          </p>
          <div className={styles.heroLinks}>
            <span><i className={styles.miniDot} /> Kontroller sende · dokunmatik uyumlu</span>
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

        <div className={styles.bottomNav}>
          <Link href="/#animasyonlar">← Diğer sınıf animasyonları</Link>
          <Link href="/sinif/6">6. sınıf ünitelerine git →</Link>
        </div>
      </div>
    </div>
  );
}
