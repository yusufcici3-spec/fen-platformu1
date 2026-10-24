import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";
import styles from "./page.module.css";

export const metadata = {
  title: "Kinetik ve Potansiyel Enerji | 7. Sınıf Fen Bilimleri",
  description:
    "Sarkaç ve kaygan yolda kinetik ile potansiyel enerjinin birbirine dönüşümünü; kütle, yükseklik, yerçekimi ve sürtünmeyi değiştirerek keşfet.",
};

export default function KineticPotentialPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/7">7. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Kinetik ve Potansiyel Enerji</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>KUVVET VE ENERJİ · ENERJİ DÖNÜŞÜMLERİ</span>
          <h1>Kinetik ve potansiyel enerji</h1>
          <p>
            Cismi sürükleyerek başlangıç yüksekliğini seç, bırak ve izle. Enerjinin türü sürekli değişir,
            toplamı korunur. Sürtünmeyi açınca enerjinin bir kısmı ısıya dönüşür.
          </p>
        </header>

        <HtmlAnimationFrame
          src="/animasyonlar/kinetik-potansiyel.html"
          title="Kinetik ve potansiyel enerji etkileşimli animasyonu"
        />

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link>
          <Link href="/animasyonlar/7/kuvvet-enerji">Hız treni enerji animasyonunu aç →</Link>
        </div>
      </div>
    </main>
  );
}
