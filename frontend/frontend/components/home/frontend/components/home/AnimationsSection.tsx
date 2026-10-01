import Link from "next/link";
import styles from "./AnimationsSection.module.css";

const upcomingGrades = [
  {
    grade: "5",
    title: "Keşfetmeye başla",
    description: "Fen konularını animasyonlarla keşfet.",
    className: styles.gradeFive,
  },
  {
    grade: "6",
    title: "Merakını derinleştir",
    description: "Bilimsel olayları adım adım incele.",
    className: styles.gradeSix,
  },
  {
    grade: "7",
    title: "Bağlantıları keşfet",
    description: "Kavramlar arasındaki ilişkileri gör.",
    className: styles.gradeSeven,
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
          {upcomingGrades.map((item) => (
            <article key={item.grade} className={`${styles.card} ${item.className}`} aria-label={`${item.grade}. sınıf animasyonları yakında` }>
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

          <article className={`${styles.card} ${styles.gradeEight} ${styles.featuredCard}`}>
            <div className={styles.cardTop}>
              <span className={styles.gradeNumber}>8</span>
              <span className={styles.activeStatus}><span aria-hidden="true" /> 1 animasyon</span>
            </div>
            <div>
              <p className={styles.gradeLabel}>8. SINIF</p>
              <h3>Güneş açısı ve mevsimler</h3>
              <p className={styles.cardDescription}>
                Dünya’nın yörüngesini kontrol et; Güneş ışınlarını ve gölgeyi keşfet.
              </p>
            </div>
            <Link className={styles.openLink} href="/animasyonlar/8">
              8. sınıf animasyonunu aç <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
