import Link from "next/link";
import HtmlAnimationFrame from "@/components/animations/HtmlAnimationFrame/HtmlAnimationFrame";
import styles from "./page.module.css";

export const metadata = {
  title: "Asit-Baz Ayraç Laboratuvarı | 8. Sınıf Fen Bilimleri",
  description: "Turnusol, mor lahana suyu, metil oranj, fenolftalein ve evrensel ayraç ile asit-baz deneyleri yap.",
};

export default function AsitBazLaboratuvariPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Sayfa yolu">
          <Link href="/#animasyonlar">Animasyonlar</Link><span>/</span>
          <Link href="/animasyonlar/8">8. Sınıf</Link><span>/</span>
          <span aria-current="page">Asit-Baz Laboratuvarı</span>
        </nav>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>8. SINIF · MADDE VE ENDÜSTRİ · ETKİLEŞİMLİ DENEY</span>
          <h1>Asit–Baz Ayraç Laboratuvarı</h1>
          <p>Farklı maddeleri farklı ayıraçlarla test et. Renk değişimini gözlemle, tahminini yap ve sonucunu kontrol et.</p>
        </header>
        <HtmlAnimationFrame src="/animasyonlar/asit-baz-laboratuvari.html" title="Asit-Baz Ayraç Laboratuvarı" minHeight={720} />
        <div className={styles.bottomNav}><Link href="/animasyonlar/8">← 8. sınıf animasyonlarına dön</Link><Link href="/animasyonlar">Tüm animasyonlar →</Link></div>
      </div>
    </main>
  );
}
