import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";
import styles from "./page.module.css";

export const metadata = {
  title: "Fen Koşusu 5 | 5. Sınıf Fen Bilimleri",
  description:
    "İki kişilik koşu yarışı: Gökyüzündeki Komşularımız ve Biz ile Kuvveti Tanıyalım sorularını doğru bil, 4 saniye koş, finişe ilk ulaşan kazansın.",
};

export default function FenKosusu5Page() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/5">5. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Fen Koşusu 5</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>5. SINIF · GÖKYÜZÜNDEKİ KOMŞULARIMIZ VE BİZ · KUVVETİ TANIYALIM · OYUN</span>
          <h1>Fen Koşusu 5</h1>
          <p>
            İki oyunculu koşu yarışı. Sırayla gelen soruyu doğru bilen oyuncu 4 saniye koşma hakkı kazanır;
            bilemezse soru rakibe geçer. 100 metrelik pistte finiş çizgisine ilk ulaşan yarışı kazanır.
          </p>
        </header>

        <HtmlAnimationFrame
          src="/animasyonlar/fenkosusu5.html"
          title="Fen Koşusu 5: iki kişilik fen bilimleri koşu yarışı"
          minHeight={1150}
        />

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/5">← 5. sınıf animasyonlarına dön</Link>
          <Link href="/oyunlar">Diğer oyunlar →</Link>
        </div>
      </div>
    </main>
  );
}
