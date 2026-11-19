import Link from "next/link";
import WeightLatitudeSimulator from "@/components/animations/WeightLatitudeSimulator/WeightLatitudeSimulator";
import styles from "./page.module.css";

export const metadata = {
  title: "Ağırlık ve Enlem Simülatörü | 5. Sınıf Fen Bilimleri",
  description: "Enlemi, kütleyi ve Dünya’nın dönüşünü değiştirerek ağırlığın nasıl değiştiğini keşfet.",
};

export default function WeightLatitudePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/5">5. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Ağırlık ve Enlem</span>
        </nav>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>KÜTLE, AĞIRLIK VE YERÇEKİMİ</span>
          <h1>Ağırlık enleme göre nasıl değişir?</h1>
          <p>Enlemi ve kütleyi değiştirerek aynı cismin farklı yerlerdeki ağırlığını ok, kadran ve grafik üzerinde incele.</p>
        </header>
        <WeightLatitudeSimulator />
        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/5">← 5. sınıf animasyonlarına dön</Link>
        </div>
      </div>
    </main>
  );
}
