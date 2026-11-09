import Link from "next/link";
import styles from "./AnimationsSection.module.css";

type GradeCover = {
  grade: string;
  title: string;
  count: number;
  image: string;
  accent: string;
};

// Her sınıfın kapağı; tıklayınca o sınıfın animasyon sayfası açılır.
const covers: GradeCover[] = [
  { grade: "5", title: "Ay'ın evreleri, kuvvet, mikroskop, iskelet sistemi, MilyonerFen ve oyunlar", count: 9, image: "/animasyonlar/kapak/5-sinif.jpg", accent: "#66a9de" },
  { grade: "6", title: "Gezegenler, tutulmalar, sürat, bileşke kuvvet, eşeysiz üreme ve oyunlar", count: 7, image: "/animasyonlar/kapak/6-sinif.jpg", accent: "#4eb9a1" },
  { grade: "7", title: "Uzay, enerji, sindirim ve dolaşım sistemi, MilyonerFen ve oyunlar", count: 9, image: "/animasyonlar/kapak/7-sinif.jpg", accent: "#e49a58" },
  { grade: "8", title: "Mevsimler, kalıtım, DNA, basınç ve oyunlar", count: 5, image: "/animasyonlar/kapak/8-sinif.jpg", accent: "#9a89ec" },
];

export default function AnimationsSection() {
  return (
    <section id="animasyonlar" className={styles.section} aria-labelledby="animations-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}><span aria-hidden="true">✦</span> KEŞFET · DENE · ÖĞREN</span>
            <h2 id="animations-title" className={styles.title}>Animasyonlar</h2>
            <p className={styles.description}>
              Sınıfını seç; o sınıfın hareketli ve etkileşimli animasyonları, oyunları ve deneyleri seni bekliyor.
            </p>
          </div>
          <span className={styles.headerNote}><span aria-hidden="true">◉</span> 5–8. sınıflara özel</span>
        </header>

        <div className={styles.posterGrid}>
          {covers.map((c) => (
            <Link
              key={c.grade}
              href={`/animasyonlar/${c.grade}`}
              className={styles.poster}
              style={{ ["--poster-accent" as string]: c.accent }}
              aria-label={`${c.grade}. sınıf animasyonlarını aç (${c.count} animasyon)`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={`${c.grade}. sınıf animasyonları kapağı`} width={600} height={1066} loading="lazy" decoding="async" />
              <span className={styles.posterBadge}>{c.count} animasyon</span>
              <span className={styles.posterFoot}>
                <span className={styles.posterText}>{c.title}</span>
                <span className={styles.posterCta}>Animasyonları aç <span aria-hidden="true">→</span></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
