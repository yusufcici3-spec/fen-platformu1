import Link from "next/link";
import SuratHizSimulator from "@/components/animations/SuratHizSimulator/SuratHizSimulator";
import styles from "../bileske-kuvvet/page.module.css";

export const metadata = {
 title: "Sürat ve Hız Simülatörü | 6. Sınıf Fen Bilimleri",
 description: "Sürat ve hız arasındaki farkı hareketi kontrol ederek keşfet. Alınan yol, yer değiştirme ve yönü karşılaştır.",
};

export default function SuratVeHizPage(){
 return <main className={styles.page}><div className={styles.container}>
  <nav className={styles.breadcrumbs} aria-label="Sayfa yolu"><Link href="/#animasyonlar">Animasyonlar</Link><span>/</span><Link href="/animasyonlar/6">6. Sınıf</Link><span>/</span><span aria-current="page">Sürat ve Hız</span></nav>
  <header className={styles.hero}><div><span className={styles.eyebrow}>6. SINIF · HAREKET VE ÖLÇME</span><h1>Sürat ve hız arasındaki farkı keşfet</h1><p>Aracın yönünü ve hareket senaryosunu değiştir. Alınan yol ile yer değiştirmeyi karşılaştır; sürat ve hızın neden aynı şey olmadığını kendin gözlemle.</p><div className={styles.heroFacts}><span><b>Sürat:</b> alınan yol / zaman</span><span><b>Hız:</b> yer değiştirme / zaman</span><span><b>Hız:</b> yön belirtir</span></div></div></header>
  <SuratHizSimulator/>
  <section className={styles.learning}><div className={styles.learningHeading}><span className={styles.eyebrow}>ÖĞRENME HEDEFİ</span><h2>Hareketi yalnızca mesafeyle değil, yönüyle de değerlendir</h2></div><div className={styles.learningGrid}>
   <article className={styles.learningCard}><span className={styles.mark}>1</span><div><h3>Alınan yol</h3><p>Cismin hareket boyunca katettiği toplam mesafedir. Gidiş ve dönüş yolları birlikte sayılır.</p></div></article>
   <article className={styles.learningCard}><span className={styles.mark}>2</span><div><h3>Yer değiştirme</h3><p>Başlangıç noktası ile bitiş noktası arasındaki yönlü konum değişimidir.</p></div></article>
   <article className={styles.learningCard}><span className={styles.mark}>3</span><div><h3>Yön neden önemli?</h3><p>Aynı süratle doğuya veya batıya giden araçların hız yönleri farklıdır.</p></div></article>
  </div></section>
  <div className={styles.bottomNav}><Link href="/animasyonlar/6">← 6. sınıf animasyonlarına dön</Link><Link href="/#animasyonlar">Tüm animasyonlar →</Link></div>
 </div></main>;
}
