import Link from "next/link";
import styles from "./AnimationsSection.module.css";

type GradeCard = {
  grade: string;
  title: string;
  description: string;
  className: string;
  href?: string;
  animationCount?: number;
};

const grades: GradeCard[] = [
  {
    grade: "5",
    title: "Ay’ın Evreleri",
    description: "Ay’ın aydınlık bölümünün döngü boyunca nasıl değiştiğini keşfet.",
    className: styles.gradeFive,
    href: "/animasyonlar/5",
    animationCount: 1,
  },
  {
    grade: "6",
    title: "Gezegenler ve Tutulmalar",
    description: "Gezegenleri yakından incele; Güneş ve Ay tutulmalarını simüle et.",
    className: styles.gradeSix,
    href: "/animasyonlar/6",
    animationCount: 2,
  },
  {
    grade: "7",
    title: "Uzay ve Yıldızlar",
    description: "Uzay teknolojilerini keşfet; yıldızların yaşam döngüsünü kütlelerine göre incele.",
    className: styles.gradeSeven,
    href: "/animasyonlar/7",
    animationCount: 2,
  },
  {
    grade: "8",
    title: "Güneş açısı ve mevsimler",
    description: "Dünya’nın yörüngesini kontrol et; Güneş ışınlarını ve gölgeyi keşfet.",
    className: styles.gradeEight,
    href: "/animasyonlar/8",
    animationCount: 1,
  },
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
              Sınıfını seç, fen bilimlerini hareketli ve etkileşimli deneyimlerle öğren.
            </p>
          </div>
          <span className={styles.headerNote}><span aria-hidden="true">◉</span> 5–8. sınıflara özel</span>
        </header>

        <div className={styles.grid}>
          {grades.map((item) => item.href ? (
            <article key={item.grade} className={`${styles.card} ${item.className} ${styles.featuredCard}`}>
              <div className={styles.cardTop}>
                <span className={styles.gradeNumber}>{item.grade}</span>
                <span className={styles.activeStatus}>
                  <span aria-hidden="true" /> {item.animationCount} animasyon
                </span>
              </div>
              <div>
                <p className={styles.gradeLabel}>{item.grade}. SINIF</p>
                <h3>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
              <Link className={styles.openLink} href={item.href}>
                {item.grade}. sınıf animasyonlarını aç <span aria-hidden="true">→</span>
              </Link>
            </article>
          ) : (
            <article key={item.grade} className={`${styles.card} ${item.className}`} aria-label={`${item.grade}. sınıf animasyonları yakında`}>
              <div className={styles.cardTop}>
                <span className={styles.gradeNumber}>{item.grade}</span>
                <span className={styles.status}>Yakında</span>
              </div>
              <div>
                <p className={styles.gradeLabel}>{item.grade}. SINIF</p>
                <h3>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
              <span className={styles.cardFoot}>Yeni animasyonlar hazırlanıyor</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
