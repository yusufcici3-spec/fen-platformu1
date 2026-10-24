import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Fen Videoları | Fen ve Bilim Kulübü",
  description: "Biyoteknoloji ve yerçekimi konularını anlatan kısa fen videoları.",
};

const videos = [
  {
    id: "biyoteknoloji",
    grade: "8. SINIF",
    title: "Biyoteknoloji nedir?",
    description: "Biyoteknolojinin ne olduğunu ve günlük hayattaki uygulamalarını adım adım öğren.",
    src: "/videolar/biyoteknoloji.mp4",
    poster: "/videolar/biyoteknoloji.jpg",
  },
  {
    id: "yercekimi",
    grade: "7. SINIF",
    title: "Yerçekimi bir anda kaybolsaydı ne olurdu?",
    description: "5’ten geriye sayım ve yerçekimi kalkınca Dünya’da olacakların canlı gösterimi.",
    src: "/videolar/yercekimi-kaybolsaydi.mp4",
    poster: "/videolar/yercekimi-kaybolsaydi.jpg",
    link: { href: "/animasyonlar/7/agirlik-enlem", label: "Ağırlık ve enlem animasyonunu aç" },
  },
];

export default function VideosPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <span className={styles.eyebrow}>İZLE VE ÖĞREN</span>
          <h1>Fen videoları</h1>
          <p>Kısa, görsel anlatımlı videolarla konuları tekrar et.</p>
        </header>
        <div className={styles.grid}>
          {videos.map((v) => (
            <article key={v.id} className={styles.card}>
              <video className={styles.video} controls preload="none" poster={v.poster} playsInline>
                <source src={v.src} type="video/mp4" />
                Tarayıcın video oynatmayı desteklemiyor.
              </video>
              <div className={styles.body}>
                <span className={styles.grade}>{v.grade}</span>
                <h2>{v.title}</h2>
                <p>{v.description}</p>
                {v.link && <Link href={v.link.href}>{v.link.label} →</Link>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
