import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Fen Bilimleri Animasyonları | 5, 6, 7 ve 8. Sınıf",
  description: "Sınıfını seç, istediğin fen bilimleri animasyonunu listeden aç.",
};

const grades = [
  { grade: "5. Sınıf", id: "sinif-5", color: "blue", items: [
    ["Ay’ın Evreleri", "/animasyonlar/5"], ["Ay’ın Yüzeyi", "/animasyonlar/5/ay-yuzeyi"],
    ["4. Ünite Etkinlikleri", "/animasyonlar/5/4-unite"], ["5. Ünite Etkinlikleri", "/animasyonlar/5/5-unite"],
    ["Dinamometre", "/animasyonlar/5/dinamometre"], ["Dinamometreyi Ölçeklendirme", "/animasyonlar/5/dinamometre-olcekle"],
    ["Mikroskop Masası", "/animasyonlar/5/mikroskop"], ["Fen Koşusu 5", "/animasyonlar/5/fen-kosusu5"],
    ["Fen Yarışı 5", "/animasyonlar/5/fen-yarisi5"], ["MilyonerFen", "/animasyonlar/5/milyoner"],
  ]},
  { grade: "6. Sınıf", id: "sinif-6", color: "green", items: [
    ["Güneş Sistemi ve Tutulmalar", "/animasyonlar/6"], ["Bileşke Kuvvet", "/animasyonlar/6/bileske-kuvvet"],
    ["Sürat ve Hız", "/animasyonlar/6/surat-ve-hiz"], ["İp Çekme Etkinliği", "/animasyonlar/6/ip-cekme"],
    ["Çiçekli Bitkilerin Yaşam Döngüsü", "/animasyonlar/6/cicekli-bitkiler-yasam-dongusu"],
    ["Çiçeğin Kısımları", "/animasyonlar/6/cicegin-kisimlari"], ["Fen Futbolu 6", "/animasyonlar/6/fen-futbolu6"],
  ]},
  { grade: "7. Sınıf", id: "sinif-7", color: "orange", items: [
    ["Uzay Teknolojileri ve Yıldızların Yaşamı", "/animasyonlar/7"], ["Ağırlık ve Enlem", "/animasyonlar/7/agirlik-enlem"],
    ["Kuvvet ve Enerji", "/animasyonlar/7/kuvvet-enerji"], ["Kinetik ve Potansiyel Enerji", "/animasyonlar/7/kinetik-potansiyel"],
    ["Sindirim Sistemi", "/animasyonlar/7/sindirim-sistemi"], ["Dolaşım Sistemi", "/animasyonlar/7/dolasim-sistemi"],
    ["Solunum Sistemi", "/animasyonlar/7/solunum-sistemi"], ["Boşaltım Sistemi", "/animasyonlar/7/bosaltim-sistemi"],
    ["MilyonerFen 7", "/animasyonlar/7/milyoner"], ["Fen Futbolu 7", "/animasyonlar/7/fen-futbolu"],
    ["PasSaFenOla 7", "/animasyonlar/7/passafenola7"],
  ]},
  { grade: "8. Sınıf", id: "sinif-8", color: "purple", items: [
    ["Mevsimlerin Oluşumu", "/animasyonlar/8"], ["DNA’nın Eşlenmesi", "/animasyonlar/8/dna-eslesmesi"],
    ["Kalıtım", "/animasyonlar/8/kalitim"], ["Katı Basıncı", "/animasyonlar/8/katı-basıncı"],
    ["PasSaFenOla 8", "/animasyonlar/8/passafenola"],
  ]},
];

export default function AnimasyonlarIndexPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs}><Link href="/">Ana Sayfa</Link><span>/</span><span>Animasyonlar</span></nav>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>FEN VE BİLİM KULÜBÜ</span>
          <h1>Animasyonunu seç, keşfetmeye başla!</h1>
          <p>Önce sınıfını seç. Ardından açmak istediğin animasyonun adına dokun. Animasyon yalnızca seçtiğin başlığa dokunduğunda açılır.</p>
          <div className={styles.gradeNav}>{grades.map((g) => <a key={g.id} href={`#${g.id}`}>{g.grade}</a>)}</div>
        </header>
        <div className={styles.gradeList}>
          {grades.map((g) => (
            <section id={g.id} key={g.id} className={`${styles.gradeCard} ${styles[g.color]}`}>
              <div className={styles.gradeHeading}><h2>{g.grade}</h2><span>{g.items.length} animasyon</span></div>
              <ul>{g.items.map(([title, href]) => <li key={href}><Link href={href}><span>{title}</span><span aria-hidden="true">↗</span></Link></li>)}</ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
