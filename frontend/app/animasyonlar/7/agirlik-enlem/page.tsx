import Link from "next/link";
import WeightLatitudeSimulator from "@/components/animations/WeightLatitudeSimulator/WeightLatitudeSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "Ağırlık ve Enlem Simülatörü | 7. Sınıf Fen Bilimleri",
  description:
    "Aynı cismin kutupta ekvatordan neden daha ağır olduğunu enlemi, kütleyi ve Dünya’nın dönüşünü değiştirerek keşfet.",
};

export default function WeightLatitudePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/7">7. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Ağırlık ve Enlem</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>KÜTLE, AĞIRLIK VE YERÇEKİMİ</span>
          <h1>Aynı cisim kutupta ekvatordan daha ağırdır</h1>
          <p>
            Enlemi değiştir, kütleyi seç ve Dünya’nın dönüş hızını artır; ağırlığın nasıl değiştiğini
            ok, kadran ve grafik üzerinde canlı izle.
          </p>
        </header>

        <WeightLatitudeSimulator />

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/7">← 7. sınıf animasyonlarına dön</Link>
          <Link href="/animasyonlar/7/kuvvet-enerji">Kuvvet ve enerji animasyonunu aç →</Link>
        </div>
      </div>
    </main>
  );
}
