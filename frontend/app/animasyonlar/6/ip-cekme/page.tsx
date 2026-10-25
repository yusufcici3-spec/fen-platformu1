import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";
import styles from "./page.module.css";

export const metadata = {
  title: "İp Çekme Etkinliği | 6. Sınıf Fen Bilimleri",
  description:
    "İki takımın kuvvetlerini ayarla, bileşke kuvveti bul ve ipin hangi yöne gideceğini önceden tahmin et. Görevlerle kendini dene.",
};

export default function TugOfWarPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/6">6. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">İp Çekme Etkinliği</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>6. SINIF · KUVVET VE HAREKET · ETKİNLİK</span>
          <h1>İp çekme: bileşke kuvveti bul</h1>
          <p>
            Takımlara farklı kuvvetlerde oyuncular ekle. Bileşke kuvveti hesapla, ipin hangi yöne
            gideceğini tahmin et, sonra çekmeye başla. Görevler sekmesinde 5 soruyla kendini dene.
          </p>
        </header>

        <HtmlAnimationFrame
          src="/animasyonlar/ip-cekme.html"
          title="İp çekme etkinliği: bileşke kuvvet"
          minHeight={760}
        />

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link>
          <Link href="/animasyonlar/6/bileske-kuvvet">Bileşke kuvvet simülatörünü aç →</Link>
        </div>
      </div>
    </main>
  );
}
