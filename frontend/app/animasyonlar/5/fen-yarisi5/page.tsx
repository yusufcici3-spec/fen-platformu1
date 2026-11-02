import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";
import styles from "./page.module.css";

export const metadata = {
  title: "Fen Yarışı 5 | 5. Sınıf Fen Bilimleri",
  description:
    "İki kişilik araba yarışı: Gökyüzündeki Komşularımız ve Biz ile Kuvveti Tanıyalım sorularını doğru bil, 5 saniye araba sür, yoldaki 10 ödülü ilk toplayan kazansın.",
};

export default function FenYarisi5Page() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/5">5. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Fen Yarışı 5</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>5. SINIF · GÖKYÜZÜNDEKİ KOMŞULARIMIZ VE BİZ · KUVVETİ TANIYALIM · OYUN</span>
          <h1>Fen Yarışı 5</h1>
          <p>
            İki oyunculu araba yarışı. Sırayla gelen soruyu doğru bilen oyuncu 5 saniye araba sürer ve yolda
            ⭐ ödülleri toplar; bilemezse soru rakibe geçer. 10 ödülü ilk toplayan yarışı kazanır.
          </p>
        </header>

        <HtmlAnimationFrame
          src="/animasyonlar/fenarabasi5.html"
          title="Fen Yarışı 5: iki kişilik fen bilimleri araba yarışı"
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
