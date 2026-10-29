import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";
import styles from "./page.module.css";

export const metadata = {
  title: "Passafenola | 8. Sınıf Fen Bilimleri",
  description:
    "Mevsimler ve İklim ile DNA ve Genetik Kod ünitelerinden 21 harflik passaparola oyunu. Her harf için soruyu oku, cevabı yaz, süre bitmeden harfleri tamamla.",
};

export default function PassafenolaPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link>
          <span aria-hidden="true">/</span>
          <Link href="/animasyonlar/8">8. Sınıf</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Passafenola</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>8. SINIF · MEVSİMLER VE İKLİM · DNA VE GENETİK KOD · OYUN</span>
          <h1>Passafenola</h1>
          <p>
            Her harf için bir fen sorusu gelir; cevap o harfle başlar. Doğru bilirsen harf yeşile, yanlışsa
            kırmızıya döner. Bilmediğini pas geç, süre bitmeden turu tamamla. Oyun sonunda tüm soruların
            cevaplarını ve kısa bilgi notlarını inceleyebilirsin.
          </p>
        </header>

        <HtmlAnimationFrame
          src="/animasyonlar/passafenola.html"
          title="Passafenola: 8. sınıf fen bilimleri passaparola oyunu"
          minHeight={760}
        />

        <div className={styles.bottomNav}>
          <Link href="/animasyonlar/8">← 8. sınıf animasyonlarına dön</Link>
          <Link href="/oyunlar">Diğer oyunlar →</Link>
        </div>
      </div>
    </main>
  );
}
