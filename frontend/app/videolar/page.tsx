import Link from "next/link";
import styles from "./page.module.css";
import { videos } from "@/content/videos";

export const metadata = {
  title: "Fen Videoları | Fen ve Bilim Kulübü",
  description: "6, 7 ve 8. sınıf fen bilimleri konu anlatım videoları.",
};


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
