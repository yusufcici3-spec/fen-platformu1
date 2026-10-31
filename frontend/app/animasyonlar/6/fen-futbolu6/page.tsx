import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";
import styles from "./page.module.css";

export const metadata = {
  title: "Fen Futbolu 6 | 6. Sınıf Fen Bilimleri",
  description:
    "İki kişilik penaltı düellosu: Güneş Sistemi ve Tutulmalar ile Kuvvet ve Hareket sorularını doğru bil, kaleciye şut çek, ilk 3 golü atan kazansın.",
};

export default function FenFutbolu6Page() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/6">6. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Fen Futbolu 6</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>6. SINIF · GÜNEŞ SİSTEMİ VE TUTULMALAR · KUVVET VE HAREKET · OYUN</span>
          <h1>Fen Futbolu 6</h1>
          <p>
            İki oyunculu penaltı düellosu. Sırayla gelen soruyu doğru bilen kaleciye şut çekme hakkı kazanır;
            bilemezse soru rakibe geçer. Şut çubuğunu tam zamanında durdur, kaleciyi atlat. İlk 3 golü atan
            maçı kazanır.
          </p>
        </header>

        <HtmlAnimationFrame
          src="/animasyonlar/fenfutbolu6.html"
          title="Fen Futbolu 6: iki kişilik fen bilimleri penaltı oyunu"
          minHeight={1100}
        />

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link>
          <Link href="/oyunlar">Diğer oyunlar →</Link>
        </div>
      </div>
    </main>
  );
}
