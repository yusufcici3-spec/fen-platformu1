import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Fen Videoları | Fen ve Bilim Kulübü",
  description: "6, 7 ve 8. sınıf fen bilimleri konu anlatım videoları.",
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
  {
    id: "7-sinif-1-unite",
    grade: "7. SINIF · 1. ÜNİTE",
    title: "Uzay Araştırmaları ve Yıldızların Dünyası",
    description: "7. sınıf 1. ünite (FB.7.1.1–5): uzay teknolojileri, gözlem, yıldızların yaşamı, galaksiler ve kısa bir soru turu.",
    src: "/videolar/7-sinif-1-unite-uzay.mp4",
    poster: "/videolar/7-sinif-1-unite-uzay.jpg",
  },
  {
    id: "6-sinif-1-unite",
    grade: "6. SINIF · 1. ÜNİTE",
    title: "Güneş Sistemi ve Tutulmalar",
    description: "6. sınıf 1. ünite (FB.6.1.1–4): gezegenler, asteroit-meteor-meteorit, Güneş ve Ay tutulması ve kısa bir soru turu.",
    src: "/videolar/6-sinif-1-unite-gunes-sistemi.mp4",
    poster: "/videolar/6-sinif-1-unite-gunes-sistemi.jpg",
    link: { href: "/sinif/6/gunes-sistemi-ve-tutulmalar", label: "Konu anlatımını aç" },
  },
  {
    id: "6-sinif-2-unite",
    grade: "6. SINIF · 2. ÜNİTE",
    title: "Kuvvetin Etkisinde Hareket",
    description: "6. sınıf 2. ünite (FB.6.2.1–2): kuvvet ve bileşke kuvvet, dengelenmiş ve dengelenmemiş kuvvetler ve kısa bir soru turu.",
    src: "/videolar/6-sinif-2-unite-kuvvet.mp4",
    poster: "/videolar/6-sinif-2-unite-kuvvet.jpg",
    link: { href: "/sinif/6/kuvvetin-etkisinde-hareket", label: "Konu anlatımını aç" },
  },
  {
    id: "6-sinif-3-unite",
    grade: "6. SINIF · 3. ÜNİTE",
    title: "Canlılarda Sistemler",
    description: "6. sınıf 3. ünite (FB.6.3.1–9): eşeyli ve eşeysiz üreme, bitki ve hayvanlarda gelişme, insanda üreme, sinir sistemi, iç salgı bezleri, ergenlik ve sistemlerin sağlığı.",
    src: "/videolar/6-sinif-3-unite-canlilarda-sistemler.mp4",
    poster: "/videolar/6-sinif-3-unite-canlilarda-sistemler.jpg",
    link: { href: "/sinif/6/canlilarda-sistemler", label: "Konu anlatımını aç" },
  },
  {
    id: "7-sinif-2-unite",
    grade: "7. SINIF · 2. ÜNİTE",
    title: "Kuvvet ve Enerjiyi Keşfedelim",
    description: "7. sınıf 2. ünite (FB.7.2.1–3): fiziksel anlamda iş, kinetik ve potansiyel enerji, enerji dönüşümü ve korunumu, kısa bir soru turu.",
    src: "/videolar/7-sinif-2-unite-kuvvet-enerji.mp4",
    poster: "/videolar/7-sinif-2-unite-kuvvet-enerji.jpg",
    link: { href: "/sinif/7/kuvvet-ve-enerjiyi-kesfedelim", label: "Konu anlatımını aç" },
  },
  {
    id: "7-sinif-3-unite",
    grade: "7. SINIF · 3. ÜNİTE",
    title: "Vücudumuzdaki Sistemler",
    description: "7. sınıf 3. ünite: sindirim, dolaşım, solunum ve boşaltım sistemleri; sistem sağlığı, kan ve organ bağışı, bağımlılıkla mücadele; kısa bir soru turu.",
    src: "/videolar/7-sinif-3-unite-vucudumuzdaki-sistemler.mp4",
    poster: "/videolar/7-sinif-3-unite-vucudumuzdaki-sistemler.jpg",
    link: { href: "/sinif/7/vucudumuzdaki-sistemler", label: "Konu anlatımını aç" },
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
